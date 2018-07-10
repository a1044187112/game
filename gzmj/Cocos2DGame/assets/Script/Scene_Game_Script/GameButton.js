cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.GameButton();

    },

    // update (dt) {},

    GameButton(){

        cc.find('Settings',this.node).getComponent(cc.Button).node.on('click',function () {
            
            console.log('Settings');

        },this);

    },
}); 
