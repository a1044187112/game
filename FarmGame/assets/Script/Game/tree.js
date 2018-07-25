cc.Class({
    extends: cc.Component,

    properties: {

        tree_number: 10,

        flower_number: 100,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // 花瓣
        for (let i = 0; i < this.flower_number; i++) {

            this.Flower();

        }


    },

    // update (dt) {},

    // 创建花瓣函数
    Flower () {

        // 创建物体
        let flower = new cc.Node('Flower');

        // 添加组件
        let sp = flower.addComponent(cc.Sprite);

        cc.loader.loadRes('Texture/tree',cc.SpriteAtlas,function(err,atlas){

            // 获取 图片集里的 一张图片 用名字 取得
            let frame = atlas.getSpriteFrame('flower1');

            // 添加图片到 组件上
            sp.spriteFrame = frame;
            
        })


        flower.setPosition(-(3840 / 2),-(2160 / 2));

        let x = flower.x + Math.random() * 3840;

        let h = flower.y + Math.random() * 2160;
        
        // 随机位置
        flower.setPosition(x,h);

        cc.find('scrollview/view/content',this.node).addChild(flower);


    },

    // 创建 场景 里的树函数
    Tree () {

    },
});
