let licensing = require('./licensing');

// 模拟打牌
let game = {
	gameStart : function(){ // 开始游戏
		
		let players = ["提莫","艾瑞莉亚",'崔斯特','戴安娜'];
		let dealer = 0; // 当前获取牌的玩家
		let playersCard = game.gamePlayer(players);
		game.deleteCardArr = [[],[],[],[]];
		game.playerDraw(playersCard,dealer,players);// 玩家出牌
	},

	gamePlayer : function(players){ // 生成游戏玩家初始牌
		
		let  playersCard = []; // 玩家牌型数组

		playersCard  = licensing.initPlayerCard(players.length,playersCard); // 生成牌
		
		for (let i = 0; i < playersCard.length; i++) { // 对玩家手中的牌排序  从小到大
			playersCard[i].sort(function(a,b){  
				return a-b; 
			});
		}
		console.log(playersCard);
		return playersCard; 
		
	},
 	
	playerDraw : function(playersCard,dealer,players){ // 玩家出牌
		let newCard = licensing.randomCard();  // 获取新发的牌 并给对应玩家 第一张牌给庄家
		if(!newCard){ // 牌已经发完  还没有玩家胡牌 黄牌 
			console.log("黄牌");
			return;
		}
		dealer = dealer%4;

		playersCard[dealer].push(newCard);  // 添加一张牌

		game.ishu(playersCard,newCard,dealer);// 是否胡牌

		let deleteCard = playersCard[dealer].shift();  //要打出去一张牌  将打出去的牌存在数组中

		//判断是否有玩家要碰 扛 胡
		game.ispeng(playersCard,deleteCard,dealer);

		game.deleteCardArr[dealer].push(deleteCard); //记录每个玩家打出去的牌

		dealer++;
		game.playerDraw(playersCard,dealer); // 玩家出牌

	},

	ispeng : function(playersCard,deleteCard,dealer){ // 判断是否有玩家要碰 扛 
		for(let i = 0 ; i < playersCard.length ; i++){
			if(i != dealer){ 
				let count = 0 ;
				for(let j = 0 ; j < playersCard[i].length ; j++){
					if(playersCard[i] == deleteCard)
						count++;
				}
				if(count==2)
					console.log("peng");
				if(count==3)
					console.log("peng--gang");
			}
		}
	},

	ishu : function(playersCard,newCard,dealer){ //  是否胡牌
		let flag = false;
		for(let i = 0 ; i < playersCard[dealer]-1 ; i++){
			if(playersCard[dealer][i] == playersCard[dealer][i+1]){
				let newArr = playersCard[dealer];
				newArr.splice(i,2) //  删除对子
				if(game.isAGroup(newArr)){
					flag =  true;
					return;
				}
			}
		}
		return flag;
	},

	isAGroup : function(newArr){ // 判断是否时一组
		if(newArr.length == 0){
			return true;
		}else{
			let card = newArr[0];
			if(newArr[1] == card && newArr[2] == card){
				newArr.splice(i,3) //  删除一组
				game.isAGroup(newArr)
			}else if(newArr.indexOf(card+1)&&newArr.indexOf(card+2)){
				newArr.splice(i,1) //  删除元素
				newArr.splice(newArr.indexOf(card+1),1) //  删除元素
				newArr.splice(newArr.indexOf(card+2),1) //  删除元素
				game.isAGroup(newArr)
			}else{
				return false;
			}
		}
	},

}
module.exports = game;