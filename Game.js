/**
 * 游戏基类
 */
function Game(cfg) {
	/**
	 * 游戏视口对象
	 */
	this.viewport = null;
	/**
	 * read only
	 * 帧频
	 */
	this.FPS = 30;
	/**
	 * read only
	 * 运行状态
	 */
	this.playing = false;
	/**
	 * 图层列表
	 */
	this.layer = [];
	/**
	 * @private
	 * 休眠时间
	 */
	this.__sleep = Math.floor(1000 / this.FPS);
	/**
	 * @private
	 * 上一帧执行完毕的时间
	 */
	this.__lastTime = 0;
	/**
	 * @private
	 * 定时器句柄
	 */
	this.__timeout = null;
	/**
	 * 初始化状态
	 */
	this.initialized = false;
	this.instance = "";
	GC.extend(this, cfg);
}

/**
 * 游戏初使化
 */
Game.prototype.init = function() {
	this.setFPS(this.FPS);
	for (var i = 0, ln = this.layer.length; i < ln; i++) {
		this.layer[i].init(this);
	}
	this.initialized = true;
};
/**
 * 事件定义
 * onstart 开始游戏
 * onstop 停止游戏
 */
Game.prototype.onstart = GC.fn;
Game.prototype.onstop = GC.fn;
Game.prototype.onupdate = GC.fn;
Game.prototype.onrender = GC.fn;

/**
 * 设置帧频
 * @param {Number} fps
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
 * @private
 * 运行时方法
 */
Game.prototype.__run = function() {
	var now = 0;
	this.__timeout = setTimeout(this.instance + ".__run()", this.__sleep);
	now = new Date().getTime();
	this.update(now - this.__lastTime);
	//this.clear();
	this.render();
	/*
	 if(undefined === window.tracetime) {
	 window.tracetime = 0;
	 } else if(window.tracetime > 1000) {
	 window.tracetime = 0;
	 console.log(new Date().getTime() - now);
	 } else {
	 window.tracetime += (now - this.__lastTime);
	 }
	 */
	this.__lastTime = now;
};
/**
 * 动画更新
 */
Game.prototype.update = function(deltaTime) {
	var deltaTime = deltaTime, layer = this.layer;
	for (var i = 0, ln = layer.length; i < ln; i++) {
		layer[i].update(deltaTime);
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
	this.layer.push(layer);
};
/**
 * 渲染游戏
 */
Game.prototype.render = function() {
	var layer = this.layer;
	for (var i = 0, ln = layer.length; i < ln; i++) {
		layer[i].render();
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
/**
 * destory
 */
Game.prototype.destory = function() {
	this.stop();
	for (var i = 0, ln = this.layer.length; i < ln; i++) {
		this.layer[i].destory();
	}

};
