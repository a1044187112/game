
let licensing  = {
	
	initPlayerCard : function (playerLength,arr){ // 生成开始游戏时玩家的牌
		if(!licensing.cardArr)
			licensing.cardArr = licensing.disorderArr();
		licensing.count = 0;
		let n = 0;
		for (let j = 0 ; j < playerLength ; j++){
			let playersCard = [];
			for(let i = 0 ; i < 13 ; i++){
				playersCard.push(licensing.cardArr[licensing.count]); // 按顺序拿抽走牌 
				licensing.count++;
			}
			arr.push(playersCard);
		}
		return arr;
		
	},

	returnCard : function(length){  // 随机生成一张牌
		let random = parseInt(Math.random()*length); // 生成随机数 
		return random;
	},

	randomCard : function(){   // 游戏中随机发出一张牌

		let newCard = licensing.cardArr[licensing.count]; // 按顺序拿抽走牌
		licensing.count++;
		if(licensing.count<=108)
			return newCard;
		else
			return false;
	},

	disorderArr : function(){ // 将牌型的有序数组打乱
		let oldCard = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,
		1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,
		1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,
		1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29];

		let newCard = [];
		let n = oldCard.length;
		for(let i = 0 ; i < n ; i++){
			let random = licensing.returnCard(oldCard.length);  // 生成随机数 在数组长度范围内
			
			newCard.push(oldCard[random]); // 将选出的数加到新数组

			oldCard[random] = oldCard[oldCard.length-1]; //将原数组中的最后一个赋值到原数组中选出的位置

			oldCard.length = oldCard.length - 1 ;// 数组长度减一
		}
		
		return newCard;

	},
}
module.exports = licensing;   