var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketio = require('./socket/socketio');
var bodyParser = require('body-parser');

let user = require("./user/user");
var log = require('./log/log');
log.use(app);

// game.gameStart();

app.all("*",function(req,res,next){  // 处理跨域问题
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    next();
});

var urlencodedParser = bodyParser.urlencoded({ extended: false }); 


app.get('/', function(req, res) {
    res.send('凯恩!');
});

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




let  roomUser = [];
socketio.initSocket(io,roomUser);

http.listen(3000); 