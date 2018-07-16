cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.GameButton();

        // 解散房间按钮
        cc.find('OutRoom',this.node).getComponent(cc.Button).node.on('click',function(){

            cc.director.loadScene('Hall');

        },this);

    },

    // update (dt) {},

    GameButton(){

        cc.find('Settings',this.node).getComponent(cc.Button).node.on('click',function () {
            
            console.log('Settings');

            let target = this;
            cc.loader.loadRes('Set interface',function(err,prefab){
                
                if (prefab) {
                    
                    // 克隆预设
                    let set = cc.instantiate(prefab);

                    // 加载物体到场景的 两种 方法
                    target.node.addChild(set);

                }else{
                    console.log(err);
                }

            });

        },this);

    },
}); 
