cc.Class({
    extends: cc.Component,

    properties: {

        tree_number: 50,

        flower_number: 50,

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // 花瓣
        for (let i = 0; i < this.flower_number; i++) {

            this.Flower();

        }

        // 各种树的名字
        let name = ['1','2','3','4','5','tree_2','tree_3','tree_4','tree_5','tree_6'];
        // 穿件场景
        for (let i = 0; i < this.tree_number; i++) {
            
                for (let i = 0; i < name.length; i++) {
                    
                    this.Tree(name[i]);
                    
                }
            
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

        this.RandomPos(flower);

        cc.find('scrollview/view/content',this.node).addChild(flower);


    },

    // 创建 场景 里的树函数
    Tree (name) {

        let ter = new Array();

        let target = this;

        // 定义树的变量
        let terr;

        cc.loader.loadRes('Tree',function(err,prefab){

            if(prefab){

                terr = cc.instantiate(prefab);
                
                cc.loader.loadRes('Texture/tree',cc.SpriteAtlas,function(err,atlas){
    
                        let frame = atlas.getSpriteFrame(name);
                        
                        terr.getComponent(cc.Sprite).spriteFrame = frame;

                        target.RandomPos(terr);

                        cc.find('scrollview/view/content',target.node).addChild(terr);
                })
                
            }else{

                console.log(err);

            }

        })
        

    },

    // 随机位置函数
    RandomPos (target) {

        target.setPosition(-(3840 / 2),-(2160 / 2));

        let x = target.x + Math.random() * 3840;

        let h = target.y + Math.random() * 2000;
        
        // 随机位置
        target.setPosition(x,h);

    },
});
