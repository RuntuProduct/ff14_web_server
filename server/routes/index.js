// 路由规则存放目录
const user = require('./user');
const job = require('./job');

module.exports = function(app){
    app.get('/', function (req, res) {
      res.render('./index.html');
    });

    app.all('/api/*', (req, res, next) => {
      res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Origin", "http://localhost:8014");
      next();
    })

    app.use('/api/user', user)
    app.use('/api/job', job);
    // app.use('/api/log', log);
    // app.use('/api/sup', sup);
    // app.use('/api/med', med);
    // app.use('/api/good', good);
    // app.use('/api/order', order);
}