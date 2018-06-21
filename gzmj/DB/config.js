var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  '3306',
    user     : 'root',
    password : '123456',
    database : 'mj',
});

module.exports = connection;

connection.connect(function(err){
    console.log(err);
    if (err) {
        console.log('链接失败');
    }else{
        console.log('链接成功');
    }
});

// connection.query("create table gameuser(Id int primary key auto_increment,User varchar(50) not null,RoomCard int)",function(error, results, fields){
//     if (error) {
//         console.log('创建失败');
//     }else{
//         console.log('创建成功');
//     }
// });

// connection.end();