cc.Class({
    extends: cc.Component,

    properties: {
        
        // 地上花瓣的数量
        number: 10,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        cc.find('Login',this.node).getComponent(cc.Button).node.on('click',function(){

            cc.director.loadScene('Game');

        },this);

        for(let i = 0; i < this.number; i++){
            this.Flower();
        }

    },

    // update (dt) {},

    Flower () {

        // 创建物体
        let node = new cc.Node('Flower');
        
        // 给物体添加 组件
        let sp = node.addComponent(cc.Sprite);

        // 加载 图片集
        cc.loader.loadRes('Texture/tree',cc.SpriteAtlas,function(err,atlas){

            // 获取 图片集里的 一张图片 用名字 取得
            let frame = atlas.getSpriteFrame('flower1');

            // 添加图片到 组件上
            sp.spriteFrame = frame;
            
        })
        
        // 等比放大
        sp.node.scale = 2;

        // 添加到场景
        cc.find('BG_1',this.node).addChild(node);

        node.setPosition(-(1920 / 2),-(1080 / 2));

        // Canvas 的 宽高
        // let x = cc.winSize.width;
        // let h = cc.winSize.height;

        let x = node.x + Math.random() * 1920;

        let h = node.y + Math.random() * 1080;

        // 随机位置
        node.setPosition(x,h);

    },
});
