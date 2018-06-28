//  游戏设置
let dbMan = require("../DB/DBmanagement.js");


let set = {

	addAnno : function(data,socket) {// 添加公告
		let sql = "INSERT INTO announcement(name,content,Note) VALUES(?,?,?)";// 插入数据
		let addSqlParams = [data.title,data.info,data.note];
		dbMan.dbInsert(sql,addSqlParams,set.addAnnoResult,socket);
	},

	queryAnno : function(data,socket){ // 公告查询
		// let name = '这是一个新公告';
		let sql = "SELECT * FROM announcement WHERE name='"+data.title+"';"; // id查询
		dbMan.dbQuery(sql,set.queryAnnoResult,socket);
	},

	addAnnoResult : function(data,socket){ // 公告添加返回
		console.log(data);
		if(data.protocol41)
			socket.emit("annoReturn","true");
		else 
			socket.emit("annoReturn","false");
	},

	queryAnnoResult : function(data,socket){ // 公告查询返回
		console.log(data);
		if(data.length != 0)
			socket.emit("annoQueryReturn","true");
		else 
			socket.emit("annoQueryReturn","false");
	},
}
module.exports = set;