function Layer(cfg) {
	this.canvas = "";
	this.x = 0;
	this.y = 0;
	this.width
	this.height
	this.viewport = null;
	this.distance = 1;
	this.childs = [];
	this.__canvas = null;
	this.__context = null;
	this.__canvasBuffer = null;
	this.__contextBuffer = null;
	this.__change = true;
	this.initialized = false;
	this.parent = null;
	GC.extend(this, cfg);
}
Layer.prototype.init = function() {
	this.setCanvas(this.canvas);
	var childs = this.childs;
	for (var i = 0, ln = childs.length; i < ln; i++) {
		var child = childs[i];
		child.x /= this.distance;
		child.y /= this.distance;
		child.init(this);
	}
	this.initialized = true;
	this.oninit();
};
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
Layer.prototype.clear = function() {
	this.__context.clearRect(0, 0, this.width, this.height);
};
Layer.prototype.change = function() {
	this.__change = true;
};
Layer.prototype.render = function() {
	if (this.__change) {
		var childs = this.getChilds(), child = null, viewport = this.viewport;
		var vx = viewport.x / this.distance, vy = viewport.y / this.distance, vw = viewport.width, vh = viewport.height;
		var cx = cy = cw = ch = 0;
		for (var i = 0, ln = childs.length; i < ln; i++) {
			child = childs[i];
			cx = child.x;
			cy = child.y;
			cw = child.width;
			ch = child.height;
			// if (oSprite.visible && Math.abs((cx + cw / 2) - (vx + vw / 2)) < (cw + vw) / 2 && Math.abs((cy + ch / 2) - (vy + vh / 2)) < (ch + vh) / 2) {
			if (child.visible && Math.abs(cx - (vx + vw)) < (cw + vw) && Math.abs(cy - (vy + vh)) < (ch + vh)) {
				child.x = cx - vx;
				child.y = cy - vy;
				this.__contextBuffer.save();
				this.__transform(child);
				child.draw(this.__contextBuffer);
				this.__contextBuffer.restore();
				child.x = cx;
				child.y = cy;
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
	var childs = this.childs, deltaTime = deltaTime;
	for (var i = 0, ln = childs.length; i < ln; i++) {
		childs[i].update(deltaTime);
	}
	this.onupdate(deltaTime);
};
Layer.prototype.__transform = function(child) {
	var __s = child;
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
Layer.prototype.appendChild = function(child) {
	child.parent=this;
	this.childs.push(child);
};
Layer.prototype.getChilds = function() {
	return this.childs;
};
Layer.prototype.removeChild = function(child) {
	var childs = this.childs;
	for (var i = 0, len = childs.length; i < len; i++) {
		if (childs[i] == child) {
			this.removeChildAt(i);
			break;
		}
	}
}
Layer.prototype.removeChildAt = function(index) {
	var child = this.childs.splice(index, 1);
	if (child) {
		child.parent = null;
	}
}
Layer.prototype.oninit = GC.fn;
Layer.prototype.ondestory = GC.fn;
Layer.prototype.onshow = GC.fn;
Layer.prototype.onhide = GC.fn;
Layer.prototype.onupdate = GC.fn;
Layer.prototype.onrender = GC.fn;
Layer.prototype.ondraw = GC.fn;
Layer.prototype.oninit = GC.fn;
Layer.prototype.ondestory = GC.fn;

Layer.prototype.destory = function() {
	var childs = this.getChilds();
	while (childs.length > 0) {
		childs[0].destory();
	}
	if(this.parent){
		this.parent.removeChild(this);
	}
	this.ondestory();
	this.ondraw = this.onupdate = this.onhide = this.onshow = this.ondestory = this.viewport = this.oninit = this.__canvas = this.__context = this.__canvasBuffer = this.__contextBuffer = this.onrender = this.childs = null;
};
