export default async function handler(req, res) {
  const pathParts = req.query.path || [];
  const path = Array.isArray(pathParts) ? pathParts.join('/') : pathParts;
  const url = `https://mariajose-n8n.rjtyg0.easypanel.host/webhook/${path}`;

  try {
    let body = undefined;
    let contentType = 'application/x-www-form-urlencoded';

    if (req.method !== 'GET' && req.body) {
      if (typeof req.body === 'object') {
        body = new URLSearchParams(req.body).toString();
      } else {
        body = String(req.body);
      }
    }

    const response = await fetch(url, {
      method: req.method,
      headers: { 'Content-Type': contentType, 'Accept': 'application/json' },
      body,
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { message: text }; }

    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
