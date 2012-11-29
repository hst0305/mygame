var GC = {};
/**
 * 扩展和覆盖一个对象的属性
 * @param {Object} obj
 * @param {Object} newProperties
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
	}
};
/**
 * 图片资源管理器
 */
GC.ImageManager = {
	/**
	 * @private
	 */
	__loadList : {},
	/**
	 * 加载图片资源
	 * @param {Array} images @format {id: '', src: ''}
	 * @param {Function} statechange
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
	 * @param {String} id
	 */
	get : function(id) {
		return GC.ImageManager.__loadList[id];
	}
};

/**
 * 图像资源列表
 */
GC.getImageRes = function() {
	return [{
		id : 'jump',
		src : './images/jump.png'
	}, {
		id : 'MJ',
		src : './images/MJ.png'
	}, {
		id : 'plan',
		src : './images/plan.png'
	}, {
		id : 'qiqiu',
		src : './images/qiqiu.png'
	}, {
		id : 'run',
		src : './images/run.png'
	}, {
		id : 'superjump',
		src : './images/superjump.png'
	}, {
		id : 'UFO',
		src : './images/UFO.png'
	}, {
		id : "dead",
		src : "./images/dead.png"
	}, {
		id : "sky",
		src : "./images/sky.jpg"
	}, {
		id : "hill",
		src : "./images/hill.png"
	}, {
		id : "hillnear",
		src : "./images/hillnear.png"
	}, {
		id : "floor",
		src : "./images/floor.png"
	}, {
		id : "daiji",
		src : "./images/daiji.png"
	}, {
		id : "stair_friable",
		src : "./images/stair_friable.png"
	}, {
		id : "stair_moveable",
		src : "./images/stair_moveable.png"
	}, {
		id : "stair_stable_01",
		src : "./images/stair_stable_01.png"
	}, {
		id : "stair_stable_02",
		src : "./images/stair_stable_02.png"
	}, {
		id : "stair_stable_03",
		src : "./images/stair_stable_03.png"
	}, {
		id : "stair_stable_04",
		src : "./images/stair_stable_04.png"
	}, {
		id : "stair_stable_05",
		src : "./images/stair_stable_05.png"
	}, {
		id : "prop_spring01",
		src : "./images/prop_spring01.png"
	}, {
		id : "prop_spring03",
		src : "./images/prop_spring03.png"
	}, {
		id : "props_balloon",
		src : "./images/props_balloon.png"
	}, {
		id : "props_gliding01",
		src : "./images/props_gliding01.png"
	}, {
		id : "props_michael",
		src : "./images/props_michael.png"
	}, {
		id : "props_super",
		src : "./images/props_super.png"
	}, {
		id : "props_ufo",
		src : "./images/props_ufo.png"
	}];
}
