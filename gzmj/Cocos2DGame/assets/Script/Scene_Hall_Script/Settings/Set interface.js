cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // 关闭窗口
        let out = cc.find('bg/CloseButton',this.node).getComponent(cc.Button);
        out.node.on('click',function(){
            // 删除窗口
            this.node.destroy();
        },this);

        // 注销事件
        let logout = cc.find('bg/logoutbutton',this.node).getComponent(cc.Button);
        logout.node.on('click',function (){
            // 场景跳转            
            cc.director.loadScene('Login');
        },this);

    },

    // start () {

    // },

    // update (dt) {},
});
