var report={
	target:[],
	success:[],
	fail:[],
	nosupport:[],
	nocall:[],
	isOpen:false
};

$(function(){
	$(".tb-right").click(function(){
		var loadingState=$(".tb-loading").is(":visible");
		if(!$(".toolbar").data("loading")&&loadingState){
			$(".toolbar").data("loading",loadingState)
		}
		if(!$(this).hasClass("tb-left")){
			$(".toolbar").hide("normal",function(){
				$(".toolbar").show();
				$(".tb-loading").hide();
				$(".toolbar").css({width:"20px"});
				$(".tb-right").addClass("tb-left");
			});
		}else{
			$(".toolbar").show("normal",function(){
				$(".toolbar").css({width:"155px"});
				$(".tb-right").removeClass("tb-left");
				if($(".toolbar").data("loading")){
					$(".tb-loading").show();
				}
				$(".toolbar").removeData("loading");
			});
		}
	});

	$(".tb-junit").click(function(){
		if(!report.isOpen){
			report.isOpen=true;
			$(".vergrap").find("div[onclick]").each(function(){
                var domId="report-"+createNonceStr(32);
                $(this).attr("id",domId);
                var funName=$(this).attr("onclick");
                var funStr=eval(funName.substr(0,funName.indexOf("("))).toString();
                if(funName){
                    funStr=analyseWxInvokeAndInject(domId,funStr);
                    funStr=analyseWxNormalMethodAndInject(domId,funStr);
                }
                var func=eval("(false || "+funStr+")");
                (function(me){
                    $(me).removeAttr("onclick");
                    $(me).addClass("junit-button");
                    $(me).on("click",function(){
                        $("html,body").animate({scrollTop:$(me).offset().top+"px"},500);
                        func();
                    });
                })(this);
			});
			var ulList=[];
			ulList.push($(".vergrap .wifi ul").get(0));
			ulList.push($(".vergrap #bluetoothdevicesdiscovery").get(0));
			ulList.push($(".vergrap .devices ul").get(0));
			ulList.forEach((item)=>{
				$(item).on("DOMNodeInserted",function(ev){
					$(ev.target).find("button").each(function(){
						let bindEvent=($.data($(this).get(0),'events') || $._data($(this).get(0),'events'));
						if(bindEvent){
							if(bindEvent.click){
								bindEvent=bindEvent.click[0].handler;
								$(this).off("click");
								let domId="report-"+createNonceStr(32);
								$(this).attr("id",domId);
								let funStr=bindEvent.toString();
								//console.log("funStr",funStr);
								funStr=analyseWxInvokeAndInject(domId,funStr);
								funStr=analyseWxNormalMethodAndInject(domId,funStr);
								let devName=$(this).data("objDevice");
								let btnName=$(this).data("objName");
								//console.log("funStr2",funStr);
								let clickEvent=new Function(devName,btnName,"("+funStr+")()");
								(function(me,devName){
									$(me).on("click",function(){
										//console.log("func",clickEvent.toString());
										clickEvent($(me).data(devName),$(me));
									});
								})(this,devName);
							}
						}
					});
				});
			});


            $(this).addClass("tb-step");
		}else{
            var textInfo=[];
            var lastIndex=0;
            var currentSectionId=$(".active").data("cont");
            var setTimeoutTimer=config.timer[currentSectionId.replace(/-/g,"")];//currentSectionId=="wx-base"?3000:1000;
            var length=$("#"+currentSectionId+" .vergrap .junit-button").length;

			$("#"+currentSectionId+" input").each(function(){
				if($(this).attr("type")=="text"){
					var value=$(this).val();
					if(value!=undefined&&$.trim(value).length>0){
					}else{
						textInfo.push(this);
					}
				}
			});
			if(textInfo.length>0){
				if(!window.confirm("此测试页面中有些配置信息还没有配置，你确定要继续测试吗?")){
					return;
				}
			}

            $(".tb-junit").hide();
            $(".tb-loading").show();
            $(".tb-report").hide();

            $("#"+currentSectionId).find(".vergrap").each(function(){
                if(lastIndex==0){
                    (function(me,setTimeoutTimer){
                        $(me).find(".junit-button").each(function(index){
							(function(me,index){
								window.setTimeout(()=>{
									simulateTouchEvent(me);
								},setTimeoutTimer*(index+1));
							})(this,index);
                        });
                    })(this,setTimeoutTimer);
                }else{
                    (function(me,lastIndex,setTimeoutTimer){
                        window.setTimeout(()=>{
                            $(me).find(".junit-button").each(function(index){
								(function(me,index){
									window.setTimeout(()=>{
										simulateTouchEvent(me);
									},setTimeoutTimer*(index+1));
								})(this,index);
                            });
                        },(lastIndex+2)*setTimeoutTimer);
                    })(this,lastIndex,setTimeoutTimer);
                }
                lastIndex+=$(this).find(".junit-button").length;
            });

            if(length==lastIndex){
                window.setTimeout(()=>{
                    $(".tb-junit").show();
                    $(".tb-loading").hide();
                    $(".tb-report").show();
                },setTimeoutTimer*(length+1));
            }
        }
	});

	$(".tb-report").click(function(){
		if(!$(this).data("report")){
			var targtSet=arrayToSet(report.target);
			var span=$(".report span.target").next();
			span.html(targtSet.size+"目标接口");

			var successSet=arrayToSet(report.success);
			span=$(".report span.success").next();
			span.html(successSet.size+"成功");

			var exceptionSet=arrayToSet(report.fail);
			span=$(".report span.exception").next();
			span.html(exceptionSet.size+"异常");

			var nosupportSet=arrayToSet(report.nosupport);
			span=$(".report span.nosupport").next();
			span.html(nosupportSet.size+"不支持");

			var allSet=arrayToSet(jsApiList);
			span=$(".report span.allitem").next();
			span.html(allSet.size+"总接口");

			var nocallSize=targtSet.size-successSet.size-exceptionSet.size-nosupportSet.size;
			span=$(".report span.nocall").next();
			span.html(nocallSize+"未执行");
			$(".report").show("normal");
			$(this).data("report",true);
		}else{
			$(".report").hide("normal");
			$(this).removeData("report");
		}
	});
});

function arrayToSet(arr){
	var set=new Set();
	arr.forEach(t=>{
		t=t.replace(/\"/g,"");
		set.add(t);
	});
	return set;
}

function simulateTouchEvent(dom){
	var rect=dom.getBoundingClientRect();
	var touch=new Touch({
		"identifier" : Date.now(),
		"target" : dom,
		"clientX" : (rect.left + rect.right)/2,
		"clientY" : (rect.top + rect.bottom)/2,
		"screenX" : (rect.left + rect.right)/2,
		"screenY" : (rect.top + rect.bottom)/2,
		"pageX" : (rect.left + rect.right)/2,
		"pageY" : (rect.top + rect.bottom)/2,
		"radiusX" : 11.5,
		"radiusY" : 11.5,
		"rotationAngle" : 0.0,
		"force" : 1
	});
	var touchstart = new TouchEvent("touchstart", {
		cancelable: true,
		bubbles: true,
		composed: true,
		touches: [touch],
		targetTouches: [touch],
		changedTouches: [touch]
	});

	var touchend = new TouchEvent("touchend", {
		cancelable: true,
		bubbles: true,
		composed: true,
		touches: [touch],
		targetTouches: [touch],
		changedTouches: [touch]
	});

	dom.dispatchEvent(touchstart);
	$(dom).addClass("active");
	(function(me){
		window.setTimeout(()=>{
			me.dispatchEvent(touchend);
			$(me).triggerHandler("click");
			$(me).removeClass("active");
		},Math.round(Math.random()*500)+1500);
	})(dom);

}

function analyseWxInvokeAndInject(domId,funStr){
	var regex=/(wx.invoke\(([\s\S]+?)\,\s*?\{[\s\S]*?\}\s*?\,\s*?function\s*?\([\s\S]*?\)\s*?\{)/g;
	if(regex.test(funStr)){
		funStr=funStr.replace(regex,function(match,p1,p2){
			var method=p2;
			report.target.push(method);
			return p1+"\nparseInvokeCallbackParams("+method+",\""+domId+"\");\n";
		})
	}
	return funStr;
}

function analyseWxNormalMethodAndInject(domId,funStr){
	//var regex=/(wx.(\D+)\(((\s*\{[\S\s]*\}\s*)|(\s*function\s*\([\s\w]*\)\s*\{[\s\w]*\}\s*)|(\s*))\))/g;
	var jsonParamRegex=/(wx.(\w+?)\(\s*?\{[\S\s]*\}\s*\);+?)/g;
	var funcParamRegex=/((wx.(\w+?)\(\s*?)(function\s*?\([\s\w]*?\)\s*?\{)([\s\S]*?\}\s*?\)))/g;
	var noParamRegex=/(wx.(\w+?)\(\s*?\);+?)/g;
	if(jsonParamRegex.test(funStr)){
		funStr=funStr.replace(jsonParamRegex,function(match,p1,p2){
			var jsonBlock=match;
			var method=p2;
			report.target.push(method);
			var successParamRegex=/(,?\s*?)(success\s*:\s*function\s*\([\s*\w]*\)\s*\{)/g;
			var failParamRegex=/(,?\s*?)((fail|error)\s*:\s*function\s*\([\s*\w]*\)\s*\{)/g;
			var hasCallback=[];
			if(successParamRegex.test(jsonBlock)){
				jsonBlock=jsonBlock.replace(successParamRegex,function(match,p1,p2,p3){
					return p1+p2+"\nparseJsonCallbackParams(\""+method+"\",\""+domId+"\",true);\n";
				});
				hasCallback.push(true);
			}
			if(failParamRegex.test(jsonBlock)){
				jsonBlock=jsonBlock.replace(failParamRegex,function(match,p1,p2){
					return p1+p2+"\nparseJsonCallbackParams(\""+method+"\",\""+domId+"\",true);\n";
				});
				hasCallback.push(true);
			}
			if(hasCallback.length==0){
				jsonBlock+="\nparseJsonCallbackParams(\""+method+"\",\""+domId+"\",false);\n"
			}
			return jsonBlock;
		});
	}
	if(funcParamRegex.test(funStr)){
		funStr=funStr.replace(funcParamRegex,function(match,p1,p2,p3,p4,p5){
			var method=p3;
			report.target.push(method);
			return p2+p4+"\nparseFuncCallbackParams(\""+method+"\",\""+domId+"\");"+p5;
		})
	}
	if(noParamRegex.test(funStr)){
		funStr=funStr.replace(noParamRegex,function(match,p1,p2,p3){
			var method=p2;
			report.target.push(method);
			return p1+"\nparseNoParams(\""+method+"\",\""+domId+"\");";
		});
	}
	return funStr;
}

function parseInvokeCallbackParams(method,domId){
	var args=arguments.callee.caller.arguments;
	var res=args[0];
	if(typeof(res)=="function"){
		console.log("parseInvokeCallbackParams res is function:",this.res.toString())
	}
	console.log("parseInvokeCallbackParams:",method,args);
	var suffix=res.err_msg.substr(res.err_msg.lastIndexOf(":")+1);
	if(suffix=="ok"){
		report.success.push(method);
		$("#"+domId).css({border:"1px solid #48A43F"});
	}else if(suffix=="fail"){
		report.fail.push(method);
		$("#"+domId).css({border:"1px solid #FFA421"});
	}else if(suffix=="fail_nosupport"){
		report.nosupport.push(method);
		$("#"+domId).css({border:"1px solid red"});
	}else{
		report.fail.push(method);
		$("#"+domId).css({border:"1px solid #FFA421"});
	}
	//console.log("html:",$("#"+domId).prop("outerHTML"));
}

function parseJsonCallbackParams(method,domId,isCallback){
	var args=arguments.callee.caller.arguments;
	var res=args[0];
	if(typeof(res)=="function"){
		console.log("parseInvokeCallbackParams res is function:",this.res.toString())
	}
	console.log("parseJsonCallbackParams:",args);
	report.success.push(method);
	if(isCallback==true){
		//TODO 有等完善
		var suffix=res.err_msg?res.err_msg.substr(res.err_msg.lastIndexOf(":")+1):null||res.errMsg?res.errMsg.substr(res.errMsg.lastIndexOf(":")+1):null;
		if(suffix=="ok"){
			report.success.push(method);
			$("#"+domId).css({border:"1px solid #48A43F"});
		}else{
			report.fail.push(method);
			$("#"+domId).css({border:"1px solid #FFA421"});
		}
	}else{
		$("#"+domId).css({border:"1px solid #48A43F"});
	}
}

function parseFuncCallbackParams(method,domId){
	var args=arguments.callee.caller.arguments;
	var res=args[0];
	if(typeof(res)=="function"){
		console.log("parseInvokeCallbackParams res is function:",this.res.toString())
	}
	console.log("parseFuncCallbackParams:",args);
	report.success.push(method);
	$("#"+domId).css({border:"1px solid #48A43F"});
}

function parseNoParams(method,domId){
	var args=arguments.callee.caller.arguments;
	var res=args[0];
	if(typeof(res)=="function"){
		console.log("parseInvokeCallbackParams res is function:",this.res.toString())
	}
	console.log("parseNoParams:",args);
	report.success.push(method);
	$("#"+domId).css({border:"1px solid #48A43F"});
}