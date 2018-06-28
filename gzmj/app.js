// cluster  测试文件


var cluster = require("cluster");
var app = require('express')();
var http = require("http").Server(app);
var numCPUs = require("os").cpus().length;
var port = parseInt(process.argv[2]);

if (cluster.isMaster) {
   console.log('[master] ' + "start master...");
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", function(worker, code, signal) {
    cluster.fork();
  });
  cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:'
 + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

} else {

  app.get('/', function(req, res) {
    res.send('凯恩!');
     console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    console.log(cluster.worker.id);
  });

  app.get('/login', function(req, res) {
    res.send('登陆!');
     console.log('[worker] ' + "start worker ..." + cluster.worker.id);
      console.log(cluster.worker.id);
  });

  http.listen(8000); 
}