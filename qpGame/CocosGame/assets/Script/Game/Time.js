cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        
    },
    
    update (dt) {
        
        let Time = new Date();

        this.getComponent(cc.Label).string = Time.toLocaleTimeString();

    },
});
