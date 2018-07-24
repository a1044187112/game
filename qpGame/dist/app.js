'use strict';

var _ioNn = require('./socket/io.nn.js');

var _ioNn2 = _interopRequireDefault(_ioNn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var log = require('./log/log');
var io = require('socket.io').listen(http);
var user = require('./user/user');

log.use(app);

app.all("*", function (req, res, next) {
  // 处理跨域问题
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
  next();
});
app.get('/', function (req, res) {
  console.log('tes');
  res.send('凯恩!');
  // let nnio = new NNIO(io)
  // nnio.router();
});

app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  var data = req.body;
  user.accoundData(data, res); // 如果数据库中没有该用户  则添加该用户 如果存在 则返回用户信息
});

app.post('/modify/info', urlencodedParser, function (req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  var data = req.body;
  user.modifyUserInfo(data, res); // 如果数据库中没有该用户  则添加该用户 如果存在 则返回用户信息
});

app.post('/nn', function (req, res) {

  console.log("-------牛牛chang");
  var nnio = new _ioNn2.default(io);
  nnio.router();
  res.send('牛牛长连接');
});

io.sockets.on('connection', function (socket) {
  console.log('User connected');
  var nnio = new _ioNn2.default(socket);
  nnio.router();
});

http.listen(3000);