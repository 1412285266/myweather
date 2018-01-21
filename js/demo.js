// var aa="123";
// console.log(aa);
// let button=document.getElementsByClassName("button")[0];
// //当页面加载的时候
window.onload=function(){
    //当点击按钮消失
    let button=document.getElementsByClassName("button");
    button[0].onclick=function(){
	//alert("这是一个按钮");
	    var city=document.getElementsByClassName("city");
	    console.log(city);
	    city[0].style.display="none";
    }
    var pos=document.getElementsByClassName("pos");
    pos[0].onclick=function(){
    	var city=document.getElementsByClassName("city");
    	console.log(city);
	    city[0].style.display="block";

    }
}

//引入远程数据

//关于城市的数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var city=obj.data;
		console.log(city);
	}
})

//关于天气的数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
    success:function(obj){
		var tianqi=obj.data;
		// console.log(tianqi);
		console.log(tianqi.weather.current_temperature);
        //var tem=tianqi.weather.
    }

})


//js
//1.当整个页面加载完成时，才可以对元素进行操作
//2.获取元素：document.getElementsByClassName("")[0];
//3.添加事件函数
//4.进行样式操作