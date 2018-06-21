var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var router = express.Router();

app.get('/', function(req, res) {
    res.send('凯恩!');
});

router.post('/login', function(req, res, next) {

  // 获取参数
  var query = req.body;
  console.log("post请求：参数", query);

  res.send('hello , world');
});

app.listen(3000);