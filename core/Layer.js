/**
 * 分层组件
 */
function Layer(cfg) {
	this.canvas = "";
	this.x = 0;
	this.y = 0;
	this.width
	this.height

	/**
	 * 视口对象
	 */
	this.viewport = null;
	/**
	 * 场景离视口的距离
	 */
	this.distance = 1;
	/**
	 * 动画精灵列表
	 */
	this.__sprite = [];
	/**
	 * 分层画布对象
	 */
	this.__canvas = null;
	/**
	 * 2d绘图上下文
	 */
	this.__context = null;
	/**
	 * 分层画布对象缓存
	 */
	this.__canvasBuffer = null;
	/**
	 * 2d绘图上下文缓存
	 */
	this.__contextBuffer = null;
	/**
	 * 分层状态是否改变
	 */
	this.__change = true;
	this.__ID = null;
	/**
	 * 初始化状态
	 */
	this.initialized = false;
	this.parent = null;
	this.destoryCache = [];
	GC.extend(this, cfg);
}

/**
 * 初始化分层
 */
Layer.prototype.init = function(oParent) {
	this.parent = oParent;
	this.setCanvas(this.canvas);
	var sprite = this.__sprite;
	for (var i = 0, ln = sprite.length; i < ln; i++) {
		var item = sprite[i];
		item.x /= this.distance;
		item.y /= this.distance;
		item.init(this);
	}
	this.initialized = true;
};
/**
 * 设置画布
 */
Layer.prototype.setCanvas = function(canvas) {
	var __canvas = null;
	if ( typeof canvas === 'string') {
		__canvas = document.getElementById(canvas);
	} else {
		__canvas = canvas;
	}

	if (__canvas && __canvas.getContext) {
		this.__canvas = __canvas;
		this.__context = __canvas.getContext('2d');
	}
	var w = this.__canvas.width, h = this.__canvas.height;
	this.__canvasBuffer = document.createElement("canvas");
	this.__canvasBuffer.width = w;
	this.__canvasBuffer.height = h;
	this.width = w;
	this.height = h;
	this.__contextBuffer = this.__canvasBuffer.getContext('2d');
};
/**
 * 清空画布
 */
Layer.prototype.clear = function() {
	this.__context.clearRect(0, 0, this.width, this.height);
};
/**
 * 改变分层状态
 */
Layer.prototype.change = function() {
	this.__change = true;
};
Layer.prototype.onrender = GC.fn;
Layer.prototype.render = function() {
	if (this.__change) {
		var aSprite = this.getSprite(), oSprite = null, viewport = this.viewport;
		var vx = viewport.x / this.distance, vy = viewport.y / this.distance, vw = viewport.width, vh = viewport.height;
		var cx = cy = cw = ch = 0;
		for (var i = 0, ln = aSprite.length; i < ln; i++) {
			oSprite = aSprite[i];
			cx = oSprite.x;
			cy = oSprite.y;
			cw = oSprite.width;
			ch = oSprite.height;
			// if (oSprite.visible && Math.abs((cx + cw / 2) - (vx + vw / 2)) < (cw + vw) / 2 && Math.abs((cy + ch / 2) - (vy + vh / 2)) < (ch + vh) / 2) {
			if (oSprite.visible && Math.abs(cx - (vx + vw)) < (cw + vw) && Math.abs(cy - (vy + vh)) < (ch + vh)) {
				oSprite.x = cx - vx;
				oSprite.y = cy - vy;
				this.__contextBuffer.save();
				this.__transform(oSprite);
				oSprite.draw(this.__contextBuffer);
				this.__contextBuffer.restore();
				oSprite.x = cx;
				oSprite.y = cy;
			}
		}
		this.clear();
		this.__context.drawImage(this.__canvasBuffer, 0, 0);
		this.__contextBuffer.clearRect(0, 0, this.width, this.height);
		this.onrender();
		this.__change = false;
	}
};
Layer.prototype.update = function(deltaTime) {
	this.__destory();
	var sprite = this.__sprite, deltaTime = deltaTime, __DCL = this.destoryCache.length;
	for (var i = 0, ln = sprite.length; i < ln; i++) {
		if (sprite[i]) {
			sprite[i]._update(deltaTime);
		}
	}
	if (__DCL != this.destoryCache.length) {
		this.__destory();
	}
};
Layer.prototype.__destory = function() {
	var __destoryCache = this.destoryCache, sprite = this.__sprite;
	for (var i = 0, ln = __destoryCache.length; i < ln; i++) {
		sprite[__destoryCache[i]] = null;
	}
	if (__destoryCache.length > 50) {
		//console.log("总个数：" + sprite.length);
		for (var i = 0; i < sprite.length; i++) {
			if (!sprite[i]) {
				sprite.splice(i, 1);
				i--;
			} else {
				sprite[i].__ID = i;
			}
		}
		//console.log("删除的个数：" + this.destoryCache.length + "删除后的个数：" + sprite.length);
		this.destoryCache = [];
	}
}
/**
 * 变形处理
 */
Layer.prototype.__transform = function(sprite) {
	var __s = sprite;
	this.__contextBuffer.translate(__s.x, __s.y);
	if (__s.alpha < 1) {
		this.__contextBuffer.globalAlpha = __s.alpha;
	}
	if (__s.rotation % 360 > 0) {
		var offset = [__s.width / 2, __s.height / 2];
		this.__contextBuffer.translate(offset[0], offset[1]);
		this.__contextBuffer.rotate(__s.rotation % 360 / 180 * Math.PI);
		this.__contextBuffer.translate(-offset[0], -offset[1]);
	}
	if (__s.flipX || __s.flipY) {
		this.__contextBuffer.translate(__s.flipX ? __s.width : 0, __s.flipY ? __s.height : 0);
		this.__contextBuffer.scale(__s.flipX ? -1 : 1, __s.flipY ? -1 : 1);
	}
	if (__s.scaleX != 1 || __s.scaleY != 1) {
		this.__contextBuffer.scale(__s.scaleX, __s.scaleY);
	}

};
/**
 * 添加精灵
 */
Layer.prototype.putSprite = function(sprite) {
	var index = this.__sprite.length;
	sprite.__ID = index;
	this.__sprite.push(sprite);
};
/**
 * 删除精灵
 */
Layer.prototype.reMoveSprite = function(id) {
	var sprite = this.__sprite;
	sprite.splice(id, 1);
	for (var i = 0, ln = sprite.length; i < ln; i++) {
		sprite[i].__ID = i;
	}};
/**
 * 获取精灵
 */
Layer.prototype.getSprite = function() {
	var sprite = this.__sprite, __s = [];
	for (var i = 0, ln = sprite.length; i < ln; i++) {
		if (sprite[i]) {
			__s.push(sprite[i]);
		}
	}
	return __s;
};

/**
 * destory
 */
Layer.prototype.putDestoryCache = function(id) {
	this.destoryCache.push(id);
};
/**
 * destory
 */
Layer.prototype.destory = function() {
	var sprite = this.getSprite();
	for (var i = 0, ln = sprite.length; i < ln; i++) {
		sprite[i].destory();
	}
	this.parent.putDestoryCache(this.__ID);
	this.viewport = this.parent = this.__canvas = this.__context = this.__canvasBuffer = this.__contextBuffer = this.onrender = this.__sprite = this.destoryCache = null;
	delete this;
};
