var mysql = require("mysql");
let connection = require("./config");

let dbMan = {
	dbQuery : function (sql) { // 查询数据
		connection.query(sql,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
	        }
	       return result; 
		}); 
	},

	dbInsert : function(sql,addSqlParams){ // 插入数据
		connection.query(sql,addSqlParams,function (err, result) {
	        if(err){
	         	console.log('[INSERT ERROR] - ',err.message);
	         	return;
	        }        
	       	return result;        
		});
	},
}
module.exports = dbMan;