var x1,y1,x2,y2; // 坐标记录 
var currentViewIndex = 1;
var scaleRatio = 1;
var matrixMap = {}; // key 为零件名称， value 为 多边形数据（字符串）
var positionMap = {}; // key 为 零件名称  value 为位置信息 （point对象）
var sizeMap = {};  // key 为零件名称 value 为尺寸信息（size 对象）
var partMap = {}; // key 为零件变量名，value为零件中文名称
var partAtWhichViewMap = {}; // key 为某个零件变量名， value为所属视图编号
var Map = []; 
var imgSelectElement = "span";
var touchEnabled = false; 
var carViewContainerMaxHeight = 400;
var colorCount = 3;
var fixWidth = 0; // 如果希望汽车图选区域固定大小，请设置此字段，取值范围：320~750。当小于320或者大于750时，代表自动调节大小



/*----------------------------------暴露API--------------------------------------*/

/**
 *  如果希望汽车图选区域固定大小，请调用此函数
 *  width: 取值范围：320~750。当小于320或者大于750时，代表自动调节大小
 */
function setFixWidth(width){
	fixWidth = width;
}

/**
 * 向左滑，顺时针转动图片，即view index 递加
 */
function slideToLeft(){
	var nextViewIndex =  (currentViewIndex % 4) + 1;
	showViewByIndex(nextViewIndex);
}

/**
 * 向右滑，逆时针转动图片，即view index 递减
 */
function slideToRight(){
	var nextViewIndex = (currentViewIndex + 2 ) % 4 + 1 ;
	showViewByIndex(nextViewIndex);
}

/*
 * 显示某个部件的某个状态
 * partName 为部件的代号名, 如 component-1
 * status 状态可取三个值：
 * 0 - 白底图
 * 1 - 喷漆图
 * 2 - 钣金图
 * resetView 代表是否需要重置视图到基本面
 */
function showPartEx(partName, status, resetView){
	var selectorText = imgSelectElement+"."+partName;
	if($(selectorText).length == 0){
		loadPartImages(partName);
	}
	if(status == 0){
		hiddenPart(partName);
		unchoosePart(partName);
	}
	else if(status == 1){
		showPenqi(partName);
		choosePartPenqi(partName);
	}
	else if(status = 2){
		showBanjin(partName);
		choosePartBanjin(partName);
	}
	if(resetView){
		var viewIndex = partAtWhichViewMap[partName];
		showViewByIndex(viewIndex);
	}
}

/*
 * 显示某个部件的某个状态
 * partName 为部件的代号名, 如 component-1
 * status 状态可取三个值：
 * 0 - 白底图
 * 1 - 喷漆图
 * 2 - 钣金图
 */
function showPart(partName, status){
	showPartEx(partName, status, false);
}

/*--------------------------------事件HOOK动作 goes here------------------------------------*/

/**
 * 取消了部件触发此事件
 */
function unchoosePart(partName){
	hideComponentDesc(partName);
}

/**
 * 选择了部件的喷漆服务将会触发此事件
 */
function choosePartPenqi(partName){
	var ele = $("ul.cv-components-desc li."+partName);
	if(ele.length==0){
		showComponentDesc(partName);
	}
	$("ul.cv-components-desc li."+partName+" div.cv-penqi").addClass("cv-desc-selected");
	$("ul.cv-components-desc li."+partName+" div.cv-banjin").removeClass("cv-desc-selected");
	 
}

/**
 * 选择了部件的钣金服务将会触发此事件
 */
function choosePartBanjin(partName){
	var ele = $("ul.cv-components-desc li."+partName);
	if(ele.length==0){
		showComponentDesc(partName);
	}
	$("ul.cv-components-desc li."+partName+" div.cv-penqi").addClass("cv-desc-selected");
	$("ul.cv-components-desc li."+partName+" div.cv-banjin").addClass("cv-desc-selected");
}


 

/*-----------------------------初始化区----------------------------------*/

/**
 * 构建area区域
 */
function constructAreas(){ 
	Map[1] = $("#Map1");
	Map[2] = $("#Map2");
	Map[3] = $("#Map3");
	Map[4] = $("#Map4");
	for(var key in matrixMap){
		var arr = matrixMap[key];
		var keyItems = key.split('-');
		var viewIndex = keyItems[3];
		var componentName = keyItems[0] + "-" + keyItems[1];
		var areaPointsString = arr.join(','); 
		var areaHtml = " <area class='area-part "+componentName+" "+key+"'  shape='poly' coords='"+areaPointsString+"' href='javascript:;' ></area>";
		Map[viewIndex].append(areaHtml);
	}
}

function resize(){ 
	// 计算最新矩阵
	var currentView = $('#touch-board-'+currentViewIndex); 
	var w1 = $("div.cv-row-container").width();
	var w2 = $("div.cv-car-view-container").width();
	var left = (w1 - w2) /2;
	$("div.cv-car-view-container").css("left",left);
	var newImgWidth = currentView.width(); 
	//console.log("resizing! current width is {}", newImgWidth);
	if( newImgWidth == imgWidth){
		scaleRatio = 1;
		return;
	}
	scaleRatio = newImgWidth/imgWidth;
	
	//console.log("resizing! new scaleRatio is {}", scaleRatio);
	imgWidth = newImgWidth;
	recalculateMatrix();
	//重建AREA区域
	$('area.area-part').remove();
	constructAreas();
	//重新计算所有切图高宽，位置
	repositionComponents(); 
	//重设外层大小 
	var viewHeight = currentView.height();
	$("div.cv-car-view-container").height(viewHeight);
	$("div.cv-row-container").height(viewHeight);
	$("div.other-part").css("margin-top", viewHeight + 10); //for test html
	console.log("外层高度:{}", viewHeight);
	//重新挂载area事件
	areaEventLoad();
}



/**
 * 根据展示宽度重新计算:
 * 1. area区域
 * 2. 零件位置
 * 3. 零件尺寸
 */
function calculateRatio(width){
	if(width != 750){
		scaleRatio = width / 750 ;
	}
	setContainerHeight(); 
}


function setContainerHeight(){
	var realImageHeight = carViewContainerMaxHeight * scaleRatio;
	$("div.cv-car-view-container").height(realImageHeight);  
	$("div.cv-row-container").height(realImageHeight);
	var w1 = $("div.cv-row-container").width();
	var w2 = $("div.cv-car-view-container").width();
	var left = (w1 - w2) /2;
	$("div.cv-car-view-container").css("left",left);
}

/**
 * Re-calculate all data by scaleRatio
 */
function recalculateMatrix(){
	//console.log("doing calculating...");
	for(var key in matrixMap){
		var arr = [];
		var areaArray = matrixMap[key];
		for( var i in areaArray ){
			arr.push(areaArray[i]*scaleRatio);
		}
		matrixMap[key] = arr;
	}
	for(var key in positionMap){
		positionMap[key].x =  positionMap[key].x * scaleRatio ;
		positionMap[key].y =  positionMap[key].y * scaleRatio ; 
		//console.log("new value for position ({}) is x = {}, y = {}", key, positionMap[key].x, positionMap[key].y);
	}
	
	for(var key in sizeMap){
		sizeMap[key].width =  sizeMap[key].width * scaleRatio ;
		sizeMap[key].height =  sizeMap[key].height * scaleRatio ; 
		//console.log("new value for size ({}) is width = {}, height = {}", key, sizeMap[key].width, sizeMap[key].height);
	}
}

function repositionComponents(){
	for(var key in positionMap){
		 var keyParts = key.split("-");
		 var componentName = keyParts[0]+"-"+keyParts[1];
		 var viewName = keyParts[2]+"-"+keyParts[3];
		 var position = positionMap[key];
		 var size = sizeMap[key];
		 var spanEle =  $( "div."+viewName +" span."+componentName); 
		 spanEle.css('background-size', ""+size.width+"px "+size.height+"px");
		 //console.log("cmd: {}.css('background-size',{})", "div."+viewName +" span."+componentName, size.width+"px " + size.height+"px;");
		 spanEle.width(size.htmlWidth());
		 spanEle.height(size.htmlHeight());
		 spanEle.css("left",position.htmlX());
		 spanEle.css("top",position.htmlY());
	}
}

/*----------------------------自定义类---------------------------------*/
function point(x, y){ 
	this.x = x;
	this.y = y;
	
	
	this.htmlX = function(){
		return this.x + "px";
	}
	this.htmlY = function(){
		return this.y + "px";
	} 
}

function size(w, h){ 
	this.width = w;
	this.height = h;
	
	this.htmlWidth = function(){
		return this.width + "px";
	}
	this.htmlHeight = function(){
		return this.height + "px";
	} 
}

/*----------------------------控制区-----------------------------------*/
function eventInitialize(){
	areaEventLoad(); 
	$("span.component").on('resize', function(e){
		e.preventDefault();
		return false;
	});
	$('.cv-touch-board').on('click', function (e) { 
		var viewContainer = $('.cv-car-view-container.view-'+currentViewIndex);
		var left = viewContainer.offset().left;
		var top = viewContainer.offset().top;
		x1 = x2 = Math.round( e.pageX - left )  - 1; 
		y1 = y2 = Math.round( e.pageY - top );
		var currentValue = $("#showPoints").val();
		var newValue = currentValue + "," +x2 + "," +y2;
		$("#showPoints").val(newValue); 
		e.preventDefault();	
	}); 
	
	$('.cv-row-container').on('touchstart',  function (e) { 
		 if(!touchEnabled)
	        	touchEnabled = true;
	    if (e.originalEvent.changedTouches.length) {
	        var touch = e.originalEvent.changedTouches[0];
	        x1 = Math.round(touch.clientX);
	        y1 = Math.round(touch.clientY); 
	    }
	    e.preventDefault();	
	}).on("touchmove", function(e){
		e.preventDefault();	
	}).on('touchend', function (e) {  
	    if (e.originalEvent.changedTouches.length) {
	        var touch = e.originalEvent.changedTouches[0];   
	        x2 = Math.round(touch.clientX);
	        y2 = Math.round(touch.clientY);  
	        var slideStatus =  judgeDirection(x1, y1, x2, y2) ;
	        if(slideStatus == 1){
	        	slideToRight();
	        }
	        else if( slideStatus  == -1){
	        	slideToLeft();
	        } 
	    }
	    e.preventDefault();	
	}).on("mousedown", function(e){
		if(touchEnabled) return;//click 事件将由touchend代替 
//		x1 = Math.round(e.originalEvent.clientX);
//      y1 = Math.round(e.originalEvent.clientY); 
   		x1 = Math.round(e.clientX);
	    y1 = Math.round(e.clientY);
	    e.preventDefault();	
	}).on("mouseup", function(e){
		if(touchEnabled) return;//click 事件将由touchend代替 
//		x2 = Math.round(e.originalEvent.clientX);
//      y2 = Math.round(e.originalEvent.clientY); 
		x2 = Math.round(e.clientX);
	    y2 = Math.round(e.clientY);
        var slideStatus =  judgeDirection(x1, y1, x2, y2) ;
        if(slideStatus == 1){
        	slideToRight();
        }
        else if( slideStatus  == -1){
        	slideToLeft();
        } 
        e.preventDefault();	
	}); 
	//判断手机横竖屏状态：
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (	window.orientation === 180 || window.orientation === 0 ) { 
            // 竖屏
            
            
        } 
        if (	window.orientation === 90 || window.orientation === -90 ){ 
            // 横屏
        }  
    }, false); 
}

function areaEventLoad(){
	$('.area-part').on('touchstart',  function (e) {
	    if (e.originalEvent.changedTouches.length) {
	        var touch = e.originalEvent.changedTouches[0];
	        x1 = Math.round(touch.clientX);
	        y1 = Math.round(touch.clientY);
	        if(!touchEnabled)
	        	touchEnabled = true; 
	    }
	    e.preventDefault();	
	}).on('touchend', function (e) {  
	    if (e.originalEvent.changedTouches.length) {
	        var touch = e.originalEvent.changedTouches[0];  
	        var partName = touch.target.className.split(" ")[1];
	        x2 = Math.round(touch.clientX);
	        y2 = Math.round(touch.clientY);  
	    	var slideStatus =  judgeDirection(x1, y1, x2, y2) ;
	        if(slideStatus == 1){
	        	slideToRight();
	        	return false; //避免出发外层touch事件
	        }
	        else if( slideStatus  == -1){
	        	slideToLeft();
	        	return false;//避免出发外层touch事件
	        } 
	    	else{ //click
	        	var status = getStatusOfPart(partName);
	        	// status = ( status + 1 ) % 3 ; 三色切换变化
	        	status = (status + 1) % colorCount; //双色切换变化
	        	showPart(partName, status); 
	        } 
	    }
	    e.preventDefault();	
	}).on("touchmove", function(e){
		e.preventDefault();	
	}).on('click', function (e) {
		if(touchEnabled) return;//click 事件将由touchend代替
		var partName =  $(e.target).attr('class').split(" ")[1]; 
		var status = getStatusOfPart(partName);
    	// status = ( status + 1 ) % 3 ; 三色切换变化
    	console.log("current status is :", status);
    	status = (status + 1) % colorCount; //双色切换变化
    	console.log("new status is :", status);
    	showPart(partName, status); 
    	e.preventDefault();	
	}); 
}


/*----------------------------------自用函数 ------------------------------------*/
/**
 * 获取某个部件的状态：
 * 0 - 白底图
 * 1 - 喷漆图
 * 2 - 钣金图
 */
function getStatusOfPart(partName){
	if($(imgSelectElement + "."+partName+".banjin").length > 0 && !($(imgSelectElement + "."+partName+".banjin").hasClass("hidden")))
		return 2;
	if($(imgSelectElement + "."+partName+".penqi").length > 0 && !($(imgSelectElement + "."+partName+".penqi").hasClass("hidden")))
		return 1;
	return 0;
}


/**
 * 设置视图显示尺寸
 */
function setCarViewContainerWidth(){
	if(fixWidth>=320 && fixWidth <= 750){
		$("div.cv-car-view-container").width(fixWidth);
	}
}

function showBanjin(partName){ 
	var banjinSelector = imgSelectElement + "."+partName+".banjin";
	var penqiSelector = imgSelectElement + "."+partName+".penqi";
	//显示钣金
	var banjinElement = $(banjinSelector);
//	var banjinBackgroundClassName = partName+"-view-"+currentViewIndex+"-b";
//	banjinElement.addClass(banjinBackgroundClassName);
	banjinElement.removeClass("hidden")
	//隐藏喷漆
	var penqiElement = $(penqiSelector);
//	var penqiBackgroundClassName = partName+"-view-"+currentViewIndex+"-p";
//	penqiElement.removeClass(penqiBackgroundClassName);
	penqiElement.addClass("hidden")
}

function showPenqi(partName){ 
	var banjinSelector = imgSelectElement + "."+partName+".banjin";
	var penqiSelector = imgSelectElement + "."+partName+".penqi";
	//隐藏钣金
	var banjinElement = $(banjinSelector);
//	var banjinBackgroundClassName = partName+"-view-"+currentViewIndex+"-b";
//	banjinElement.removeClass(banjinBackgroundClassName);
	banjinElement.addClass("hidden");
	//显示喷漆
	var penqiElement = $(penqiSelector);
//	var penqiBackgroundClassName = partName+"-view-"+currentViewIndex+"-p";
//	penqiElement.addClass(penqiBackgroundClassName);
	penqiElement.removeClass("hidden");
}

/**
 * 隐藏部件：即隐藏钣金和喷漆背景
 */
function hiddenPart(partName){ 
	var banjinSelector = imgSelectElement + "."+partName+".banjin";
	var penqiSelector = imgSelectElement + "."+partName+".penqi";
	//隐藏钣金
	var banjinElement = $(banjinSelector);
	//var banjinBackgroundClassName = partName+"-view-"+currentViewIndex+"-b";
	//banjinElement.removeClass(banjinBackgroundClassName);
	banjinElement.addClass("hidden");
	//隐藏喷漆
	var penqiElement = $(penqiSelector);
//	var penqiBackgroundClassName = partName+"-view-"+currentViewIndex+"-p";
//	penqiElement.removeClass(penqiBackgroundClassName);
	penqiElement.addClass("hidden");
} 

/**
 * 加载零件的所有图
 */
function loadPartImages(partName){ 
	for( var i = 1 ; i <= 4 ; i++){
		var componentViewName = partName+"-view-"+i; 
		if(sizeMap[componentViewName]!=null){
			preLoadImg("img/view"+i+"/"+componentViewName+"-b.png");
			preLoadImg("img/view"+i+"/"+componentViewName+"-p.png");
		} 
		var penqiImageName = componentViewName + "-p";
		var position = positionMap[componentViewName];
		var size = sizeMap[componentViewName];
		if(position == null || size == null)
		 	continue;
//		var imgHtml_b = "<img class = 'component "+partName+" banjin hidden' style='width:"+size.width+"px;height:"+size.height+"px;left:"+position.x+"px;top:"+position.y+"px' src = 'img/view"+i+"/"+componentViewName+"-b.png' />";
//		var imgHtml_p = "<img class = 'component "+partName+" penqi hidden' style='width:"+size.width+"px;height:"+size.height+"px;left:"+position.x+"px;top:"+position.y+"px' src = 'img/view"+i+"/"+componentViewName+"-p.png' />";
		var imgHtml_b = "<span class = 'component "+partName+" banjin' style='width:"+size.width+"px;height:"+size.height+"px;left:"+position.x+"px;top:"+position.y+"px;background:url(img/view"+i+"/"+componentViewName+"-b.png) no-repeat;background-size:"+size.width+"px "+size.height+"px;'></span>";
		var imgHtml_p = "<span class = 'component "+partName+" penqi' style='width:"+size.width+"px;height:"+size.height+"px;left:"+position.x+"px;top:"+position.y+"px;background:url(img/view"+i+"/"+componentViewName+"-p.png) no-repeat;background-size:"+size.width+"px "+size.height+"px;'></span>";
		$("div.view-"+ i).append(imgHtml_b);
		$("div.view-"+ i).append(imgHtml_p); 
	}
}

function preLoadImg(imgUrl){
	var img = new Image();
	img.src = imgUrl;
}

/**
 * 判断滑动方向:
 * 1：向右
 * 0：未滑动
 * -1：向左
 * @param {Object} sx  起始横坐标
 * @param {Object} sy  起始纵坐标
 * @param {Object} ex  结束横坐标
 * @param {Object} ey  结束纵坐标
 */
function judgeDirection(sx, sy, ex, ey){
	var diff = Math.abs(ex - sx) ;
	if( diff < 30)
	 return 0;
	if( ex > sx )
		return 1;
	else
		return -1;
}

/**
 * 判断滑动方向-严格版:
 * 1：向右
 * 0：未滑动
 * -1：向左
 * @param {Object} sx  起始横坐标
 * @param {Object} sy  起始纵坐标
 * @param {Object} ex  结束横坐标
 * @param {Object} ey  结束纵坐标
 */
function judgeDirectionMeanVersion(sx, sy, ex, ey){
	var diff = Math.abs(ex - sx) ;
	if( diff < 1)
	 return 0;
	if( ex > sx )
		return 1;
	else
		return -1;
}




function showViewByIndex(index){
	var cssSelectorText = ".view-"+index;
	for(var i = 1; i <= 4; i++){
		var tempCssSelectorText = ".view-"+i;
		if(i == index){
			$(cssSelectorText).removeClass("none"); 
		}
		else{  
			if(!($(tempCssSelectorText).hasClass("none")))
				$(tempCssSelectorText).addClass("none");
		}
	} 
	currentViewIndex = index;
}

/*-------------------------------the others----------------------------------------*/
function showComponentDesc(partName){
	if(partName=="component-18")
			return ;
	var fatherEle = $("ul.cv-components-desc");
	var partCnName = partMap[partName];
	var partName_p = "\""+partName+"\"";
	if(partCnName == null) partName ="未知零件";
	var componentDesc = "<li class='"+partName+"'> <div class='cv-desc-title'>"+partCnName+"</div> <div class='cv-service cv-penqi'>喷漆</div> <div class='cv-service cv-banjin'>钣金</div> </li>";
	fatherEle.append(componentDesc);
	$("li."+partName+" div.cv-service.cv-penqi").on('touchstart',  function (e) {
	    if (e.originalEvent.changedTouches.length) {
	        var touch = e.originalEvent.changedTouches[0];
	        x1 = Math.round(touch.clientX);
	        y1 = Math.round(touch.clientY);
	        if(!touchEnabled)
	        	touchEnabled = true; 
	    } 
	}).on("touchend",function(e){
		if(!touchEnabled)
	        touchEnabled = true; 
        var touch = e.originalEvent.changedTouches[0];  
	    x2 = Math.round(touch.clientX);
        y2 = Math.round(touch.clientY);  
    	var slideStatus =  judgeDirectionMeanVersion(x1, y1, x2, y2) ;
        if(slideStatus == 0){  
        	var alreadySelected = e.target.className.indexOf('cv-desc-selected') >= 0 ;
		    if(alreadySelected){
		    	showPart(partName,0);//恢复未选
		    }
		    else{
		    	showPartEx(partName,1,true);//恢复选择
		    }
        }  
        //其他为滑动效果，不管
	    return false;
	        	
	}).on("click", function(e){
		if(touchEnabled) return false;
		var alreadySelected = e.target.className.indexOf('cv-desc-selected') >= 0 ;
	    if(alreadySelected){
	    	showPart(partName,0);//恢复未选
	    }
	    else{
	    	showPartEx(partName,1,true);//恢复选择
	    } 
		return false;
	});
	
	$("li."+partName+" div.cv-service.cv-banjin").on('touchstart',  function (e) {
	    if (e.originalEvent.changedTouches.length) {
	        var touch = e.originalEvent.changedTouches[0];
	        x1 = Math.round(touch.clientX);
	        y1 = Math.round(touch.clientY);
	        if(!touchEnabled)
	        	touchEnabled = true; 
	    } 
	}).on("touchend",function(e){
		if(!touchEnabled)
	        touchEnabled = true;
	    var touch = e.originalEvent.changedTouches[0];  
	    x2 = Math.round(touch.clientX);
        y2 = Math.round(touch.clientY);
    	var slideStatus =  judgeDirectionMeanVersion(x1, y1, x2, y2) ;
        if(slideStatus == 0){  
    	    var alreadySelected = e.target.className.indexOf('cv-desc-selected')>= 0 ;
		    if(alreadySelected){
		    	showPart(partName,1);//恢复喷漆
		    }
		    else{
		    	showPartEx(partName,2,true);//恢复选择
		    } 
        }   
	    return false;
	}).on("click", function(e){
		if(touchEnabled) return false;
		var alreadySelected = e.target.className.indexOf('cv-desc-selected')>= 0 ;
	    if(alreadySelected){
	    	showPart(partName,1);//恢复喷漆
	    }
	    else{
	    	showPartEx(partName,2,true);//恢复选择
	    }  
		return false;
	});
}

function hideComponentDesc(partName){
	var ele = $("ul.cv-components-desc li."+partName);
	ele.remove();
}

function bindWholeCarButtonEvent(){ 
	$("div.cv-whole-car-penqi-button").on("touchend", function(e){
		if(!touchEnabled)
	        touchEnabled = true;
        var alreadySelected = e.target.className.indexOf('button-selected')>= 0 ;
		if(alreadySelected){
			showPart("component-18", 0);
			$("div.cv-whole-car-penqi-button").removeClass("button-selected");
		}
		else{
			
			showPart("component-18", 1);
			$("div.cv-whole-car-penqi-button").addClass("button-selected");
		}
		return false;
	}).on("click", function(e){
		if(touchEnabled) return false;
		var alreadySelected = e.target.className.indexOf('button-selected')>= 0 ;
		if(alreadySelected){
			showPart("component-18", 0);
			$("div.cv-whole-car-penqi-button").removeClass("button-selected");
		}
		else{
			showPart("component-18", 1);
			$("div.cv-whole-car-penqi-button").addClass("button-selected");
		}
		return false;
	});
}
 