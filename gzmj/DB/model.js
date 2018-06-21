//导入JS
var db = require("./config");

// 打开连接
db.connect(function(err){
    if (err) {
        console.log('链接失败');
    }else{
        console.log('链接成功');
    }
});

// 执行sql语句 query(sql语句，返回的数据)
function CreateTable(sql){
    db.query(sql,function(error){
        console.log(error);
        if (error) {
            console.log('创建失败');
        }else{
            console.log('创建成功');
        }
    });
}

// 用户表（ID,游戏ID,用户名，房卡，创建时间，登录时间）
var gameuser =  'create table gameuser(' +
                'Id int primary key,'+
                'GameID int not null,'+
                'User varchar(50) not null,'+
                'RoomCard int not null,'+
                'CreateTime TIMESTAMP not null,'+
                'LoginTime TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP'+
            ')';

CreateTable(gameuser);

// 公告表（ID，公告名称，公告内容，备注，创建时间）
var announcement = 'create table announcement(' +
                   'id int primary key auto_increment,'+
                   'name varchar(50) not null,'+
                   'content text not null,'+
                   'Note text,'+
                   'Time TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP'+
                ')';

CreateTable(announcement);

// 关闭连接
db.end();