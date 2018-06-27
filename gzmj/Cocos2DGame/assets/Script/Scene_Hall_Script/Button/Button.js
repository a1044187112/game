cc.Class({
    extends: cc.Component,

    properties: {
        CreateRoomButton: cc.Button,
        JoinGameButton: cc.Button,
        RoomCard: cc.Button,
        ShareItButton: cc.Button,
        RecordButton: cc.Button,
        EmailButton: cc.Button,
        HowToPlayButton: cc.Button,
        // SettingsButton: cc.Button,
        
        // 设置窗口预设
        sett_prefab : cc.Prefab,
    },


    onLoad () {
        this.Settings();
    },
    
    start () {

    },

    // 设置按钮
    Settings: function() {
        
        // 查找场景中的物体
        let SettingsButton = cc.find('Button/SettingsButton',this.node);

        let button = SettingsButton.getComponent(cc.Button);

        button.node.on('click',function() {
            
            // 获取当前场景
            let scene = cc.director.getScene();
            // 克隆预设
            let set = cc.instantiate(this.sett_prefab);

            // 加入到场景
            set.parent = this.node;
            // 设置坐标
            // set.setPosition(this.Position.x,this.Position.y);
            // this.getComponent('Button').enabled = false;  

        },this);

    }

});
