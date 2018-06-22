let licensing = require('./licensing');

// 模拟打牌
let game = {
	gameStart : function(){ // 开始游戏
		
		let players = ["提莫","艾瑞莉亚",'崔斯特','戴安娜'];
		let dealer = 0; // 当前获取牌的玩家
		let playersCard = game.gamePlayer(players);
		game.deleteCardArr = [[],[],[],[]];
		game.playerDraw(playersCard,dealer);// 玩家出牌
	},

	gamePlayer : function(players){ // 生成游戏玩家初始牌
		
		let  playersCard = []; // 玩家牌型数组

		playersCard  = licensing.initPlayerCard(players.length,playersCard); // 生成牌
		console.log(playersCard);
		return playersCard;
		
	},
 	
	playerDraw : function(playersCard,dealer){ // 玩家出牌
		let newCard = licensing.randomCard();  // 获取新发的牌 并给对应玩家 第一张牌给庄家
		if(!newCard){ // 牌已经发完  还没有玩家胡牌 黄牌-
			console.log("黄牌");
			return;
		}
		dealer = dealer%4;

		playersCard[dealer].push(newCard);  // 添加一张牌

		let deleteCard = playersCard[dealer].shift();  //要打出去一张牌  将打出去的牌存在数组中

		game.deleteCardArr[dealer].push(deleteCard); //记录每个玩家打出去的牌

		dealer++;
		game.playerDraw(playersCard,dealer); // 玩家出牌

	},
	


}
module.exports = game;