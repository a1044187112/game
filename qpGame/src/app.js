'use strict';

let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false }); 
let log = require('./log/log');
let io = require('socket.io').listen(http);
let user = require('./user/user');


// dbcon.insert();
log.use(app); 



app.all("*",function(req,res,next){  // 处理跨域问题
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 , "application/json;charset=utf-8");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    next();
});

app.get('/', function(req, res) {
    console.log('tes');
    res.send('凯恩!');
});

app.post('/login',urlencodedParser,function(req,res){
  if(!req.body){
    res.sendStatus(400); 
    return;
  }
  var data = req.body;
    user.accoundData(data,res);// 如果数据库中没有该用户  则添加该用户 如果存在 则返回用户信息
}); 

app.post('/modify/info',urlencodedParser,function(req,res){
  if(!req.body){
    res.sendStatus(400); 
    return;
  }
  var data = req.body;
  user.modifyUserInfo(data,res);// 如果数据库中没有该用户  则添加该用户 如果存在 则返回用户信息
}); 

io.sockets.on('connection',function(socket){
    console.log('User connected');
    socket.join("123456",() => {
      let rooms = socket.rooms;
      console.log(rooms);
    });
    // socket.on('disconnect',function(){
    //     console.log('User disconnected');
    // }); 
});



http.listen(3000); 
