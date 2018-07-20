cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        cc.find("cover",this.node).getComponent(cc.Button).node.on('click',function () {
            
            this.node.destroy();

        },this);

    },

    start () {

    },

    // update (dt) {},
});
