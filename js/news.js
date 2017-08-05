//监听物理返回键
document.addEventListener("deviceready", function () {
    document.addEventListener("backbutton", function () {
        try {
            localStorage.removeItem("navIndex");
        } catch (e) {
        }
        window.location.href = "../firstpage.html";
    }, false);
}, false);
var navIndex = 1;
var listNum = 1;
var mesgNumber = 0;
var tabArr = ["sports", "live", "news", "music"]
var listview;
summerready = function () {
//返回按钮
    $(".turnBackBtn").on("click", function () {
        try {
            localStorage.removeItem("navIndex");
        } catch (e) {
        }
        window.location.href = "../firstpage.html";
    })
//保留状态。tab的状态
    if (localStorage.getItem("navIndex") !== null) {
        navIndex = Number(localStorage.getItem("navIndex"));
    }
    $("#" + navIndex).addClass('active').siblings().removeClass('active');
//点击tab
    $('.um-nav-item').click(function () {
        mesgNumber = 0;
        listNum = 1;
        $(this).addClass('active').siblings().removeClass('active');
        navIndex = $(this).attr("id");
        $(".um-list").html("");
        callservice(mesgNumber, navIndex);
    })
    //初始加载调用服务
    callservice(mesgNumber, navIndex);

    listviewHandler("#listview1");

}
//调用服务
function callservice(number, tabnum) {
    //sports,live,news,music
    $_ajax._post({
        url: "com.bankindustrial.controller.BankIndustrialController",
        handler: "handler",
        data: {
            "transtype": "urlparamrequest",
            "pagenum": number,
            "msgclass": tabArr[tabnum - 1],
            "reqmethod": "POST",
        },
        success: "myCallBacks()",
        err: "myErrCallBack()"
    })
}
//成功的回调
function myCallBacks(args) {
    if (args.result.length == 0) {
        $(".totast").css("display", "block");
        setTimeout(function () {
            $(".totast").css("display", "none")
        }, 300)
        return;
    }
    var data = args.result;
    for (var i = 0; i < data.length; i++) {
        data[i].title = data[i].title + listNum;
        listNum++;
    }
    var arrText = doT.template($("#ds").text());
    $(".um-list").append(arrText(data));
}
//失败的回调
function myErrCallBack() {
    //xval.remove();
    alert("访问服务失败！");
}
//构造控件实例，和绑定数据和事件
function listviewHandler(listwraper) {
    listview = UM.listview(listwraper);
    listview.pullUp(function (sender) {
        //这是可以编写列表上拉刷新逻辑，参数sender即为当前列表实例对象
        refsender = sender;
        mesgNumber++;
        callservice(mesgNumber, navIndex);
        sender.refresh();
    });
    listview.on("itemClick", function (sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        //alert("您点击了列表的第" + (args.rowIndex + 1) +　"行！");
        var titletonext = $($(".um-listview-row .titleListItem")[args.rowIndex]).text();
        localStorage.setItem("navIndex", navIndex)
        Open_message(titletonext);
    });
    listview.on("itemSwipeLeft", function (sender, args) {
        //这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        mesgNumber = 0;
        listNum = 1;
        if (navIndex < 4) {
            var tag = navIndex + 1;

        } else {
            navIndex = 1;
            var tag = navIndex;
        }
        $("#" + tag).addClass('active').siblings().removeClass('active');
        navIndex = tag;
        $(".um-list").html("");
        callservice(mesgNumber, navIndex);
    });
    listview.on("itemSwipeRight", function (sender, args) {
        //这里可以处理行右滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        //sender.showItemMenu(args.$target);
        mesgNumber = 0;
        listNum = 1;
        if (navIndex > 1) {
            var tag = navIndex - 1;

        } else {
            navIndex = 4;
            var tag = navIndex;
        }
        $("#" + tag).addClass('active').siblings().removeClass('active');
        navIndex = tag;
        $(".um-list").html("");
        callservice(mesgNumber, navIndex);
    });
}
//打开详情页
function Open_message(titletonext) {
    //$cache.write("nextUrl", DataUrl);
    //$cache.write("token", token);
    //localStorage.setItem("token", "1ed82133cad38f73369cfc9998d362d0415c1915447e6a1054562e1605eff9fa");
    var urls = "detail.html?titletonext=" + titletonext;
    //alert(urls);
    urls = decodeURI(urls);
    window.location.href = urls;
}
