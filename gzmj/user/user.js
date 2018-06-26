let dbMan = require("../DB/DBmanagement.js");
let user = {
	// 玩家注册
	userInfo : function(res){  // 随机生成用户id  8位 
		let gameId = new Date().getTime(); //  游戏id
		let userName = user.name;
		let roomCard = 8; // 房卡
		let sql = "INSERT INTO gameuser(Id,GameID,User,RoomCard) VALUES(0,?,?,?)";// 插入数据
		let addSqlParams = [gameId,userName,roomCard];

		dbMan.dbInsert(sql,addSqlParams,user.resultPro,res);
	
	},

	userMan : function(data,res){ // 查询 如果有 返回用户数据 如果没有 注册并返回用户数据
		user.name = data.name;
		let sql = "SELECT * FROM gameuser WHERE User='"+data.name+"';"; // id查询

		dbMan.dbQuery(sql,user.resultPro,res);
	},

	resultPro : function(data,res){ //数据库请求结果返回
		if(data.length==0){   // 如果没有数据 则注册用户  注册成功后返回用户信息
		
			user.userInfo(res);
		
		}if(data.insertId!=null){ // 根据插入id 查询该条数据
		
			let sql = "SELECT * FROM gameuser WHERE Id='"+data.insertId+"';"; // id查询
			dbMan.dbQuery(sql,user.resultPro,res);
		
		}else{ // 返回查询结

			console.log(data);
			res.send({"state":"success","code":0,"data":data});
		
		}
	},

	


}
module.exports = user;