cc.Class({
    extends: cc.Component,

    properties: {
        _width : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.Setting();

    },

    // update (dt) {},

    Setting () {

        // 获取组件
        let slider = cc.find('Icon/Slider',this.node).getComponent(cc.Slider);
        
        let progress = cc.find('Icon/Slider/Progress',this.node).getComponent(cc.Sprite);

        if(slider == null || progress == null){
            return;
        }

        // 设置滑动条初始大小
        this._width = progress.node.width;
        progress.node.width = this._width * slider.progress;
        
        // 监听事件，控制调整滑动条数值
        slider.node.on('slide', function(){
            progress.node.width = slider.progress * this._width;
        }, this);

    },
});
