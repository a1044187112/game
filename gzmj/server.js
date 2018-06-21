var express = require('express');
var bodyParser = require('body-parser');
var router = require("router");
var app = express();
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
    res.send('凯恩!');
});


app.listen(3000);