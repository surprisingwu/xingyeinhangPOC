document.addEventListener("deviceready", function() {
    document.addEventListener("backbutton", function() {
        try{
            localStorage.removeItem("navIndex");
        }catch (e){}
        window.location.href = "../firstpage.html";
    }, false);
}, false);
var navIndex = 1;
var listNum = 1;
var mesgNumber = 0;
var tabArr = ["sports","live","news","music"]
summerready = function() {
    $(".turnBackToFirstPage").on("click",function () {
        try{
            localStorage.removeItem("navIndex");
        }catch (e){}
        window.location.href = "../firstpage.html";
    })
    if (localStorage.getItem("navIndex")!== null){
        navIndex = Number(localStorage.getItem("navIndex"));
    }
    $("#"+navIndex).addClass('active').siblings().removeClass('active');

    $('.navItem').click(function() {
        mesgNumber = 0;
        listNum = 1;
        $($(this).find("span")).addClass('active').siblings().removeClass('active');
        navIndex = $(this).attr("id");
        $(".um-list").html("");
        callservice(mesgNumber,navIndex);

    })
    callservice(mesgNumber,navIndex);
    refresher.init({
        id:"listview",
        pullDownAction:Refresh,
        pullUpAction:Load
    });
}
function callservice(number,tabnum) {
    //sports,live,news,music
    $_ajax._post({
        url: "com.bankindustrial.controller.BankIndustrialController",
        handler:"handler",
        data:{
            "transtype" : "urlparamrequest",
            "pagenum" : number,
            "msgclass":tabArr[tabnum-1],
            "reqmethod" : "POST",
        },
        success: "myCallBacks()",
        err:"myErrCallBack()"
    })
}

function myCallBacks(args) {
    if (args.result.length == 0){
        $(".totast").css("display","block");
        setTimeout(function () {
            $(".totast").css("display","none")
        },300)
        return;
    }
    var $umList = $(".um-list");
    var data = args.result;
    for(var i = 0;i<data.length;i++) {
        data[i].title = data[i].title+listNum;
        listNum++;
    }
    var arrText = doT.template($("#ds").text());
    $(".um-list").append(arrText(data));
    hideWaiting();
    listviewHandler("#listview1")
}
function myErrCallBack() {
    //xval.remove();
    alert("访问服务失败！");
}
//构造控件实例，和绑定数据和事件
function listviewHandler(listContainer) {
    var listview = UM.listview(listContainer);
    // listview.on("pullUp", function (sender) {
    //     //这是可以编写列表上拉刷新逻辑，参数sender即为当前列表实例对象
    //     mesgNumber++;
    //     callservice(mesgNumber,navIndex);
    //     sender.refresh();
    // })
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        //alert("您点击了列表的第" + (args.rowIndex + 1) +　"行！");
        var titletonext = $($(".um-listview-row .titleListItem")[args.rowIndex]).text();
        localStorage.setItem("navIndex",navIndex)
        Open_message(titletonext);
    });
    listview.on("itemSwipeLeft", function(sender, args) {
        //这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        mesgNumber = 0;
        listNum = 1;
        if (navIndex <=arrData.length){
            var tag = navIndex+1;

        }else {
            navIndex = 1;
            var tag = navIndex;
        }
        $("#" + tag).addClass('active').siblings().removeClass('active');
        navIndex = tag;
        $(".um-list").html("");
        callservice(mesgNumber,navIndex);
    });
    listview.on("itemSwipeRight", function(sender, args) {
        //这里可以处理行右滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        //sender.showItemMenu(args.$target);
        mesgNumber = 0;
        listNum = 1;
        if (navIndex >1){
            var tag = navIndex -1;

        }else {
            navIndex = 4;
            var tag = navIndex;
        }
        $("#" + tag).addClass('active').siblings().removeClass('active');
        navIndex = tag;
        $(".um-list").html("");
        callservice(mesgNumber,navIndex);
    });
}
function Open_message(titletonext) {
    //$cache.write("nextUrl", DataUrl);
    //$cache.write("token", token);
    //localStorage.setItem("token", "1ed82133cad38f73369cfc9998d362d0415c1915447e6a1054562e1605eff9fa");
    var urls = "detail.html?titletonext=" + titletonext;
    //alert(urls);
    urls = decodeURI(urls);
    window.location.href = urls;
}
function getQueryByName(name){
    var params = decodeURI(location.search);
    var result = params.match(
        new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1)
    {
        return "";
    }
    return result[1];
}
function Refresh() {
    setTimeout(function () {
        var el, li, i;
        el =document.querySelector("#listview ul");
        document.getElementById("listview").querySelector(".pullDownIcon").style.display="none";
        document.getElementById("listview").querySelector(".pullDownLabel").innerHTML="<img src='css/ok.png'/>刷新成功";
        setTimeout(function () {
            wrapper.refresh();
            document.getElementById("listview").querySelector(".pullDownLabel").innerHTML="";
        },1000);
    }, 1000);
}
function Load() {
    setTimeout(function () {
        var el, li, i;
        el =document.querySelector("#listview ul");
        for (i=0; i<2; i++) {
            li = document.createElement('li');
            li.innerHTML="<img src='img/game8.png'><div class='game-info'><h1>华仔超神战记</h1><p>9万次下载     89.18M</p><p>秒杀虚拟摇杆，砸烂手机键盘</p></div><button>下载</button>"
            el.appendChild(li, el.childNodes[0]);
        }
        wrapper.refresh();
    },2000);
}