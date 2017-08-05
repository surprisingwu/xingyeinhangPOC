/**
 * Created by 巫运廷 on 2017/6/3.
 */
var xval;
summerready = function () {
    xval = getBusyOverlay('viewport', {
        color : 'white',
        opacity : 0.8,
        text : 'viewport: loading...',
        style : 'text-shadow: 0 0 3px black;font-weight:bold;font-size:14px;color:white'
    }, {
        color : '#175499',
        size : 50,
        type : 'o'
    });
    if (xval) {
        xval.settext("正在加载......");
    }
    // summer.writeConfig({
    //     "host" : "192.168.1.103", //向configure中写入host键值
    //     "port" : "8090" //向configure中写入port键值
    // });
    if (localStorage.getItem("user") == "admin"){
        $(".mainContainerLeft img").attr("src","../img/waite.png");
        $(".userName").html(localStorage.getItem("user"));
        $(".userLastTime").html("上次登录 "+localStorage.getItem("loginTime"));
        xval.remove();
    }else{
        var params = {transtype:"getimg"}
        params.userName = localStorage.getItem("user");
        $_ajax._post({
            url: "com.bankindustrial.controller.BankIndustrialPersonController",
            handler:"handler",
            data:params,
            success: "myimgcallback()",
            err:"myimgerror()"
        })
    }

    // summer.callAction({
    //     "viewid": "com.bankindustrial.controller.BankIndustrialPersonController", //后台带包名的Controller名
    //     "action": "handler", //方法名
    //     "params": params,//自定义参数
    //     "callback": "myimgcallback()", //请求回来后执行的js方法
    //     "error": "myimgerror()", //失败回调的js方法
    //     "header": {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "User-Agent": "imgfornote"
    //     }
    // });

    $(".turnBackMainPage").on("click",function () {
        window.location.href = "../firstpage.html";
    });
    $(".exitBtn").on("click",function () {
        $(".totastContainer").css("display","block");
    });
    $(".cancelBtn").on("click",function () {
        $(".totastContainer").css("display","none");
    })
    $(".confirmBtn").on("click",function () {
        window.location.href = "../index.html";
    })
}
function myimgcallback(data) {
    //{result:{url:""}}
    var _url = data.result.url;
    if (_url == ""){
        $(".mainContainerLeft img").attr("src","../img/waite.png");
    }else {
        $(".mainContainerLeft img").attr("src","http://"+appSettings.proxy+_url);
    }
    $(".userName").html(localStorage.getItem("user"));
    $(".userLastTime").html("上次登录 "+localStorage.getItem("loginTime"));
    xval.remove();
}
function myimgerror(err) {
    xval.remove();
    alert("访问MA失败！")
}

