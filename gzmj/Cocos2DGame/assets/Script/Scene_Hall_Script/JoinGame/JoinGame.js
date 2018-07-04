cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
        cc.find('cover',this.node).getComponent(cc.Button).node.on('click',function () {
            
            this.node.destroy();

            cc.find('Canvas').getComponent('HallButton').CloseBtn(true);

        },this)
        
    },

    start () {

    },

    // update (dt) {},
});
