cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.SetButton();
        this.PlayDescription();
        this.Personal();
        this.Recording();
        this.Recharge();
        this.Withdraw();
        this.GameScene();
        
    },

    // update (dt) {},

    // 设置按钮弹窗
    SetButton () {

        let target = this;

        // 设置按钮点击函数
        cc.find('Button/Setting',this.node).getComponent(cc.Button).node.on('click',function(){

            // 预设查找
            cc.loader.loadRes('SettingWindow',function(err,prefab){

                // 判断是否存在预设
                if(prefab){

                    // 克隆
                    let set = cc.instantiate(prefab);

                    // 添加到场景
                    target.node.addChild(set);

                }else{

                    // 报错提示
                    console.log(err);

                }

            })

        },this)

    },

    // 玩法说明
    PlayDescription () {

        let target = this;

        cc.find('Button/PlayDescription',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.loader.loadRes('PlayDescription',function(err,prefab){

                if(prefab){

                    let Play = cc.instantiate(prefab);

                    target.node.addChild(Play);

                    Play.getChildByName('Esc').getComponent(cc.Button).node.on('click',function(){

                        Play.destroy();

                    },this)
                }

            })

        },this);

    },
    
    // 个人信息
    Personal () {

        let target = this;

        cc.find('Button/Personal',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.loader.loadRes('Personal',function(err,prefab){

                if(prefab){

                    let Play = cc.instantiate(prefab);

                    target.node.addChild(Play);

                    Play.getChildByName('Esc').getComponent(cc.Button).node.on('click',function(){

                        Play.destroy();

                    },this);

                    Play.getChildByName('OK').getComponent(cc.Button).node.on('click',function(){

                        cc.director.loadScene("Login");

                    },this);
                }

            })

        },this);

    },

    // 记录
    Recording () {

        let target = this;

        cc.find('Button/Recording',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.loader.loadRes('Recording',function(err,prefab){

                if(prefab){

                    let Play = cc.instantiate(prefab);

                    target.node.addChild(Play);

                    Play.getChildByName('Esc').getComponent(cc.Button).node.on('click',function(){

                        Play.destroy();

                    },this)
                }

            })

        },this);

    },

    // 充值
    Recharge () {

        let target = this;

        cc.find('Button/Recharge',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.loader.loadRes('Recharge',function(err,prefab){

                if(prefab){

                    let Play = cc.instantiate(prefab);

                    target.node.addChild(Play);

                    Play.getChildByName('Esc').getComponent(cc.Button).node.on('click',function(){

                        Play.destroy();

                    },this)
                }

            })

        },this);

    },

    // 提现
    Withdraw () {

        let target = this;

        cc.find('Button/Withdraw',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.loader.loadRes('Withdraw',function(err,prefab){

                if(prefab){

                    let Play = cc.instantiate(prefab);

                    target.node.addChild(Play);

                    Play.getChildByName('Esc').getComponent(cc.Button).node.on('click',function(){

                        Play.destroy();

                    },this)
                }

            })

        },this);

    },

    // 游戏场景跳转
    GameScene () {

        // 炸金花
        cc.find('Games/zjh',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.director.loadScene('Game');

        },this);

         // 十三道
         cc.find('Games/13D',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.director.loadScene('Game');

        },this);

         // 四人牛牛
         cc.find('Games/srnn',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.director.loadScene('Game');

        },this);

         // 百人牛牛
         cc.find('Games/brnn',this.node).getComponent(cc.Button).node.on('click',function(){
            
            cc.director.loadScene('Game');

        },this);

    }
    
});
