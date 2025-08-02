const client = require('prom-client');

const register = new client.Registry();
register.setDefaultLabels({
  app: 'node-prometheus-k8s',
  pod: process.env.HOSTNAME || 'local'
});

// Collect default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'code']
});

module.exports = {
  register,
  httpRequestDuration,
  requestCounter
};