
// 储存创建房间的信息，用于发送后台
let data = ['numberboard:8','SeveralPeople:4','Fanji:fpj'];

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    
    
    start () {
        
        // 关闭按钮
        cc.find('bg/Esc',this.node).getComponent(cc.Button).node.on('click',function () {
            
            this.node.destroy();
            
            cc.find('Canvas').getComponent('HallButton').CloseBtn(true);
            
        },this);
        
        this.DataSelect();

        // 创建房间按钮
        cc.find('bg/CraeteButton',this.node).getComponent(cc.Button).node.on('click',function(){

            // 场景跳转
            cc.director.loadScene("Game");

        },this);
        
    },
    
    // update (dt) {},

    // 选项按键函数
    DataSelect (){

        // 局数选着按钮
        let numberboard1 = cc.find('bg/jushu/8/toggle',this.node).getComponent(cc.Toggle);
        let numberboard2 = cc.find('bg/jushu/16/toggle',this.node).getComponent(cc.Toggle);

        // 8局按钮回调函数
        numberboard1.node.on('toggle',function(){

            if (numberboard1.isChecked == true) {
            
                numberboard2.isChecked = false;
                console.log('8局');
                data[0] = 'numberboard:8';
            }

        },this);

        // 16局按钮回调函数
        numberboard2.node.on('toggle',function(){
            
            if(numberboard2.isChecked = true){
    
                numberboard1.isChecked = false;
                console.log('16局');
                data[0] = 'numberboard:16';
            }

        },this);

        // 几人局选着按钮
        let SeveralPeople1 = cc.find('bg/wanfa/4/toggle',this.node).getComponent(cc.Toggle);
        let SeveralPeople2 = cc.find('bg/wanfa/3/toggle',this.node).getComponent(cc.Toggle);
        let SeveralPeople3 = cc.find('bg/wanfa/2/toggle',this.node).getComponent(cc.Toggle);
        let SeveralPeople4 = cc.find('bg/wanfa/3Q/toggle',this.node).getComponent(cc.Toggle);
        let SeveralPeople5 = cc.find('bg/wanfa/2Q/toggle',this.node).getComponent(cc.Toggle);

        // 四人局按钮回调函数
        SeveralPeople1.node.on('toggle',function(){

            if (SeveralPeople1.isChecked == true) {
                
                SeveralPeople2.isChecked = false;
                SeveralPeople3.isChecked = false;
                SeveralPeople4.isChecked = false;
                SeveralPeople5.isChecked = false;
                data[1] = 'SeveralPeople:4';
            }

        },this);

        // 三人局按钮回调函数
        SeveralPeople2.node.on('toggle',function(){

            if (SeveralPeople2.isChecked == true) {
                
                SeveralPeople1.isChecked = false;
                SeveralPeople3.isChecked = false;
                SeveralPeople4.isChecked = false;
                SeveralPeople5.isChecked = false;
                data[1] = 'SeveralPeople:3';
            }

        },this);

        // 二人局按钮回调函数
        SeveralPeople3.node.on('toggle',function(){

            if (SeveralPeople3.isChecked == true) {
                
                SeveralPeople1.isChecked = false;
                SeveralPeople2.isChecked = false;
                SeveralPeople4.isChecked = false;
                SeveralPeople5.isChecked = false;
                data[1] = 'SeveralPeople:2';
            }

        },this);

        // 三人局（定缺）按钮回调函数
        SeveralPeople4.node.on('toggle',function(){

            if (SeveralPeople4.isChecked == true) {
                
                SeveralPeople1.isChecked = false;
                SeveralPeople2.isChecked = false;
                SeveralPeople3.isChecked = false;
                SeveralPeople5.isChecked = false;
                data[1] = 'SeveralPeople:3Q';
            }

        },this);

        // 二人局（定缺）按钮回调函数
        SeveralPeople5.node.on('toggle',function(){

            if (SeveralPeople5.isChecked == true) {
                
                SeveralPeople1.isChecked = false;
                SeveralPeople2.isChecked = false;
                SeveralPeople3.isChecked = false;
                SeveralPeople4.isChecked = false;
                data[1] = 'SeveralPeople:2Q';
            }

        },this);

        // 翻鸡选着按钮
        let Fanji1 = cc.find('bg/fanji/fanpaiji/toggle',this.node).getComponent(cc.Toggle);
        let Fanji2 = cc.find('bg/fanji/yaobaiji/toggle',this.node).getComponent(cc.Toggle);

        // 翻牌鸡按钮回调函数
        Fanji1.node.on('toggle',function(){

            if(Fanji1.isChecked == true){

                Fanji2.isChecked = false;
                data[2] = 'Fanji:fpj';
            }

        },this);

        // 摇摆鸡按钮回调函数
        Fanji2.node.on('toggle',function(){

            if(Fanji2.isChecked == true){

                Fanji1.isChecked = false;
                data[2] = 'Fanji:ybj';
            }

        },this);

    },

});
