import dbconnect from '../dbManagement/dbconnect';
let dbcon = new dbconnect();


var user = {   
	accoundData : function(data,res){
		if(data.status == "login") // 登录
			user.login(data,res);
		else if(data.status == "register") // 注册
			user.queryPhone(data,res);
	},

	login : function(data,res){
		let sql = {"phone":data.phone};
		dbcon.query(sql,function(result){
			console.log(result);
			if(result.length != 0 ){
				if(data.pwd == result[0].pwd)
					res.send({"code":100,"remark":"登录成功！","data":result});
				else
					res.send({"code":1002,"remark":"密码错误！"});
			}else{
				res.send({"code":1001,"remark":"登录没有此账号，请注册！"});
			}
		});
	},

	queryPhone : function(data,res){ // 注册之前先查询数据库该手机号已经被占用
		let sql = {"phone":data.phone};
		dbcon.query(sql,function(result){
			console.log(result);
			if(result.length == 0 ){ // 数据中没有该手机号  可以注册
				user.resgister(data,res);
			}else{
				res.send({"code":1003,"remark":"该手机号已经被注册！"});
			}
		});

	},


	resgister : function(data,res){
		let pCode = this.PromotionCode();
		let insertSql = {
			'phone':data.phone,'userName':"",'pwd':data.pwd,'money':0,'SuperiorOne':"",'SuperiorTwo':"",
			'SuperiorThree':"",'remark':"",'bankCard':'','chrildenAccount':[], 'PromotionCode':pCode,'HP':"01.png"
		};
		dbcon.insert(insertSql,function(result){
			
			res.send({"code":101,"remark":"注册成功"});
		});
	},


	PromotionCode : function(){ // 生成推广码  推广码两小时内有效
		let pCode = parseInt(Math.random()*1000000+100000);
		return pCode;
	},

	modifyUserInfo : function(data,res){
		var whereStr = {"phone":data.phone};  // 查询条件
		if(data.status == "modifyName"){  // 修改用户名
			var updateStr = {$set: { "userName" : data.userName }};
			dbcon.update(whereStr,updateStr,function(result){
				res.send({"code":102,"remark":"用户名修改成功"});
			});
		}else if(data.status == "modifyPwd"){
			var updateStr = {$set: { "pwd" : data.modifyPwd }};
			dbcon.update(whereStr,updateStr,function(result){
				res.send({"code":103,"remark":"密码修改成功"});
			});
		}else if(data.status == 'bankCard'){
			var updateStr = {$set: { "bankCard":data.bankCard,"name":data.name,"bank":data.bank }};
			dbcon.update(whereStr,updateStr,function(result){
				res.send({"code":104,"remark":"添加银行卡成功"});
			});
		}
	},

};

module.exports = user;