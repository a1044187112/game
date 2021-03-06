export default class sanzhang{
	constructor(userArr){
		this.user = userArr;
		this.totalMoney; // 下注总金额
	}

	initCard() {
		let card = ["14","2","3","4","5",'6','7','8','9','10','11','12','13']; // 牌
		let cardColor = ["黑","红",'梅','方'];  // 花色 
		let cards = [];
		for(let i = 0 ; i < card.length ; i++){  // 52张牌的数组
			for(let j = 0 ; j < cardColor.length ; j++ ){
				cards.push([card[i],cardColor[j]]);
			}
		}
		return this.getUserCard(cards);
	}

	getUserCard(cards){
		let userCards = [];
		for(let i = 0 ; i < this.user.length ; i++){
			let userCard = [this.user[i]];
			for(let j = 0 ; j < 3 ; j++){

				let index = parseInt(Math.random()*cards.length);
				userCard.push(cards[index]); 
				cards.splice(index,1);
			}
			userCards.push(userCard);
		}
		return userCards;
	}

	cardsCompare(card1,card2){
		let c1 = [parseInt(card1[1][0]),parseInt(card1[2][0]),parseInt(card1[3][0])].sort(function(a,b) {
			return b - a;
		});
		let c1Color = [card1[1][1],card1[2][1],card1[3][1]];
		let c2 = [parseInt(card2[1][0]),parseInt(card2[2][0]),parseInt(card2[3][0])].sort(function(a,b) {
			return b - a;
		});
		let c2Color = [card1[1][1],card1[2][1],card1[3][1]];


		let weight1 = this.cardsType(c1,c1Color); // 牌型
		let weight2 = this.cardsType(c2,c2Color); // 牌型
		
		if(weight1>weight2)
			return card1;
		else if(weight1<weight2)
			return card2
		else{
			return "equal";
		}

	}

	cardsType(c,cColor){
		//将每一种牌看为一个16进制数 将其转换为10进制 比如最大的普通牌为AKJ，
		//其16进制数值为edc，转为10进制则AKJ牌值=14x16x16+13x16+11=3803
		// 将对子放在牌的前两位 最大普通牌大小的基础上，加上对子牌的本身大小 AAK牌值=14x16+13=237
		//顺子，取最小的那个数，加上最大的对子牌值，比如最大的顺子AKQ牌值=12+4040=4052。最小的顺子A32，A取1，值4041
		//对于同花，先按照普通牌型计算大小，再加上最大的对子牌值。 比如最大的同花AKJ牌值=3803+4052=7855
		//对于同花顺，取最小的那个数，加上最大的同花牌值
		//对于炸弹，取第一个数，加上最大的同花顺牌值。 比如AAA牌值=14+7867=7881


		let putong = 3803; //转为10进制则AKJ牌值=14x16x16+13x16+11=3803
		let duizi = 4040;  //则AAK牌值=14x16+13=237，加上最大的普通牌值3803，即为4040
		let shunzi = 4052; //取最小的那个数，加上最大的对子牌值，比如最大的顺子AKQ牌值=12+4040=4052。
		let tonghua = 7855; //普通牌型计算大小，再加上最大的对子牌值。比如最大的同花AKJ牌值=3803+4052=7855
		let tonghuashun = 7867; //取最小的那个数，加上最大的同花牌值，比如：AKQ牌值=12+7855=7867

		if( c[0] == c[2] ){ 
			return tonghuashun + c[0]; // 同花顺的牌值加上豹子值
		}else if(cColor[0] == cColor[1] && cColor[1] == cColor[2]){  // 清一色
			if(c[0] == c[1] - 1 && c[1] == c[2] - 1)  // 同花顺
				return tonghua + c[0];
			else if((c[0]==14 && c[1] == 2) && c[2] == 3)
				return tonghua + 1;
			else // 普通清一色
				return duizi + (c[0]*16*16+c[1]*16+c[2]);
		}else if(c[0] == c[1] - 1 && c[1] == c[2] - 1){ // 普通顺子
			return duizi + c[1];
		}else if( c[0] == c[1] ){ // 对子
			return putong + (c[0]*16 + c[2]);
		}else if(c[1] == c[2]){  // 对子
			return putong + (c[1]*16 + c[0]);
		}else{  // 普通牌型
			return c[0]*16*16 + c[1]*16 + c[2] ;
		}
	}

	// 玩家下注
	playerBet(playerId,money){
		
		this.totalMoney += money;//  下注总金额 
	}

	gameStart(){
		let userCards = this.initCard();
		console.log(userCards);
		let compareVal = this.cardsCompare(userCards[0],userCards[1]);  // 判断各个玩家的牌型大小
		console.log(compareVal);
	}


}
let game = new sanzhang(["提莫","刀妹",'瞎子','猴子']);
game.gameStart();