summerready = function () {
    $(".user-delete").on("click",function () {
        $(this).parent().find(".userBtn").val("")
    })

    $(".turnBackToIndex").on("click",function(){

        functionback();
    })
    $(".user-eye").on("click",function () {
        var _input = $(this).parent().find(".pwdBtn");
        var _type = _input.attr("type") == "text"?"password":"text";
        _input.attr("type",_type);
    })
    document.getElementById("registerBtn").onclick =function () {
        window.location.href="html/register.html";
    }
    document.getElementById("login").onclick=function () {
        loginHandler();
    }
}
function functionback() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        navigator.app.exitApp();
    }
    if (isIOS) {
        var pamn = {
            "params" : {
                "transtype" : "exit_back"
            }
        };
        summer.callService("SummerService.gotoNative", pamn, false);
    }
}
function loginHandler() {
    var username = $(".userBtn").val();
    var passw = $(".pwdBtn").val();
    var params = {transtype:"register"}
    if (username==""||passw=="") {
        alert("请输入您的用户名和密码")
        return;
    }
    if (username==="admin"&&passw==="admin123"){
        localStorage.setItem("user",$(".userBtn").val());
        localStorage.setItem("loginTime",getNowFormatDate(new Date()))
        window.location.href = "firstpage.html";
    }else{
        // summer.writeConfig({
        //     "host" : "192.168.1.103", //向configure中写入host键值
        //     "port" : "8090" //向configure中写入port键值
        // });
        params.nameVal = username;
        params.pwd = passw;
        $_ajax._post({
            url: "com.bankindustrial.controller.BankIndustrialCheckController",
            handler:"login",
            data:params,
            success: "mycallback()",
            err:"myerror()"
        })
        // summer.callAction({
        //     "viewid" : "com.bankindustrial.controller.BankIndustrialCheckController", //后台带包名的Controller名
        //     "action" : "login", //方法名
        //     "params" : params,//自定义参数
        //     "callback" : "mycallback()", //请求回来后执行的js方法
        //     "error" : "myerror()", //失败回调的js方法
        //     "header" : {
        //         "Content-Type" : "application/x-www-form-urlencoded",
        //         "User-Agent" : "imgfornote"
        //     }
        // });

    }

}
function mycallback(data) {
    var msg = data.result.flag;
    if (msg =="登录成功") {
        localStorage.setItem("user",$(".userBtn").val());
        localStorage.setItem("loginTime",getNowFormatDate(new Date()))
        window.location.href = "firstpage.html";
    } else {
        alert("您登录的账户不存在！");
    }

}
function myerror(err) {
    alert("error: "+JSON.stringify(err))
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}