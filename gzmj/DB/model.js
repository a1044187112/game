//导入JS
var db = require("./config");

db.connect();

db.query("create table gameuser(Id int primary key auto_increment,User varchar(50) not null,RoomCard int)");