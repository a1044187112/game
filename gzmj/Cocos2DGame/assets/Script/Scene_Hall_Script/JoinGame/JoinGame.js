
// 储存要加入的房间号，用于发送后台
let number = new Array();

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
        // 关闭按钮
        cc.find('cover',this.node).getComponent(cc.Button).node.on('click',function () {
            
            number = [];

            this.node.destroy();

        },this);

        this.GameNumber();

    },

    start () {

    },

    // update (dt) {
    // },

    GameNumber(){

        cc.find('bg/Layout/0',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(0);
            }

            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();

        },this);

        cc.find('bg/Layout/1',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(1);
            }

            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();

            
        },this);

        cc.find('bg/Layout/2',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(2);
            }
            
            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();

        },this);

        cc.find('bg/Layout/3',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(3);
            }
            
            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();
            
        },this);

        cc.find('bg/Layout/4',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(4);
            }
            
            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();

        },this);

        cc.find('bg/Layout/5',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(5);
            }

            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();
            
        },this);

        cc.find('bg/Layout/6',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(6);
            }
            
            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();

        },this);

        cc.find('bg/Layout/7',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(7);
            }
            
            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();

        },this);

        cc.find('bg/Layout/8',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(8);
            }
            
            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number.toString();

        },this);

        cc.find('bg/Layout/9',this.node).getComponent(cc.Button).node.on('click',function(){

            if (number.length < 6) {
                number.push(9);
            }

            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number;

        },this);

        cc.find('bg/Layout/Drop',this.node).getComponent(cc.Button).node.on('click',function(){

            number = [];

            cc.find('bg/TextBox/Number',this.node).getComponent(cc.Label).string = number;

        },this);

    },
});
