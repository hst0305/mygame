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
GC.inherit = function(childClass, parentClass) {
	var Constructor = new Function();
	Constructor.prototype = new parentClass();
	childClass.prototype = new Constructor();
	
	
	// childClass.prototype.constructor = childClass;
	// childClass.superclass = parentClass.prototype;
// 
	// if (childClass.prototype.constructor == Object.prototype.constructor) {
		// childClass.prototype.constructor = parentClass;
	// }
};
GC.Math={
	random : function(min, max) {
		return Math.floor((max - min + 1) * Math.random()) + min;
	}
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
		if (!this.hasClass(element, className)) {
			element.className += ' ' + className;
		}
	},
	removeClass : function(element, className) {
		if (this.hasClass(element, className)) {
			var names = element.className.split(/\s+/), newClassName = [];
			for (var i = 0; i < names.length; i++) {
				if (names[i] != className) {
					newClassName.push(names[i]);
				}
			}
			element.className = newClassName.join(' ');
		}
	},
	getHeight : function(elem) {//纯高度。
		return parseInt(GC.DOM.getStyle(elem, 'height'));
	},
	fullHeight : function(elem) {//包括border padding的值。
		if (GC.DOM.getStyle(elem, 'display') != 'none') {
			return elem.offsetHeight || GC.DOM.getHeight(elem);
		}
		var h = elem.clientHeight || GC.DOM.getHeight(elem);
		return h;
	}
};
GC.Util = {
	getScrollY : function() {
		var de = document.documentElement;
		return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
	},
	getScrollX : function() {
		var de = document.documentElement;
		return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
	},
	gageHeight : function() {//获取页面高度包括被滚动的高度
		return document.body.scrollHeight;
	},
	windowHeight : function() {//获取视口的高度，可见区的高度
		var de = document.documentElement;
		return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
	},
	windowWidth : function() {//获取视口的高度，可见区的高度
		var de = document.documentElement;
		return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
	}
};

function showModlePanel(id, width, height) {
	var wh = GC.Util.windowHeight();
	var ww = GC.Util.windowWidth();
	var panel = GC.DOM.get(id);
	var panelBg = GC.DOM.get("panelBg");
	GC.DOM.removeClass(panel, "none");
	GC.DOM.removeClass(panelBg, "none");
	GC.DOM.addClass(panel, "show");
	panel.style.width = width + "px";
	panel.style.height = height + "px";
	panel.style.top = (wh - height) / 2 + GC.Util.getScrollY() + "px";
	panel.style.left = (ww - width) / 2 + GC.Util.getScrollX() + "px";
}

function hiddModlePanel(id) {
	var panel = GC.DOM.get(id);
	GC.DOM.removeClass(panel, "show");
	GC.DOM.addClass(panel, "none");
	GC.DOM.addClass(GC.DOM.get("panelBg"), "none");
}

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

