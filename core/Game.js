function Game(cfg) {
	this.viewport = null;
	this.FPS = 30;
	this.playing = false;
	this.childs = [];
	this.__sleep = Math.floor(1000 / this.FPS);
	this.__lastTime = 0;
	this.__timeout = null;
	this.initialized = false;
	this.instance = "";
	GC.extend(this, cfg);
}
Game.prototype.init = function() {
	this.setFPS(this.FPS);
	var childs=this.childs;
	for (var i = 0, ln = childs.length; i < ln; i++) {
		childs[i].init();
	}
	this.initialized = true;
};
Game.prototype.setFPS = function(fps) {
	this.FPS = fps;
	this.__sleep = Math.floor(1000 / fps);
};
Game.prototype.start = function() {
	if (!this.playing) {
		this.playing = true;
		this.__lastTime = new Date().getTime();
		this.__run();
		this.onstart();
	}
};
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
Game.prototype.update = function(deltaTime) {
	var deltaTime = deltaTime, childs = this.childs;
	for (var i = 0, ln = childs.length; i < ln; i++) {
		childs[i].update(deltaTime);
	}
	this.onupdate(deltaTime);
};
Game.prototype.stop = function() {
	if (this.playing) {
		this.playing = false;
		clearTimeout(this.__timeout);
		this.onstop();
	}
};
Game.prototype.appendChild = function(child) {
	child.parent = this;
	this.childs.push(child);
};
Game.prototype.render = function() {
	var childs = this.childs;
	for (var i = 0, ln = childs.length; i < ln; i++) {
		childs[i].render();
	}
	this.onrender();
};
Game.prototype.clear = function() {
	var childs = this.childs;
	for (var i = 0, ln = childs.length; i < ln; i++) {
		childs[i].clear();
	}
};
Game.prototype.getChilds = function() {
	return this.childs;
};
Game.prototype.removeChild = function(child) {
	var childs = this.childs;
	for (var i = 0, len = childs.length; i < len; i++) {
		if (childs[i] == child) {
			this.removeChildAt(i);
			break;
		}
	}
}
Game.prototype.removeChildAt = function(index) {
	var child = this.childs.splice(index, 1);
	if (child) {
		child.parent = null;
	}
}Game.prototype.onstart = GC.fn;
Game.prototype.onstop = GC.fn;
Game.prototype.oninit = GC.fn;
Game.prototype.ondestory = GC.fn;
Game.prototype.onupdate = GC.fn;
Game.prototype.onrender = GC.fn;
Game.prototype.ondraw = GC.fn;
Game.prototype.oninit = GC.fn;
Game.prototype.ondestory = GC.fn;
Game.prototype.destory = function() {
	var childs = this.childs;
	while (childs.length > 0) {
		childs[0].destory();
	}
	this.ondestory();
	this.instance = this.childs = this.ondraw = this.ondestory = this.onstart = this.onstop = this.oninit = this.onupdate = this.onrender = this.viewport = null;
};
