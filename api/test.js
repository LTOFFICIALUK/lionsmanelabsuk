module.exports = async (req, res) => {
  console.log('Test API route called:', req.method, req.url);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  console.log('Test API route responding with success');
  return res.status(200).json({ 
    message: 'Test API route working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}; 