cc.Class({
    extends: cc.Component,

    // 获取组件
    properties: {
        loginbutton: cc.Button,
    },

    // use this for initialization
    onLoad: function () {

        //登录按钮点击事件
        this.loginbutton.node.on('click',function(){
            
            console.log("登录");

            let url = "http://192.168.1.162:3000/login";
            
            // let data = JSON.stringify({"name":"test"});

            let data = "name=test&age=16&id=05";
            
            let test = this.http("POST",url,data);

            console.log(JSON.stringify(test));

        },this);

    },

    // called every frame
    update: function (dt) {

    },

    // 后台请求数据函数
    http: function(type,url,data){

        let xmlhttp = new XMLHttpRequest();
        
        xmlhttp.open(type,url,false);
        
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        
        if(type == "GET"){

            xmlhttp.send(null);

        }else if(type == "POST"){

            xmlhttp.send(data);

        };

        return xmlhttp.responseText;
    },
});
