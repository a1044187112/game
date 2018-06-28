cc.Class({

    extends: cc.Component,

    properties: {
        
    },


    onLoad () {
        this.Settings();
    },
    
    start () {

    },

    // 关闭和打开界面所有 按钮功能
    CloseBtn : function (whether){

        // 创建房间按钮
        cc.find('Button/CreateRoom',this.node).getComponent(cc.Button).interactable = whether;
    
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
        let SettingsButton = cc.find('Button/SettingsButton',this.node);

        let button = SettingsButton.getComponent(cc.Button);

        button.node.on('click',function() {
            
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

    }

});