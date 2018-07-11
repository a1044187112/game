cc.Class({

    extends: cc.Component,

    properties: {
        
    },


    onLoad () {

        this.Settings();
        this.HowToPlay();
        this.Eamil();
        this.Record();
        this.ShareIt();
        this.Recharge();
        this.JoinGame();
        this.CreateGame();
    },
    
    start () {

    },

    // 关闭和打开界面所有 按钮功能
    CloseBtn : function (whether){

        // 创建房间按钮
        cc.find('Button/CreateRoom/CreateBtn',this.node).getComponent(cc.Button).interactable = whether;
    
        // 加入房间按钮
        cc.find('Button/JoinGameButton',this.node).getComponent(cc.Button).interactable = whether;

        // 房卡按钮
        cc.find('Button/RoomCard/button',this.node).getComponent(cc.Button).interactable = whether;
    
        // 分享按钮
        cc.find('Button/ShareItButton',this.node).getComponent(cc.Button).interactable = whether;
    
        // 战绩按钮
        cc.find('Button/RecordButton',this.node).getComponent(cc.Button).interactable = whether;
    
        // 信件按钮
        cc.find('Button/EmailButton',this.node).getComponent(cc.Button).interactable = whether;
    
        // 玩法按钮
        cc.find('Button/HowToPlayButton',this.node).getComponent(cc.Button).interactable = whether;
    
        // 设置按钮
        cc.find('Button/SettingsButton',this.node).getComponent(cc.Button).interactable = whether;
    },

    // 设置按钮
    Settings: function() {
        
        // 查找场景中的物体
        let SettingsButton = cc.find('Button/SettingsButton',this.node).getComponent(cc.Button);

        SettingsButton.node.on('click',function() {
            
            // 获取当前场景
            // let scene = cc.director.getScene();

            // 动态加载物体，物体必须在（resources）目录下
            let target = this;
            cc.loader.loadRes('Set interface',function(err,prefab){
                
                if (prefab) {
                    
                    // 克隆预设
                    let set = cc.instantiate(prefab);

                    // 加载物体到场景的 两种 方法
                    // set.parent = this.node;
                    target.node.addChild(set);
                    
                    // 自定义关闭按钮函数
                    target.CloseBtn(false);

                }else{
                    console.log(err);
                }

            })

            // 关闭和激活 节点（物体）
            // this.node.active = false;

        },this);

    },

    // 玩法说明按钮
    HowToPlay : function(){

        // 获取组件
        let HowToPlayButton = cc.find('Button/HowToPlayButton',this.node).getComponent(cc.Button);

        // 点击函数
        HowToPlayButton.node.on('click',function(){

            // 动态加载资源
            let target = this;
            cc.loader.loadRes('HowToPlay',function(err,prefab){
                
                if(prefab){

                    // 克隆
                    let howto = cc.instantiate(prefab);

                    // 加入场景
                    target.node.addChild(howto);

                    target.CloseBtn(false);

                }else{
                    console.log(err);
                }

            });

        },this)

    },

    // 信息按钮
    Eamil :function(){

         // 获取组件
         let EmailButton = cc.find('Button/EmailButton',this.node).getComponent(cc.Button);

         // 点击函数
         EmailButton.node.on('click',function(){
 
             // 动态加载资源
             let target = this;
             cc.loader.loadRes('Eamil',function(err,prefab){
                 
                 if(prefab){
 
                     // 克隆
                     let eamil = cc.instantiate(prefab);
 
                     // 加入场景
                     target.node.addChild(eamil);
 
                     target.CloseBtn(false);
 
                 }else{
                     console.log(err);
                 }
 
             });
 
         },this)

    },

    // 战绩按钮
    Record :function(){

        // 获取组件
        let RecordButton = cc.find('Button/RecordButton',this.node).getComponent(cc.Button);

        // 点击函数
        RecordButton.node.on('click',function(){

            // 动态加载资源
            let target = this;
            cc.loader.loadRes('Record',function(err,prefab){
                
                if(prefab){

                    // 克隆
                    let eamil = cc.instantiate(prefab);

                    // 加入场景
                    target.node.addChild(eamil);

                    target.CloseBtn(false);

                }else{
                    console.log(err);
                }

            });

        },this)

    },

    // 分享按钮
    ShareIt :function(){

        // 获取组件
        let ShareItButton = cc.find('Button/ShareItButton',this.node).getComponent(cc.Button);

        // 点击函数
        ShareItButton.node.on('click',function(){

            // 动态加载资源
            let target = this;
            cc.loader.loadRes('ShareIt',function(err,prefab){
                
                if(prefab){

                    // 克隆
                    let eamil = cc.instantiate(prefab);

                    // 加入场景
                    target.node.addChild(eamil);

                    target.CloseBtn(false);

                }else{
                    console.log(err);
                }

            });

        },this)

    },

    // 充值房卡按钮
    Recharge :function(){

        cc.find('Button/RoomCard/button',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;
            cc.loader.loadRes('Recharge',function(err,prefab){

                if(prefab){

                    // 克隆
                    let Recharge = cc.instantiate(prefab);

                    target.node.addChild(Recharge);

                    target.CloseBtn(false);

                }else{
                    console.log(err);
                }

            })

        },this);

    },

    // 加入房间按钮
    JoinGame :function(){

        cc.find('Button/JoinGameButton',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;
            cc.loader.loadRes('JoinGame',function(err,prefab){

                if (prefab) {
                    
                    let JoinGame = cc.instantiate(prefab);

                    target.node.addChild(JoinGame);

                    target.CloseBtn(false);

                }else{

                    console.log(err);

                }

            })

        },this)

    },

    // 创建房间按钮
    CreateGame :function(){

        cc.find('Button/CreateRoom/CreateBtn',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;
            cc.loader.loadRes('CreateRoom',function(err,prefab){

                if (prefab) {
                    
                    let CreateRoom = cc.instantiate(prefab);

                    target.node.addChild(CreateRoom);

                    target.CloseBtn(false);

                }else{

                    console.log(err);

                }

            })

        },this)

    },

});