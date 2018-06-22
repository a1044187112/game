let dbMan = require("../DB/DBmanagement.js");
let user = {
	// 玩家注册
	userInfo : function(){  // 随机生成用户id  8位 
		let gameId = new Date().getTime(); //  游戏id
		console.log(gameId);
		let userName = "";
		let roomCard = 8; // 房卡
		let sql = "INSERT INTO gameuser(Id,GameID,user,RoomCard) VALUES(0,?,?,?)";// 插入数据
		let addSqlParams = [gameId,userName,roomCard];
		let result = dbMan.dbInsert(sql,addSqlParams);
		console.log(result);
	},

	// 玩家登陆
	userLogin : function(){
		let loginTime = new Date().getTime();  // 登陆时间
		let id  = 25354;
		let sql = "SELECT * FROM gameuser WHERE id='"+id+"';"; // 更加id查询
		let userInfo = dbMan.dbQuery(sql);

	},

}
module.exports = user;