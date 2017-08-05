
var appSettings = {};
appSettings.ip = "10.4.102.56";
appSettings.port = "8080";
appSettings.proxy = appSettings.ip+":"+appSettings.port;
$_ajax = {
    _post: function (obj) {
        var paramsObj = {};
        summer.writeConfig({
            "host": appSettings.ip, //向configure中写入host键值
            "port": appSettings.port //向configure中写入port键值
        });
        paramsObj.viewid = obj.url;
        paramsObj.action = obj.handler;
        paramsObj.params = obj.data;
        paramsObj.header = {
            "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "imgfornote"
        }
        paramsObj.callback = obj.success;
        paramsObj.error = obj.err;
        paramsObj.isalerterror = "true",
        summer.callAction(paramsObj);
    },
    _get: function (obj) {
        var paramsObj = {};
        summer.writeConfig({
            "host": appSettings.ip, //向configure中写入host键值
            "port": appSettings.port //向configure中写入port键值
        });
        paramsObj.viewid = obj.url;
        paramsObj.action = obj.handler;
        paramsObj.params = obj.data;
        paramsObj.header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "imgfornote"
        }
        paramsObj.callback = obj.success;
        paramsObj.error = obj.err;
        summer.callAction(paramsObj);
    }
}

