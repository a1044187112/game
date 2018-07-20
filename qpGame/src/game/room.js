export default class room{
	constructor(ids){
		this.ids = ids;
	}
	getID(){
		let roomNum = 0;
		roomNum = parseInt(Math.random()*900000+100000);
		if(this.ids.indexOf(roomNum)>=0)
			return this.getID();
		else
			return roomNum;
	}
	removeID(id){
		delete this.ids[id];
	}
}