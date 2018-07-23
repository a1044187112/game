"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
1.普通获胜 赔率为1
2.牛七到牛九 赔率分别为2，3，4
3.牛牛 赔率为5
4.五花牛 赔率6
5.炸弹牛 赔率为7
6.五小牛 赔率为10
*/
var PT = 1; // 普通
var N7 = 2; // 牛七
var N8 = 3; // 牛八
var N9 = 4; // 牛九
var N10 = 5; // 牛牛
var NWH = 6; // 五花牛
var NZD = 7; // 炸弹牛
var NWX = 10; // 五小牛

var nn = function () {
	function nn(userArr, point) {
		_classCallCheck(this, nn);

		this.user = userArr;
		this.Bpoint = point; // 当前局比赛的底分
		this.colorArr = { "黑": 4, "红": 3, "梅": 2, '方': 1 };
		this.WXN = 25600; // 五小牛 
		this.ZDN = 20480; // 炸弹牛
		this.WHN = 15360; // 五花牛
		this.NN = 10240; // 牛牛
		this.PTN = 5120; // 普通牛
		this.WN = 0; // 没牛
	}

	_createClass(nn, [{
		key: "initCard",
		value: function initCard() {
			var card = ["1", "2", "3", "4", "5", '6', '7', '8', '9', '10', '11', '12', '13']; // 牌
			var cardColor = ["黑", "红", '梅', '方']; // 花色 
			var cards = [];
			for (var i = 0; i < card.length; i++) {
				// 52张牌的数组
				for (var j = 0; j < cardColor.length; j++) {
					cards.push([card[i], cardColor[j]]);
				}
			}
			// cards.push(["14","小王"]);
			// cards.push(["15","大王"]);
			return this.getUserCard(cards);
		}
	}, {
		key: "getUserCard",
		value: function getUserCard(cards) {
			var userCards = [];
			for (var i = 0; i < this.user.length; i++) {
				var userCard = [this.user[i]];
				for (var j = 0; j < 5; j++) {
					var index = parseInt(Math.random() * cards.length);
					userCard.push(cards[index]);
					cards.splice(index, 1);
				}
				userCards.push(userCard);
			}
			return userCards;
		}
		//无牛牌型比较：取其中最大的一张牌比较大小，牌大的赢，大小相同比花色。
		// 有牛牌型比较：比牛数；牛数相同庄吃闲。
		// 牛牛牌型比较：取其中最大的一张牌比较大小，牌大的赢，大小相同比花色。
		// 银牛牌型比较：取其中最大的一张牌比较大小，牌大的赢，大小相同比花色。
		// 金牛牌型比较：取其中最大的一张牌比较大小，牌大的赢，大小相同比花色。
		// 炸弹之间大小比较：取炸弹牌比较大小。
		// 五小牛牌型比较：庄吃闲。 每一张牌都小于5点，而且五张牌加起来总点数小于或者是等于10点
		//5小牛>炸弹>5花牛>牛牛>牛>散牌   
		//以权值计算  先比较牌型 如果牌型权值相同 再比较最大花色
		// 五小牛 100*16*16 炸弹牛  80*16*16 五花牛 60*16*16 牛牛 40*16*16 牛 20*16*16 散牌 0 

	}, {
		key: "cardsCompare",
		value: function cardsCompare(card1, card2) {
			//每次只需将庄家的牌与每一位闲家比较
			var _self = this;
			card1 = card1.sort(function (a, b) {
				if (b[0] == a[0]) {
					// 如果两个值相同 按黑 红 梅 方 排序
					return _self.colorArr[b[1]] - _self.colorArr[a[1]];
				} else return b[0] - a[0];
			});
			card2 = card2.sort(function (a, b) {
				return b[0] - a[0];
			});

			var weight1 = this.getWeight(card1);
			var weight2 = this.getWeight(card2);
			console.log('weight1:' + weight1);
			console.log('weight2:' + weight2);

			//五小牛（庄吃闲） 炸弹牛（比较炸弹大小） 五花牛（比较最大值大小） 牛牛（比较最大值大小） 
			//普通牛（比较最大值大小） 散牌（比较最大值大小）
			if (weight1 == this.WXN) {
				return [card1[0], weight1];
			} else if (weight1 > weight2) {
				return [card1[0], weight1];;
			} else {
				return [card2[0], weight2];
			}
		}
	}, {
		key: "getWeight",
		value: function getWeight(card) {
			var arr = [parseInt(card[1][0]), parseInt(card[2][0]), parseInt(card[3][0]), parseInt(card[4][0]), parseInt(card[5][0])];

			var weight = 0;
			var wuxiaoniu = this.wuxiaoniu(arr); // 五小牛
			var zhadan = this.zhadan(arr); // 炸弹牛
			var wuhuaniu = this.wuhuaniu(arr); // 五花牛
			var niuVal = this.isHaveNiu(arr); // 牛
			var maxVal = this.colorArr[card[1][1]]; // 花色值
			if (wuxiaoniu) {
				// 五小牛
				weight = this.WXN;
			} else if (zhadan != -1) {
				// 炸弹牛
				weight = this.ZDN + zhadan * 16;
			} else if (wuhuaniu != -1) {
				// 五花牛
				weight = this.WHN + wuhuaniu * 16 + maxVal;
			} else if (niuVal != -1) {
				if (niuVal == 0) {
					// 牛牛
					weight = this.NN + arr[0] * 16 + maxVal;
				} else if (niuVal > 0) {
					weight = this.PTN + niuVal * 16 * 16 + arr[0] * 16 + maxVal; // 牛值 + 最大值 + 颜色值
				}
			} else {
				// 无牛
				weight = arr[0] * 16 + maxVal;
			}
			return weight;
		}
	}, {
		key: "wuxiaoniu",
		value: function wuxiaoniu(arr) {
			var count = 0;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] < 5) {
					count += arr[i];
				} else {
					return false;
				}
			}
			if (count <= 10) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "zhadan",
		value: function zhadan(arr) {
			if (arr[0] == arr[1] && arr[1] == arr[2] && arr[1] == arr[3]) {
				return arr[1];
			} else if (arr[4] == arr[1] && arr[1] == arr[2] && arr[1] == arr[3]) {
				return arr[1];
			} else {
				return -1;
			}
		}
	}, {
		key: "wuhuaniu",
		value: function wuhuaniu(arr) {
			if (arr[0] > 10 && arr[1] > 10 && arr[2] > 10 && arr[3] > 10 && arr[0] > 10) {
				return arr[0];
			} else {
				return -1;
			}
		}
	}, {
		key: "isHaveNiu",
		value: function isHaveNiu(card) {
			// 先判断是否有牛
			var arr = [card[0], card[1], card[2], card[3], card[4]];
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] / 10 > 1) {
					arr[i] = 10;
				}
			}
			for (var _i = 0; _i < arr.length - 2; _i++) {
				for (var j = _i + 1; j < arr.length - 1; j++) {
					for (var k = j + 1; k < arr.length; k++) {
						if ((arr[_i] + arr[j] + arr[k]) % 10 == 0) {
							arr.splice(k, 1);
							arr.splice(j, 1);
							arr.splice(_i, 1);
							return (arr[0] + arr[1]) % 10;
						}
					}
				}
			}
			return -1;
		}
	}, {
		key: "colorCompare",
		value: function colorCompare(card1, card2) {
			// 先比较最大值 如果最大值相等 则比较花色
			if (parseInt(card1[1][0]) > parseInt(card1[2][0])) {
				return card1;
			} else if (parseInt(card1[1][0]) < parseInt(card1[2][0])) {
				return card2;
			} else {
				if (this.colorArr[card1[1][1]] > this.colorArr[card2[1][1]]) {
					return card1;
				} else {
					return card2;
				}
			}
		}
	}, {
		key: "payMoneyNum",
		value: function payMoneyNum(weight) {
			var money = 0;
			if (weight == this.WXN) {
				money = NWX * this.Bpoint;
			} else if (weight > this.ZDN) {
				money = NZD * this.Bpoint;
			} else if (weight > this.WHN) {
				money = NWH * this.Bpoint;
			} else if (weight > this.NN) {
				money = N10 * this.Bpoint;
			} else if (weight > this.PTN) {
				if (weight > 7380) {
					// 牛九
					money = N9 * this.Bpoint;
				} else if (weight > 7124) {
					// 牛8
					money = N8 * this.Bpoint;
				} else if (weight > 6868) {
					// 牛7
					money = N7 * this.Bpoint;
				} else {
					// 牛7以下
					money = PT * this.Bpoint;
				}
			} else if (weight > this.WN) {
				money = PT * this.Bpoint;
			}
			return money;
		}
	}, {
		key: "gameStart",
		value: function gameStart() {
			var userCards = this.initCard();
			// console.log(userCards);
			for (var i = 1; i < userCards.length; i++) {
				var card = this.cardsCompare(userCards[0], userCards[i]); //  userCards[0] 庄家
				console.log(card);
				var payMoney = this.payMoneyNum(card[1]); // 计算赔付金额
				console.log(payMoney);
			}
		}
	}]);

	return nn;
}();

exports.default = nn;

var game = new nn(["提莫", "刀妹", '瞎子', '猴子'], 5);
game.gameStart();