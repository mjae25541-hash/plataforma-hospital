export default async function handler(req, res) {
  const pathParts = req.query.path || [];
  const path = Array.isArray(pathParts) ? pathParts.join('/') : pathParts;
  const url = `https://mariajose-n8n.rjtyg0.easypanel.host/webhook/${path}`;

  try {
    const body = req.method !== 'GET' ? JSON.stringify(req.body) : undefined;
    const response = await fetch(url, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}
