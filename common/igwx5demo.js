let igwdemo = {
	getToken() {
		TMFJSBridge.invoke('getTk', {
			'appCode': 'SGCCINTYDPTSYS',
			'pz': 'R65G708e5I4'
		}, function(res) {
			console.log(res);
			igwdemo.showModal(res);
			
		})
	},
	//获取相册
	getImage() {
		TMFJSBridge.invoke('imageSelect', {},
			function(res) {
				igwdemo.showModal(res)
				console.log(res);
			}
		)
	},
	//获取相机
	photo() {
		TMFJSBridge.invoke('takePhoto', {},
			function(res) {
				console.log(res);
				igwdemo.showModal(res);
			}
		)
	},
	//图片路径转换base64
	/**
	 * path：可从相册选择，可拍照后的路径
	 * **/
	imageToBase64(path) {
		TMFJSBridge.invoke('imageToBase64', {
			// 需要压缩的图片路径 
			'imagePath': path,
			// 是否压缩 “0”-不压缩 “1”-压缩
			"isCompress": "1",
			// 表示压缩质量，10 最低画质 100 最高画质  
			"compressionQuality": 10,
		}, function(res) {
			let base64 = "data:image/jpeg;base64," + res.data;
			console.log(res.data); //res.data为base64的字符串
		})
	},
	//根据图片路径，自己的域名地址上传文件
	/**
	"imagePath": "xxx/1605373264841020.jpg", //必填
	  "url": "http://192.168.125.115/chfs/upload", //必填
	   "headers": JSON.Stringify(自定义头 可选),
	   "params": JSON.Stringify(自定义参数 可选),
	 */
	imageUpload() {
		TMFJSBridge.invoke("imageUpload", {
				"imagePath": "", //必填
				"url": "", //必填
				"headers": "",
				"params": "",
				"maxLength":"500"
			},
			function(res) {
				igwdemo.console.log(res)
			});
	},

	//设置导航栏隐藏 1 显示 0 隐藏
	settabbar(showbar) {

		TMFJSBridge.invoke('setToolBar', {
				"show": showbar
			},
			function(res) {
				igwdemo.console.log(res);

			}
		)
	},
	//开始录音

	startRecordAudio() {
		TMFJSBridge.invoke('startRecordAudio', {
				"videotime": [5, 20]
			},
			function(res) {
				igwdemo.showModal(res);
			}
		)
	},
	//结束录音
	finishRecordAudio() {
		TMFJSBridge.invoke('finishRecordAudio', {},
			function(res) {
				igwdemo.showModal(res);
			}
		)
	},
	//文件管理
	//getFileInfo 获取本地文件信息
	getFileInfo() {
		TMFJSBridge.invoke('getFileInfo', {
				'appcode': 'SHGW'
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.2	fileDownload 文件下载
	fileDownload() {
		TMFJSBridge.invoke('fileDownload', {
				'appcode': 'SHGW',
				// 'appservercode': 'XXX',
				'urlType': 1, //0 白名单downLoadUrl必填 1 应用服务编码（则appServerCode必填）
				'downloadUrl': 'https://mam1.ft-power.com.cn:10030/html8/1_doc_11b_文档.doc',
				'saveUrl': '/serverfile',
				'filename': '12345677.doc',
				'fileCode': '1_server',
				'param ': ''
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.3	filePause 下载暂停
	filePause() {
		TMFJSBridge.invoke('filePause', {
				'appcode': 'SHGW',
				'downloadUrl': 'https://mam1.ft-power.com.cn:10030/html8/1_doc_11b_文档.doc',
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.4	rmFile 删除文件
	rmFile() {
		TMFJSBridge.invoke('rmFile', {
				'appcode': 'SHGW',
				'filename': '12345677.doc',
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.5	rmFiles 删除多个文件
	rmFiles() {
		TMFJSBridge.invoke('rmFiles', {
				'appcode': 'SHGW',
				'fileCodes': ['1_server'],
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.6	decompressionFile  解压文件
	decompressionFile() {
		TMFJSBridge.invoke('decompressionFile', {
				'fileUrl': 'http://www.luobow.com/res/SGCCINTYDPTSYS.zip'
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.7	openFile 打开文件
	openFile() {
		TMFJSBridge.invoke('openFile', {
				'fileUrl': 'http://www.luobow.com/res/SGCCINTYDPTSYS.zip'
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.8	appServerUpload 文件上传
	appServerUpload() {
		TMFJSBridge.invoke('appServerUpload', {
				'appcode': 'SHGW',
				'appservercode': 'XXX',
				'path': '',
				'params': {}
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//2.9	多文件上传 fileUploads
	fileUploads() {
		TMFJSBridge.invoke('fileUploads', {
				'appcode': 'SHGW',
				'appservercode': 'XXX',
				'arrPath': [''],
				'params': {}
			},
			function(res) {
				igwdemo.showModal(res);
				console.log(JSON.stringify(res));
			}
		)
	},
	//安全交互平台
	POSTISCP() {
		TMFJSBridge.invoke('POSTISCP', {
				'appcode': 'SHGW',
				'appservercode': 'XXX',
				'params': {}
			},
			function(res) {
				igwdemo.showModal(res)
				console.log(JSON.stringify(res));
			}
		)
	},
	POSTJSONISCP() {
		TMFJSBridge.invoke('POSTJSONISCP', {
				'appcode': 'SHGW',
				'appservercode': 'XXX',
				'params': {}
			},
			function(res) {
				igwdemo.showModal(res)
				console.log(JSON.stringify(res));
			}
		)
	},
	
	GoToScan(){
		TMFJSBridge.invoke('Forward',{
		 'action':'goToScanTwoDiemCode'
		},function(res){
		igwdemo.showModal(res)
		console.log(JSON.stringify(res));
		});
	},
	
	showModal(res) {
		
		alert("返回的信息为"+JSON.stringify(res));
	}
}

export default igwdemo;
// module.exports={
//  test,
//  getToken,
//  getImage,
//  photo,
//  settabbar
// }
