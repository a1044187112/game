
let score = {
	mjType : function (mjType,allCard,fanjipai) {

		let count = 0;
		score.difen = 1; // 低分
		count += score.huTypeScore(mjType);//胡牌牌分
		count += score.jipaiScore(mjType,allCard,fanjipai);
		return count;
	},

	huTypeScore : function(mjType){
		let lianzhuang = 3; // 连庄次数
		let count = 0;
		switch(mjType.gameType){
			case 1: count = 2; break;
			case 2: (count += 2) += lianzhuang ; break;
			case 3: count = 3; break;
		}
		count += cardTypeScore(mjType.huType);
		return count;
	},

	cardTypeScore : function(type){ // 牌型分
		let count = 0;
		switch(type){
			case "普通牌型": count+=0; break;
			case "大对子": count += 5; break;
			case "清一色": count += 10; break;
			case "小七对": count += 10; break;
			case "清大对": count += 15; break;
			case "双清"：count+= 20;break; // 清大队 最后钓一张牌胡的 算双清
			case "清小七对": count += 20; break;
			case "龙七对": count += 20; break;
			case "清龙七对": count += 30; break;
			case "热炮": count += 1; break;
			case "抢杠": count += 9; break;
		}
		return count;
	},

	jipaiScore : function(mjType,allCard,fanjipai){
		let cardArray = [];
		cardArray = cardArray.concat(allCard.card).concat(allCard.pengpaiArr).concat(allCard.gangpai).concat(allCard.chupai);
		let count = 0;
		for(let i = 0; i < mjType.jipai , i++ ){
			switch(mjType.jipai[i]){
				case 1: count += score.typeOne(cardArray,fanjipai); break;
				case 2: count += score.typeTwo(cardArray,fanjipai); break;
				case 3: count += score.typeThree(cardArray,fanjipai); break;
				case 4: count += score.typeFour(cardArray,fanjipai);break;
				case 5: count += score.typeFive(fanjipai); break;
				case 6: if(fanjipai == 25) // 吹风鸡 鸡牌等于五筒（25） 
					count = 0;
				break;
			}
		}
		return count;
	},

	typeOne : function(cardArray,fanjipai){ // 翻牌鸡
		let count = 0;
		if((fanjipai+1)%10==0)//九转一
			fanjipai -=8 ;
		else
			fanjipai += 1;
		for(let i = 0; i < cardArray.length ; i++ ){
			if(cardArray[i] == fanjipai )
				count++;
		}
		return count ;
	},

	typeTwo : function(cardArray,fanjipai){ // 摇摆鸡
		let lastCard = 0;
		let nextCard = 0;
		let count = 0;
		if((fanjipai+1)%10==0)//九转一
			nextCard = fanjipai -8 ;
		else
			nextCard = fanjipai + 1;

		if((fanjipai-1)%10==0)//九转一
			lastCard = fanjipai +8 ;
		else
			lastCard = fanjipai - 1;

		for(let i = 0; i < cardArray.length ; i++ ){
			if(cardArray[i] == lastCard || cardArray[i]==nextCard)
				count++;
		}
		return count;
	},

	typeThree : function(cardArray,fanjipai){ // 本鸡
		let count = 0;
		for(let i = 0; i < cardArray.length ; i++ ){
			if(cardArray[i] == fanjipai )
				count++;
		}
		return count;
	},

	typeFour : function(cardArray,fanjipai){ // 乌骨鸡或者妖姬
		let yaoji = 11; // 妖姬
		let batong = 28; // 八筒
		let countYaoji = 0;
		let countBatong = 0;
		for(let i = 0; i < cardArray.length ; i++ ){
			if(cardArray[i] == yaoji )
				countYaoji++;
		}
		if(fanjipai==19)
			countYaoji *= 2;

		for(let i = 0; i < cardArray.length ; i++ ){
			if(cardArray[i] == yaoji )
				countBatong++;
		}
		if(fanjipai==27)
			countBatong *= 2;

		return countYaoji+countBatong;
	},
	
	typeFive : function(cardArray){  // 星期鸡
		let fanjipai = (new Date()).getUTCDay();
		let count = 0;
		if(fanjipai==0)
			fanjipai = 7;
		for(let i = 0; i < cardArray.length ; i++ ){
			if(cardArray[i] == yaoji )
				count++;
		}
		return count ;
	},


}
module.exports = score;