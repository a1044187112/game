cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // 登陆按钮
        cc.find('LoginButton',this.node).getComponent(cc.Button).node.on('click',function(){
            
            this.Login();

        },this);

        // 注册按钮
        cc.find('RegisteredButton',this.node).getComponent(cc.Button).node.on('click',function(){

            this.Prompt('暂时无法注册！！！');

        },this);

    },

    // update (dt) {},

    // 登陆函数
    Login(){

        // 账号
        let ID = cc.find('ID/EditBox',this.node).getComponent(cc.EditBox).string;

        // 密码
        let pwd = cc.find('Password/EditBox',this.node).getComponent(cc.EditBox).string;
        
        console.log(ID);

        // 判断交互
        if(ID == "admin" && pwd == "123456"){

            cc.director.loadScene("Hall");

        }else if(ID != "admin" || pwd != "123456"){
        
            this.Prompt("账号或密码错误！！！");
        
        }

    },
    
    // 提示弹窗
    Prompt (label) {

        let target = this;

        cc.loader.loadRes('Prompt',function(err,prefab){

            if(prefab){

                let prompt = cc.instantiate(prefab);

                target.node.addChild(prompt);

                prompt.getComponent('Prompt').Prompt(label);

            }
            
        })

    }

});
