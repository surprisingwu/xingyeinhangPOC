document.addEventListener("deviceready", function() {
	document.addEventListener("backbutton", function() {
		window.location.href = "../html/news.html";
	}, false);
}, false);
summerready = function() {
var ViewModel = function () {            
                };		
                var jsonArray = [
                        {         
                            "comments": "2300ggeyhdghegdyegcdcffdfcytsdygdeygdsh"
                        }
                    ];
                var viewModel = new ViewModel();
        		viewModel.data = ko.observableArray(jsonArray);
                ko.applyBindings(viewModel);		
        		 //构造控件实例
                var listview = UM.listview("#listview");
                //添加控件方法
                listview.on("itemSwipeRight", function (sender, args) {
                    //这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
                    //sender.showItemMenu(args.$target);
                    window.location.href = "news.html";
                });
                $(".turnBackNewsPage").on("click",function () {
                    window.location.href = "news.html";
                })
var xx=getQueryByName("titletonext");
$("#title").html(xx);
//alert(xx);
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
