$(function () {
	var vConsole = new VConsole();
	$.getScript("js/jweixin-1.0.0.js", function () {
		'use strict';
		wx.ready(function () {
			console.log("wx.config: ready");
			wx.onHistoryBack(function(){ return confirm('确定要放弃当前页面的修改？') });
			wx.invoke("ext_DataCache_Get", {}, function (res) {
				console.log("ext_DataCache_Get end", res);
				$("#login-agentid").val(res.result);
			});
			window.setTimeout(function () {
				wx.invoke("agentConfig", {
					agentid: '1003137', // 必填，企业应用的agentid
					corpid: 'ww4d11a39991ebffdc',  // 必填，企业微信的corpid
					timestamp: 1626832073, // 必填，生成签名的时间戳,int类型, 如 1539100800
					nonceStr: 'AMQGnmTMzhJetshY', // 必填，生成签名的随机串
					signature: 'e9ce82262c2ee6c7f62f4e690883927d460a79fd',// 必填，签名，见附录5
				}, function (res) {
					console.log("wx.agent config: over", res);
				});
			}, 2000);
		});
		wx.config({
			beta: true,// 调用wx.invoke形式的接口值时，该值必须为true。
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: 'ww4d11a39991ebffdc', // 必填，政务微信的cropID
			timestamp: '1626832073', // 必填，生成签名的时间戳
			nonceStr: 'AMQGnmTMzhJetshY', // 必填，生成签名的随机串
			signature: 'fb9f560a9b4824f7db3525926994010de74ea055',// 必填，签名，见附录1
			jsApiList: [
				'getZipAppDirectory',

				'ext_FileManager_Write',
				'ext_FileManager_Read',
				'ext_FileManager_Remove',
				'ext_FileManager_Create',
				'ext_FileManager_RemoveDirectory',
				'ext_FileManager_Exist',
				'ext_FileManager_IsDirectory',
				'ext_FileManager_Information',

				'ext_Socket_Init',
				'ext_Socket_UnInit',
				'ext_Socket_CreateChannel',
				'ext_Socket_CloseChannel',
				'ext_Socket_SendData',

				'multiWindows_subscribe',

				'ext_SGMap_init',
				'ext_SGMap_Operation',
				'ext_SGMap_Search',
				'ext_SGMap_Location',

				'ext_Etas_List',
				'ext_Etas_Init',
				'ext_Etas_Reg',
				'ext_Etas_UnReg',
				'ext_Etas_checkStatus',
				'ext_Etas_Verify',
				'ext_Etas_SaveData',
				'ext_Etas_GetData',
				'ext_Etas_RemoveData',
				'ext_Etas_Clear',
				'ext_Etas_OffLineVerify',

				'ext_ISCP_Init',
				'ext_ISCP_ConnectService',
				'ext_ISCP_GetLocalPort',
				'ext_ISCP_Close',
				'ext_ISCP_Status',

				'ext_Database_Open',
				'ext_Database_Exec',
				'ext_Database_Query',
				'ext_Database_Close',

				'ext_rlble_initBluetoothAdapter',
				'ext_rlble_scanBluetoothDev',
				'ext_rlble_startConnectBluetoothDev',
				'ext_rlble_onBluetoothDevConnDataRecv',
				'ext_rlble_BluetoothDevSendData',
				'ext_rlble_closeBluetoothDevConnection',
				'ext_rlble_stopBluetoothDevScan',
				'ext_rlble_onBluetoothDevConnStateChange',
				'ext_rlble_autoBluetoothDevConnection',

				'ext_Popover_Open',
				'ext_Popover_Close',

				"multiWindows_open",
				"multiWindows_close",
				"multiWindows_startWidget",
				"multiWindows_finishWidget",
				"multiWindows_subscribe",
				"multiWindows_publish",

				'selectEnterpriseContact',
				'openChatWithMsg',
				'openUserProfile',

				'onMenuShareAppMessage',
				'onMenuShareWechat',
				'shareAppMessage',
				'shareWechatMessage',
				'onMenuShareTimeline',

				'chooseImage',
				'getLocalImgData',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'previewFile',

				'chooseVideo',
				'uploadVideo',
				'downloadVideo',

				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'playVoice',
				'stopVoice',
				'onVoicePlayEnd',
				'startRecordVoiceBuffer',
				'onRecordBufferReceived',
				'stopRecordVoiceBuffer',
				'uploadVoice',
				'downloadVoice',
				'translateVoice',

				'startWifi',
				'stopWifi',
				'connectWifi',
				'getWifiList',
				'onGetWifiList',
				'onWifiConnected',
				'getConnectedWifi',

				'openBluetoothAdapter',
				'closeBluetoothAdapter',
				'getBluetoothAdapterState',
				'onBluetoothAdapterStateChange',
				'startBluetoothDevicesDiscovery',
				'stopBluetoothDevicesDiscovery',
				'getBluetoothDevices',
				'onBluetoothDeviceFound',
				'getConnectedBluetoothDevices',
				'createBLEConnection',
				'closeBLEConnection',
				'onBLEConnectionStateChange',
				'getBLEDeviceServices',
				'getBLEDeviceCharacteristics',
				'readBLECharacteristicValue',
				'writeBLECharacteristicValue',
				'notifyBLECharacteristicValueChange',
				'onBLECharacteristicValueChange',

				'setClipboardData',
				'getClipboardData',

				'getNetworkType',
				'onNetworkStatusChange',

				'openLocation',
				'getLocation',
				'startAutoLBS',
				'stopAutoLBS',
				'onLocationChange',

				'onHistoryBack',
				'hideOptionMenu',
				'showOptionMenu',
				'closeWindow',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'onUserCaptureScreen',
				'openUrl',

				'scanQRCode',

				'getStepCount',
				'getAllPhoneContacts',
				'addCalendarEvent',

				'showWatermark',
				'hideWatermark',

				'checkIsSupportSoterAuthentication',
				'checkIsSoterEnrolledInDevice',
				'startSoterAuthentication',
				'bioassayAuthentication',

				'launch3rdApp',
				'request3rdApp',
				'getInstallState',

				'ocr',

				'checkJsApi',

				'ext_gislocation_init',
				'ext_gislocation_start',
				'ext_gislocation_stop',

				'ext_SandBox_Reg',
				'ext_SandBox_StartSubApp',
				'ext_SandBox_CloseSubApp',
				'ext_SandBox_ScreenPolicy',
				'ext_SandBox_isRoot',
				'ext_SandBox_isSimulator',
				'ext_SandBox_WaterMark',
				'ext_SandBox_ScreenShot',
				'ext_SandBox_DelePhoto',
				'ext_SandBox_UploadShot',

				'ext_wxlog_setLogOpen',
				'ext_wxlog_getLogFile',
				'ext_SGMap_init',
				'ext_SGMap_Location',

				'ext_DataCache_Get',
				'ext_DataCache_Save',
				'ext_DataCache_SaveInfo',
				'ext_DataCache_GetInfo',
				'ext_DataCache_RemoveInfo',

				'ext_Net_Upload',
				'ext_Net_CancelUpload',
				'ext_Net_Download',
				'ext_Net_SimpleDownload',
				'ext_Net_MultiDownload',

				'ext_screenControl_direction',

				'ext_WeMeet_Init',
				'ext_WeMeet_Login',
				'ext_WeMeet_Logout',
				'ext_WeMeet_Join',

				'ext_DeviceInfo_GetInfo',

				'ext_Compressor_Size',
				'ext_Compressor_Quality',

				'ext_OfflineFaceRec_add',
				'ext_OfflineFaceRec_delete',
				'ext_OfflineFaceRec_recognition',
				'ext_OfflineFaceRec_capture',
				'ext_OfflineFaceRec_openCamera',

				'ext_unzip_untie',
				'ext_unzip_compression',
				'ext_Intent_Dial',

				'ext_facialLandmarkDetection_init',
				'ext_facialLandmarkDetection_getFaceData',

				'ext_VoiceRecord_Start',
				'ext_VoiceRecord_Stop',
				'ext_VoiceRecord_Pause',
				'ext_VoiceRecord_Continue',
				'ext_VoiceRecord_Delete',
				'ext_VoiceRecord_ShowRecords',

				'ext_FileBrowser_StartPreView',

				'ext_FileManager_BlockComposeFile',
				'ext_FileManager_BlockFetchFile',
				'ext_FileManager_BlockMergeFile',
				'ext_FileManager_fileDelete',

				'ext_LocalServer_BootServer',
				'ext_LocalServer_LocalUrl',
				'ext_LocalServer_StopServer',

				'ext_appInstall_Check',
				'ext_appInstall_start',

				'ext_GPS_GetLocation',

				'changeNaviColor',
				'ext_OCR_SelectRes',
				'ext_OCR_Authentication',
				'ext_OCR_Ocr',

				'ext_Net_PathExtension',

				'ext_Print_Picture',
				'ext_Print_Doc'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	});


	$(".devices ul").on("click", "button", function (ev) {
		var btn = $(ev.target);
		var dataType = btn.attr("dataType");
		var deviceInfo = btn.parent().parent().data("device");
		console.log("deviceinfo", deviceInfo);
		if (dataType == "connDevice") {
			bluetoothDeviceConnect(deviceInfo);
		} else if (dataType == "readData") {
			bluetoothDeviceReadData(deviceInfo);
		} else if (dataType == "writeData") {
			bluetoothDeviceWriteData(deviceInfo);
		} else if (dataType == "closeDevice") {
			bluetoothDeviceClose(deviceInfo);
		}
	});

	$(".wifi ul").on("click", "button", function (ev) {
		var btn = $(ev.target);
		var dataType = btn.attr("dataType");
		var deviceInfo = btn.parent().parent().data("device");
		console.log("deviceinfo", deviceInfo);
		if (deviceInfo.secure) {
			var pwd = window.prompt("请输入wifi密码", "");
			if (pwd != null && pwd != "") {
				deviceInfo.pwd = pwd;
			} else {
				alert("请输入wifi密码");
				return;
			}
		}
		if (dataType == "connDevice") {
			connectWifi(deviceInfo);
		}
	});

	$("#socketType").on("change", function (ev) {
		socketType = $("#socketType").val();
	})
	socketType = $("#socketType").val();

	$("#bluetoothdevicesdiscovery").on("click", "button", function (ev) {
		var target = $(ev.target);
		var type = target.data("type");
		var deviceId = target.parent("li").data("deviceId");
		if (type == "connect") {
			$(target).attr("disabled", "disabled");
			device.connectDevice(deviceId, function (res) {
				$(target).nextAll().removeAttr("disabled");
			}, function (res) {
				console.log("连接低功耗蓝牙设备失败");
				$(target).removeAttr("disabled");
				$(target).nextAll().attr("disabled", "disabled");
			});
		} else if (type == "close") {
			device.closeConnectedDevice(deviceId, function (res) {
				console.log("断开低功耗蓝牙设备成功");
				$(target).attr("disabled", "disabled");
				$(target).prev().removeAttr("disabled");
				$(target).nextAll().attr("disabled", "disabled");
			});
		} else if (type == "services") {
			if (device.devices && device.devices[deviceId]) {
				device.getDeviceServices(deviceId, function (res) {
					if (res && res.services && res.services.length > 0) {
						target.parent("li").data("services", res.services);
					}
				});
			}
		} else if (type == "characteristic") {
			if (target.parent("li").data("services")) {
				var services = target.parent("li").data("services");
				$.each(services, function (i, service) {
					device.getDeviceCharacteristics(deviceId, service.uuid, function (res) {
						service.characteristics = res.characteristics;
						console.log("li data:", target.parent("li").data("services"));
					}, function (res) {
						console.log("获取特征值出错：", res);
					});
				});
			} else {
				alert("请先调用获取服务按钮");
				console.log("请先调用获取服务按钮");
			}
		} else if (type == "readCharacteristic") {
			if (target.parent("li").data("services")) {
				var services = target.parent("li").data("services");
				$.each(services, function (i, service) {
					var isExit = false;
					if (service.characteristics) {
						$.each(service.characteristics, function (m, characteristic) {
							if (characteristic.properties.read) {
								isExit = true;
								device.readCharacteristicValue(deviceId, service.uuid, characteristic.uuid, function (res) {
									console.log("read characteristic success ", res);
								}, function (res) {
									console.log("read characteristic fail ", res);
								});
								return false;
							}
						});
					}
					if (isExit) {
						return false;
					}
				});
			}
		} else if (type == "writeCharacteristic") {
			if (target.parent("li").data("services")) {
				var services = target.parent("li").data("services");
				$.each(services, function (i, service) {
					var isExit = false;
					if (service.characteristics) {
						$.each(service.characteristics, function (m, characteristic) {
							if (characteristic.properties.write) {
								isExit = true;
								device.writeCharacteristicValue(deviceId, service.uuid, characteristic.uuid, "this is test", function (res) {
									console.log("write characteristic success ", res);
								}, function (res) {
									console.log("write characteristic fail ", res);
								});
								return false;
							}
						});
					}
					if (isExit) {
						return false;
					}
				});
			}
		}
	});
	$("#bluetoothdevicesdiscovery").on("click", "li", function (ev) {
		var target = $(ev.target);
		if (target.is("li")) {
			if (target.data("selected")) {
				target.removeData("selected");
				target.removeClass("selected");
			} else {
				target.data("selected", true);
				target.addClass("selected");
			}
		}
	});
});
$(function () {
	$("nav a").each(function () {
		$(this).click(function () {
			var beforeNav = $(".active");
			var beforeId = beforeNav.data("cont");
			$("#" + beforeId).hide();
			beforeNav.removeClass("active");
			var currentId = $(this).addClass("active").data("cont");
			$("#" + currentId).show();
		});
	});
});

function run() {
	eval($("#function").val());
}

function createNonceStr(len) {
	var e = len ? len : 16;
	var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		a = t.length,
		n = "";
	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n
}

function openLog() {
	console.log("ext_wxlog_setLogOpen start");
	wx.invoke("ext_wxlog_setLogOpen", {
		data: {
			open: 1
		}
	}, function (res) {
		console.log("ext_wxlog_setLogOpen end", res);
	})
}

function getLog() {
	console.log("ext_wxlog_getLogFile start");
	wx.invoke("ext_wxlog_getLogFile", {}, function (res) {
		console.log("ext_wxlog_getLogFile end", res);;
	})
}

function isIosOrAndroid() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;//android终端
	if (isAndroid) {
		return 1
	}
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS) {
		return 2
	}
	return 0
}

function createDiretory() {
	console.log("getZipAppDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_Create start");
		wx.invoke("ext_FileManager_Create", {
			data: {
				path: path,
				name: "create"
			}
		}, function (res) {
			console.log("ext_FileManager_Create end", res);
		});
	});

}

function removeDiretory() {
	console.log("ext_FileManager_RemoveDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_RemoveDirectory start");
		wx.invoke("ext_FileManager_RemoveDirectory", {
			data: {
				path: path + "/create"
			}
		}, function (res) {
			console.log("ext_FileManager_RemoveDirectory end", res);
		});
	});

}

function isExistFile() {
	console.log("ext_FileManager_Exist start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_Exist start");
		wx.invoke("ext_FileManager_Exist", {
			data: {
				path: path + "123.txt"
			}
		}, function (res) {
			console.log("ext_FileManager_Exist end", res);
		})
	});

}

function isDirectory() {
	console.log("getZipAppDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_IsDirectory start");
		wx.invoke("ext_FileManager_IsDirectory", {
			data: {
				path: path + "123.txt"
			}
		}, function (res) {
			console.log("ext_FileManager_IsDirectory end", res);
		})
	});

}

function readJson() {
	console.log("读取json开始");
	$.getJSON("zipAppConfig.json", function (data) {
		//data 代表读取到的json
		console.log(data);
	});
	console.log("读取json结束");
}

function readtext() {
	console.log("读取text开始");
	$.ajax({
		url: "abc.txt",
		type: "GET",
		dataType: "text",
		success: function (data) {
			console.log(data);
		}
	});
	console.log("读取text结束");
}


function queryMeta() {
	console.log("getZipAppDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_Information start");
		wx.invoke("ext_FileManager_Information", {
			data: {
				path: path + "123.txt"
			}
		}, function (res) {
			console.log("ext_FileManager_Information end", res);
		})
	});

}

function readEncryptFile() {
	console.log("getZipAppDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_Read Encrypt Base64 Start");
		wx.invoke("ext_FileManager_Read", {
			data: {
				path: path + "124.txt",
				type: "TEXT"
			}
		}, function (response) {
			console.log("ext_FileManager_Read Encrypt Base64 End", response);
			$("#localimagedata").attr("src", response.result);
		});
	});
}

function readTextFile() {
	console.log("getZipAppDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_Read Text File Start");
		wx.invoke("ext_FileManager_Read", {
			data: {
				path: path + "123.txt",
				type: "TEXT"
			}
		}, function (response) {
			console.log("ext_FileManager_Read Text File End", response);
		});
	});
}

var base64 = "data:image/png;base64,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";

function writeEncryptFile() {
	console.log("getZipAppDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory

		console.log("ext_FileManager_Write Encrypt Base64 File Start");
		wx.invoke("ext_FileManager_Write", {
			data: {
				name: "124.txt",
				data: base64,
				type: "TEXT",
				path: path
			}
		}, function (response) {
			console.log("ext_FileManager_Write Encrypt Base64 File End", response);
			console.log(base64);

		});
	});
}

function writeText() {
	wx.invoke("ext_FileManager_Write", {
		data: {
			name: "123.txt",
			data: "5bCd6K+V5Yqg5a+G",
			type: "BASE64"
		}
	}, function (res) {
		console.log("ext_FileManager_Write", res);
	})
}

function writeTextFile() {
	console.log("getZipAppDirectory start");
	var path = "";
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		path = res.directory
		console.log("ext_FileManager_Write Text File Start");
		wx.invoke("ext_FileManager_Write", {
			data: {
				name: "123.txt",
				data: "{id:2000,baseLength:4002442,data}",
				type: "TEXT",
				path: path
			}
		}, function (response) {
			console.log("ext_FileManager_Write Text File End", response);
		});
	});
}

function removeFiles() {
		console.log("ext_FileManager_Remove File List Start");
		wx.invoke("ext_FileManager_Remove", {
			data: {
				fileList: ["/storage/emulated/0/Download/com.dlxx.mam.Internal/cache/a.doc"]
			}
		}, function (response) {
			console.log("ext_FileManager_Remove File List End", response);
		});
}

function removeFile() {
		console.log("ext_FileManager_Remove File List Start");
		wx.invoke("ext_FileManager_Remove", {
			data: {
				fileList: ["/storage/emulated/0/Download/com.dlxx.mam.Internal/cache/a.doc"]
			}
		}, function (response) {
			console.log("ext_FileManager_Remove File single End", response);
		});
}

var socketType = "";
function socketInit() {
	console.log("ext_Socket_Init start");
	wx.invoke("ext_Socket_Init", { data: {} }, function (response) {
		console.log("ext_Socket_Init end", response);
	})
}

var socketChannelId = null;
function socketCreateChannel() {
	var socketip = $("#socketip").val();
	var socketport = $("#socketport").val();
	console.log("ext_Socket_CreateChannel start");
	wx.invoke("multiWindows_subscribe", {
		channelId: "event_Socket_channel_19216843225"
	}, function (res) {
		console.log("event_Socket_channel_19216843225", res);
		if (res.err_msg == "multiWindows_subscribe:ok") {
			socketChannelId = res.data.socketId;
			console.log("receive data ", res.data.data);
		}
	})
	wx.invoke("ext_Socket_CreateChannel", {
		data: {
			ip: socketip,
			port: parseInt(socketport),
			type: parseInt(socketType),
			channelId: "event_Socket_channel_19216843225"
		}
	}, function (response) {
		console.log("ext_Socket_CreateChannel end", response);
	})
}

function socketCloseChannel() {
	console.log("ext_Socket_CloseChannel start");
	wx.invoke("ext_Socket_CloseChannel", {
		data: {
			socketId: socketChannelId
		}
	}, function (response) {
		console.log("ext_Socket_CloseChannel end", response);
	})
}

function socketSendData() {
	console.log("ext_Socket_SendData start");
	wx.invoke("ext_Socket_SendData", {
		data: {
			socketId: socketChannelId,
			data: "this is a test"
		}
	}, function (response) {
		console.log("ext_Socket_SendData end", response);
	});
}

function socketUnInit() {
	console.log("ext_Socket_UnInit start");
	wx.invoke("ext_Socket_UnInit", { data: {} }, function (response) {
		console.log("ext_Socket_UnInit end", response);
	});
}

function dbOpen() {
	console.log("ext_Database_Open start");
	wx.invoke("ext_Database_Open", {
		data: {
			name: "db_user002",
			id: "user2"
		}
	}, function (res) {
		console.log("ext_Database_Open end", res);
	})
}

function dbExecute() {
	console.log("ext_Database_Exec start");
	wx.invoke("ext_Database_Exec", {
		data: {
			id: "user2",
			sql: "create table if not exists note(id integer primary key autoincrement,text text)"
		}
	}, function (res) {
		console.log("ext_Database_Exec end", res);
		console.log("ext_Database_Exec innet start");
		wx.invoke("ext_Database_Exec", {
			data: {
				id: "user2",
				sql: "insert into note(text)values('这是一个测试')"
			}
		}, function (res) {
			console.log("ext_Database_Exec innet end", res);
		})
	})
}

function dbQuery() {
	console.log("ext_Database_Query start");
	wx.invoke("ext_Database_Query", {
		data: {
			id: "user2",
			sql: "select * from note"
		}
	}, function (res) {
		console.log("ext_Database_Query end", res);
	});
}

function dbRemoveData() {
	console.log("ext_Database_Exec removeData start");
	wx.invoke("ext_Database_Exec", {
		data: {
			id: "user2",
			sql: "delete from note where text='这是一个测试'"
		}
	}, function (res) {
		console.log("ext_Database_Exec removeData end", res);
	})
}

function dbClose() {
	console.log("ext_Database_Close start");
	wx.invoke("ext_Database_Close", {
		data: {
			id: "user2"
		}
	}, function (res) {
		console.log("ext_Database_Close start");
	});
}

function bluetoothDeviceInit() {
	console.log("ext_rlble_initBluetoothAdapter start");
	wx.invoke("ext_rlble_initBluetoothAdapter", {
		data: {}
	}, function (res) {
		console.log("ext_rlble_initBluetoothAdapter end", res);
	});
}
var isBluetoothScan = true;
function bluetoothDeviceScan() {
	console.log("ext_rlble_scanBluetoothDev start");
	wx.invoke("ext_rlble_scanBluetoothDev", {
		data: {}
	}, function (res) {
		console.log("ext_rlble_scanBluetoothDev end", res);
		if (res.err_msg == "ext_rlble_scanBluetoothDev:ok") {
			if (isBluetoothScan) {
				window.setTimeout(function () {
					bluetoothDeviceScan();
				}, 4000)
			}
			$(".devices ul").empty();
			console.log(res.devicelist);
			var devices = JSON.parse(res.devicelist);
			$.each(devices, function (index, device) {
				var deviceDom = $("<li></li>");
				if (device.name) {
					deviceDom.html(device.name);
				} else {
					deviceDom.html(device.address);
				}
				var btnContainer = $("<div></div>");
				var btnConn = $("<button>连接设备</button>");
				btnConn.attr("dataType", "connDevice");
				btnContainer.append(btnConn);
				var btnRead = $("<button>读取数据</button><br>");
				btnRead.attr("dataType", "readData");
				btnContainer.append(btnRead);
				var btnWrite = $("<button>发送数据</button>");
				btnWrite.attr("dataType", "writeData");
				btnContainer.append(btnWrite);
				var btnClose = $("<button>断开连接</button><br>");
				btnClose.attr("dataType", "closeDevice");
				btnContainer.append(btnClose);
				deviceDom.append(btnContainer);
				deviceDom.data("device", device);
				$(".devices ul").append(deviceDom);
			});
		}
	});
}

function bluetoothDeviceStopScan() {
	console.log("ext_rlble_stopBluetoothDevScan start");
	wx.invoke("ext_rlble_stopBluetoothDevScan", {}, function (res) {
		console.log("ext_rlble_stopBluetoothDevScan end", res);
		if (bluetoothDeviceStopScan) {
			isBluetoothScan = false;
		}
	});
}

var tmpDevice;

function bluetoothDeviceConnect(device) {
	console.log("ext_rlble_startConnectBluetoothDev start");
	wx.invoke("ext_rlble_startConnectBluetoothDev", {
		data: {
			devicename: device.name
		}
	}, function (res) {
		console.log("ext_rlble_startConnectBluetoothDev end", res);
		tmpDevice = device;
	})
}

function bluetoothDeviceReadData(device) {
	console.log("multiWindows_subscribe start");
	wx.invoke("multiWindows_subscribe", {
		channelId: "bluetooth_" + device.address.replace(":", "")
	}, function (res) {
		console.log("multiWindows_subscribe end", res);
	});
	console.log("ext_rlble_onBluetoothDevConnDataRecv start");
	wx.invoke("ext_rlble_onBluetoothDevConnDataRecv", {
		data: {
			channelId: "bluetooth_" + device.address.replace(":", ""),
			devicename: device.name
		}
	}, function (res) {
		console.log("ext_rlble_onBluetoothDevConnDataRecv end", res);
	})
}

function bluetoothDeviceWriteData(device) {
	console.log("ext_rlble_BluetoothDevSendData start");
	wx.invoke("ext_rlble_BluetoothDevSendData", {
		data: {
			devicename: device.name,
			data: "Welcome to Microsoft! We are proud to announce that Microsoft has one of the largest Web Developers sites in the world."
		}
	}, function (res) {
		console.log("ext_rlble_BluetoothDevSendData end", res);
	})
}

function bluetoothDeviceClose(device) {
	console.log("ext_rlble_closeBluetoothDevConnection start");
	wx.invoke("ext_rlble_closeBluetoothDevConnection", {
		data: {
			devicename: device.name
		}
	}, function (res) {
		console.log("ext_rlble_closeBluetoothDevConnection end", res);
	})
}

function netType() {
	console.log("网络类型 start");
	wx.getNetworkType({
		success: function (res) {
			var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
			console.log("网络类型 end", res);
		}
	})
}

function netListenter() {
	console.log("网络类型监听 start");
	wx.onNetworkStatusChange(function (res) {
		console.log("网络类型监听 end", res);

	})
}

function openPopWin() {
	console.log("ext_Popover_Open start");
	wx.invoke("ext_Popover_Open", {
		data: {
			x: 20,
			y: 20,
			width: 600,
			height: 400,
			url: "https://m.baidu.com",
			name: "baidu"
		}
	}, function (res) {
		console.log("ext_Popover_Open end", res);
	});
}

function closePopWin() {
	console.log("ext_Popover_Close start");
	wx.invoke("ext_Popover_Close", {
		data: {
			name: "baidu"
		}
	}, function (res) {
		console.log("ext_Popover_Close end", res);
	});
}

function sandBoxReg() {
	console.log("ext_SandBox_Reg start");
	wx.invoke("ext_SandBox_Reg", {
		data: {
			userId: "testh1"
		}
	}, function (res) {
		console.log("ext_SandBox_Reg end", res);
	})
}

function sandBoxStartSubApp() {
	console.log("ext_SandBox_StartSubApp start");
	wx.invoke("ext_SandBox_StartSubApp", {
		data: {
			subAppName: "",
			companyId: ""
		}
	}, function (res) {
		console.log("ext_SandBox_StartSubApp end", res);
	})
}

function sandBoxCloseSubApp() {
	console.log("ext_SandBox_CloseSubApp start");
	wx.invoke("ext_SandBox_CloseSubApp", {
		data: {
		}
	}, function (res) {
		console.log("ext_SandBox_CloseSubApp end", res);
	})
}

function sandBoxIsRoot() {
	console.log("ext_SandBox_isRoot start");
	wx.invoke("ext_SandBox_isRoot", {}, function (res) {
		console.log("ext_SandBox_isRoot end", res);
	});
}

function sandBoxIsSimulator() {
	console.log("ext_SandBox_isSimulator start");
	wx.invoke("ext_SandBox_isSimulator", {}, function (res) {
		console.log("ext_SandBox_isSimulator end", res);
	})
}

function sandBoxWaterMark_open() {
	console.log("sandBoxWaterMark start");
	wx.invoke("ext_SandBox_WaterMark", {
		data: {
			wmSwitch: true,
			content: '柯',
			isBindTime:false,
			fontSize:35,
			rgb:[160,160,160]
		}
	}, function (res) {
		console.log("ext_SandBox_WaterMark end", res);
	})
}

function sandBoxWaterMark_close() {
	console.log("sandBoxWaterMark start");
	wx.invoke("ext_SandBox_WaterMark", {
		data: {
			wmSwitch: false,
			'content': '水印内容'
		}
	}, function (res) {
		console.log("ext_SandBox_WaterMark end", res);
	})
}

function sandBoxScrenPolicyWithAndroid() {
	var osType = isIosOrAndroid();
	if (osType == 1) {
		console.log("ext_SandBox_ScreenPolicy start");
		wx.invoke("ext_SandBox_ScreenPolicy", {
			data: {
				urlList: [],
				activityList: ["com.tencent.wework.common.web.JsWebActivity",
					"com.tencent.wework.launch.WwMainActivity"]
			}
		}, function (res) {
			console.log("ext_SandBox_ScreenPolicy end", res);
		})
	}
}

var sandboxscreenshotid = "";
function sandBoxScrenPolicyWithIOS() {
	var osType = isIosOrAndroid();
	if (osType == 2) {
		console.log("ext_SandBox_ScreenShot start");
		wx.invoke("ext_SandBox_ScreenShot", {
			data: {
				title: "upload...",
				detail: "ios update screen picture"
			}
		}, function (res) {
			console.log("ext_SandBox_ScreenShot end", res);
			sandboxscreenshotid = res.localID;
		})
	}
}

function sandBoxScrenUploadById() {
	var osType = isIosOrAndroid();
	if (osType == 2) {
		console.log("ext_SandBox_UploadShot start");
		wx.invoke("ext_SandBox_UploadShot", {
			data: {
				urlList: [],
				activityList: []
			}
		}, function (res) {
			console.log("ext_SandBox_UploadShot end", res);
		})
	}
}

function sandBoxScrenRemoveById() {
	var osType = isIosOrAndroid();
	if (osType == 2) {
		console.log("ext_SandBox_DelePhoto start");
		wx.invoke("ext_SandBox_DelePhoto", {
			data: {
				localID: sandboxscreenshotid
			}
		}, function (res) {
			console.log("ext_SandBox_DelePhoto end", res);
		})
	}
}

function removeWaterMark() {
	console.log("hideWatermark start");
	wx.invoke("hideWatermark", {}, function (res) {
		console.log("hideWatermark end", res);
	})
}

function downloadFiles() {
	wx.invoke("multiWindows_subscribe", { channelId: "filechannel1" }, function (res) {
		setTimeout(function () {
			console.log("filechannel1", res);
		}, 10);
	});
	wx.invoke("ext_Net_Download", {
		data: {
			cmd: "download",
			url: "http://192.168.43.150/weworklocal_2.5.30100.105_iphone.ipa",
			header: {},
			data: {},
			id: "filechannel1",
			timeout: 10,
			fileName: "weworklocal_2.5.30100.105_iphone.ipa"
		}
	}, function (res) {
		console.log("filechannel1 download", res);
	});

	wx.invoke("multiWindows_subscribe", { channelId: "filechannel2" }, function (res) {
		setTimeout(function () {
			console.log("filechannel2", res);
		}, 60);
	});
	wx.invoke("ext_Net_Download", {
		data: {
			cmd: "download",
			url: "http://192.168.43.150/weworklocal_2.5.30100.107_iphone.ipa",
			header: {},
			data: {},
			id: "filechannel2",
			timeout: 10,
			fileName: "weworklocal_2.5.30100.107_iphone.ipa"
		}
	}, function (res) {
		console.log("filechannel2 download", res);
	});

	wx.invoke("multiWindows_subscribe", { channelId: "filechannel3" }, function (res) {
		setTimeout(function () {
			console.log("filechannel3", res);
		}, 110);
	});
	wx.invoke("ext_Net_Download", {
		data: {
			cmd: "download",
			url: "http://192.168.43.150/weworklocal_2.5.30100.110_iphone.ipa",
			id: "filechannel3",
			timeout: 10,
			fileName: "weworklocal_2.5.30100.110_iphone.ipa"
		}
	}, function (res) {
		console.log("filechannel3 download", res);
	});
}

var ziporunzippath = "";
function currentOuterPath() {
	console.log("getZipAppDirectory APP_ROOT_DIR start");
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory APP_ROOT_DIR end", res);
		ziporunzippath = res.directory;
	});
}

function currentInterPath() {
	console.log("getZipAppDirectory APP_ROOT_DIR start");
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory APP_ROOT_DIR end", res);
		ziporunzippath = res.directory;
	});
}

function zipFiles() {
	console.log("ext_unzip_compression start");
	wx.invoke("ext_FileManager_Create", {
		data: {
			path: ziporunzippath + "../",
			name: "zipdir"
		}
	}, function (res) {
		var targetPath = ziporunzippath + "../zipdir/";
		var targetName = 'test-zip';

		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			quality: 0.8, //压缩质量，范围0～1，数值越小，质量越低，压缩率越高（仅对jpg有效）
			success: function (res) {
				var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				var localPaths = [];

				localIds.forEach(function (localId, index) {
					wx.invoke('getLocalResPath', {
						localId: localId
					}, function (res) {
						localPaths.push(res.localResPath);
						if (index == localIds.length - 1) {
							wx.invoke('ext_unzip_compression', {
								data: {
									sourcePaths: localPaths.join(","), //需要压缩的文件路径（需要包含文件名），支持多个文件一起压缩
									passWord: "12345", //压缩包的密码
									targetPath: targetPath, //压缩包的存放路径（注意带上文件名）
									targetName: targetName //压缩包的名字（注意：不需要.zip后缀）
								}
							}, function (res) {
								console.log("压缩接口：", res)
							});
						}
					});
				});
			}
		});
	});


}

function unZipFiles() {
	let path3;
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory APP_ROOT_DIR end", res);
		path3 = res.directory;
	});
	console.log("ext_unzip_untie start");
	wx.invoke("ext_FileManager_Create", {
		data: {
			path: path3,
			name: "unzipdir"
		}
	}, function (res) {
		wx.invoke("ext_unzip_untie", {
			data: {
				password: "",
				unZipPath: path3 + "1000010.zip",
				targetPath: path3 + "unzipdir"
			}
		}, function (res) {
			console.log("ext_unzip_untie end", res);
		})
	});
}



function startWifi() {
	console.log("wifi open start");
	wx.startWifi({
		success: function (res) {
			console.log("wifi open end", res);
		},
		fail: function (res) {
			console.log("wifi open fail", res);
		}
	});
}

function closeWifi() {
	console.log("wifi close start");
	wx.stopWifi({
		success: function (res) {
			console.log("wifi close end", res);
		},
		fail: function (res) {
			console.log("wifi close fail", res);
		}
	});
}

function connectWifi(param) {
	listenWifiConnect();
	console.log("wifi connect start");
	wx.connectWifi({
		SSID: param.SSID,
		BSSID: param.BSSID,
		password: param.pwd,
		success: function (res) {
			console.log("wifi connect end", res);
			listenWifiConnect();
		},
		fail: function (res) {
			console.log("wifi connect fail", res);
		}
	})
}

function getWifiList() {
	listenWifiList();
	console.log("wifi getList start");
	wx.getWifiList({
		success: function (res) {
			console.log("wifi getList end", res);
			listenWifiList();
		},
		fail: function (res) {
			console.log("wifi getList fail", res);
		}
	});
}

function listenWifiList() {
	console.log("wifi listen list start");
	wx.onGetWifiList(function (res) {
		console.log("wifi listen list end", res);
		if (res.wifiList && res.wifiList.length > 0) {
			$(".wifi ul").empty();
			var devices = res.wifiList;
			$.each(devices, function (index, device) {
				var deviceDom = $("<li></li>");
				if (device.SSID) {
					deviceDom.html(device.SSID);
				} else {
					deviceDom.html(device.BSSID);
				}
				var btnContainer = $("<div></div>");
				var btnConn = $("<button>连接wifi</button>");
				btnConn.attr("dataType", "connDevice");
				btnContainer.append(btnConn);
				deviceDom.append(btnContainer);
				deviceDom.data("device", device);
				$(".wifi ul").append(deviceDom);
			});
		}
	})
}

function listenWifiConnect() {
	console.log("wifi listen connect start");
	wx.onWifiConnected(function (res) {
		console.log("wifi listen connect end", res);
	});
}

function getConnectedWifi() {
	console.log("wifi connected start");
	wx.getConnectedWifi({
		success: function (res) {
			console.log("wifi connected end", res);
		},
		fail: function (res) {
			console.log("wifi connected fail", res);
		}
	})
}

var userid = "";

function selectContact() {
	console.log("selectEnterpriseContact start");
	wx.invoke("selectEnterpriseContact", {
		"fromDepartmentId": -1,
		"mode": "single",
		"type": ["department", "user"],
		"selectedDepartmentIds": [],
		"selectedUserIds": [],
		"includeExternalContact": 1
	}, function (res) {
		console.log("selectEnterpriseContact end", res);
		if (res.err_msg == "selectEnterpriseContact:ok") {
			$.each(res.result.userList, function (index, user) {
				userid += user.id + ";"
			});
		}
	})
}

function openChatMsg() {
	console.log("openChatWithMsg start");
	wx.invoke("openChatWithMsg", {
		userIds: userid,
		externalUserIds: "",
		groupName: "讨论组",
		chatId: "",
		msg: {
			title: "标题",
			desc: "这是一个测试",
			link: "https://www.baidu.com",
			imgUrl: ""
		}
	}, function (res) {
		console.log("openChatWithMsg end", res);
	})
}

function openUserProfile() {
	console.log("openUserProfile start");
	wx.invoke("openUserProfile", {
		type: 1,
		userid: userid.substr(0, userid.length - 1)
	}, function (res) {
		console.log("openUserProfile end");
	})
}

function checkJsApi() {
	console.log("checkJsApi start");
	wx.checkJsApi({
		jsApiList: ["chooseImage"],
		success: function (res) {
			console.log("checkJsApi end", res);
		}
	})
}

function shareAppMessage() {
	console.log("shareAppMessage start");
	wx.invoke("shareAppMessage", {
		title: "分享3",
		desc: "描述3",
		link: "https://www.baidu.com",
		imgUrl: ""
	}, function (res) {
		console.log("shareAppMessage end", res);
	})
}

function shareWechatMessage() {
	console.log("shareWechatMessage start");
	wx.invoke("shareWechatMessage", {
		title: "分享4",
		desc: "描述4",
		link: "https://work.weixin.qq.com/api/doc/90000/90136/90490",
		imgUrl: ""
	}, function (res) {
		console.log("shareWechatMessage end", res);
	})
}

var imgLocalId = "";

function chooseImage() {
	console.log("chooseImage start");
	wx.chooseImage({
		count: 1,
		sizeType: ["compressed"],
		sourceType: ["camera"],
		quality: 0.8,
		success: function (res) {
			console.log("chooseImage end", res);
			if (res.localIds) {
				imgLocalId = res.localIds[0];
			}
		}
	});
}

function getLocalImage() {
	console.log("getLocalImgData start");
	wx.getLocalImgData({
		localId: imgLocalId,
		success: function (res) {
			console.log("getLocalImgData end", res);
			if (res.localData) {
				$("#localimagedata").attr("src", res.localData);
			}
		}
	});
}

function previewImage() {
	console.log("previewImage start");
	wx.previewImage({
		current: "https://img0.baidu.com/it/u=3816404254,238458020&fm=11&fmt=auto&gp=0.jpg",
		urls: ["https://img2.baidu.com/it/u=2920685919,2017597770&fm=26&fmt=auto&gp=0.jpg",
			"https://img1.baidu.com/it/u=2346282507,2171850944&fm=26&fmt=auto&gp=0.jpg",
			"https://img1.baidu.com/it/u=1474266791,210202337&fm=26&fmt=auto&gp=0.jpg"],
		hidePreviewMenuList: []
	});
}

function previewFilePdf() {
	console.log("previewFile start");
	wx.previewFile({
		url: "https://mam.zeus2.top:10030/sdydxj/main/getImageStream?type=knowledge&uuid=596987984",
		name: "getImageStream.pdf",
		size: 235532,
		hidePreviewMenuList: ['previewMenuItem:share:appMessage', 'previewMenuItem:favorite', 'previewMenuItem:share:wechat']
	});
	console.log("previewFile end");
}

function previewFileDocx() {
	console.log("previewFile start");
	wx.previewFile({
		url: "http://igw.isgcc.net:18202/mgr/static/devDoc.docx",
		name: "",
		size: 3034066,
		hidePreviewMenuList: []
	});
	console.log("previewFile end");
}

var videolocalid = "";
function chooseVideo() {
	console.log("chooseVideo start");
	wx.invoke("chooseVideo", {
		sourceType: ["camera", "album"]
	}, function (res) {
		console.log("chooseVideo end", res);
		videolocalid = typeof res.localIds == "object" ? res.localIds[0] : JSON.parse(res.localIds)[0];
		var thumbnail = res.thumbnail;
		wx.getLocalImgData({
			localId: thumbnail,
			success: function (res) {
				if (res.localData) {
					$("#localvideo").attr("poster", res.localData);
				}
			}
		});
	});
}
function playVideo() {
	wx.invoke('getLocalResPath', {
		localId: videolocalid
	}, function (res) {
		console.log(res.localResPath);
		$("#localvideo").attr("src", res.localResPath);
	});
}

function startRecord() {
	console.log("startRecord start");
	wx.startRecord({
		success: function (res) {
			console.log(res);
		}
	}
	);
	wx.onVoiceRecordEnd({
		complete: function (res) {
			console.log("onVoiceRecordEnd complete", res);
		}
	});
}

var recordlocalid = "";
function stopRecord() {
	console.log("stopRecord start");
	wx.stopRecord({
		success: function (res) {
			console.log("stopRecord end", res);
			recordlocalid = res.localId;
		}, fail: function (res) {
			console.log(res);
		}
	});
}

function playVoice() {
	console.log("playVoice start");
	wx.playVoice({
		localId: recordlocalid
	});
	wx.onVoicePlayEnd({
		success: function (res) {
			console.log("onVoicePlayEnd end", res);
		}
	});
}

function pauseVoice() {
	console.log("pauseVoice start");
	wx.pauseVoice({
		localId: recordlocalid
	});
}

function stopVoice() {
	console.log("stopVoice start");
	wx.stopVoice({
		localId: recordlocalid
	});
}

function startInTimeVoice() {
	console.log("startRecordVoiceBuffer start");
	wx.startRecordVoiceBuffer({
		maxDuration: 200,
		sampleRate: 16000,
		success: function (res) {
			console.log(res);
		}
	});
	wx.onRecordBufferReceived(function (res) {
		console.log("onRecordBufferReceived end", res);
	});
}

function stopInTimeVoice() {
	console.log("stopRecordVoiceBuffer start");
	wx.stopRecordVoiceBuffer({
		success: function (res) {
			console.log(res);
		}
	});
}

function translateVoice() {
	console.log("translateVoice start");
	wx.translateVoice({
		localId: recordlocalid,
		isShowProgressTips: 1,
		success: function (res) {
			console.log("translateVoice end", res);
		}
	});
}

function initLocation() {
	console.log("ext_gislocation_init start");
	var osType = isIosOrAndroid();
	console.log("osType", osType);
	if (osType == 1) {
		wx.invoke("ext_SGMap_init", {
			"data": {
				"function": 'init',
				"data": {
					//"domain": "https://lbs.sgmap.cn",
					//"key": "8a7e046d86843c04aedb82d5b674df80",
					//"secret": "e607459fc8383c5cb8c88f482946d376"
					"domain": "https://map.sgcc.com.cn",
					"key": "",
					"secret": ""
				}
			}
		}, function (res) {
			console.log("ext_SGMap_init end", res);
			console.log("ext_gislocation_init end", res);
			wx.invoke("ext_gislocation_init", { data: {} }, function (res) {
				console.log("ext_gislocation_init end", res);
			});

		})
	} else {
		console.log("ext_gislocation_init start");
		wx.invoke("ext_gislocation_init", { data: {} }, function (res) {
			console.log("ext_gislocation_init end", res);
		});
	}
}

var gisserviceid = "";
function startLocation() {
	console.log("ext_gislocation_start start");

	wx.invoke("ext_gislocation_start", {
		data: {
			service_id: "test1",
			url: "http://103.46.128.21:29500/gislocation?st=99999dddd",
			token: "dwabfhgegn#dwamf_dawfga-rahr",
			interval: 10
		}
	}, function (res) {
		console.log("ext_gislocation_start end", res);
	});
}


function stopLocation() {
	console.log("ext_gislocation_stop start");
	if (gisserviceid == "" || gisserviceid.length == 0) {
		alert("请先开始定位");
		return;
	}
	wx.invoke("ext_gislocation_stop", {
		data: {
			service_id: gisserviceid
		}
	}, function (res) {
		console.log("ext_gislocation_stop end", res);
	});
}

function getCacheData() {
	console.log("ext_DataCache_Get start");
	wx.invoke("ext_DataCache_Get", {}, function (res) {
		console.log("ext_DataCache_Get end", res);
	});
}

function saveCacheData() {
	console.log("ext_DataCache_Save start");
	wx.invoke("ext_DataCache_Save", {
		data: {
			message: "this is a test for cache"
		}
	}, function (res) {
		console.log("ext_DataCache_Save end", res);
	});
}

function saveDataToDisk() {
	console.log("ext_DataCache_SaveInfo start");
	wx.invoke("ext_DataCache_SaveInfo", {
		data: {
			key: "dataDisk",
			message: "this is a test for Disk"
		}
	}, function (res) {
		console.log("ext_DataCache_SaveInfo end", res);
	});
}

function getDataFromDisk() {
	console.log("ext_DataCache_GetInfo start");
	wx.invoke("ext_DataCache_GetInfo", {
		data: {
			key: "dataDisk"
		}
	}, function (res) {
		console.log("ext_DataCache_GetInfo end", res);
	});
}

function removeDataFromDisk() {
	console.log("ext_DataCache_RemoveInfo start");
	wx.invoke("ext_DataCache_RemoveInfo", {
		data: {
			key: "dataDisk"
		}
	}, function (res) {
		console.log("ext_DataCache_RemoveInfo end", res);
	});
}


var device = new BluetoothDevice();

function openBluetoothAdapter() {
	device.init(null, function () {
		alert("请先打开蓝牙设备！");
	});
}

function closeBluetoothAdapter() {
	device.close();
}

function startBluetoothDevicesDiscovery() {
	device.startDiscovery(null, function (res) {
		window.deviceDiscoveryInterval = window.setInterval(function () {
			$("#bluetoothdevicesdiscovery").empty();
			$.each(device.devices, function (prop, dev) {
				var li = $("<li></li>");
				if (dev.name && dev.name.length > 0) {
					li.append(dev.name);
				} else {
					li.append(prop);
				}
				li.append("<br/>");
				var connectBluetooth = $("<button>连接蓝牙</button>");
				var closeBluetooth = $("<button>断开蓝牙</button>");
				var services = $("<button>获取服务</button>");
				var characteristics = $("<button>获取特征值</button>");
				var readCharacteristics = $("<button>接收消息</button>");
				var writeCharacteristics = $("<button>发送消息</button>");
				connectBluetooth.data("type", "connect");
				closeBluetooth.data("type", "close");
				closeBluetooth.attr("disabled", "disabled");
				services.data("type", "services");
				services.attr("disabled", "disabled");
				characteristics.data("type", "characteristic");
				characteristics.attr("disabled", "disabled");
				readCharacteristics.data("type", "readCharacteristic");
				readCharacteristics.attr("disabled", "disabled");
				writeCharacteristics.data("type", "writeCharacteristic");
				writeCharacteristics.attr("disabled", "disabled");
				li.append(connectBluetooth);
				li.append(closeBluetooth);
				li.append(services);
				li.append(characteristics);
				li.append(readCharacteristics);
				li.append(writeCharacteristics);
				li.data("deviceId", prop);
				$("#bluetoothdevicesdiscovery").append(li);
			});
		}, 2000);
	});
}

function stopBluetoothDevicesDiscovery() {
	device.stopDiscovery(function (res) {
		if (window.deviceDiscoveryInterval) {
			window.clearInterval(window.deviceDiscoveryInterval);
			delete window.deviceDiscoveryInterval;
		}
	}, function (res) {
		if (window.deviceDiscoveryInterval) {
			window.clearInterval(window.deviceDiscoveryInterval);
			delete window.deviceDiscoveryInterval;
		}
	});
}

function getConnectedBluetoothDevices() {
	$("#connectedDevices").empty();
	device.getConnectedDevices(function (res) {
		$.each(res.devices, function (i, dev) {
			$("#connectedDevices").append(dev.name ? "<li>" + dev.name + "</li>" : "<li>" + dev.deviceId + "</li>");
		});
	});
}

function setClipboardData() {
	console.log("setClipboardData start");
	wx.setClipboardData({
		data: {
			name: "测试",
			title: "标题"
		},
		success: function (res) {
			console.log("setClipboardData end", res);
		}
	})
}

function getClipboardData() {
	console.log("getClipboardData start");
	wx.getClipboardData({
		success: function (res) {
			console.log("getClipboardData end", res);
		}
	});
}

function openInLocation() {
	console.log("openLocation start");
	wx.openLocation({
		latitude: 39.9432725,
		longitude: 116.3474879,
		name: "北京",
		address: "北京-测试地址",
		scale: 1
	});
}

function getInLocation() {
	console.log("getLocation start");
	wx.getLocation({
		type: "wgs84",
		success: function (res) {
			console.log("getLocation end", res);
		},
		fail: function (res) {
			console.log("getLocation end", res);
		}
	});
}

function startInAutoLBS() {
	console.log("startAutoLBS start");
	wx.invoke("startAutoLBS", {
		type: "wgs84",
		continue: 1
	}, function (res) {
		console.log("startAutoLBS end", res);
		wx.onLocationChange(function (res) {
			console.log("onLocationChange end", res);
		});
	});
}

function stopInAutoLBS() {
	console.log("stopInAutoLBS start");
	wx.invoke("stopAutoLBS", {}, function (res) {
		console.log("stopAutoLBS end", res);
	})
}


function listenInLocationChange() {
	console.log("listenInLocationChange start");
	wx.onLocationChange(function (res) {
		console.log("listenInLocationChange", res);
	});
}


function listenHistoryBack() {
	console.log("onHistoryBack start");
	wx.onHistoryBack(function () {
		console.log("onHistoryBack end");
		return confirm("确定要放弃当前页面的修改?");
	});
}

function hideOptionMenu() {
	console.log("hideOptionMenu start");
	wx.hideOptionMenu();
	console.log("hideOptionMenu end");
}

function showOptionMenu() {
	console.log("showOptionMenu start");
	wx.showOptionMenu();
	console.log("showOptionMenu end");
}

function closeInWindow() {
	console.log("closeWindow start");
	wx.closeWindow();
	console.log("closeWindow end");
}

function hideMenuItems() {
	console.log("hideMenuItems start");
	wx.hideMenuItems({
		menuList: ["menuItem:setFont",
			"menuItem:refresh",
			"menuItem:FloatWindow",
			"menuItem:share:appMessage",
			"menuItem:share:wechat",
			"menuItem:share:wechat circle",
			"menuItem:favorite",
			"menuItem:copyUrl",
			"menuItem:openWithSafari",
			"menuItem:share:email"
		]
	});
	console.log("hideMenuItems end");
}

function showMenuItems() {
	console.log("showMenuItems start");
	wx.showMenuItems({
		menuList: ["menuItem:setFont",
			"menuItem:refresh",
			"menuItem:FloatWindow",
			"menuItem:share:appMessage",
			"menuItem:share:wechat",
			"menuItem:share:wechat circle",
			"menuItem:favorite",
			"menuItem:copyUrl",
			"menuItem:openWithSafari",
			"menuItem:share:email"
		]
	});
	console.log("showMenuItems end");
}

function hideAllNonBaseMenuItem() {
	console.log("hideAllNonBaseMenuItem start");
	wx.hideAllNonBaseMenuItem();
	console.log("hideAllNonBaseMenuItem end");
}

function showAllNonBaseMenuItem() {
	console.log("showAllNonBaseMenuItem start");
	wx.showAllNonBaseMenuItem();
	console.log("showAllNonBaseMenuItem end");
}

function listenUserCaptureScreen() {
	console.log("onUserCaptureScreen start");
	wx.onUserCaptureScreen(function (res) {
		console.log("用户截屏了");
		alert("用户截屏了");
		console.log("onUserCaptureScreen end");
	});
}


function openExtOpenUrl() {
	console.log("openUrl start");
	wx.invoke("openUrl", {
		type: 0,
		url: "https://mamjs.sgcc.com.cn:10443/sdydxj/main/getImageStream?type=knowledge&uuid=596987984"
	}, function (res) {
		console.log("openUrl end", res);
	})
}

function scanQRCode() {
	console.log("scanQRCode start");
	wx.scanQRCode({
		desc: "scanQRCode desc",
		needResult: 0,
		scanType: ["qrCode", "barCode"],
		success: function (res) {
			console.log("scanQRCode end", res);
		},
		error: function (res) {
			console.log("scanQRCode error", res);
		}
	});
}

function getStepCount() {
	console.log("getStepCount start");
	wx.invoke("getStepCount", {
		preMode: false
	}, function (res) {
		console.log("getStepCount end", res);
	})
}

function getAllPhoneContacts() {
	console.log("getAllPhoneContacts start");
	wx.invoke("getAllPhoneContacts", {}, function (res) {
		console.log("getAllPhoneContacts end", res);
	})
}

function addCalendarEvent() {
	console.log("addCalendarEvent start");
	wx.invoke("addCalendarEvent", {
		allDayEvent: false,
		title: "日历事件测试",
		note: "这是一个测试",
		startTime: Date.parse(new Date()) / 1000,
		endTime: Date.parse(new Date((new Date() / 1000 + 86400) * 1000)),
		location: "",
		timezone: 8,
		alarm: 10,
		repeat: {
			until: Date.parse(new Date((new Date() / 1000 + 86400) * 1000)),
			type: 0
		}
	}, function (res) {
		console.log("addCalendarEvent end", res);
	})
}

function showWatermark() {
	console.log("showWatermark start");
	wx.invoke("showWatermark", {}, function (res) {
		console.log("showWatermark end", res);
	})
}

function hideWatermark() {
	console.log("hideWatermark start");
	wx.invoke("hideWatermark", {}, function (res) {
		console.log("hideWatermark end", res);
	})
}

function lauchOtherApp() {
	console.log("launch3rdApp start");
	wx.invoke("launch3rdApp", {
		appName: "微信",
		appId: "webchat",
		messageExt: "from=weixin_webview",
		packageName: "com.tencent.mm",
		param: "webview"
	}, function (res) {
		console.log("launch3rdApp end", res);
	})
}

function lauchOtherAppWithParams() {
	console.log("request3rdApp start");
	var osType = isIosOrAndroid();
	wx.invoke("request3rdApp", {
		scheme: "http",
		needToken: 0,
		param: ''
	}, function (res) {
		console.log("request3rdApp end", res);
	})
}

function getInstallState() {
	console.log("getInstallState start");
	wx.invoke("getInstallState", {
		packageName: "com.tencent.weworklocal"
	}, function (res) {
		console.log("getInstallState end", res);
	})
}

function ocrScan() {
	console.log("ocr start");
	wx.invoke("ocr", {
		sourceType: ["camera", "album"],
		ocrType: $("#ocrtype").val(),
		title: "OCR识别"
	}, function (res) {
		console.log("ocr end", res);
	});
}

function screenDirection() {
	console.log("ext_screenControl_direction start");
	wx.invoke("ext_screenControl_direction", {
		data: {
			orientation: $(".screendirection").val()
		}
	}, function (res) {
		console.log("ext_screenControl_direction end", res);
	})
}

function iscpInit() {
	iscpip=$("#iscp-iscpip").val();
	console.log("ext_ISCP_Init start",iscpip);
	wx.invoke("ext_ISCP_Init", {
		data: {
			'iscpIP':iscpip
		}
	}, function (res) {
		console.log("ext_ISCP_Init end", res);
	})
}

function iscpConnect() {
	iscpip=$("#iscp-iscpip").val();
	serverip=$("#iscp-serverip").val();
	serverport=$("#iscp-serverport").val();
	serveruser=$("#iscp-serveruser").val();
	serverappid=$("#iscp-serverappid").val();

	console.log("ext_ISCP_ConnectService start");
	wx.invoke("ext_ISCP_ConnectService", {
		data: {
			'iscpIP': iscpip,
			'ip': serverip,
			'port': serverport,
			'user': serveruser,
			'appid': serverappid
		}
	}, function (res) {
		console.log("ext_ISCP_ConnectService end", res);
	})
}

function iscpGetLocalPort() {
	iscpip=$("#iscp-iscpip").val();
	serverip=$("#iscp-serverip").val();
	serverport=$("#iscp-serverport").val();
	serveruser=$("#iscp-serveruser").val();
	serverappid=$("#iscp-serverappid").val();
	localip=$("#iscp-localip").val();
	localport=$("#iscp-localport").val();
	
	console.log("ext_ISCP_GetLocalPort start");
	wx.invoke("ext_ISCP_GetLocalPort", {
		data: {
			'iscpIP': iscpip,
			'ip': localip,
			'port': localport
		}
	}, function (res) {
		console.log("ext_ISCP_GetLocalPort end", res);
	})
}

function iscpStatus() {
	iscpip=$("#iscp-iscpip").val();
	console.log("ext_ISCP_Status start");
	 wx.invoke("ext_ISCP_Status", {
          data: {
			'iscpIP':iscpip
          }
        }, function(res) {
          console.log("ext_ISCP_Status ",res);
          
        })
}

function iscpClose() {
	iscpip=$("#iscp-iscpip").val();
	console.log("ext_ISCP_Close start");
	wx.invoke("ext_ISCP_Close", {
		data: {
			'iscpIP': iscpip
		}
	}, function (res) {
		console.log("ext_ISCP_Close end", res);
	})
}

var netuploadchannelid;
function netUploadFile() {
	console.log("ext_Net_Upload start");
	var channelId = "net_upload_" + createNonceStr(8);
	netuploadchannelid = channelId;

	wx.invoke("multiWindows_subscribe", {
		channelId: "aaaaa22"
	}, function (res) {
		console.log(channelId, res);
	})
	wx.chooseImage({
		count: 1,
		sizeType: ["original", "compressed"],
		sourceType: ["album", "camera"],
		quality: 0.8,
		success: function (res) {
			console.log("id", res);
			var localIds = res.localIds;
			localIds.forEach(function (id) {
				wx.invoke('getLocalResPath', {
					localId: id
				}, function (res) {
					console.log('getLocalResPath', res)
					var uploadUrl = res.localResPath;
					wx.invoke("ext_Net_Upload", {
						data: {
							url: "http://103.46.128.21:29500/example/upload",
							header: {
								'ContentType': 'multipart/form-data',
								'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIzMDQ2NTc1MzY4MjAyMjQwMiwidXNlcm5hbWUiOiIxNTA3NDg4NTI3NSIsInJlYWxuYW1lIjoi546L5a6P5rqQIiwiY2xpZW50SWQiOiJiam5zY19jZHBfYXBwIiwiY2xpZW50VHlwZSI6IjIwMiIsImp0aSI6ImU4OGY4OTg5LTgyZWQtNDQ5MS1hZTM4LTQ2MGFjNTUxNDUyMSJ9.O2_pLtWVzTR1K7xxYkX9zkZEDoh5cJKXraTAVSHUkIU',
								'onceStr': 'a24e8bd5-6f8d-4ce5-b496-edb0b10fb9a9',
								'signature': 'c1afb4f9c2fbeb707fa8e35792f46422',
								'timestamp': '3260101166015'
							},
							id: "aaaaa22",
							timeout: 10,
							files: {
								key: uploadUrl
							}
						}
					}, function (res) {
						console.log("ext_Net_Upload end", res);
					})
				})
			});
		}
	});
}

function netCancelUploadFile() {
	console.log("ext_Net_CancelUpload start");
	wx.invoke("ext_Net_CancelUpload", {
		data: {
			id: netuploadchannelid
		}
	}, function (res) {
		console.log("ext_Net_CancelUpload end", res);
	})
}

var netdownloadchannelid;
function netdownloadFile() {
	console.log("ext_Net_Download start");
	var netdownloadchannelid;
	var channelId = "net_download_" + createNonceStr(8);
	netdownloadchannelid = channelId;
	wx.invoke("multiWindows_subscribe", {
		channelId: channelId
	}, function (res) {
		console.log(channelId, res);
		if (res.data.event == "success") {
			console.log("下载成功");
			console.log(res);
		}
	});
	wx.invoke("ext_Net_Download", {
		data: {
			cmd: "download",
			url: "http://139.9.7.194:8888/down/KwmTyZUd3aZw",
			id: channelId,
			timeout: 10,
			path: "/storage/emulated/0/Download/com.dlxx.mam.Internal/cache/",
			fileName: "a.doc"
		}
	}, function (res) {
		console.log("ext_Net_Download end", res);
	});
}

function gisInit() {
	console.log("ext_SGMap_init start");
	wx.invoke("ext_SGMap_init", {
		data: {
			"function": "init",
			"data": {
				//"domain": "https://lbs.sgmap.cn",
				//"key": "8a7e046d86843c04aedb82d5b674df80",
				//"secret": "e607459fc8383c5cb8c88f482946d376"
				"domain": "https://map.sgcc.com.cn",
				"key": "",
				"secret": ""
			}
		}
	}, function (res) {
		console.log("ext_SGMap_init end", res);
	})
}

function gisCheckLocationPermission() {
	console.log("checkLocationPermission start");
	wx.invoke("ext_SGMap_Location", {
		"data": {
			"function": "checkLocationPermission",
			"data": {
			}
		}
	}, function (res) {
		console.log("checkLocationPermission end", res);
	})
}

function gisOpenLocationPermission() {
	console.log("openLocationPermissionSetting start");
	wx.invoke("ext_SGMap_Location", {
		"data": {
			"function": 'openLocationPermissionSetting',
			"data": {
			}
		}
	}, function (res) {
		console.log("openLocationPermissionSetting end", res);
	})
}

function gisOpenMap() {
	console.log("ext_SGMap_Operation open");
	var heightSize = document.documentElement.clientHeight * 2 / 3;
	var widthSize = document.documentElement.clientWidth * 2 / 3;
	var left = 110;
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'open',
			"data": {
				"left": left,
				"top": 100,
				"width": widthSize,
				"height": heightSize,
				"lng": 116.397228,
				"lat": 39.909604
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation open end", res);
	})
}

function gisCloseMap() {
	console.log("ext_SGMap_Operation close");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'close',
			"data": {}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation close end", res);
	})
}

function gisMapSetting() {
	console.log("ext_SGMap_Operation map_setting");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"lng": 116.413888,
				"lat": 39.01924,   //lng和lat 决定地图的中心点
				"zoomLevel": 9,//缩放级别（默认3-19）
				"minZoomLevel": 3,//最小缩放级别  默认是0
				"maxZoomLevel": 19,//最大缩放级别  默认是22，上限25
				"showSatellite": false,//是否显示卫星图层
				"showCompass": false, //是否显示指南针, 默认YES
				"logoViewMargins": {//logo位置的偏移量
					"x": 50,
					"y": 15
				},
				"showTraffic": false,//是否显示交通路况图层, 默认为NO(当showSatellite为false时生效)
				"showRoadNet": false,//是否显示路网信息, 默认为YES((当showSatellite为true时生效)
				"enableScroll": false,//是否支持旋转, 默认YES
				"showUserLocation": false,////是否显示用户位置
				"showScale": false,//显示比例尺

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation map_setting end", res);
	})
}

function gisMapTraffic() {
	console.log("ext_SGMap_Operation setting showTraffic");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"showTraffic": true,//是否显示交通路况图层, 默认为NO(当showSatellite为false时生效)

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation setting showTraffic end", res);
	})
}

function gisMapSatellite() {
	console.log("ext_SGMap_Operation showSatellite");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"showSatellite": true,//是否显示卫星图层
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation showSatellite end", res);
	})
}

function gisMapCompass() {
	console.log("ext_SGMap_Operation showSatellite");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"showCompass": true, //是否显示指南针, 默认YES
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation showSatellite end", res);
	})
}

function gisMapRoadNet() {
	console.log("ext_SGMap_Operation showRoadNet");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"showRoadNet": true,//是否显示路网信息, 默认为YES((当showSatellite为true时生效)
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation showRoadNet end", res);
	})
}

function gisMapScroll() {
	console.log("ext_SGMap_Operation enableScroll");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"enableScroll": true,//是否支持旋转, 默认YES
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation enableScroll end", res);
	});
}

function gisMapUserLocation() {
	console.log("ext_SGMap_Operation showUserLocation");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"showUserLocation": true,////是否显示用户位置
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation showUserLocation end", res);
	})
}

function gisMapScale() {
	console.log("ext_SGMap_Operation showScale");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"showScale": true,//显示比例尺
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation showScale end", res);
	})
}

function gisMapCenterPoint() {
	console.log("ext_SGMap_Operation setting map_center");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'setting',
			"data": {
				"lng": 116.413387,
				"lat": 39.01924,   //lng和lat 决定地图的中心点
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation setting map_center end", res);
	})
}

function gisMapBackToLocation() {
	console.log("ext_SGMap_Operation backToLocation");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'backToLocation',
			"data": {}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation backToLocation end", res);
	})
}

function gisMapDistanceWithLocation() {
	console.log("ext_SGMap_Operation distanceFromLocation");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'distanceFromLocation',
			"data": {
				"lat1": 36.65431,
				"lng1": 116.65431,
				"lat2": 36.66431,
				"lng2": 116.66431,
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation distanceFromLocation end", res);
	})
}

function gisMapZoomIn() {
	console.log("ext_SGMap_Operation zoomIn");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'zoomIn',
			"data": {}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation zoomIn end", res);
	})
}

function gisMapZoomOut() {
	console.log("ext_SGMap_Operation zoomOut");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'zoomOut',
			"data": {}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation zoomOut end", res);
	})
}

function gisMapMarkerStyle() {
	console.log("ext_SGMap_Operation callout");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": "callout",
			"data": {
				color: "#FF4500",
				fontSize: 20,
				borderRadius: 20,
				borderWidth: 5,
				borderColor: "#F4A460",
				bgColor: "#FFFFFF"
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation callout end", res);
	})
}

function gisMapAddMarkers() {
	console.log("ext_SGMap_Operation addMarkers");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": "addMarkers",
			"data": {
				showAllMarkers: true,
				"points":
					[
						{
							id: "1000000001",
							lng: 114.402965,
							lat: 30.475845,
							title: "标记1",
							image_id: "1",
							img: "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"
						},
						{
							id: "1000000002",
							lng: 114.409308,
							lat: 30.476229,
							title: "标记2",
							image_id: "1",
							img: "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"
						}
					]
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation addMarkers end", res);
		wx.invoke("ext_SGMap_Operation", {
			"data": {
				"function": "setting",
				"data": {
					"lng": 114.402965,
					"lat": 30.475845,
					"zoomLevel": 15
				}
			}
		}, function (res) {
			console.log("ext_SGMap_Operation addPolygon setting", res);
		})
	})
}

function gisMapRemoveMarkers() {
	console.log("ext_SGMap_Operation deleteMarkers");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'deleteMarkers',
			"data": {
				id: "1000000001,1000000005"
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation deleteMarkers", res);
	})
}

function gisMapAddPolygon() {
	console.log("ext_SGMap_Operation addPolygon");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'addPolygon',
			"data": {
				id: "polygon_id_1",//必填，标记位 唯一值，标记添加的点线面唯一
				color: "#ff00ff",//颜色值#ff00ff
				alpha: 0.5,//透明度
				"points":
					[

						{
							"lng": 118.165699,
							"lat": 24.522585,
						}, {
							"lng": 118.188873,
							"lat": 24.534611,
						}, {
							"lng": 118.158833,
							"lat": 24.530883,
						}, {
							"lng": 118.147503,
							"lat": 24.547115,
						}, {
							"lng": 118.140121,
							"lat": 24.530643,
						}, {
							"lng": 118.116260,
							"lat": 24.533529,
						}, {
							"lng": 118.139091,
							"lat": 24.521743,
						}, {
							"lng": 118.118792,
							"lat": 24.510677,
						}, {
							"lng": 118.144070,
							"lat": 24.515008,
						}, {
							"lng": 118.149048,
							"lat": 24.502496,
						}, {
							"lng": 118.158489,
							"lat": 24.515369,
						}, {
							"lng": 118.182007,
							"lat": 24.506346,
						}, {
							"lng": 118.165699,
							"lat": 24.510677,
						},
					],

				fillcolor: "#ff00ff"

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation addPolygon", res);

		console.log("ext_SGMap_Operation addPolygon setting");
		wx.invoke("ext_SGMap_Operation", {
			"data": {
				"function": 'setting',
				"data": {
					"lng": 118.165699,
					"lat": 24.4970400000,
					"zoomLevel": 12
				}
			}
		}, function (res) {
			console.log("ext_SGMap_Operation addPolygon setting", res);
		})
	})
}

function gisMapAddPolyLine() {
	console.log("ext_SGMap_Operation addPolyLine");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'addPolyLine',
			"data": {
				"id": 11111,//必填，标记位 唯一值，标记添加的点线面唯一
				"color": "#ff00ff",//颜色值#ff00ff
				"alpha": 0.5,
				"width": 10.0,
				"points":
					[{
						"lng": 116.402965,
						"lat": 30.475845,
					},
					{
						"lng": 114.409308,
						"lat": 30.476229,
					}],
				"dashDot": {//虚线点宽高。isDashline=true时有效
					"width": 2.0,
					"height": 2.0
				},

				"isDashline": false,//是否是虚线，默认false实线，true虚线

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation addPolyLine end", res);

		console.log("ext_SGMap_Operation addPolyLine setting");
		wx.invoke("ext_SGMap_Operation", {
			"data": {
				"function": 'setting',
				"data": {
					"lng": 114.409308,
					"lat": 30.476229,
				}
			}
		}, function (res) {
			console.log("ext_SGMap_Operation addPolyLine setting", res);
		})
	});
}

function gisMapRemovePolyMark() {
	console.log("ext_SGMap_Operation removePolyMark");
	wx.invoke("ext_SGMap_Operation", {
		"data": {
			"function": 'removePolyMark',
			"data": {
				//    id: "10001"//可选，标记位 删除指定的线，面。为空值删除所有线，面
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Operation removePolyMark", res);
	})
}

function gisMapLink() {
	console.log("ext_SGMap_Link routePlanning start");
	wx.invoke("ext_SGMap_Link", {
		data: {
			"function": "routePlanning",
			"data": {
				"fromName": "中华城",
				"fromCoordinate": {
					"lng": 118.089552,
					"lat": 24.458657
				},
				"toName": "思极位置",
				"toCoordinate": {
					"lng": 118.191348,
					"lat": 24.489852
				},
				"routeType": 3
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Link routePlanning end", res);
	})
}

function gisMapOnceLocation() {
	console.log("ext_SGMap_Location onceLocation Start");
	wx.invoke("multiWindows_subscribe",
		{
			channelId: "updateLocation"
		}, function (res) {
			console.log("ext_SGMap_Location startUpdatingLocation multiWindows_subscribe", res);

		})
	wx.invoke("ext_SGMap_Location", {
		"data": {
			"function": 'onceLocation',
			"data": {
				"locationWithReGeocode": true,//是否带有逆地理信息
				"locationTimeout": 2, //指定单次定位逆地理超时时间,默认为5s。最小值是2s。注意单次定位请求前设置。

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Location onceLocation completion", res);
	})
}

function gisMapMoreLocation() {
	console.log("ext_SGMap_Location startUpdatingLocation Start");
	wx.invoke("ext_SGMap_Location", {
		"data": {
			"function": 'startUpdatingLocation',
			"data": {
				"locationWithReGeocode": true,//连续定位是否返回逆地理信息，默认NO。
			}
		}

	}, function (res) {
		console.log("ext_SGMap_Location startUpdatingLocation completion", res);
	})

	console.log("ext_SGMap_Location startUpdatingLocation multiWindows_subscribe");
	wx.invoke("multiWindows_subscribe",
		{
			channelId: "updateLocation"
		}, function (res) {
			console.log("ext_SGMap_Location startUpdatingLocation multiWindows_subscribe", res);

		})
}

function gisMapStopLocation() {
	console.log("ext_SGMap_Location stopUpdatingLocation Start");
	wx.invoke("ext_SGMap_Location", {
		"data": {
			"function": 'stopUpdatingLocation',
			"data": {

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Location stopUpdatingLocation completion", res);
	})
}

function gisMapPoiIDSearch() {
	console.log("ext_SGMap_Search Start poiIDSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'poiIDSearch',
			"data": {
				"uid": "B025003WHE",//POI全局唯一ID
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search poiIDSearch completion", res);
	})
}

function gisMapPoiAroundSearch() {
	console.log("ext_SGMap_Search Start poiAroundSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'poiAroundSearch',
			"data": {
				"offset": 1, //非必选,每页记录数, 范围1-25, [default = 20],
				"page": 1, //非必选,当前页数, 范围1-100, [default = 1]
				"requireExtension": false,//非必选,是否返回扩展信息，默认NO。
				"requireSubPOIs": false,//非必选，是否返回子POI，默认为 NO。
				"keywords": "公园",//查询关键字，多个关键字用“|”分割
				"types": "010000",//POI类型
				"city": "厦门市",//查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode.(注：台湾省的城市一律设置为【台湾】，不具体到市。)
				"lng": 118.15116226285,//必选，经度，
				"lat": 24.750248269875,//必选，纬度
				"radius": 5000,//查询半径，范围：0-50000，单位：米 [default = 3000]
				"sortrule": 0//排序规则, 0-距离排序；1-综合排序, 默认0
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search  poiAroundSearch completion", res);
	})
}

function gisMapPoiPolygonSearch() {
	console.log("ext_SGMap_Search Start poiPolygonSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'poiPolygonSearch',
			"data": {
				"offset": 1, //非必选,每页记录数, 范围1-25, [default = 20],
				"page": 1, //非必选,当前页数, 范围1-100, [default = 1]
				"requireExtension": false,//非必选,是否返回扩展信息，默认NO。
				"requireSubPOIs": false,//非必选，是否返回子POI，默认为 NO。

				"keywords": "公园",//查询关键字，多个关键字用“|”分割
				"types": "010000",//POI类型
				"polygon": [    ////多边形, 当传入两个点的时候，当做矩形处理:左下-右上两个顶点；其他情况视为多边形，几个点即为几边型。
					{
						"lng": 115.402965,
						"lat": 31.475845
					},
					{
						"lng": 114.402965,
						"lat": 30.475845
					}
				]
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search poiPolygonSearch completion", res);
	})
}

function gisMapPoiKeywordSearch() {
	console.log("ext_SGMap_Search Start poiKeywordSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'poiKeywordSearch',
			"data": {
				"offset": 1, //非必选,每页记录数, 范围1-25, [default = 20],
				"page": 1, //非必选,当前页数, 范围1-100, [default = 1]
				"requireExtension": true,//非必选,是否返回扩展信息，默认NO。
				"requireSubPOIs": true,//非必选，是否返回子POI，默认为 NO。

				"keywords": "同安区",//查询关键字，多个关键字用“|”分割
				"types": "010000",//POI类型
				"city": "厦门市",//查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode.(注：台湾省的城市一律设置为【台湾】，不具体到市。)
				"cityLimit": false,//强制城市限制功能 默认false，例如：在上海搜索天安门，如果citylimit为true，将不返回北京的天安门相关的POI

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search poiKeywordSearch completion", res);
	})
}

function gisMapInputTipsSearch() {
	console.log("ext_SGMap_Search Start inputTipsSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'inputTipsSearch',
			"data": {
				"keywords": "公园",//查询关键字，多个关键字用“|”分割
				"types": "010000",//POI类型
				"city": "北京市",//查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode.(注：台湾省的城市一律设置为【台湾】，不具体到市。)
				"cityLimit": false,//强制城市限制功能 默认false，例如：在上海搜索天安门，如果citylimit为true，将不返回北京的天安门相关的POI
				"lng": 118.15116226285,
				"lat": 24.750248269875
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search inputTipsSearch completion", res);
	})
}

function gisMapGeocodeSearch() {
	console.log("ext_SGMap_Search Start  geocodeSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'geocodeSearch',
			"data": {
				"address": "北京大学",//地址
				"city": "北京市",//查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode.(注：台湾省的城市一律设置为【台湾】，不具体到市。)

			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search geocodeSearch completion", res);
	})
}

function gisMapReGeocodeSearch() {
	console.log("ext_SGMap_Search Start reGeocodeSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'reGeocodeSearch',
			"data": {
				"radius": 5000,//查询半径，范围：0-50000，单位：米 [default = 3000]
				"requireExtension": false,//非必选,是否返回扩展信息，默认NO。
				"lng": 114.402965,
				"lat": 30.475845,
				"poitype": "190108",//指定返回结果poi数组中的POI类型，在requireExtension=YES时生效。输入为typecode, 支持传入多个typecode, 多值时用“|”分割,例如 “商场|购物中心”等
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search reGeocodeSearch completion", res);
	})
}

function gisMapDistrictSearch() {
	console.log("ext_SGMap_Search Start  districtSearch");
	wx.invoke("ext_SGMap_Search", {
		"data": {
			"function": 'districtSearch',
			"data": {
				"keyword": "北京市",//查询关键字，只支持单关键字搜索，全国范围
				"requireExtension": false,//非必选,是否返回扩展信息，默认NO。
				"offset": 1, //非必选,每页记录数, 范围1-25, [default = 20],
				"page": 1, //非必选,当前页数, 范围1-100, [default = 1]
				"subdistrict": 1//子区域层级，默认1。规则：设置显示下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县、乡镇/街道多级数据）可选值：0、1、2、3等数字，0-不返回下级行政区；1-返回下一级行政区；2-返回下两级行政区；3-返回下三级行政区
			}
		}
	}, function (res) {
		console.log("ext_SGMap_Search districtSearch completion", res);
	})
}


function multiWindowsOpen() {
	console.log("multiWindows_open start");
	wx.invoke("multiWindows_open", {
		window: {
			windowId: "aaa",
			url: 'second.html',
			openType: 0,
			showAppBar: "true"
		}
	}, function (response) {
		console.log("multiWindows_open end", response, new Date().valueOf());
	});
}

function multiWindowsClose() {
	console.log("multiWindows_close start");
	wx.invoke("multiWindows_close", {}, function (response) {
		console.log("multiWindows_close end", response, new Date().valueOf());
	});
}

function multiWindowsStartWidget() {
	console.log("multiWindows_startWidget start");
	wx.invoke("multiWindows_startWidget", {
		agentId:$(".multiwindowwidget").val(),
		//agentId: "1000999",
		window: {
			windowId: "baidu",
			url: "zipapp://appid."+$(".multiwindowwidget").val()+"/index.html",
			openType: 1,
			showAppBar: "false"
		},
		data: {
			param1: "param1",
			param2: "param2",
			list: [1, 2, 3]
		}
	}, function (response) {
		console.log("multiWindows_startWidget end", response, new Date().valueOf());
	});
}

function multiWindowsCloseWidget() {
	console.log("multiWindows_finishWidget start");
	wx.invoke("multiWindows_finishWidget", {
		agentId: $(".multiwindowwidget").val()
	}, function (response) {
		console.log("multiWindows_finishWidget end", response, new Date().valueOf());
	});
}

var multiwindowsubscribechannel = "baidu-" + createNonceStr(8);
function multiWindowsSubscribe() {
	console.log("multiWindows_subscribe start");
	wx.invoke("multiWindows_subscribe", {
		channelId: multiwindowsubscribechannel
	}, function (response) {
		console.log("multiWindows_subscribe end", response);
	});
}

function multiWindowsPublish() {
	console.log("multiWindows_publish start");
	wx.invoke("multiWindows_publish", {
		channelId: multiwindowsubscribechannel,
		message: "message info",
		data: {
			param1: "param1",
			param2: "param2",
			list: []
		}
	}, function (response) {
		console.log("multiWindows_publish end", response);
	});
}

function listenMenuShareAppMessage() {
	console.log("onMenuShareAppMessage start");
	wx.onMenuShareAppMessage({
		title: "分享",
		desc: "描述",
		link: "https://www.baidu.com",
		imgUrl: "",
		success: function (res) {
			console.log("onMenuShareAppMessage success", res);
			console.log("onMenuShareAppMessage end", res);
		},
		cancel: function (res) {
			console.log("onMenuShareAppMessage cancel", res);
			console.log("onMenuShareAppMessage end", res);
		}
	});
}

function listenMenuShareWechat() {
	console.log("onMenuShareWechat start");
	wx.onMenuShareWechat({
		title: "分享2",
		desc: "描述2",
		link: "https://www.baidu.com",
		imgUrl: "",
		success: function (res) {
			console.log("onMenuShareWechat success", res);
		},
		cancel: function (res) {
			console.log("onMenuShareWechat cancel", res);
		}
	});
}

function listenMenuShareTimeline() {
	console.log("onMenuShareTimeline start");
	wx.onMenuShareTimeline({
		title: "分享20",
		desc: "描述20",
		link: "https://www.baidu.com",
		imgUrl: "",
		success: function (res) {
			console.log("onMenuShareTimeline success", res);
		},
		cancel: function (res) {
			console.log("onMenuShareTimeline cancel", res);
		}
	});
}


function facialLandmarkDetection_init() {
	console.log("ext_facialLandmarkDetection_init  start");
	wx.invoke("ext_facialLandmarkDetection_init", {
		data: {}
	}, function (res) {
		console.log("初始化成功")
		console.log(res)
	})
}

function facialLandmarkDetection_getFaceData() {
	console.log("ext_facialLandmarkDetection_getFaceData  start");
	wx.invoke("ext_facialLandmarkDetection_getFaceData", {
		data: {}
	}, function (res) {
		console.log("获取人脸信息");
		console.log(res.msg)
		console.log(res.msg.length)
		var data = res.msg
		var base = data.split(",")[0]
		var sURL = "http://r405n46572.wicp.vip:29500/base"
		$.ajax({
			url: sURL,
			data: {
				base: base
			},
			success: function (res) {
				console.log(res);
			}
		});
	})
}

function DeviceInfo() {
	console.log("获取设备信息");
	wx.invoke("ext_DeviceInfo_GetInfo", { data: {} }, function (res) {
		console.log(res);
	})
}

function compressImageQuality() {
	console.log("ext_Compressor_Quality start");
	var osType = isIosOrAndroid();
	var path = "";
	if (osType == 2) {
		wx.invoke("getZipAppDirectory", {
			"type": "APP_ROOT_DIR"
		}, function (res) {
			console.log("getZipAppDirectory end", res);
			path = res.directory;
			if (res.err_msg == "getZipAppDirectory:ok") {
				console.log("ext_FileManager_Create start");
				wx.invoke("ext_FileManager_Create", {
					data: {
						path: path,
						name: "videos002"
					}
				}, function (res) {
					console.log("ext_FileManager_Create end", res);
					if (res.err_msg == "ext_FileManager_Create:ok") {
						path += "videos002/";
						wx.chooseImage({
							count: 1,
							sizeType: ["original", "compressed"],
							sourceType: ["album", "camera"],
							quality: 0.8,
							success: function (res2) {
								console.log(res2);
								if (res2.errMsg == "chooseImage:ok") {
									var localId = res2.localIds[0];
									if (localId) {
										wx.invoke("getLocalResPath", {
											localId: localId
										}, function (res) {
											console.log(res);
											if (res.err_msg == "getLocalResPath:ok") {
												var uploadUrl = res.localResPath;
												wx.invoke("ext_Compressor_Quality", {
													data: {
														quality: "80",
														imgPath: uploadUrl,
														storagePath: path //+"20210810093500.jpg"
													}
												}, function (res) {
													console.log("ext_Compressor_Quality end");
												});
											}
										});
									}
								}
							}
						});
					}
				});
			}
		});
	} else {
		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			sourceType: ["album", "camera"],
			quality: 0.8,
			success: function (res2) {
				console.log(res2);
				if (res2.errMsg == "chooseImage:ok") {
					var localId = res2.localIds[0];
					if (localId) {
						wx.invoke("getLocalResPath", {
							localId: localId
						}, function (res) {
							console.log(res);
							if (res.err_msg == "getLocalResPath:ok") {
								var uploadUrl = res.localResPath;
								wx.invoke("ext_Compressor_Quality", {
									data: {
										quality: "80",
										imgPath: uploadUrl,
										storagePath: "/storage/emulated/0/videos001/20210810093500.jpg"
									}
								}, function (res) {
									console.log("ext_Compressor_Quality end");
								});
							}
						});
					}
				}
			}
		});
	}
}

function compressImageSize() {
	console.log("ext_Compressor_Size start");
	var osType = isIosOrAndroid();
	var path = "";

	if (osType == 2) {
		wx.invoke("getZipAppDirectory", {
			"type": "APP_ROOT_DIR"
		}, function (res) {
			console.log("getZipAppDirectory end", res);
			path = res.directory;
			if (res.err_msg == "getZipAppDirectory:ok") {
				console.log("ext_FileManager_Create start");
				wx.invoke("ext_FileManager_Create", {
					data: {
						path: path,
						name: "videos002"
					}
				}, function (res) {
					console.log("ext_FileManager_Create end", res);
					if (res.err_msg == "ext_FileManager_Create:ok") {
						path += "videos002/";
						wx.chooseImage({
							count: 1,
							sizeType: ["original", "compressed"],
							sourceType: ["album", "camera"],
							quality: 0.8,
							success: function (res2) {
								console.log(res2);
								if (res2.errMsg == "chooseImage:ok") {
									var localId = res2.localIds[0];
									if (localId) {
										wx.invoke("getLocalResPath", {
											localId: localId
										}, function (res) {
											console.log(res);
											if (res.err_msg == "getLocalResPath:ok") {
												var uploadUrl = res.localResPath;
												wx.invoke("ext_Compressor_Size", {
													data: {
														outWidth: "50px",
														outHeight: "50px",
														imgPath: uploadUrl,
														storagePath: path //+"20210810093530.jpg"
													}
												}, function (res) {
													console.log("ext_Compressor_Size end");
												});
											}
										});
									}
								}
							}
						});
					}
				});
			}
		});
	} else {
		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			sourceType: ["album", "camera"],
			quality: 0.8,
			success: function (res) {
				if (res.errMsg == "chooseImage:ok") {
					var localIds = res.localIds;
					localIds.forEach(function (id) {
						wx.invoke("getLocalResPath", {
							localId: id
						}, function (res) {
							if (res.err_msg == "getLocalResPath:ok") {
								var uploadUrl = res.localResPath;
								wx.invoke("ext_Compressor_Size", {
									data: {
										outWidth: "50px",
										outHeight: "50px",
										imgPath: uploadUrl,
										storagePath: "/storage/emulated/0/videos001/20210810093530.jpg"
									}
								}, function (res) {
									console.log("ext_Compressor_Size end");
								});
							}
						});
					});
				}
			}
		});
	}
}

/**
 *
 * i国网安卓版本中由于字符串限制不能超过1MB，
 * 不然应用接口调用没有响应，这是企信平台问题造成的，需要进行压缩处理
 *
*/
function compressImage(base64, callback) {
	var targSize = 1024 * 1024 //1024KB  
	if (base64.length <= targSize) {
		callback(base64);
		// console.log("直接返回")
		return
	}
	var newImage = new Image();
	newImage.src = base64;
	console.log(base64.length)
	newImage.setAttribute("crossOrigin", 'Anonymous'); //url为外域时需要  
	newImage.onload = function () {
		var quality = 0.95; //压缩系数0-1之间
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
		var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
		// 如想确保图片压缩到自己想要的尺寸,如要求在5-10kb之间，请加以下语句，quality初始值根据情况自定
		// console.log(base64.length + "循环1压缩" + (base64.length / 1024 > 512))
		while (base64.length > targSize) {
			quality -= 0.05;
			// console.log(base64.length + "循环压缩" + quality)
			base64 = canvas.toDataURL("image/jpeg", quality);
		}
		callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
	}
}

function offlineFaceRegister() {
	console.log("ext_OfflineFaceRec_add start");
	var osType = isIosOrAndroid();
	wx.chooseImage({
		count: 1,
		sizeType: ["original", "compressed"],
		sourceType: ["album", "camera"],
		quality: 1,
		success: function (res) {
			console.log("chooseImage end", res);
			if (res.errMsg == "chooseImage:ok") {
				var localIds = res.localIds;
				localIds.forEach(function (id) {
					if (osType == 2) {
						wx.getLocalImgData({
							localId: id,
							success: function (res) {
								console.log("getLocalImgData end", res);
								if (res.localData) {
									compressImage(res.localData, function (data) {
										wx.invoke("ext_OfflineFaceRec_add", {
											data: {
												pic: data,
												userID: $("#offlinefaceid").val()
											}
										}, function (res) {
											console.log("ext_OfflineFaceRec_add end", res);
										});
									});
								}
							},
							fail: function (res) {
								console.log("getLocalImgData fail", res);
							}
						});
					} else
						wx.invoke("getLocalResPath", {
							localId: id
						}, function (res) {
							console.log("getLocalResPath end", res);
							if (res.err_msg == "getLocalResPath:ok") {
								let offlinefaceimgurl = res.localResPath;
								wx.getLocalImgData({
									localId: offlinefaceimgurl,
									success: function (res) {
										console.log("getLocalImgData end", res);
										if (res.localData) {
											compressImage(res.localData, function (data) {
												wx.invoke("ext_OfflineFaceRec_add", {
													data: {
														pic: data,
														userID: $("#offlinefaceid").val()
													}
												}, function (res) {
													console.log("ext_OfflineFaceRec_add end", res);
												});
											});
										}
									},
									fail: function (res) {
										console.log("getLocalImgData fail", res);
									}
								});
							}
						});
				});
			}
		}
	});
}

function offlineFaceRemove() {
	console.log("ext_OfflineFaceRec_delete start");
	wx.invoke("ext_OfflineFaceRec_delete", {
		data: {
			userID: $("#offlinefaceid").val()
		}
	}, function (res) {
		console.log("ext_OfflineFaceRec_delete end", res);
	});
}

function offlineFaceVerify() {
	console.log("ext_OfflineFaceRec_recognition start");
	var osType = isIosOrAndroid();
	wx.chooseImage({
		count: 1,
		sizeType: ["original", "compressed"],
		sourceType: ["album", "camera"],
		quality: 1,
		success: function (res) {
			console.log("chooseImage end", res);
			if (res.errMsg == "chooseImage:ok") {
				var localIds = res.localIds;
				localIds.forEach(function (id) {
					if (osType == 2) {
						wx.getLocalImgData({
							localId: id,
							success: function (res) {
								console.log("getLocalImgData end", res);
								if (res.localData) {
									compressImage(res.localData, function (data) {
										wx.invoke("ext_OfflineFaceRec_recognition", {
											data: {
												pic: data,
												maxFaceNum: '5'
											}
										}, function (res) {
											console.log("ext_OfflineFaceRec_recognition end", res);
										});
									});
								}
							},
							fail: function (res) {
								console.log("getLocalImgData fail", res);
							}
						});
					} else
						wx.invoke("getLocalResPath", {
							localId: id
						}, function (res) {
							console.log("getLocalResPath end", res);
							if (res.err_msg == "getLocalResPath:ok") {
								let offlinefaceimgurl = res.localResPath;
								wx.getLocalImgData({
									localId: offlinefaceimgurl,
									success: function (res) {
										console.log("getLocalImgData end", res);
										if (res.localData) {
											compressImage(res.localData, function (data) {
												wx.invoke("ext_OfflineFaceRec_recognition", {
													data: {
														pic: data,
														maxFaceNum: '5'
													}
												}, function (res) {
													console.log("ext_OfflineFaceRec_recognition end", res);
												});
											});
										}
									},
									fail: function (res) {
										console.log("getLocalImgData fail", res);
									}
								});
							}
						});
				});
			}
		}
	});
}

function offlineFacePreview() {
	console.log("ext_OfflineFaceRec_openCamera start");
	var osType = isIosOrAndroid();
	var channelId = "event_Socket_create_20d2c3ea";
	wx.invoke("multiWindows_subscribe", {
		channelId: "event_Socket_create_20d2c3ea"
	}, function (res) {
		console.log("subscribe:", new Date().getTime(), res);
	});

	var offlineFacePreviewType = $(".offlineFacePreviewType").val();
	wx.invoke("ext_OfflineFaceRec_openCamera", {
		data: {
			channelId: "event_Socket_create_20d2c3ea",
			x: 300,
			y: 600,
			width: 450,
			height: 450,
			autoRecognition: parseInt(offlineFacePreviewType),
			interval: 2000,
			cameraId: 1
		}
	}, function (res) {
		console.log("ext_OfflineFaceRec_capture", res)
	});
}

function offlineFaceClosePreview() {
	console.log("ext_OfflineFaceRec_closeCamera start");
	var osType = isIosOrAndroid();
	wx.invoke("ext_OfflineFaceRec_closeCamera", {}, function (res) {
		console.log("ext_OfflineFaceRec_closeCamera end", res);
	});
}

function offlineFaceClosePreviewPic() {
	console.log("ext_OfflineFaceRec_takePic start");
	var osType = isIosOrAndroid();
	wx.invoke("ext_OfflineFaceRec_takePic", {}, function (res) {
		console.log("ext_OfflineFaceRec_takePic end", res);
	});
}

function stringToArrayBuffer(str) {
	var bytes = new Array();
	var len, c;
	len = str.length;
	for (var i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if (c >= 0x010000 && c <= 0x10FFFF) {
			bytes.push(((c >> 18) & 0x07) | 0xF0);
			bytes.push(((c >> 12) & 0x3F) | 0x80);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		} else if (c >= 0x000800 && c <= 0x00FFFF) {
			bytes.push(((c >> 12) & 0x0F) | 0xE0);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		} else if (c >= 0x000080 && c <= 0x0007FF) {
			bytes.push(((c >> 6) & 0x1F) | 0xC0);
			bytes.push((c & 0x3F) | 0x80);
		} else {
			bytes.push(c & 0xFF);
		}
	}
	var array = new Int8Array(bytes.length);
	for (var i in bytes) {
		array[i] = bytes[i];
	}
	return array.buffer;
}

function arrayBufferToString(arr) {
	if (typeof arr === 'string') {
		return arr;
	}
	var dataview = new DataView(arr.data);
	var ints = new Uint8Array(arr.data.byteLength);
	for (var i = 0; i < ints.length; i++) {
		ints[i] = dataview.getUint8(i);
	}
	arr = ints;
	var str = '',
		_arr = arr;
	for (var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if (v && one.length == 8) {
			var bytesLength = v[0].length;
			var store = _arr[i].toString(2).slice(7 - bytesLength);
			for (var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}
			str += String.fromCharCode(parseInt(store, 2));
			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
}

function telDialCall() {
	console.log("ext_Intent_Dial start");
	wx.invoke("ext_Intent_Dial", {
		data: {
			num: $("#tel_dial_call").val()
		}
	}, function (res) {
		console.log("ext_Intent_Dial end", res);
	});
}

function createFileNode(callback, isNatural) {
	let fileNode = $("<input type='file' capture='user' accept='image/*'>");
	fileNode.css("display", "none").on("change", function () {
		let file = this.files[0];
		let orientation = null;
		EXIF.getData(file, function () {
			EXIF.getAllTags(this);
			orientation = EXIF.getTag(this, "Orientation");
		});
		let reader = new FileReader();
		reader.onloadend = function () {
			let image = new Image();
			image.src = this.result;
			image.onload = function () {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext("2d");
				canvas.width = isNatural ? this.naturalWidth : 1280;
				canvas.height = isNatural ? this.naturalHeight : 720;
				ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
				let base64;
				if (orientation && orientation != "" && orientation != 1) {
					switch (orientation) {
						case 6:
							rotateImg(this, "left", canvas);
							break;
						case 8:
							rotateImg(this, "right", canvas);
							break;
						case 3:
							rotateImg(this, "right", canvas);
							rotateImg(this, "right", canvas);
							break;
					}
				}
				base64 = canvas.toDataURL("image/png");
				callback ? callback(base64) : null;
				fileNode.remove();
			}
		};
		reader.readAsDataURL(file);
	});
	$(document.body).append(fileNode);
	fileNode.click();
}

function rotateImg(img, direction, canvas) {
	let min_step = 0;
	let max_step = 3;
	if (img == null) {
		return;
	}
	let height = img.height;
	let width = img.width;
	let step = 0;
	if (direction == "right") {
		step++;
		step > max_step && (step = min_step);
	} else {
		step--;
		step < min_step && (step = max_step);
	}
	let degree = step * 90 * Math.PI / 180;
	let ctx = canvas.getContext("2d");
	switch (step) {
		case 0:
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0);
			break;
		case 1:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, 0, -height);
			break;
		case 2:
			canvas.width = width;
			canvas.height = height;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, -height);
			break;
		case 3:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, 0);
			break;
	}
}

function faceDetectionInit() {
	console.log("ext_facialLandmarkDetection_init start");
	wx.invoke("ext_facialLandmarkDetection_init", {
		data: {}
	}, function (res) {
		console.log("ext_facialLandmarkDetection_init end", res);
	});
}

function faceDetectionData() {
	console.log("ext_facialLandmarkDetection_getFaceData start");
	wx.invoke("ext_facialLandmarkDetection_getFaceData", {
		data: {}
	}, function (res) {
		console.log("ext_facialLandmarkDetection_getFaceData end", res);
	});
};

function voiceRecordStart() {
	console.log("ext_VoiceRecord_Start start");
	wx.invoke("multiWindows_subscribe", { channelId: "record_channel_start_0000111" }, function (res) {
		console.log("record voice channel", res);
	});
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		wx.invoke("ext_VoiceRecord_Start", {
			data: {
				recordFilePath: res.directory,
				recordFileName: '001.mp3',
				channelId: 'record_channel_start_0000111'
				//recordDuration:""
			}
		}, function (res) {
			console.log("ext_VoiceRecord_Start end", res);
		});
	});

}

function voiceRecordStop() {
	console.log("ext_VoiceRecord_Stop start");
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		wx.invoke("ext_VoiceRecord_Stop", {
			data: {
				recordFilePath: res.directory,
				recordFileName: "001.mp3"
			}
		}, function (res) {
			console.log("ext_VoiceRecord_Stop stop", res);
		});
	});

}

function voiceRecordPause() {
	console.log("ext_VoiceRecord_Pause start");
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		wx.invoke("ext_VoiceRecord_Pause", {
			data: {
				recordFilePath: res.directory,
				recordFileName: "001.mp3"
			}
		}, function (res) {
			console.log("ext_VoiceRecord_Pause end", res);
		});
	});

}

function voiceRecordResue() {
	console.log("ext_VoiceRecord_Continue start");
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		wx.invoke("ext_VoiceRecord_Continue", {
			data: {
				recordFilePath: res.directory,
				recordFileName: "001.mp3"
			}
		}, function (res) {
			console.log("ext_VoiceRecord_Continue end", res);
		});
	});

}

function voiceRecordRemove() {
	console.log("ext_VoiceRecord_Delete start");
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		wx.invoke("ext_VoiceRecord_Delete", {
			data: {
				delRecordFiles: [res.directory + "001.mp3"]
			}
		}, function (res) {
			console.log("ext_VoiceRecord_Delete end", res);
		});
	});

}

function voiceRecordList() {
	console.log("ext_VoiceRecord_ShowRecords start");
	wx.invoke("getZipAppDirectory", {
		"type": "APP_ROOT_DIR"
	}, function (res) {
		console.log("getZipAppDirectory end", res);
		wx.invoke("ext_VoiceRecord_ShowRecords", {
			data: {
				recordDirPath: res.directory
			}
		}, function (res) {
			console.log("ext_VoiceRecord_ShowRecords end", res);
		});
	});
}

function getIscToken() {
	var url = "https://id.sgcc.com.cn:10443/ticket/identity/getAuthTicketByWechatCode";
	var param = {
		CODE: "Jm4Xyw6rtMcH432J",
		appId: "1000179"
	}
	param = JSON.stringify(param);
	$.ajax({
		type: "post",
		data: param,
		contentType: "application/json;charset=utf-8",
		url: url,
		async: true,
		dataType: "json",
		cache: false,
		crossDomain: true,
		headers: {
			'Accept': 'application/json, text/javascript, */*; q=0.01',
			"Access-Control-Allow-Origin": "http://192.168.43.150:8080",
			"Access-Control-Allow-Credentials": "true",
			//"Origin":"http://localhost:8080"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function (res) {
			console.log(res);
		}
	});

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	var data = [""];
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.setRequestHeader("Access-Control-Allow-Origin", "http://192.168.43.150:8080");
	request.send(data);
	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status === 200) {
				console.log(request.responseText);//打印服务器响应的数据
			} else {
				alert("错误");
			}
		}
	}
}

var fileBrowserPath;
function fileBrowserPreview() {
	console.log("ext_FileBrowser_StartPreView start");
	var osType = isIosOrAndroid();
	fileBrowserPath = "";
	wx.invoke("ext_FileBrowser_StartPreView", {}, function (res) {
		console.log("ext_FileBrowser_StartPreView end", res);
		if (osType == 2) {
			fileBrowserPath = res.filePath;
		}
	});
}

function startLocalServer() {
	console.log("ext_LocalServer_BootServer start");
	wx.invoke("ext_LocalServer_BootServer", {}, function (res) {
		console.log("ext_LocalServer_BootServer end", res);
	});
}

function getLocalServerUri() {
	console.log("ext_LocalServer_LocalUrl start");
	var osType = isIosOrAndroid();
	if (osType == 1) {
		wx.invoke("ext_LocalServer_LocalUrl", {
			data: {
				uris: ['***', '***']
			}
		}, function (res) {
			console.log("ext_LocalServer_LocalUrl end", res);
		});
	} else if (osType == 2) {
		console.log("localServerUri:", {
			data: {
				filePath: fileBrowserPath
			}
		});
		wx.invoke("ext_LocalServer_LocalUrl", {
			data: {
				filePath: fileBrowserPath
			}
		}, function (res) {
			console.log("ext_LocalServer_LocalUrl end", res);
		});
	}

}

function stopLocalServer() {
	console.log("ext_LocalServer_StopServer start");
	wx.invoke("ext_LocalServer_StopServer", {}, function (res) {
		console.log("ext_LocalServer_StopServer end", res);
	});
}

function appInstallCheck() {
	console.log("ext_appInstall_Check start");
	var appid = $("#app_install_id").val();
	wx.invoke("ext_appInstall_Check", {
		data: {
			APPId: appid
		}
	}, function (res) {
		console.log("ext_appInstall_Check end", res);
	});
}

function appInstallStart() {
	console.log("ext_appInstall_start start");
	var appPath = $("#app_install_path").val();
	wx.invoke("ext_appInstall_start", {
		data: {
			Path: appPath
		}
	}, function (res) {
		console.log("ext_appInstall_start end", res);
	});
}

function gpsGetLocation() {
	console.log("ext_GPS_GetLocation start");
	wx.invoke("ext_GPS_GetLocation", { data: {} }, function (res) {
		console.log("ext_GPS_GetLocation end", res);
	});
}

function gpsOpenGPS() {
	console.log("ext_GPS_openGPS start");
	wx.invoke("ext_GPS_openGPS", { data: {} }, function (res) {
		console.log("ext_GPS_openGPS end", res);
	});
}

function changeNavColor() {
	console.log("changeNaviColor start");
	wx.invoke("changeNaviColor", {
		"navbar_color": "#008080",
		"status_type": 1
	}, function (res) {
		console.log("changeNaviColor end", res);
	});
}

function openWMOpen() {
	console.log("multiWindows_open start");

	wx.invoke("multiWindows_open", {
		window: {
			windowId: "wm_id_0001",
			url: "https://www.baidu.com",
			openType: "1",
			showAppBar: "true"
		}
	}, function (res) {
		console.log("multiWindows_open end", res);
	});
}

var ocrResourcePath;
function ocrSelectFiles() {
	console.log("ext_OCR_SelectRes start");
	wx.invoke("ext_OCR_SelectRes", {}, function (res) {
		console.log("ext_OCR_SelectRes end", res);
		ocrResourcePath = res.result;
	});
}

function ocrAuthentication() {
	console.log("ext_OCR_Authentication start");
	wx.invoke("ext_OCR_Authentication", {
		data: {
			"keyOcrServer": "https://msapi.esgcc.com.cn/ai/prod-api",
			"keyClientId": "tianjin",
			"keyDeviceId": "122348ff7asdf6655",
			"keyClientSecret": "A81D2194-642E-4B8F-9B72-2205D9234AA6",
			"keyUsername": "18698068684",
			"keyPassword": "tianjin123456!",
			"keySm2PublicKey": "04be20d2cd20e5efd2e81e9e646e658898b4cfd2da301e00ec93bb27f2a6fbc36973ae552eaa4ba34ad28429beeb39e30903b5fb39164102d3d2e10c3dc56f4a7d",
			"keySm2PrivateKey": "e3ab6ccdfa7ad9c7e4036ad51d73bb1e148a8ee7a0777605c1db620dfcb8ce7b"
		}
	}, function (res) {
		console.log("ext_OCR_Authentication end", res);
	});
}

function ocrOCR() {
	console.log("ext_OCR_Ocr start");
	var keyResType = $(".ocrExtResType").val();
	wx.invoke("ext_OCR_Ocr", {
		data: {
			keyResPath: ocrResourcePath,
			keyResType: keyResType
		}
	}, function (res) {
		console.log("ext_OCR_Ocr end", res);
	});
}

function printImage() {
	console.log("ext_Print_Picture start");
	wx.invoke("ext_FileBrowser_StartPreView", {
		data: {

		}
	}, function (res) {
		var resPath = "";
		var osType = isIosOrAndroid();
		if (osType == 1) {
			var result = JSON.parse(res.result);
			var resPath = result[0].path;
			console.log("result", result);
		} else if (osType == 2) {
			var resPath = res.filePath
		}
		wx.invoke("ext_Print_Picture", {
			data: {
				picPath: resPath
			}
		}, function (res) {
			console.log("ext_Print_Picture end", res);
		});
	});
}

function printDocument() {
	console.log("ext_Print_Picture start");
	wx.invoke("ext_FileBrowser_StartPreView", {
		data: {

		}
	}, function (res) {
		var resPath = "";
		var osType = isIosOrAndroid();
		if (osType == 1) {
			var result = JSON.parse(res.result);
			var resPath = result[0].path;
			console.log("result", result);
		} else if (osType == 2) {
			var resPath = res.filePath
		}
		wx.invoke("ext_Print_Doc", {
			data: {
				docPath: resPath
			}
		}, function (res) {
			console.log("ext_Print_Doc end", res);
		});
	});
}

function get() {
	$.ajax("http://127.0.0.1:"+$("#url").val());
}
function post() {
	jQuery.ajax({
		type: "post",
		url: "http://127.0.0.1:"+$("#url").val()
	});
}