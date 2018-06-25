cc.Class({
    extends: cc.Component,

    // 获取组件
    properties: {
        loginbutton: cc.Button,
    },

    // use this for initialization
    onLoad: function () {

        //登录按钮点击事件
        this.loginbutton.node.on('click',function(){
            
            console.log("登录");
            
        },this);

    },

    // called every frame
    update: function (dt) {

    },
});
