var express = require('express');
var bodyParser = require('body-parser');
let game = require('./game/game');
let user = require("./user/user");


game.gameStart();
//导入JS
var db = require("./DB/config");

db.connect();


var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var router = express.Router();

app.get('/', function(req, res) {

    res.send('凯恩!');
    user.userInfo();
});

router.post('/login', function(req, res, next) {

  // 获取参数
  var query = req.body;
  console.log("post请求：参数", query);

  res.send('hello , world');
});

app.listen(3000); 