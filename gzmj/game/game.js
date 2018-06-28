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

		// game.ishu(playersCard,newCard,dealer);// 是否胡牌


		//let deleteCard = playersCard[dealer].shift();  //要打出去一张牌  将打出去的牌存在数组中



		//判断是否有玩家要碰 扛 胡
		// game.ispeng(playersCard,deleteCard,dealer);
		// console.log(players[dealer]+"出牌");


		// game.deleteCardArr[dealer].push(deleteCard); //记录每个玩家打出去的牌

		// console.log(players[dealer]+":打的牌"+deleteCard);
		// console.log("                ");
		
		// dealer++; 
		// game.playerDraw(playersCard,dealer,players); // 玩家出牌  如果有 则等待回应

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