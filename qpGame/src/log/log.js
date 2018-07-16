var log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'console' }, //控制台输出  
        app: {
            type: "dateFile",
            filename: './src/log/logs/'+(new Date()).toDateString()+'.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: false,
        }//日期文件格式  
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        logFile: { appenders: ['out', 'app'], level: 'ALL' },
    },
    replaceConsole: true,   //替换console.log  
});

var fileLog = log4js.getLogger('logFile');
exports.logger = fileLog;
exports.use = function (app) {
    //页面请求日志
    app.use(log4js.connectLogger(fileLog));
}

