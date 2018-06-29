let mj  = {
	start : function() {
		let newCard = 1;
		let cardType = 0;  // 判断这newCard 0表示自己摸的牌 1表示别人打的牌 
		let card = [1,2,3,4,5,6,7,8,9,1,2,3,4];
		console.log(card);
		let pengpaiArr = [];
		let = [];
		let chupai = [];
		card.push(newCard)
		card.sort(function(a,b){
			return a-b;
		});
		mj.tingCard(card);  // 判断是否听牌
		// mj.pengOrGang(newCard,card,pengpaiArr,cardType);  // 判断麻将碰 或者 杠
		// mj.qys(card,pengpaiArr,gangpai,newCard); // 判断是否清一色
		// mj.xqd(card,newCard); // 判断是否小七对
		// mj.lqd(card,newCard); // 判断是否是龙七对
		// mj.ddz(card,newCard);//  判断是否大对子
		// mj.hu(card,newCard); // 判断是否胡牌
		// if(mj.hu(card,newCard)){
		// 	console.log("hupai");
		// }
	},

	//分不同的听牌类型 操作的数组事经过排序后的数组  1.钓一张牌的情况  
	tingCard : function(card){ // 听牌判断
		let mjAllCard = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29];

		let newMjAllCard = mjAllCard.splice(card[0]-1,card[card.length-1]+1); // 缩小判断范围  

		console.log(newMjAllCard);
		console.time("Array insertion time");
		console.log("tingCard");
		let count = 0;
		while(count<1000000){ // 截取数组 将范围缩小
			for (var i = 0; i < newMjAllCard.length; i++) { 
				if(mj.hu(card,newMjAllCard[i])){ // 如果有一个数满足条件
					// console.log("胡牌:"+newMjAllCard[i]);
					break;
				}
			}
			count++;
		}
		console.timeEnd("Array insertion time");
	},
 
	pengOrGang : function(newCard,card,pengpaiArr,cardType){ // 判断麻将碰 或者 杠
		let count = 0;
		if(cardType==0){ // 自己摸的牌
			newCard.forEach(function(item,index){ // 判断是否有三张相同的newCard 
				if(item = newCard)
					count++;
			});
			if(pengpaiArr.indexOf(newCard)<0){
				return "gang";
			}
			if(count == 3)
				return "gang";
		}else if(cardType == 1){ // 别人打的牌
			newCard.forEach(function(item,index){ // 判断是否有两张或者三张相同的newCard 
				if(item = newCard)
					count++;
			});
			if(count == 2)
				return "peng";
			else
				return "gang";

		}

	},

	qys : function(card,pengpaiArr,gangpai,newCard){  //麻将数组中的数值分别除以10，结果全为一样的 为清一色。
		let count = card[0]/10;
		card.push(newCard);
		card = card.concat(pengpaiArr,gangpai,); // 合并数组
		card.forEach(function(item,index){   
			if(item/10!=count){
				return false;
			}
		});
		return true;
	},

	xqd : function(card,newCard){
		card.push(newCard);
		let count = 0;
		card.forEach(function(item,index){ 
			if(index%2==0&&card[index]==card[index+1]){
				count ++ ;
			}
		});
		if(count == 7)
			return true;
		else
			return false;
	},

	lqd : function(card,newCard){
		card.push(newCard);
		if(mj.xqd(card,newCard)){
			let count = 0;
			card.forEach(function(item,index){ 
				if(item == newCard){
					count ++ ;
				}
			});
			if(count == 4)
				return true;
			else 
				return false;
		}else{
			return false;
		}
	},

	ddz : function(card,newCard){
		card.push(newCard);
		card.forEach(function(item,index){ // 先找出对子
			if(index<card.length-2){
				if(card[index]==card[index+1]&&card[index]==card[index+2]){ // 把三个连续相同的删除  最后留下两张牌
					card.splice(index,3);
				}
			}
		});
		if(card.length==2&&card[0]==card[1]){
			return true;
		}else
			return false;
	},

	hu : function(card){ 
		let arr = [];
		arr = arr.concat(card);
		for(let i = 0;i<arr.length-1;i++){ // 先找出对子
			if(arr[i]==arr[i+1]){
				arr.splice(i,2);
				if(mj.hu_shunzi(arr)){ // 找出顺着或者克子 
					return true;
				}
			}
		}
		return false;
	},

	hu_shunzi : function(arr){// 找出顺着或者克子  并删除
		if(arr.length>0){
			if(arr[0]==arr[1]&&arr[0]==arr[2]){ // 克子
				arr.splice(0,3);
				return mj.hu_shunzi(arr);  
			}else if( arr.indexOf(arr[0]+1)>0 && arr.indexOf(arr[0]+2)>0 ){ // 顺子
				let cardVal = arr[0];  //操作数组后 card[0]的值会改变 先记录card[0]
				arr.splice(0,1); // 删除组成顺子的一组牌
				arr.splice(arr.indexOf(cardVal+1),1);
				arr.splice(arr.indexOf(cardVal+2),1);
				return mj.hu_shunzi(arr);  
			}else {	
				return false;
			}
		}else{  // 数组长度为0事  牌型符合 AA + XBBB + Y(C)(C+1)(C+2) 逻辑   
			return true;
		}
		
	},

}


mj.start();
module.exports = mj;