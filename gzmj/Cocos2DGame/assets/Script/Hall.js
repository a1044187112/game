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
        SettingsButton: cc.Button, 
    },


    // onLoad () {},
    
    start () {
        this.Settings();
    },

    // 设置按钮
    Settings: function() {
        
        this.SettingsButton.node.on('click',function() {
            cc.director.loadScene('Login');
        })

    }

});
