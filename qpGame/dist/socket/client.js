"use strict";

var _socket = require("socket.io-client");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var repl = require('repl');
var msg = function msg() {
	console.log("你输入了m");
};

// repl.start('> ').context.m = msg;
// const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter });

// function myEval(cmd, context, filename, callback) {
// 	console.log(cmd);
//   callback(null, cmd);
// }

// function myWriter(output) {
//   return output.toUpperCase();
// }
repl.start({ prompt: "...", eval: function _eval(cmd) {
		cmd = cmd.substring(0, cmd.length - 1);
		console.log("你輸入了：" + cmd);
		switch (cmd) {
			case 'join':
				console.log("執行");join();break;
			case "ready":
				ready();break;
			case "banker":
				banker();break;
			case "multiple":
				multiple();break;
			case "exit":
				exit();break;
		}
	} });

// io("http://127.0.0.1:3000",true);
var socket = (0, _socket2.default)("http://127.0.0.1:3000");
var data = "15285469856";
function join() {
	socket.emit('join', data); // 加入房间
	console.log(555);
}

socket.on('isJoin', function (data) {// 服务器返回加入成功

});

function ready() {
	socket.emit('ready', "准备"); // 准备
}

socket.on("getCardThree", function (data) {
	// 获取前三张牌
	console.log(data);
});

function banker() {
	socket.emit('banker', data); // 抢庄
}

socket.on('isBanker', function (data) {// 返回庄家id

});
//  
function multiple() {
	socket.emit('magnification', data); // 倍数选择
}
socket.on("isMagnification", function (data) {// 倍数选择成功

});

socket.on("getCardTwo", function (data) {// 获取后两张牌

});

function exit() {
	socket.emit('exit', data); // 退出房间
}