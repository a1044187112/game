var mysql = require("mysql");
let connection = require("./config");

let dbMan = {
	dbQuery : function (sql,callback,res) { // 查询数据
		connection.query(sql,function (err, result) {
	        if(err){
	          callback(err,res);
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
	        }
	        callback(result,res);
		}); 
	},

	dbInsert : function(sql,addSqlParams,callback,res){ // 登陆插入数据
		connection.query(sql,addSqlParams,function (err, result) {
	        if(err){
	        	callback(err,res);
	         	console.log('[INSERT ERROR] - ',err.message);
	         	return;
	        }        
	       	callback(result,res);        
		});
	},

	queryRoomID : function(sql,callback,socket,userID,roomNumber){//  房间号查询
		connection.query(sql,function (err, result) {
	        if(err){
	          callback(err,socket,userID,roomNumber);
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
	        }
	        callback(result,socket,userID,roomNumber);
		}); 
	},

	createRoomInsert : function(sql,addSqlParams,callback,socket){ // 创建房间
		connection.query(sql,addSqlParams,function (err, result) {
	        if(err){
	        	callback(err,socket);
	         	console.log('[INSERT ERROR] - ',err.message);
	         	return;
	        }        
	       	callback(result,socket);        
		});
	},

}
module.exports = dbMan;