const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/signup',  // Define the specific route to proxy to
    createProxyMiddleware({
      target: 'http://localhost:5555',  // Specify the URL of your Flask back-end
      changeOrigin: true,
    })
  );
};
