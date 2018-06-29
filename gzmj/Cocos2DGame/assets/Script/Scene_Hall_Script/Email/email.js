cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {

        let close = cc.find('bg/button',this.node).getComponent(cc.Button);
        close.node.on('click',function(){
            // 删除窗口
            this.node.destroy();
            
            // 打开 所有按钮功能
            cc.find('Canvas').getComponent('HallButton').CloseBtn(true);

        },this);

    },

    start () {

    },

    // update (dt) {},
});
