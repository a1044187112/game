cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        cc.find('OK',this.node).getComponent(cc.Button).node.on('click',function () {

            this.node.destroy();

        },this);

    },

    // update (dt) {},
});
