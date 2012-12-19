function checkStorageSupport() {
	if (window.sessionStorage && window.localStorage) {
		return true;
	}
	return false;
}
//Array.sort(function(a,b){return a>b?1:-1});//从小到大排序
//Array.sort(function(a,b){return a<b?1:-1});//从大到小排序
//alert(checkStorageSupport());
//window.sessionStorage.key = "value";
// function displayStorageEvent(e) {
// var logged = "key:" + e.key + ",new value:" + e.newValue + ",old value:" + e.oldValue + ",url:" + e.url + "storageArea:" + e.storageArea;
// alert(logged);
// }var Storage = {
	set : function(key, value, type) {
		var storage=null;
		if (type && type == 2) {
				storage=window.localStorage
			} else {
				storage=window.sessionStorage
			}
			
		if(this.get(key,type)){
			var oldValue=this.get(key,type);
			if(value-(parseInt(oldValue))>0){
				storage.setItem(key, value);
			}
		}else{
			storage.setItem(key, value);
		}
	},
	get : function(key, type) {
		if (type && type == 2) {
			return window.localStorage.getItem(key);
		} else {
			return window.sessionStorage.getItem(key);
		}
	}
}
var TOP = {
	update : function(id, type) {
		var __top = this.getStorage(type), top = GC.DOM.get(id);
		top.innerHTML = ""
		for (var i = 0, ln = __top.length; i < ln && i < 10; i++) {
			var __u = __top[i];
			top.innerHTML += "第" + (i + 1) + "名：" + __u.point + "  [" + __u.name + "]<br />";
		}

	},
	getStorage : function(type) {
		var storage = null, __top = new Array();
		if (type && type == 2) {
			storage = window.localStorage;
		} else {
			storage = window.sessionStorage;
		}
		for (var i = 0, ln = storage.length; i < ln; i++) {
			var key = storage.key(i), value = storage.getItem(key);
			var __o = {
				name : key,
				point : value
			};
			__top.push(__o);
		}
		__top.sort(function(o1, o2) {
			var __v1 = parseInt(o1.point), __v2 = parseInt(o2.point);
			return __v1 < __v2 ? 1 : -1
		});
		return __top;
	}
}
function setStorage() {
//window.sessionStorage.clear();
Storage.set("hst0305", 80785, 2);
Storage.set("老李", 55485, 2);
Storage.set("zxr", 78920, 2);
Storage.set("大魔头", 83564, 2);
}
//window.addEventListener("storage",displayStorageEvent,true);
window.addEventListener("load", setStorage, true);


