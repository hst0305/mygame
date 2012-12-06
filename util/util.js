var GC = {};
/**
 * 扩展和覆盖一个对象的属性
 */
GC.extend = function(obj, newProperties) {
	var key;
	for (key in newProperties) {
		if (newProperties.hasOwnProperty(key)) {
			obj[key] = newProperties[key];
		}
	}
	return obj;
};
GC.fn = new Function();
GC.DOM = {
	get : function(id) {
		return document.getElementById(id);
	},
	getStyle : function(elem, name) {
		if (elem.currentStyle) {
			return elem.currentStyle[name];
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			name = name.replace(/([A-Z])/g, "-$1");
			name = name.toLowerCase();
			var s = document.defaultView.getComputedStyle(elem, "");
			return s && s.getPropertyValue(name);
		} else {
			return null;
		}
	},
	hasClass : function(element, className) {
		var names = element.className.split(/\s+/);
		for (var i = 0; i < names.length; i++) {
			if (names[i] == className) {
				return true;
			}
		}
		return false;
	},
	addClass : function(element, className) {
		if (!MY.Dom.hasClass(element, className)) {
			element.className += ' ' + className;
		}
	},
	removeClass : function(element, className) {
		if (MY.Dom.hasClass(element, className)) {
			var names = element.className.split(/\s+/), newClassName = [];
			for (var i = 0; i < names.length; i++) {
				if (names[i] != className) {
					newClassName.push(names[i]);
				}
			}
			element.className = newClassName.join(' ');
		}
	}
};
/**
 * 图片资源管理器
 */
GC.ImageManager = {
	__loadList : {},
	/**
	 * 加载图片资源
	 */
	load : function(images, statechange, __index) {
		var index = __index || 0;
		if (images[index]) {
			var image = new Image(), oI = images[index];
			image.src = oI.src;
			image.onload = function() {
				GC.ImageManager.__loadList[oI.id] = image;
				GC.ImageManager.load(images, statechange, index + 1);
			}
		}
		statechange(index);
	},
	/**
	 * 获取已加载的Image对象
	 */
	get : function(id) {
		return GC.ImageManager.__loadList[id];
	}
};

