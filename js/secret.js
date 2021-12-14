function sha1(str){
	var hash=CryptoJS.SHA1(str);
	return hash.toString();
}

function createTimestamp(){
	return parseInt(new Date().getTime()/1000)+"";
}

function createNonceStr(){
    var e = 16;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function sortParams(params){
	var keys = Object.keys(params);
	keys = keys.sort();
	var newArgs = {};
	keys.forEach(function (key) {
		newArgs[key.toLowerCase()] = params[key];
	})

	var string = ''
	for (var k in newArgs) {
		string += '&' + k + '=' + newArgs[k]
	}
	string = string.substr(1)
	return string;	
}