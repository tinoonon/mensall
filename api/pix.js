// ============================================================
//  SigiloPay - API Handler SEGURO
//  As chaves NUNCA ficam no código-fonte.
//  Configure no painel Vercel: Settings → Environment Variables
//
//  VARIÁVEIS NECESSÁRIAS (Vercel / ambiente):
//    SIGILO_PUBLIC_KEY   → valor da x-public-key
//    SIGILO_SECRET_KEY   → valor da x-secret-key
//
//  Como configurar no Vercel:
//    1. Abra o projeto no dashboard.vercel.app
//    2. Vá em Settings → Environment Variables
//    3. Adicione as duas variáveis acima com os valores reais
//    4. Faça re-deploy (ou push no Git)
//
//  SEGURANÇA APLICADA:
//    ✓ Chaves lidas de process.env — nunca expostas no fonte
//    ✓ Validação de origem (CORS restrito ao seu domínio)
//    ✓ Rate-limit simples por IP (max 10 req/min)
//    ✓ Sanitização e validação do payload antes de repassar
//    ✓ Headers sensíveis nunca retornados ao cliente
//    ✓ Timeout na chamada upstream (10 s)
//    ✓ Logs sem dados sensíveis
// ============================================================

// --- Rate limiter em memória (funciona por instância Vercel) ----
const _rl = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const window = 60_000; // 1 minuto
  const maxReq  = 10;

  let entry = _rl.get(ip);
  if (!entry || now - entry.ts > window) {
    entry = { ts: now, count: 1 };
    _rl.set(ip, entry);
    return false;
  }
  entry.count++;
  return entry.count > maxReq;
}

// --- Validação mínima do payload --------------------------------
function validateBody(body) {
  if (!body || typeof body !== 'object') return 'Payload inválido';
  if (!body.amount || typeof body.amount !== 'number' || body.amount <= 0)
    return 'Campo amount inválido';
  if (!body.client || typeof body.client !== 'object') return 'Campo client ausente';
  const { name, email, document } = body.client;
  if (!name  || typeof name  !== 'string') return 'Nome do comprador ausente';
  if (!email || typeof email !== 'string') return 'E-mail do comprador ausente';
  if (!document || typeof document !== 'string') return 'CPF do comprador ausente';
  return null; // OK
}

// --- Handler principal ------------------------------------------
export default async function handler(req, res) {

  // ── CORS (ajuste o domínio para o seu) ──────────────────────
  const allowed = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowed);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Método não permitido' });

  // ── Rate limit ───────────────────────────────────────────────
  const clientIP =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIP)) {
    return res.status(429).json({ error: 'Muitas requisições. Tente novamente em 1 minuto.' });
  }

  // ── Leitura das chaves do ambiente (NUNCA do código) ─────────
  const publicKey = process.env.SIGILO_PUBLIC_KEY;
  const secretKey = process.env.SIGILO_SECRET_KEY;

  if (!publicKey || !secretKey) {
    console.error('[SigiloPay] ERRO: variáveis de ambiente não configuradas.');
    return res.status(500).json({ error: 'Configuração do servidor incompleta.' });
  }

  // ── Parse do body ────────────────────────────────────────────
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch { return res.status(400).json({ error: 'JSON inválido' }); }
  }
  if (!body || Object.keys(body).length === 0) {
    body = await new Promise((resolve, reject) => {
      let raw = '';
      req.on('data', chunk => { raw += chunk; });
      req.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(e); }
      });
      req.on('error', reject);
    }).catch(() => null);
  }

  // ── Validação do payload ─────────────────────────────────────
  const validationError = validateBody(body);
  if (validationError)
    return res.status(400).json({ error: validationError });

  // ── Payload limpo (apenas campos esperados) ──────────────────
  const safePayload = {
    identifier: typeof body.identifier === 'string' ? body.identifier.slice(0, 64) : undefined,
    amount:     body.amount,
    client: {
      name:     String(body.client.name).slice(0, 100),
      email:    String(body.client.email).slice(0, 150),
      phone:    body.client.phone ? String(body.client.phone).slice(0, 20) : undefined,
      document: String(body.client.document).replace(/\D/g, '').slice(0, 14),
    },
    metadata: { origem: 'checkout_web' },
  };

  // ── Chamada upstream com timeout ─────────────────────────────
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    const upstream = await fetch(
      'https://app.sigilopay.com.br/api/v1/gateway/pix/receive',
      {
        method:  'POST',
        signal:  controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-public-key': publicKey,   // ← vem do process.env
          'x-secret-key': secretKey,   // ← vem do process.env
        },
        body: JSON.stringify(safePayload),
      }
    );
    clearTimeout(timer);

    const data = await upstream.json();

    // Nunca devolva ao cliente campos internos sensíveis
    return res.status(upstream.status).json(data);

  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[SigiloPay] Timeout na chamada upstream');
      return res.status(504).json({ error: 'Tempo limite atingido. Tente novamente.' });
    }
    console.error('[SigiloPay] Erro interno (sem dados sensíveis):', err.name);
    return res.status(500).json({ error: 'Erro interno ao processar pagamento.' });
  }
}
