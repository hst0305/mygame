/**
 * 分层组件
 */
function Layer(cfg) {
	this.canvas = "";
	this.x=0;
	this.y=0;
	/**
	 * 透明度
	 */
	this.alpha;
	/**
	 * 旋转
	 */
	this.rotation;
	this.width;
	this.height;
	/**
	 * 翻转
	 */
	this.flipX;
	/**
	 * 翻转
	 */
	this.flipY;
	/**
	 * 缩放
	 */
	this.scaleX = 1;
	/**
	 * 缩放
	 */
	this.scaleY = 1;
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
	this.sprite = [];
	/**
	 * @private
	 * 分层画布对象
	 */
	this.__canvas = null;
	/**
	 * @private
	 * 2d绘图上下文
	 */
	this.__context = null;
	/**
	 * @private
	 * 分层画布对象缓存
	 */
	this.__canvasBuffer = null;
	/**
	 * @private
	 * 2d绘图上下文缓存
	 */
	this.__contextBuffer = null;
	/**
	 * @private
	 * 分层状态是否改变
	 */
	this.__change = true;
	/**
	 * 初始化状态
	 */
	this.initialized = false;
	this.parent = null;
	GC.extend(this, cfg);
}

/**
 * 初始化分层
 */
Layer.prototype.init = function(oParent) {
	this.parent = oParent;
	this.setCanvas(this.canvas);
	var sprite = this.sprite;
	for (var i = 0, ln = sprite.length; i < ln; i++) {
		var item=sprite[i];
		item.x/=this.distance;
		item.y/=this.distance;
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
/**
 * render
 */
Layer.prototype.render = function() {
	if (this.__change) {
		var aSprite = this.sprite, oSprite = null, viewport = this.viewport;
		var vx = viewport.x / this.distance, vy = viewport.y / this.distance, vw = viewport.width, vh = viewport.height;
		var cx = cy = cw = ch = 0;
		for (var i = 0, ln = aSprite.length; i < ln; i++) {
			oSprite = aSprite[i];
			cx = oSprite.x;
			cy = oSprite.y;
			cw = oSprite.width;
			ch = oSprite.height;
			if (oSprite.visible && Math.abs((cx + cw / 2) - (vx + vw / 2)) < (cw + vw) / 2 && Math.abs((cy + ch / 2) - (vy + vh / 2)) < (ch + vh) / 2) {
				oSprite.x = cx - vx;
				oSprite.y = cy - vy;
				this.__contextBuffer.save();
				this.__transform(oSprite);				oSprite.draw(this.__contextBuffer);
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
/**
 * update
 */
Layer.prototype.update = function(deltaTime) {
	var sprite = this.sprite, deltaTime = deltaTime;
	for (var i = 0, ln = sprite.length; i < ln; i++) {
		sprite[i]._update(deltaTime);
	}
};
/**
 * @private
 * 变形处理
 */
Layer.prototype.__transform = function(sprite) {
	var __s=sprite;
	//sY=sprite.y,sX=sprite.x,sW=sprite.width,sH=sprite.height;
	this.__contextBuffer.translate(__s.x,__s.y);
	
	// 翻转
	if (this.flipX || this.flipY) {
		this.__contextBuffer.translate(this.flipX ? __s.width : 0, this.flipY ? __s.height : 0);
		this.__contextBuffer.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);
	}
	
};
/**
 * 添加精灵
 * @param {Context Object} sprite
 */
Layer.prototype.putSprite = function(sprite) {
	this.sprite.push(sprite);
};
/**
 * destory
 */
Layer.prototype.destory = function() {
	this.viewport = this.__canvas = this.__context = this.canvasBuffer = this.__contextBuffer = null;
	for (var i = 0, ln = this.sprite.length; i < ln; i++) {
		this.sprite[i].destory();
	}
	this.sprite = null;
};
