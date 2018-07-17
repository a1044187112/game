cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // 登陆按钮
        cc.find('button',this.node).getComponent(cc.Button).node.on('click',function(){
            
            this.Login();

        },this);

    },

    // update (dt) {},

    // 登陆函数
    Login(){

        // 账号
        let ID = cc.find('ID',this.node).getComponent(cc.EditBox).string;

        // 密码
        let pwd = cc.find('Password',this.node).getComponent(cc.EditBox).string;
        
        // 判断交互
        if(ID == "admin" && pwd == "123456"){

            cc.director.loadScene("Hall");

        }else if(ID != "admin" || pwd != "123456"){
        
            console.log("账号或密码错误！！！");
        
        }

    }

});
