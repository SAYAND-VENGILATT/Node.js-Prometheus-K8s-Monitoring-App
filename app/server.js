const express = require('express');
const { 
  register,
  httpRequestDuration,
  requestCounter
} = require('./metrics');

const app = express();
const PORT = process.env.PORT || 5000;

// Metrics middleware
app.use((req, res, next) => {
  const start = Date.now();
  const end = httpRequestDuration.startTimer();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    end({ 
      method: req.method, 
      route: req.path, 
      code: res.statusCode 
    });
    requestCounter.inc({
      method: req.method,
      route: req.path,
      code: res.statusCode
    });
  });
  
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Node.js Prometheus K8s App!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});