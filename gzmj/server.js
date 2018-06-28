var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketio = require('./socket/socketio');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
let user = require("./user/user");
var log = require('./log/log');
var cluster = require("cluster");
var numCPUs = require("os").cpus().length;
log.use(app);
let  roomUser = [];
// if(cluster.isMaster){
//     for (var i = 0; i < numCPUs; i++) {
//          var worker_process = cluster.fork();
//     }
//     cluster.on("exit", function(worker, code, signal) {
//         cluster.fork();
//     });

//     //侦听子进程的message事件 
//     worker_process.on('message', function(msg) { 
//       console.log("子进程发送的消息"+msg);
//       // if (msg.cmd && msg.cmd == 'notifyRequest') { 
//       //   // data++; 
//       //   console.log('DATA VALUE : %d ', data);
//       // } 
//     });

   
// }else{
    app.all("*",function(req,res,next){  // 处理跨域问题
    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
        next();
  });

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

   socketio.initSocket(io,roomUser);


  http.listen(3000); 
// }
