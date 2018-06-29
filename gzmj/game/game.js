let licensing = require('./licensing');

// 模拟打牌
let game = {
	gameStart : function(arr,socketArr,socket,io){ // 开始游戏
		
		let players = ["提莫","艾瑞莉亚",'崔斯特','戴安娜'];
	
		game.dealer = 0; // 当前获取牌的玩家 庄家下标

		game.gamePlayer(players);

		io.in('game').emit('initCard', game.playersCard); // 初始化玩家手牌

		game.playerDraw(players,socketArr,socket,io);// 玩家出牌
	},

	gamePlayer : function(players){ // 生成游戏玩家初始牌

		let CardArr  = licensing.initPlayerCard(players.length); // 生成牌

		for (let i = 0; i < CardArr.length; i++) { // 对玩家手中的牌排序  从小到大
			CardArr[i].sort(function(a,b){  
				return a-b; 
			});
		}

		CardArr.forEach(function(item,index){  // 记录玩家手里牌 玩家id  碰的牌 杠的牌 打出去的牌
			let data = {"userID":players[index],"card":item,"pengpaiArr":[],"kangpai":[],"chupai":[]};
			game.playersCard.push(data);
		});

		console.log(game.playersCard);
		
	},
 	
	playerDraw : function(players,socketArr,socket,io){ // 玩家出牌
		let newCard = licensing.randomCard();  // 获取新发的牌 并给对应玩家 第一张牌给庄家
		if(!newCard){ // 牌已经发完  还没有玩家胡牌 黄牌 
			console.log("黄牌");
			return;
		}
		game.dealer = game.dealer%4;

		if(socket.id = socketArr[game.dealer]){ //发送给指定的socket用户
			socket.emit("fapai",{"newCard":newCard});
		}

		game.playersCard[game.dealer].card.push(newCard);  // 添加一张牌

		

	},

	chupai : function(data,socket,io){ // 发送给在当前房间下的玩家 除了自己
		game.playersCard[game.dealer].chupai.push(data.card); // 将当前玩家打出去的牌加入到数组中
		socket.to(data.roomID).emit("chupai",{"userID":data.userID,"card":data.card});
		// 此时判断是否有玩家要碰，扛或者胡  如果没有 则发牌给下一个玩家  如果有 则等待回应
	},

	peng : function(data,socket,io){
		io.in('game').emit('pengpai', {"userID":data.userID,"peng":true}); //发送碰牌消息
	},

	gang : function(data,socket,io){
		io.in('game').emit('kangpai', {"userID":data.userID,"gang":true}); // 发送杠牌消息
	},

	guo : function(data,socket,io){ // 过  获取一张新发 发送给下一个玩家
		let newCard = licensing.randomCard();  // 获取新发的牌 并给对应玩家 
	},

	hu : function(data,socket,io){
		io.in('game').emit('hupai', {"userID":data.userID,"hu":true}); // 发送胡牌消息
	},
	

}
module.exports = game;