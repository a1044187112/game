let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

export default  class dbcon {
	constructor(){
		this.db = null;
		this.connect();
	}

	connect(){
		var _self = this;
		MongoClient.connect(url,{useNewUrlParser:true}, function(err,client) {
			if(err)
				throw err;
			console.log("连接成功！");
		    //执行插入数据操作，调用自定义方法
		  	var db = client.db('qpGame');
		  	_self.db = db;
		});

	}

	insert(data,callback){ // 插入数据
	    this.db.collection("user").insertOne(data, function(err, res) {
	        if (err) throw err;
	        callback(res);
	    });
	}

	query(whereStr,callback){ // 查询
   		this.db.collection("user").find(whereStr).toArray(function(err, result) { // 返回集合中所有数据
	        if (err) throw err;
	        callback(result);
    	});
	}

	update(whereStr,updateStr,callback){
	    this.db.collection("user").updateMany(whereStr, updateStr, function(err, res) {
	        if (err) throw err;
	        callback(res);
	        console.log(res.result.nModified + " 条文档被更新");
	    });
	}

	delete(){
		 var dbo = this.db.db("qpGame");
	    var whereStr = {"name":'菜鸟教程'};  // 查询条件
	    dbo.collection("user").deleteOne(whereStr, function(err, obj) {
	        if (err) throw err;
	        console.log("文档删除成功");
	        db.close();
	    });
	}

	
}



//引入mongodb模块，获得客户端对象
// var MongoClient = require('mongodb').MongoClient;
// //连接字符串
// var DB_CONN_STR = 'mongodb://localhost:27017/qpGame';    
 
//定义函数表达式，用于操作数据库并返回结果
// var insertData = function(db, callback) {  
//     //获得指定的集合 
//     // var collection = db.collection('user');
//     //插入数据
//     var data = {_id:9,"name":'rose',"age":21};
//     // db.collection('user').insertOne(data, function(err, result) { // 加入
//     	db.collection("user").find().toArray(function(err, result) { // 查询
//         //如果存在错误
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         } 
//         //调用传入的回调方法，将操作结果返回
//         callback(result);
//     });
// };
 
// //使用客户端连接数据，并指定完成时的回调方法
// MongoClient.connect(DB_CONN_STR, function(err, client) {
//     console.log("连接成功！");
//     //执行插入数据操作，调用自定义方法
//     var db = client.db('mongoTest');
//     insertData(db, function(result) {
//         //显示结果
//         console.log(result);
//         //关闭数据库
//         client.close();
//     });
// });