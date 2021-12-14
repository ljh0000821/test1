let corpid="ww4d11a39991ebffdc";
let ticket;
$(function(){
	let wx_code=getParam("code");
	if(getParam("code")){
		$(".active").data("cont");
		$("#wx-ext").hide();
		$("#wx-login1").addClass("active").data("cont");
		$("#wx-login").show();
		$("#code_area").html(wx_code);
	}
	$("#shili").val("$.ajax({\r\n   type:'get',\r\n   url: 'http://103.46.128.21:29500/getUserByTicket?st='+ticket,\r\n   success:function(res){\r\n      $('#userinfo_area').html(res.data);\r\n   } \r\n});")
});

function getParam(variable){
    let query=window.location.search.substring(1);
    let vars=query.split("&");
    for(let i=0;i<vars.length;i++){
        var pair=vars[i].split("=");
        if(pair[0]==variable){
            return pair[1];
        }
    }
    return "";
}

function getWxCode(){
	if($("#login-agentid").val()==""){
		alert("请输入agentid");
		return;
	}else{
		agentid=$("#login-agentid").val();
		wx.invoke("ext_DataCache_Save", {
			data: {
				message: agentid
			}
		}, function (res) {
			console.log("ext_DataCache_Save end", res);
			let sURL="https://igw.sgcc.com.cn/connect/oauth2/authorize?"
			sURL+="appid="+corpid;
			sURL+="&redirect_uri="+encodeURIComponent("zipapp://local.host/index.html");
			sURL+="&response_type=code";
			sURL+="&scope=SCOPE";
			sURL+="&state=STATE";
			sURL+="&agentid="+agentid;
			sURL+="#wechat_redirect";
			location.href=sURL;
		});
	}
}

function getIscToken(){
	agentid=$("#login-agentid").val();
	let wx_code=getParam("code");
	var sURL="https://id.sgcc.com.cn:10443/ticket/identity/getAuthTicketByWechatCode";
	var _data = {"appId":agentid,"CODE":wx_code};
    $.ajax({
        type:"post",
        data:JSON.stringify(_data),
        contentType:"application/json;charset=utf-8",
        url: sURL,
        dataType:"json",
        success:function(res){
            ticket=res.data.ticket;
			$("#st_area").html(ticket);
		}
    });
}


function getUser(){
	$.ajax({
        type:"get",
        url: "http://103.46.128.21:29500/getUserByTicket?st="+ticket,
        success:function(res){
			$("#userinfo_area").html(res.data);
		}
    });
}




