// Simple test endpoint for Vercel
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello from Vercel API!',
    method: req.method,
    timestamp: new Date().toISOString(),
    url: req.url
  });
}
