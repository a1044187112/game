let licensing = require('./licensing');

// 模拟打牌
let game = {
	gameStart : function(){ // 开始游戏
		
		let players = ["提莫","艾瑞莉亚",'崔斯特','戴安娜'];
	
		let dealer = 0; // 当前获取牌的玩家 庄家下标


		let playersCard = game.gamePlayer(players);

		game.deleteCardArr = [[],[],[],[]]; //记录每个玩家打出去的牌

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
		console.log(players[dealer]+"出牌");


		game.deleteCardArr[dealer].push(deleteCard); //记录每个玩家打出去的牌

		console.log(players[dealer]+":打的牌"+deleteCard);
		console.log("                ");
		
		dealer++; 
		game.playerDraw(playersCard,dealer,players); // 玩家出牌

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
		if(game.isqys(playersCard[dealer])){  // 清一色
			if(game.isxqd(playersCard[dealer],newCard)){// // 2 表示龙七对  1  表示小七对  0 表示没有虎牌
				return true;
			}else if(game.isddz(playersCard[dealer])){  // 是否大对子
				return true;
			}
		}else{ // 不是清一色

		}




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

	isqys : function(arr){ // 清一色
		if(arr[arr.length-1]<10){
			return true;
		}else if(arr[0]>10 && arr[arr.length-1]<20){
			return true;
		}else if(arr[0]>20){
			return true;
		}else {
			return false;
		}
	},

	isxqd : function(arr,newCard){ // 是否时小七对
		let count = 0 ;
		let lqdCount = 0 ;
		for(let i =0 ;i < arr.length ; i++){
			if(i%2==0 && arr[i]==arr[i+1]){ // 判断有几对
				count ++;
			}
			if(arr[i]==newCard){ // 判断是否有四个相同的牌 且和最新一张摸的牌相同  龙七对
				lqdCount ++ ;
			}

		}
		if(count==7&&lqdCount==4)  // 2 表示龙七对  1  表示小七对  0 表示错误
			return 2;
		else if(count==7)
			return 1;
		else 
			return 0;
	},

	isddz : function(arr){ // 判断是否大长对子
		let flag = false;
		let newArr = arr;
		for(let i = 0 ; i < newArr.length-1 ; i++){
			// 先删除对子
			if(newArr[i]==newArr[i+1]){ // 先去除对子
				newArr.splice(i,2);
				if(game.isddz1(newArr)){
					flag = true;
					return flag;
				}
			}
		}
		return flag;
	},

	isddz1 : function(arr){ 
		for(let i = 0 ; i < arr.length ; i++){
			if(arr[i]==arr[i+1]&&arr[i]==arr[i+2]){   // 如果有三个一组，则删除相邻三个
				arr.splice(i,3);
				if(arr.length==0){
					return  true;
				}else {
					return game.isddz1(arr);
				}
			}else {
				return false;
			}
		}
	},

}
module.exports = game;