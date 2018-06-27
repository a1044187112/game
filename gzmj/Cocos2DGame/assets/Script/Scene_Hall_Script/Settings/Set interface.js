cc.Class({
    extends: cc.Component,

    properties: {
        out: cc.Button,
        logout: cc.Button,
        target: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // 关闭窗口
        this.out.node.on('click',function(){
            // 删除窗口
            this.target.destroy();
        },this);

        // 注销事件
        this.logout.node.on('click',function (){
            // 场景跳转            
            cc.director.loadScene('Login');
        },this);

    },

    // start () {

    // },

    // update (dt) {},
});
