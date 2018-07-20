"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var room = function () {
	function room(ids) {
		_classCallCheck(this, room);

		this.ids = ids;
	}

	_createClass(room, [{
		key: "getID",
		value: function getID() {
			var roomNum = 0;
			roomNum = parseInt(Math.random() * 900000 + 100000);
			if (this.ids.indexOf(roomNum) >= 0) return this.getID();else return roomNum;
		}
	}, {
		key: "removeID",
		value: function removeID(id) {
			delete this.ids[id];
		}
	}]);

	return room;
}();

exports.default = room;