const fs = require("fs");

let createRoom =  {  // 创建房间号 随机生成6位数 ，如果有重复，则重新生成
	
	roomNumberArr : function(){
		createRoom.roomNumber = [];
	},
	createRoomNumber : function(){
		if(!roomNumberArr)
			createRoom.roomNumberArr();

		let roomNumber = parseInt(Math.random()*900000+100000);	

		if(!createRoom.roomNumber.in_array(roomNumber)){
			createRoom.roomNumber.push(roomNumber); // 添加到数组中
			return roomNumber;
		}else{
			return createRoom.createRoomNumber();
		}

	},

}
module.exports = createRoom;