var express = require('express'),
    path = require('path'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser');

var compression = require('compression'); // gzip压缩插件

var isDev = process.env.NODE_ENV !== 'production';
var app = express();
var port = 3000;

app.use(compression()); // 启用 gzip压缩

// app.use(bodyParser()); // for parsing application/jso
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.text()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './server/views'));

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'uploads')));

require('./server/routes')(app);

if (isDev) {
  // add "reload" to express, see: https://www.npmjs.com/package/reload
  var reload = require('reload');
  var http = require('http');

  var server = http.createServer(app);
  reload(server, app);

  server.listen(port, function(){
    console.log('App (dev) is now running on port 3000!');
  });
} else {
  // static assets served by express.static() for production
  app.listen(port, function () {
    console.log('App (production) is now running on port 3000!');
  });
}
