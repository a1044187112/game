'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NNIO = function () {
		function NNIO(io) {
				_classCallCheck(this, NNIO);

				this.io = io;
				//this.router();
		}

		_createClass(NNIO, [{
				key: 'router',
				value: function router() {
						console.log("socket连接测试");
						this.io.sockets.on('connection', function (socket) {
								console.log('User connected');

								socket.on('join', function (data) {
										console.log("点击加入房间");
								});

								socket.on('ready', function (data) {
										console.log("点击准备");
								});

								socket.emit('getCardThree', ""); // 发送前三张牌

								socket.on('banker', function (data) {
										console.log("点击抢庄");
								});

								socket.on('magnification', function (data) {
										console.log("点击倍数选择");
								});

								socket.emit('getCardTwo', ""); // 发送前两张牌

								// socket.join("123456",() => {
								//   let rooms = socket.rooms;
								//   console.log(rooms);  
								// });


								socket.on('exit', function (data) {
										socket.on('disconnect', function () {
												console.log('User disconnected');
										});
								});
						});
				}
		}]);

		return NNIO;
}();

exports.default = NNIO;