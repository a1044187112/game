let game = require('../game/game');
let gameRoomMan = require('../game/gameRoomMan');
let set = require('../setting/set');

let socketio = {
	initSocket : function(io,roomUser){
	
		io.on('connection', function(socket){

			socket.on('addAnno',function(data){ // 添加公告
				// process.send("告诉主线程，我要添加公告");
				set.addAnno(data,socket);
				console.log("添加公告");
				
			});
			socket.on('queryAnno',function(data){ // 查询公告
				set.queryAnno(data,socket);
			});


		  //接收并处理客户端的事件
		    socket.on('createRoom', function(data) { // 创建房间 返回房间号
		        let roomID = gameRoomMan.createRoom(roomUser);
		        if (!roomUser[roomID]) {  // 当前房间号数组 记录了加入当前房间的玩家
		    		  	roomUser[roomID] = []; 
		    		  	roomUser[roomID+"info"] = [];  // 用户存储创建房间信息  游戏类型 几人局  
		    		} 
		    });
		 
		    socket.on('joinRoom',function(data){ // 加入房间
		    	roomUser[data.roomID].push(data.userID); // 玩家加入到房间号指定的数组
		    	roomUser[data.roomID+"socketid"].push(socket.id);
		    	// gameRoomMan.joinRoom(socket,data);

		    	socket.emit('joinRoom', '加入房间测试');
		    });

		   socket.on("leaveRoom",function(data){ // 退出房间
		   		// gameRoomMan.leaveRoom(socket,data);
		   		socket.emit('leaveRoomExit', '退出房间测试');
		   });


		   socket.on("DissolutionRoom",function(data){ // 解散房间房间
		   		// gameRoomMan.dissolutionRoom(socket,data);
		   		socket.emit('leaveRoomExit', '退出房间测试');
		   });

		    socket.on("gameStart",function(data){ // 开始游戏 传入玩家数组
		   		game.gameStart(roomUser[data.roomID],roomUser[data.roomID+"socketid"],socket,io);
		   		socket.emit('gameStartResult', '开始游戏测试');
		   });

		    socket.on("chupai",function(data){ // 出牌
		    	game.chupai(data,socket,io);
		    });

		    socket.on("peng",function(data){ // 碰牌
		    	game.peng(data,socket,io);
		    });

		    socket.on("gang",function(data){ // 杠牌
		    	game.gang(data,socket,io);
		    });

		    socket.on("hu",function(data){ // 胡牌
		    	game.hu(data,socket,io);
		    });

		    socket.on("过",function(data){ // 过
		    	game.guo(data,socket,io);
		    });

		    socket.on("message",function(){
		    	console.log("你促发了message事件！");
		    })
		  // socket.on('disconnect', function(){

		  //   console.log('user disconnected');
		  
		  // });

		});
	},
};

module.exports = socketio;