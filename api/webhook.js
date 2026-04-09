// ============================================================
//  api/webhook.js — Recebe notificações da SigiloPay
//  Redireciona o cliente para a página correta após pagamento
// ============================================================

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).end();

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { return res.status(400).end(); }
    }
    if (!body || Object.keys(body).length === 0) {
      body = await new Promise((resolve, reject) => {
        let raw = '';
        req.on('data', chunk => { raw += chunk; });
        req.on('end', () => {
          try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
        });
        req.on('error', reject);
      }).catch(() => null);
    }

    if (!body) return res.status(400).end();

    const { event, transaction } = body;

    // Só processa pagamentos confirmados
    if (event === 'TRANSACTION_PAID' && transaction?.status === 'COMPLETED') {

      const origem = transaction?.identifier || '';

      // Se for pagamento da taxa de liberação → vai para telegram
      if (origem.startsWith('taxa_')) {
        // Salva status em memória (polling da taxa.html vai buscar)
        _pagos.set(transaction.id, 'COMPLETED');
        return res.status(200).json({ ok: true, redirect: '/telegram.html' });
      }

      // Se for pagamento principal do checkout → vai para taxa
      _pagos.set(transaction.id, 'COMPLETED');
      return res.status(200).json({ ok: true, redirect: '/taxa.html' });
    }

    // Outros eventos: só confirma recebimento
    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('[Webhook] Erro:', err.name);
    return res.status(500).end();
  }
}

// Cache em memória para o polling do status
const _pagos = new Map();

// Expõe para o api/status.js poder consultar
export { _pagos };
