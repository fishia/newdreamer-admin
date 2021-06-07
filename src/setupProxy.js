const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        proxy([
        '/newdreamer',
    ],{
            // "target": process.env.REACT_APP_ENV === 'production' ? "https://www.newdreamer.cn" : 'https://test.newdreamer.cn',
            "target": process.env.REACT_APP_ENV === 'production' ? "https://www.hznewdreamer.cn" : 'https://test.hznewdreamer.cn',
            changeOrigin: true,
            secure: false,
            onProxyReq(proxyReq, req, res) {
                // proxyReq.setHeader('cookie', 'JSESSIONID=7040A5D93783E8C08BC2F055BD75DA7F');
            }
        })
    );
};
