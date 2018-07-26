cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.Time();

        this.Shop();

        this.Knapsack();

        this.Animal();
    },

    // update (dt) {},

    Time () {

        let Time = new Date();

        cc.find('Time',this.node).getComponent(cc.Label).string = Time.toLocaleTimeString();

    },

    // 商城按钮
    Shop () {

        // 打开商城窗口
        cc.find('Window/Shop',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;

            // 预设查找方法
            cc.loader.loadRes('Shop',function(err,prefab){

                // 克隆
                let win = cc.instantiate(prefab);

                // 添加场景
                target.node.addChild(win);

                // 关闭按钮
                win.getChildByName('Cover').getComponent(cc.Button).node.on('click',function(){

                    win.destroy();

                },this)

                target.Commodity();

            })

        },this);

    },

    // 商品按钮
    Commodity () {

        // 大礼包
        cc.find('Shop/ScrollView/view/content/1',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;

            cc.loader.loadRes('DLB_Details',function(err,prefab){
                
                let Details = cc.instantiate(prefab);

                target.node.addChild(Details);

                Details.getChildByName('BG').getComponent(cc.Button).node.on('click',function(){

                    Details.destroy();

                },this)
            })

        },this)

        
        // 狗粮
        cc.find('Shop/ScrollView/view/content/2',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;

            cc.loader.loadRes('GL_Details',function(err,prefab){
                
                let Details = cc.instantiate(prefab);

                target.node.addChild(Details);

                Details.getChildByName('BG').getComponent(cc.Button).node.on('click',function(){

                    Details.destroy();

                },this)
            })

        },this)


         // 苹果
         cc.find('Shop/ScrollView/view/content/3',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;

            cc.loader.loadRes('Details',function(err,prefab){
                
                let Details = cc.instantiate(prefab);

                target.node.addChild(Details);

                Details.getChildByName('BG').getComponent(cc.Button).node.on('click',function(){

                    Details.destroy();

                },this)
            })

        },this)


    },

    // 背包按钮
    Knapsack () {

        // 打开商城窗口
        cc.find('Window/Knapsack',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;

            // 预设查找方法
            cc.loader.loadRes('Knapsack',function(err,prefab){

                // 克隆
                let win = cc.instantiate(prefab);

                // 添加场景
                target.node.addChild(win);

                // 关闭按钮
                win.getChildByName('Cover').getComponent(cc.Button).node.on('click',function(){

                    win.destroy();

                },this)

            })

        },this);

    },

    // 饲料按钮
    Animal () {

        // 打开商城窗口
        cc.find('Window/Animal',this.node).getComponent(cc.Button).node.on('click',function(){

            let target = this;

            // 预设查找方法
            cc.loader.loadRes('Knapsack',function(err,prefab){

                // 克隆
                let win = cc.instantiate(prefab);

                // 添加场景
                target.node.addChild(win);

                // 关闭按钮
                win.getChildByName('Cover').getComponent(cc.Button).node.on('click',function(){

                    win.destroy();

                },this)

            })

        },this);

    }
});
