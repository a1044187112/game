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

	dbInsert : function(sql,addSqlParams,callback,res){ // 插入数据
		connection.query(sql,addSqlParams,function (err, result) {
	        if(err){
	        	callback(err,res);
	         	console.log('[INSERT ERROR] - ',err.message);
	         	return;
	        }        
	       	callback(result,res);        
		});
	},
}
module.exports = dbMan;