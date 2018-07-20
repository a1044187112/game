cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let close = cc.find('bg/button',this.node).getComponent(cc.Button);
        close.node.on('click',function(){
            // 删除窗口
            this.node.destroy();
            
        },this);
    },

    start () {

    },

    // update (dt) {},
});
