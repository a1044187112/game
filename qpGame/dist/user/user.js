"use strict";

var _dbconnect = require("../dbManagement/dbconnect");

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbcon = new _dbconnect2.default();

var user = {
	accoundData: function accoundData(data, res) {
		if (data.status == "login") // 登录
			user.login(data, res);else if (data.status == "register") // 注册
			user.queryPhone(data, res);
	},

	login: function login(data, res) {
		var sql = { "phone": data.phone };
		dbcon.query(sql, function (result) {
			console.log(result);
			if (result.length != 0) {
				if (data.pwd == result[0].pwd) res.send({ "code": 100, "remark": "登录成功！", "data": result });else res.send({ "code": 1002, "remark": "密码错误！" });
			} else {
				res.send({ "code": 1001, "remark": "登录没有此账号，请注册！" });
			}
		});
	},

	queryPhone: function queryPhone(data, res) {
		// 注册之前先查询数据库该手机号已经被占用
		var sql = { "phone": data.phone };
		dbcon.query(sql, function (result) {
			console.log(result);
			if (result.length == 0) {
				// 数据中没有该手机号  可以注册
				user.resgister(data, res);
			} else {
				res.send({ "code": 1003, "remark": "该手机号已经被注册！" });
			}
		});
	},

	resgister: function resgister(data, res) {
		var pCode = this.PromotionCode();
		var insertSql = {
			'phone': data.phone, 'userName': "", 'pwd': data.pwd, 'money': 0, 'SuperiorOne': "", 'SuperiorTwo': "",
			'SuperiorThree': "", 'remark': "", 'bankCard': '', 'chrildenAccount': [], 'PromotionCode': pCode, 'HP': "01.png"
		};
		dbcon.insert(insertSql, function (result) {

			res.send({ "code": 101, "remark": "注册成功" });
		});
	},

	PromotionCode: function PromotionCode() {
		// 生成推广码  推广码两小时内有效
		var pCode = parseInt(Math.random() * 1000000 + 100000);
		return pCode;
	},

	modifyUserInfo: function modifyUserInfo(data, res) {
		var whereStr = { "phone": data.phone }; // 查询条件
		if (data.status == "modifyName") {
			// 修改用户名
			var updateStr = { $set: { "userName": data.userName } };
			dbcon.update(whereStr, updateStr, function (result) {
				res.send({ "code": 102, "remark": "用户名修改成功" });
			});
		} else if (data.status == "modifyPwd") {
			var updateStr = { $set: { "pwd": data.modifyPwd } };
			dbcon.update(whereStr, updateStr, function (result) {
				res.send({ "code": 103, "remark": "密码修改成功" });
			});
		}
	}

};

module.exports = user;