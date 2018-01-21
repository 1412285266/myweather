//1.引入远程数据
//2关于城市信息
var city;
var tianqi;
$.ajax({
    url:"https://www.toutiao.com/stream/widget/local_weather/city/",
    dataType:"jsonp",
    method:"get",
    success:function(obj){
    	city=obj.data;
    }
})
//获取天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
    dataType:"jsonp",
    method:"get",
    success:function(obj){
    tianqi=obj.data; 
    }
})
//页面加载函数
window.onload=function(){

	//加载数据
    update();

    //页面交互
    var pos=document.getElementsByClassName("pos")[0];
    var cityBox=document.getElementsByClassName("city")[0];
    //点击城市出现城市详情页
    pos.onclick=function(){
         cityBox.style.display="block";
    }

    //点击城市详情，跳转首页，出现该城市的天气情况
    var BOX=$(".city .citys .con .box");
    for(let i in BOX){
    	BOX[i].onclick=function(){
    	var chengshi=this.innerHTML;
        //调用AJAX函数
    	AJAX(chengshi);
        }
    }
    //搜索部分
    var searchBox=document.getElementsByClassName("searchBox")[0];
    var button=document.getElementsByClassName("button")[0];
    var text;
    searchBox.onfocus=function(){
        button.innerHTML="确认";
        text=searchBox.value;
    }
        button.onclick=function(){
        var neirong=button.innerHTML;
        
        if(neirong=="取消"){
        	var city3=document.getElementsByClassName("city")[0];
        	city3.style.display="none";
        }else{
        	for(let i in city){
        		for(let j in city[i]){
        			if(text==j){
        				AJAX(text);
        				return;
        			}else{
        				alert("没有此城市的天气信息");
        				return;
        			}
        		}
        	}
        }
    }
}

//获取点击城市的天气信息函数
function AJAX(str){
    $.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
    dataType:"jsonp",
    method:"get",
    success:function(obj){
    tianqi=obj.data;
    update();
    var city2=$(".city")[0];
    city2.style.display="none";  
    }
})
}
//获取数据的函数
function update()
{   
    //当前城市
    var pos=document.getElementsByClassName("pos")[0];
    pos.innerHTML=tianqi.city;

    //当前空气质量
    var quality_level=document.getElementsByTagName("h5")[0];
    quality_level.innerHTML=tianqi.weather.quality_level;

    //当前温度
    var current_temperature=document.getElementsByClassName("title1")[0];
    current_temperature.innerHTML=tianqi.weather.current_temperature+"°";

    //当前天气状况
    var current_condition=document.getElementsByClassName("title2")[0];
    current_condition.innerHTML=tianqi.weather.current_condition+"°"; 

    //当前风的风向
    var wind_direction=document.getElementsByClassName("wind_der")[0];
    wind_direction.innerHTML=tianqi.weather.wind_direction;

    //当前风的等级
    var wind_level=document.getElementsByClassName("wind_level")[0];
    wind_level.innerHTML=tianqi.weather.wind_level+"级";    

    //今天最高温度
    var dat_high_temperature=document.getElementsByClassName("heighter")[0];
    dat_high_temperature.innerHTML=tianqi.weather.dat_high_temperature+"°"; 

    //今天最低气温
    var dat_low_temperature=document.getElementsByClassName("lower")[0];
    dat_low_temperature.innerHTML=tianqi.weather.dat_low_temperature+"°"; 

      //今天天气
    var day_condition=document.getElementsByClassName("con")[0];
    day_condition.innerHTML=tianqi.weather.day_condition; 


    //今天的天气情况图标
    var taday_icon=document.getElementsByClassName("conPic")[0];
    taday_icon.style=`background-image: url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

    //明天最高气温
    var tomorrow_high_temperature=document.getElementsByClassName("heighter1")[0];
    tomorrow_high_temperature.innerHTML=tianqi.weather.tomorrow_high_temperature+"°"; 

    //明天最低气温
    var tomorrow_low_temperature=document.getElementsByClassName("lower1")[0];
    tomorrow_low_temperature.innerHTML=tianqi.weather.tomorrow_low_temperature+"°"; 

        //明天天气
    var tomorrow_condition=document.getElementsByClassName("tcon")[0];
    tomorrow_condition.innerHTML=tianqi.weather.tomorrow_condition; 

    //明天的天气图标
    var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
    tomorrow_icon.style=`background-image: url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

    //每小时的天气情况
    var box1=document.createElement("div");
    box1.className="box";
    var wrap=document.getElementsByClassName("wrap")[0];
    wrap.appendChild(box1);

    var time=document.createElement("div");
    time.className="time";
    box1.appendChild(time);
   
    var icon=document.createElement("div");
    icon.className="icon";
    box1.appendChild(icon);

    var timeTem=document.createElement("div");
    timeTem.className="timeTem";
    box1.appendChild(timeTem);

    //获取每小时天气情况
    var hourlyArr=tianqi.weather.hourly_forecast;
    var wrap=document.getElementsByClassName("wrap")[0];
    for(let i in hourlyArr){
    	//创建box
    	 var box1=document.createElement("div");
         box1.className="box";
        //创建time块
         var time=document.createElement("div");
         //添加类名
         time.className="time";
         //添加到父级元素上
         box1.appendChild(time);
         //添加内容
         time.innerHTML=hourlyArr[i].hour+":00";
        //创建图标块
         var icon=document.createElement("div");
         icon.className="icon";
         box1.appendChild(icon);
         //修改样式
         icon.style=`background-image: url("img/${hourlyArr[i].weather_icon_id}.png")`;
        
         var timeTem=document.createElement("div");
         timeTem.className="timeTem";
         box1.appendChild(timeTem);
         timeTem.innerHTML=hourlyArr[i].temperature+"°";

         box1.appendChild(timeTem);
         wrap.appendChild(box1);
        }
    //未来15天天气情况
        var dayArr=tianqi.weather.forecast_list;
        var wrap1=document.getElementsByClassName("wrap1")[0];
    for(let i in dayArr){
    	 var box2=document.createElement("div");
         box2.className="box2";

         var time1=document.createElement("div");
         time1.className="time";
         box2.appendChild(time1);
         time1.innerHTML=dayArr[i].date;

         var date=document.createElement("div");
         date.className="date";
         box2.appendChild(date);
         date.innerHTML=dayArr[i].condition;
   
         var daytime=document.createElement("div");
         daytime.className="daytime";
         box2.appendChild(daytime);
         daytime.style=`background-image: url("img/${dayArr[i].weather_icon_id}.png")`;

         var wendu=document.createElement("div");
         wendu.className="wendu";
         box2.appendChild(wendu)
         wendu.innerHTML=dayArr[i].high_temperature+"°";

         var wendu1=document.createElement("div");
         wendu1.className="wendu1";
         box2.appendChild(wendu1);
         wendu1.innerHTML=dayArr[i].low_temperature+"°";

         var cloud=document.createElement("div");
         cloud.className="cloud";
         box2.appendChild(cloud);
         cloud.innerHTML=dayArr[i].wind_direction;

         var jishu=document.createElement("div");
         jishu.className="jishu";
         box2.appendChild(jishu);
         jishu.innerHTML=dayArr[i].wind_level+"级";
   
         wrap1.appendChild(box2);
        } 
    //关于城市
    var city1=document.getElementsByClassName("city")[0];
    for(let i in city){
    	var citys=document.createElement("div");
    	citys.className="citys";

    	var title=document.createElement("div");
    	title.className="citys";
    	title.innerHTML=i;
    	citys.appendChild(title);

    	var con=document.createElement("div");
    	con.className="con";

    	for(let j in city[i]){
    		var box=document.createElement("div");
    		box.className="box";
    		box.innerHTML=j;
    		con.appendChild(box);
    	}
    	citys.appendChild(con);
    	city1.appendChild(citys);
    }
}