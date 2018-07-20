cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        cc.find('OK',this.node).getComponent(cc.Button).node.on('click',function () {

            this.node.destroy();

        },this);

        let scene = cc.director.getScene();

        if(scene.name == 'Game'){

            cc.find('Esc',this.node).getComponent(cc.Button).node.on('click',function(){

                cc.director.loadScene('Hall');

            },this);

        }
        

    },

    // update (dt) {},
});
