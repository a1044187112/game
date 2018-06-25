var express = require('express');
var bodyParser = require('body-parser');
let game = require('./game/game');
let user = require("./user/user");


game.gameStart();
//导入JS
var db = require("./DB/config");

db.connect();


var app = express();
app.all("*",function(req,res,next){  // 处理跨域问题
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    next();
});

// 添加json解析
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 


app.get('/', function(req, res) {

    res.send('凯恩!');
    user.userInfo();
});

// app.post('/login', function(req, res, next) {
// 	console.log("login请求");
//   // 获取参数
//   var data = req.body;
//   console.log(data);
//   console.log("post请求：参数", data);

//   res.send('hello , world');
// });
app.post('/login',urlencodedParser,function(req,res){
	if(!req.body){
		res.sendStatus(400);
		return;
	}
	console.log("login请求");
	var data = req.body;
  	console.log(req.body);
  	user.userMan(data,res);// 如果数据库中没有该用户  则添加该用户 如果存在 则返回用户信息
});

app.listen(3000); 