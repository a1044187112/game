const fs = require("fs");
const dbMan = require('../DB/DBmanagement');

// 思路： 创建房间后将房间号写入数据库表RoomInformation;   并创建文件 房间号.txt 并将该房间号添加到玩家的gameRoom字段中
// 玩家加入房间  即把房间号 添加到玩家的gameRoom字段中
// 退出房间  删除gameRoom字段值  解散房间 删除gameRoom字段值并将rooo.txt中的对应房间号删除
// 再次创建房间  查询rooo.txt中是否有该房间号 

let gameRoomMan =  {  // 创建房间号 随机生成6位数 ，如果有重复，则重新生成
	
	createRoom : function(socket,userID){
		
		let roomNumber = parseInt(Math.random()*900000+100000);	
		let sql =  "SELECT * FROM RoomInformation WHERE RoomID ='"+roomNumber+"';";

		dbMan.queryRoomID(sql,gameRoomMan.queryRoomIDResult,socket,userID,roomNumber);
	},


	joinRoom : function(socket,data){ // 加入房间
		console.log(data);
		var roomID = data.roomID;
		var userID = data.userID;
		let sql =  "SELECT * FROM RoomInformation WHERE RoomID = "+roomID+";";

		dbMan.queryRoomID(sql,gameRoomMan.joinRoomResult,socket,userID,roomID);
	},

	leaveRoom : function(socket,data){  
		socket.leave(data.roomID); // 离开房间
		socket.emit('leaveRoomExit', '退出房间成功');

		let sql =  "SELECT * FROM RoomInformation WHERE RoomID = "+data.roomID+";";
		dbMan.queryRoomID(sql,gameRoomMan.leaveRoomResult,socket,data.userID,data.roomID);
	},

	dissolutionRoom : function(socket,data){ // 解散房间 // 删除该条数据
		socket.leave(data.roomID); 
		socket.emit('leaveRoomExit', '退出房间成功');
		let sql =  "DELETE FROM RoomInformation WHERE RoomID = "+data.roomID+";";
		dbMan.queryRoomID(sql,gameRoomMan.dissolutionRoomResult,socket,data.userID,data.roomID);
	},

	// 查询 如果不存在  则创建并添加到数据库 如果存在 则重新生成房间号
	queryRoomIDResult : function(data,socket,userID,roomNumber){ 
		if(data.length==0){ // 表示不存在 则创建 

			let GameType = 0;
			let RoomInfo = {
				"type":"贵阳麻将",
				"jipai":"全鸡",
				"zimoleixin":"通三"
			};
			let GamePlayer = userID;
			let sql = "INSERT INTO RoomInformation(RoomID,UserID,Gametype,RoomInfo,GamePlayer) VALUES(?,?,?,?,?);";// 插入数据  插入数组时  需要把json先转换成字符串 不然添加时报错
			let addSqlParams = [roomNumber.toString(),userID,GameType,JSON.stringify(RoomInfo),GamePlayer];

			dbMan.createRoomInsert(sql,addSqlParams,gameRoomMan.queryRoomIDResult,socket);

		}else if(data.RoomID){    // 如果房间号存在  则重新生成房间号
			gameRoomMan.createRoom();
		}else{ // 创建成功  返回给玩家
			socket.join(roomNumber); // 将创建者加入房间
			socket.emit('hello', '成功创建房间');

		}
	},	

	joinRoomResult : function(data,socket,userID,roomNumber){ // 加入房间
		let GamePlayerArr = data[0].GamePlayer.split("-");
		if(GamePlayerArr.length == 4){//  房间人数已满
			socket.emit('joinRoom',"房间人数已满"); 
			return; 
		}

		let GamePlayer = data[0].GamePlayer +"-"+userID ; // 保存哟用户数据
		console.log(GamePlayer);
		if(data.length!=0){ // 说明房间号存在
			socket.join(roomNumber); // 加入房间
			socket.emit('joinRoom', '成功加入房间');

			let sql = "update RoomInformation set GamePlayer = ? WHERE RoomID = ?";// 插入数据  插入数组时  需要把json先转换成字符串 不然添加时报错
			var modSqlParams = [GamePlayer,data[0].RoomID];
			dbMan.updateRoomPlayer(sql,modSqlParams);

		}else{
			socket.emit('joinRoom',"房间号不存在");
		}
	},

	leaveRoomResult : function(data,socket,userID,roomNumber){ // 离开房间  将player中的userId删除
		let GamePlayerArr =  data[0].GamePlayer.split('-');
		let GamePlayer = "";
		for(let i = 0 ; i < GamePlayerArr.length ; i++ ){ // 去除退出房间的userId
			if(GamePlayerArr[i] != userID){
				GamePlayer += GamePlayerArr[i]
			}
		}

		let sql = "update RoomInformation set GamePlayer = ? WHERE RoomID = ?";// 插入数据  插入数组时  需要把json先转换成字符串 不然添加时报错
		var modSqlParams = [GamePlayer,data[0].RoomID];
		dbMan.updateRoomPlayer(sql,modSqlParams);
	},

	dissolutionRoomResult : function(data,socket,userID,roomNumber){
		console.log(data);
	}

}
module.exports = gameRoomMan;