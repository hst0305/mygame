/**
 * 精灵组件
 */
function Sprite(cfg) {
	this.anim = null;
	this.x = 0;
	this.y = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.acceX = 0;
	this.acceY = 0;
	this.lastX = 0;
	this.lastY = 0;
	this.lastSpeedX = 0;
	this.lastSpeedY = 0;
	this.alpha
	this.rotation
	this.flipX
	this.flipY
	this.scaleX = 1;
	this.scaleY = 1;
	this.visible = true;
	this.parent = null;
	this.initialized = false;
	GC.extend(this, cfg);
}
Sprite.prototype.init = function() {
	if (this.anim) {
		this.anim.init();
	}
	this.initialized = true;
	this.oninit();
};
Sprite.prototype.__getCollRect = function() {
	if (this.anim && this.anim.currentFrame) {
		return this.anim.currentFrame.collRect;
	}
};
Sprite.prototype.hitTest = function(sprite2) {
	var collRect1 = this.__getCollRect(), collRect2 = sprite2.__getCollRect(), coll1, coll2, result = false;
	if (collRect1 && collRect2) {
		var i1, len1 = collRect1.length, i2, len2 = collRect2.length;
		for ( i1 = 0; i1 < len1; i1++) {
			coll1 = collRect1[i1];
			for ( i2 = 0; i2 < len2; i2++) {
				coll2 = collRect2[i2];
				 if (Math.abs((this.x + coll1[0] + coll1[2] / 2) - (sprite2.x + coll2[0] + coll2[2] / 2)) < (coll1[2] + coll2[2]) / 2 && Math.abs((this.y + coll1[1] + coll1[3] / 2) - (sprite2.y + coll2[1] + coll2[3] / 2)) < (coll1[3] + coll2[3]) / 2) {
				 	result = true;
				 	break;
				 }
			}
		}
	}
	sprite2 = collRect1 = collRect2 = coll1 = coll2 = null;
	return result;
};
Sprite.prototype.update = function(deltaTime) {
	this.lastSpeedX = this.speedX;
	this.lastSpeedY = this.speedY;
	this.lastX = this.x;
	this.lastY = this.y;	this.speedX = this.lastSpeedX + this.acceX * deltaTime;
	this.speedY = this.lastSpeedY + this.acceY * deltaTime;
	this.x += Math.round((this.lastSpeedX + this.speedX) * deltaTime / 2);
	this.y += Math.round((this.lastSpeedY + this.speedY) * deltaTime / 2);
	if (this.anim) {
		this.anim.update(deltaTime);
	}
	this.onupdate(deltaTime);
};
Sprite.prototype.draw = function(context) {
	var anim = this.anim;
	if (anim && anim.currentFrame) {
		var frame = anim.currentFrame;
		context.drawImage(anim.image, frame.x, frame.y, this.width, this.height, 0, 0, this.width, this.height);
	}
	this.ondraw();
};
Sprite.prototype.oninit = GC.fn;
Sprite.prototype.ondestory = GC.fn;
Sprite.prototype.onshow = GC.fn;
Sprite.prototype.onhide = GC.fn;
Sprite.prototype.onupdate = GC.fn;
Sprite.prototype.onrender = GC.fn;
Sprite.prototype.ondraw = GC.fn;
Sprite.prototype.oninit = GC.fn;
Sprite.prototype.ondestory = GC.fn;

Sprite.prototype.destory = function() {
	if (this.anim) {
		this.anim.destory();
		this.anim = null;
	}
	if(this.parent){
		this.parent.removeChild(this);
	}
	this.ondestory();
	this.oninit = this.ondraw = this.onrender = this.onhide = this.onshow = this.ondestory = this.oninit = this.update = null;
};
