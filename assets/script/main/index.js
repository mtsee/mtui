// 所有模块都通过 define 来定义
define(function(require, exports, module) {

	//视频弹窗 - 打开时回调
	var vedioFun = function(){
		$("#indexVideo")[0].play();
	}
	//视频弹窗 - 关闭时回调
	var closeBack = function(){
		$("#indexVideo")[0].pause();
	}
	$(".play").showWindow({id:'indexMovie',callback:vedioFun,closeBack:closeBack});

    //使首页数字变化
    var $odometerArr = [];
    var numAnimate = function(index){
    	var $odometer = $("#odometer"+index);
    	$odometerArr.push($odometer);
	    var increasedNum = parseInt($odometer.attr("data-num"));
	    $odometer.numberAnimate();
	    $odometer.numberAnimate('set',increasedNum);

	    //循环
	    setInterval(function () {

	        // increasedNum += Math.floor(Math.random() * 100);
	        // $odometer.numberAnimate('set',increasedNum);

	        var data = [111111111,22222222,33333333];
	        for(var i=0; i<3; i++){
	        	$odometerArr[i].numberAnimate('set',data[i]);
	        }

	    }, 2000);
    };
  
    numAnimate(1);
    numAnimate(2);
    numAnimate(3); 

});