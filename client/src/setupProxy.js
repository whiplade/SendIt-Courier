const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/signup',  
    createProxyMiddleware({
      target: 'http://localhost:5555',  
      changeOrigin: true,
    })
  );
};
