document.addEventListener("deviceready", function() {
    document.addEventListener("backbutton", function() {
        try{
            localStorage.removeItem("navIndex");
        }catch (e){}
        window.location.href = "../index.html";
    }, false);
}, false);
summerready = function () {
    var ul = document.querySelector(".contentBox ul");
    var leftNum = parseInt(ul.style.left);
    var btn1 = document.querySelector("#btn1");
    var btn2 = document.querySelector("#btn2");
    var turnBackBtn1 = document.getElementById("turnBackBtn1");
    var turnBackBtn2 = document.getElementById("turnBackBtn2");
    var turnBackBtn3 = document.getElementById("turnBackBtn3");
    var selectName = "";
    var flag = false;
    //滑动的方法

    var calendar = new LCalendar();
    calendar.init({
        'trigger': '#birthTime', //标签id
        'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
        'minDate': (new Date().getFullYear()-3) + '-' + 1 + '-' + 1, //最小日期
        'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
    });
    var fistBoxController = (function () {
        var firstBox = document.querySelector(".firstBox");
        var ul = document.querySelector(".contentBox ul");
        var controller = {
            contentCtroller: function () {
                var contentBox = document.querySelector(".contentBox");

                ul.style.left = "0%";
                //console.log(ul);
                //console.log(contentBox);
                var startX, disX;
                contentBox.addEventListener("touchstart", function (event) {
                    //console.log(event.touches[0]);
                    // console.log(event.target);
                    var touche = event.touches[0];
                    startX = touche.clientX;

                })
                contentBox.addEventListener("touchend", function (event) {
                    //console.log(event.changedTouches[0]);
                    var touche = event.changedTouches[0];
                    disX = touche.clientX - startX;
                    var leftNum = parseInt(ul.style.left);
                    if (event.target === btn1 || event.target === btn2) {
                        ul.style.left = leftNum - 100 + "%";
                    }
                    if (event.target ===turnBackBtn2 || event.target===turnBackBtn3){
                        ul.style.left = leftNum+100+"%";
                    }
                    if (disX > 0 && disX > 100) {
                        //console.log(leftNum)
                        if (leftNum <= -100) {
                            ul.style.left = leftNum + 100 + "%";
                            var left = (~parseInt(ul.style.left) + 1) / 100;
                            //console.log(left)
                        }
                    } else if (disX < 0 && disX < -100) {
                        //console.log(leftNum);
                        if (leftNum >= -100) {
                            ul.style.left = leftNum - 100 + "%";
                            var left = (~parseInt(ul.style.left) + 1) / 100;
                            //console.log(left);
                        }
                    }
                })
                contentBox.addEventListener("touchmove", function (event) {
                    event.stopPropagation()
                });

            }()
        }
    }())
//上传图片
    $(".carama-upload-btn").on("click",function () {
        $(".imageUpLoad").css("display","block")
    })
    // $(".imageUpLoad").on("click",function () {
    //     $(".imageUpLoad").css("display","none");
    // })
    $("#openCarama").on("click",function () {
        $(".imageUpLoad").css("display","none");
        summer.openCamera({
            callback : function(args){
                var imgPath = args.imgPath;
                if($(".carama-upload-btn").find("img")){
                    $(".carama-upload-btn").html("");
                }
                var img = new Image();
                img.src = imgPath; //base64字符串
                img.style.width = "100%";
                img.style.height = "100%";
                $(".carama-upload-btn")[0].appendChild(img);
                img.onload=function(){ //要先确保图片完整获取到，这是个异步事件
                    var canvas = document.createElement("canvas"), //创建canvas元素
                        width=img.width, //确保canvas的尺寸和图片一样
                        height=img.height;
                    canvas.width=width;
                    canvas.height=height;
                    canvas.getContext("2d").drawImage(img,0,0,1280,960); //将图片绘制到canvas中
                    var dataURL=canvas.toDataURL('image/jpeg',1);
                    //转换图片为dataURL
                    var params = {transtype:"register"};
                    params.avatar_img = dataURL;
                    params.userName = $("#userconut").val();
                    $_ajax._post({
                        url: "com.bankindustrial.controller.BankIndustrialImgController",
                        handler:"handler",
                        data:params,
                        success: "myimgcallback()",
                        err:"myimgerror()"
                    })

                };

            }
        });
    })
    document.querySelector('#file').addEventListener('change', function (e) {
        // this.files[0] 是用户选择的文件
        e.preventDefault();
        $(".imageUpLoad").css("display","none")
        var caramaUploadUp = document.querySelector(".carama-upload-btn");
        lrz(this.files[0], {width: 200,height:200,quality: 0.1})
            .then(function (rst) {
                // 把处理的好的图片给用户看看呗（可选）
                if($(caramaUploadUp).find("img")){
                    $(caramaUploadUp).html("");
                }
                var img = new Image();
                img.src = rst.base64; //base64字符串
                img.style.width = "100%";
                img.style.height = "100%";
                caramaUploadUp.appendChild(img);
                return rst;
            }).then(function (rst) {
                var params = {transtype:"register"};
                if ($("#userconut").val() == "") {
                    alert("请输入您的账户名!");
                }
                params.avatar_img = rst.base64;
                params.userName = $("#userconut").val();
            $_ajax._post({
                url: "com.bankindustrial.controller.BankIndustrialImgController",
                handler:"handler",
                data:params,
                success: "myimgcallback()",
                err:"myimgerror()"
            })
            // summer.callAction({
            //     "viewid": "com.bankindustrial.controller.BankIndustrialImgController", //后台带包名的Controller名
            //     "action": "handler", //方法名
            //     "params": params,//自定义参数
            //     "callback": "myimgcallback()", //请求回来后执行的js方法
            //     "error": "myimgerror()", //失败回调的js方法
            //     "header": {
            //         "Content-Type": "application/x-www-form-urlencoded",
            //         "User-Agent": "imgfornote"
            //     }
            // });
        })
    })
    $("#turnBackBtn1").on("click", function () {
        window.location.href = "../index.html";
    })
    //打开通讯录
    //提交参数到ma
    $("#completeBtn").on("click", function () {
        var params = {transtype:"register"};
        var username = $("#userconut").val();
        var pwd = $("#userpwd").val();
        if(username ==""||pwd=="") {
            $(".totast").css("display","block");
            confirmTotast();
            return;
        }
        params.nameVal = username;
        params.pwd = pwd;
        // summer.writeConfig({
        //     "host" : "192.168.1.103", //向configure中写入host键值
        //     "port" : "8090" //向configure中写入port键值
        // });
        $_ajax._post({
            url: "com.bankindustrial.controller.BankIndustrialCheckController",
            handler:"register",
            data:params,
            success: "mycallback()",
            err:"myerror()"
        })
        // summer.callAction({
        //     "viewid": "com.bankindustrial.controller.BankIndustrialCheckController", //后台带包名的Controller名
        //     "action": "register", //方法名
        //     "params": params,//自定义参数
        //     "callback": "mycallback()", //请求回来后执行的js方法
        //     "error": "myerror()", //失败回调的js方法
        //     "header": {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         "User-Agent": "imgfornote"
        //     }
        // });
    })
    //confirm   totast
    function confirmTotast() {
        var confirmBtn = $(".totast-container-right")[0];
        confirmBtn.addEventListener("click",function () {
            $(".totast").css("display","none")
        })
    }
}
function mycallback(data) {
    window.location.href = "../index.html";
}
function myerror(err) {
    alert("errpr: "+JSON.stringify(err))
}
function myimgcallback(data) {
    $(".imgtotast").css("display","block");
    $(".imgTotastConfirm").on("click",function () {
        $(".imgtotast").css("display","none");
    });

}
function myimgerror(err) {
    alert(JSON.stringify(err))
}
