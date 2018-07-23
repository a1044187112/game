export default class NNIO{
	constructor(io){
		this.io = io;
		//this.router();
	}

	router(){
		console.log("socket连接测试");
		this.io.sockets.on('connection',function(socket){
		    console.log('User connected');

		    socket.on('join',function(data){
		    	console.log("点击加入房间");
		    })

		     socket.on('ready',function(data){
		    	console.log("点击准备");
		    })

		    socket.emit('getCardThree',""); // 发送前三张牌

		    socket.on('banker',function(data){
		    	console.log("点击抢庄");
		    })

		    socket.on('magnification',function(data){
		    	console.log("点击倍数选择");
		    })

		    socket.emit('getCardTwo',""); // 发送前两张牌
		    
		    // socket.join("123456",() => {
		    //   let rooms = socket.rooms;
		    //   console.log(rooms);  
		    // });


		    socket.on('exit',function(data){
		    	socket.on('disconnect',function(){
			        console.log('User disconnected');
			    }); 
		    })
		    
		});
	}
}