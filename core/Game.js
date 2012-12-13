/**
 * 游戏基类
 */
function Game(cfg) {
	/**
	 * 游戏视口对象
	 */
	this.viewport = null;
	/**
	 * 帧频
	 */
	this.FPS = 30;
	/**
	 * 运行状态
	 */
	this.playing = false;
	/**
	 * 图层列表
	 */
	this.__layer = [];
	/**
	 * 休眠时间
	 */
	this.__sleep = Math.floor(1000 / this.FPS);
	/**
	 * 上一帧执行完毕的时间
	 */
	this.__lastTime = 0;
	/**
	 * 定时器句柄
	 */
	this.__timeout = null;
	/**
	 * 初始化状态
	 */
	this.initialized = false;
	this.destoryCache = [];
	this.instance = "";
	GC.extend(this, cfg);
}

/**
 * 游戏初使化
 */
Game.prototype.init = function() {
	this.setFPS(this.FPS);
	for (var i = 0, ln = this.__layer.length; i < ln; i++) {
		this.__layer[i].init(this);
	}
	this.initialized = true;
};
/**
 * 事件定义
 */
Game.prototype.onstart = GC.fn;
Game.prototype.onstop = GC.fn;
Game.prototype.onupdate = GC.fn;
Game.prototype.onrender = GC.fn;

/**
 * 设置帧频
 */
Game.prototype.setFPS = function(fps) {
	this.FPS = fps;
	this.__sleep = Math.floor(1000 / fps);
};
/**
 * 开始游戏
 */
Game.prototype.start = function() {
	if (!this.playing) {
		this.playing = true;
		this.__lastTime = new Date().getTime();
		this.__run();
		this.onstart();
	}
};
/**
 * 运行时方法
 */
Game.prototype.__run = function() {
	if (this.playing) {
		var now = 0;
		this.__timeout = setTimeout(this.instance + ".__run()", this.__sleep);
		now = new Date().getTime();
		this.update(now - this.__lastTime);
		this.render();
		this.__lastTime = now;
	}
};
/**
 * 动画更新
 */
Game.prototype.update = function(deltaTime) {
	this.__destory();
	var deltaTime = deltaTime, layer = this.__layer, __DCL = this.destoryCache.length;
	for (var i = 0, ln = layer.length; i < ln; i++) {
		if (layer[i]) {
			layer[i].update(deltaTime);
		}
	}
	if (__DCL != this.destoryCache.length) {
		this.__destory();
	}
	this.onupdate();
};
/**
 * 游戏暂停
 */
Game.prototype.stop = function() {
	if (this.playing) {
		this.playing = false;
		clearTimeout(this.__timeout);
		this.onstop();
	}
};
/**
 * 添加图层
 */
Game.prototype.putLayer = function(layer) {
	var __ID = this.__layer.length;
	layer.__ID = __ID;
	this.__layer.push(layer);
};

/**
 * 渲染游戏
 */
Game.prototype.render = function() {
	var layer = this.__layer;
	for (var i = 0, ln = layer.length; i < ln; i++) {
		if (layer[i]) {
			layer[i].render();
		}
	}
	this.onrender();
};
/**
 * 清空画布
 */
Game.prototype.clear = function() {
	for (var i = 0, ln = this.layer.length; i < ln; i++) {
		this.layer[i].clear();
	}
};
Game.prototype.putDestoryCache = function(id) {
	this.destoryCache.push(id);
};
Game.prototype.getLayer = function() {
	var layer = this.__layer, __s = [];
	for (var i = 0, ln = layer.length; i < ln; i++) {
		if (layer[i]) {
			__s.push(layer[i]);
		}
	}
	return __s;
};
Game.prototype.gameOver = function() {
	this.stop();
	this.onrender = function() {
		this.destory();
	}
};
Game.prototype.__destory = function() {
	var __destoryCache = this.destoryCache, layer = this.__layer;
	for (var i = 0, ln = __destoryCache.length; i < ln; i++) {
		layer[__destoryCache[i]] = null;
	}
	if (__destoryCache.length > 50) {
		//console.log("总个数：" + sprite.length);
		for (var i = 0; i < layer.length; i++) {
			if (!layer[i]) {
				layer.splice(i, 1);
				i--;
			} else {
				layer[i].__ID = i;
			}
		}
		//console.log("删除的个数：" + this.destoryCache.length + "删除后的个数：" + sprite.length);
		this.destoryCache = [];
	}
}
Game.prototype.destory = function() {
	var layer = this.getLayer();
	for (var i = 0, ln = layer.length; i < ln; i++) {
		layer[i].destory();
	}
	this.__layer = this.onstart = this.onstop = this.onupdate = this.onrender = this.viewport = this.destoryCache = null;
	delete this;
	//console.log("游戏结束");
};
