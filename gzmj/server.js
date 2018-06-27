var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
let game = require('./game/game');
let user = require("./user/user");
let gameRoomMan = require('./game/gameRoomMan');


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


let  roomUser = [];
io.on('connection', function(socket){



  user = username; // 将用户归类到房间 
  
 

  //接收并处理客户端的hi事件
    socket.on('createRoom', function(data) { // 创建房间
        gameRoomMan.createRoom(socket,data);

        if (!roomUser[data.roomID]) {  // 当前房间号数组 记录了加入当前房间的玩家
		  	roomUser[data.roomID] = []; 
		  	roomUser[data.roomID+"info"] = [];  // 用户存储创建房间信息  游戏类型 几人局  
		} 
    });
 
    socket.on('joinRoom',function(data){ // 加入房间
    	roomUser[data.roomID].push(data.userID); // 玩家加入到房间号指定的数组

    	gameRoomMan.joinRoom(socket,data);

    	socket.emit('joinRoom', '加入房间测试');
    });

   socket.on("leaveRoom",function(data){ // 退出房间
   		gameRoomMan.leaveRoom(socket,data);
   		socket.emit('leaveRoomExit', '退出房间测试');
   });


   socket.on("DissolutionRoom",function(data){ // 离开房间
   		gameRoomMan.dissolutionRoom(socket,data);
   		socket.emit('leaveRoomExit', '退出房间测试');
   });

    socket.on("gameStart",function(){ // 开始游戏 点击开始游戏之后再将房间信息存入到数据库
   		game.gameStart(socket);
   		socket.emit('gameStartResult', '开始游戏测试');
   });
  // socket.on('disconnect', function(){

  //   console.log('user disconnected');
  
  // });

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

http.listen(3000); 