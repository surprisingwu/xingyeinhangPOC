document.addEventListener("deviceready", function() {
    document.addEventListener("backbutton", function() {
        try{
            localStorage.removeItem("navIndex");
        }catch (e){}
        window.location.href = "../firstpage.html";
    }, false);
}, false);
$(function () {
    Vue.component('timerBtn',{
        template: '<button v-on:click="run" ref="hehhehe" :disabled="disabled || time > 0">{{ text }}</button>',
        props: ["second"],
        data:function () {
            return {
                time: 0,
                disabled:false
            }
        },
        methods: {
            run: function () {
                this.$emit('run');
            },
            start: function(){
                this.time = this.second;
                this.timer();
            },
            stop: function(){
                this.time = 0;
                this.disabled = false;
            },
            setDisabled: function(val){
                this.disabled = val;
            },
            timer: function () {
                if (this.time > 0) {
                    this.time--;
                    setTimeout(this.timer, 1000);
                }else{
                    this.disabled = false;
                }
            }

        },
        computed: {
            text: function () {
                return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
            }
        }
    });
    var vm = new Vue({
        el: "#container",
        data: {
            easyMesg: true,
            transferName: "",
            transferAccount: "",
            detailMesg: false,
            getMoneyBank: "",
            modeMesg: "实时",
            moneyCount: "",
            transferUserMesg: "",
            checkMesg:false,
            second: 60,
            disabled:false,
            timeBtnMesg:"",
            endMes:false,
            modeselect:false,
            friendselectList:false,
            items:[
                {name:"王娟"},
                {name:"陈其彤"},
                {name:"刘刚"},
                {name:"娃哈哈"},
                {name:"蒙牛"},
                {name:"酸奶"},
            ]
        },
        methods: {
            easyMesgHandler: function (e) {
                e.preventDefault();
                if(this.transferName != "" && this.transferAccount != "") {
                    this.easyMesg = false;
                    this.detailMesg = true;
                }
            },
            changeColor: function () {
                if (this.transferName == "" || this.transferAccount == "") {
                    this.$refs.changebtncolor.style.border = "0.026667rem solid #D3D3D3";
                    this.$refs.changebtncolor.style.background = "#D3D3D3";
                }
                if (this.transferName != "" && this.transferAccount != "") {
                    this.$refs.changebtncolor.style.border = "0.026667rem solid #004287";
                    this.$refs.changebtncolor.style.background = "#004287";

                }
            },
            deleteVal: function () {

            },
            detailMesgHandler: function (e) {
                e.preventDefault();
                if (this.getMoneyBank==""||this.moneyCount==""||this.transferUserMesg=="") {
                    return;
                }
                this.detailMesg = false;
                this.checkMesg = true;
            },
            changeDetailBtnColor:function () {
                if (this.getMoneyBank==""||this.moneyCount==""||this.transferUserMesg=="") {
                    this.$refs.detailMesgBtn.style.border = "0.026667rem solid #D3D3D3";
                    this.$refs.detailMesgBtn.style.background = "#D3D3D3";
                }else {
                    this.$refs.detailMesgBtn.style.border = "0.026667rem solid #004287";
                    this.$refs.detailMesgBtn.style.background = "#004287";
                }

            },
            timeBtncheckmesg:function () {
                if (this.timeBtnMesg==""){
                    this.$refs.checkMesgBtn.style.border = "0.026667rem solid #D3D3D3";
                    this.$refs.checkMesgBtn.style.background = "#D3D3D3";
                }  else {
                    this.$refs.checkMesgBtn.style.border = "0.026667rem solid #004287";
                    this.$refs.checkMesgBtn.style.background = "#004287";
                }
            },
            checkMesgHandler:function (e) {
                e.preventDefault();
                if(this.timeBtnMesg=="") {
                    return
                }
                this.checkMesg = false;
                this.endMes = true;

            },
            sendCode:function(){
                vm.$refs.timerbtn.setDisabled(true); //设置按钮不可用
                vm.$refs.timerbtn.start();
                // hz.ajaxRequest("sys/sendCode?_"+$.now(),function(data){
                //     if(data.status){
                //         vm.$refs.timerbtn.start(); //启动倒计时
                //     }else{
                //         vm.$refs.timerbtn.stop(); //停止倒计时
                //     }
                // });
            },
            shareWechat:function () {

            },
            shareMesgfriend:function () {

            },
            selectMode:function () {
                this.modeselect = true;
            },
            listitem_1:function () {
                this.modeMesg="实时";
            },
            listitem_2:function () {
                this.modeMesg="普通";
            },
            listitem_3:function () {
                this.modeMesg="次日";
            },
            turnback:function () {
                this.modeselect = false;
                this.detailMesg = true;
            },
            turnBackEasyMesg:function () {
                this.easyMesg = true;
                this.friendselectList = false;
            },
            listitem:function (item) {
                this.easyMesg = true;
                this.friendselectList = false;
                this.transferName = item.name;

            },
            showSelectFriendList:function () {
                this.easyMesg = false;
                this.friendselectList = true;
            },
            turnBackIndex: function () {
                window.location.href = "../firstpage.html"
            },
            turnBackToTransfer: function () {
                this.detailMesg = false;
                this.easyMesg = true;
            },
            turnBackToTransferDetail: function () {
                this.checkMesg = false;
                this.detailMesg = true;
            },
            turnBackToCheck: function () {
                this.endMes = false;
                this.checkMesg= true;
            },
            selectModeContainerUlLiHandler: function (event) {
                this.modeMesg = event.target.innerText;
                this.modeselect = false;
            },
            restartMesg: function () {
                    this.endMes = false;
                    this.easyMesg = true;
                    this.transferName = "";
                    this.transferAccount = "";
                    this.getMoneyBank = "";
                    this.modeMesg ="实时";
                    this.moneyCount = "";
                    this.transferUserMesg = "";
                    this.timeBtnMesg = "";
            },
            fixedWatch: function (el) {
                if(document.activeElement.nodeName == 'INPUT'){
                    el.css('position', 'static');
                } else {
                    el.css('position', 'fixed');
                }
            }
        },
        computed: {
            getRounNumber: function () {
                var num = "";
                for(var i = 0; i < 10; i++) {
                    num += Math.floor(Math.round()*10);
                }
                return Number(num);
            }
        },
        created: function () {

        }
    })


})