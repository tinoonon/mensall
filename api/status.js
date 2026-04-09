// ============================================================
//  api/status.js — Verifica se transação foi paga
//  Consultado pelo polling da taxa.html a cada 5s
// ============================================================

import { _pagos } from './webhook.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET')    return res.status(405).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID ausente' });

  // Verifica cache local primeiro (webhook já recebeu)
  if (_pagos.has(id)) {
    return res.status(200).json({ status: 'COMPLETED' });
  }

  // Se não estiver no cache, consulta direto na SigiloPay
  const publicKey = process.env.SIGILO_PUBLIC_KEY;
  const secretKey = process.env.SIGILO_SECRET_KEY;

  if (!publicKey || !secretKey) {
    return res.status(500).json({ error: 'Configuração incompleta' });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const upstream = await fetch(
      `https://app.sigilopay.com.br/api/v1/gateway/transaction/${id}`,
      {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-public-key': publicKey,
          'x-secret-key': secretKey,
        }
      }
    );
    clearTimeout(timer);

    const data = await upstream.json();
    const status = data.status || data.transaction?.status || 'PENDING';

    if (status === 'COMPLETED') _pagos.set(id, 'COMPLETED');

    return res.status(200).json({ status });

  } catch (err) {
    if (err.name === 'AbortError') return res.status(504).json({ error: 'Timeout' });
    return res.status(500).json({ error: 'Erro ao verificar status' });
  }
}
