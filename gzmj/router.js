var express = require('express');
var router = express.Router();
let Router = {
	router.post('/login', function(req, res, next) {

	  // 获取参数
	  var query = req.body;
	  console.log("post请求：参数", query);

	  res.send('hello , world');
	});
}
module.exports = Router;