cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // 设置按钮
        cc.find('Button/Setting',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;

            cc.loader.loadRes('GameSetting',function(err,prefab){

                if(prefab){

                    let set = cc.instantiate(prefab);

                    target.node.addChild(set);

                }else{
                    console.log(err);
                }

            });

        },this);

    },

    // update (dt) {},
});
