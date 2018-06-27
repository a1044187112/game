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

            // 登录接口IP
            let url = "http://192.168.1.162:3000/login";
            
            // 要传送的数据
            // let data = JSON.stringify({"name":"test"});
            let data = "name=test&age=16&id=05";
            
            // 解析传送过来的 JSON 数据
            let test = JSON.parse(this.http("POST",url,data));
            
            console.log(test);

            if (test.state = "success") {
                
                cc.director.loadScene("Hall");

            }else{

                console.log("登录失败");

            }

        },this);

    },

    // called every frame
    update: function (dt) {

    },

    // 后台请求数据函数
    http: function(type,url,data){

        // 创建一个HTTP
        let xmlhttp = new XMLHttpRequest();
        
        // 打开HTTP
        xmlhttp.open(type,url,false);
        
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        
        if(type == "GET"){

            // 传送的数据
            xmlhttp.send(null);

        }else if(type == "POST"){

            // 传送的数据
            xmlhttp.send(data);

        };

        // 获取传输的数据
        return xmlhttp.responseText;
    },
});
