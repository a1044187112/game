cc.Class({
    extends: cc.Component,

    properties: {

        progress:{
            default:null,
            type:cc.Sprite
        },

        _width: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // 获取组件
        let slider = this.getComponent(cc.Slider);
        if(slider == null || this.progress == null){
            return;
        }

        // 设置滑动条初始大小
        this._width = this.progress.node.width;
        this.progress.node.width = this._width * slider.progress;
        
        // 监听事件，控制调整滑动条数值
        slider.node.on('slide', function(){
            this.progress.node.width = slider.progress * this._width;
        }, this);


    },

    // start () {},

    // update (dt) {},
});
