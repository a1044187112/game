// 调用 node mysql 模块
var mysql = require("mysql");

// 连接mysql参数设置
var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  '3306',
    user     : 'root',
    password : '123456',
    database : 'mj',
});

// 导出模块
module.exports = connection;

