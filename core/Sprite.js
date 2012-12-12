/**
 * 精灵组件
 */
function Sprite(cfg) {
	/**
	 * 当前动画
	 */
	this.anim = null;
	this.x = 0;
	this.y = 0;
	this.speedX = 0;
	this.speedY = 0;
	/**
	 * 水平加速度
	 */
	this.acceX = 0;
	/**
	 * 垂直加速度
	 */
	this.acceY = 0;
	/**
	 * 上一水平坐标
	 */
	this.lastX = 0;
	/**
	 * 上一垂直坐标
	 */
	this.lastY = 0;
	/**
	 * 上一水平移动速度
	 */
	this.lastSpeedX = 0;
	/**
	 * 上一垂直移动速度
	 */
	this.lastSpeedY = 0;
	/**
	 * 透明度
	 */
	this.alpha;
	/**
	 * 旋转
	 */
	this.rotation;
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
	this.visible = true;
	this.__ID=null;
	this.parent=null;
	/**
	 * 初始化状态
	 */
	this.initialized = false;
	GC.extend(this, cfg);
}

/**
 * 获取精灵当前帧碰撞区域
 */
Sprite.prototype.__getCollRect = function() {
	if (this.anim && this.anim.currentFrame) {
		return this.anim.currentFrame.collRect;
	}
};
/**
 * 获取精灵当前帧碰撞区域
 */
Sprite.prototype.init = function(oParent) {
	this.parent=oParent;
	if (this.anim) {
		this.anim.init(this);
	}
	
	this.initialized = true;
};
/**
 * 碰撞检测
 */
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
/**
 * 更新精灵状态
 */
Sprite.prototype._update = function(deltaTime) {
	this.lastSpeedX = this.speedX;
	this.lastSpeedY = this.speedY;
	this.lastX = this.x;
	this.lastY = this.y;	this.speedX = this.lastSpeedX + this.acceX * deltaTime;
	this.speedY = this.lastSpeedY + this.acceY * deltaTime;	// 计算精灵位置
	this.x += Math.round((this.lastSpeedX + this.speedX) * deltaTime / 2);
	this.y += Math.round((this.lastSpeedY + this.speedY) * deltaTime / 2);	// 更新当前动画帧状态
	if (this.anim) {
		this.anim.update(deltaTime);
	}
	this.update(deltaTime);
};
Sprite.prototype.onInit=GC.fn;
/**
 * 更新精灵状态
 */
Sprite.prototype.update = function(deltaTime) {
};
/**
 * 绘制精灵
 */
Sprite.prototype.draw = function(context) {
	var anim = this.anim;
	if (anim && anim.currentFrame) {
		var frame = anim.currentFrame;
		context.drawImage(anim.image, frame.x, frame.y, this.width, this.height, 0, 0, this.width, this.height);
	}
};
Sprite.prototype.destory = function() {
	if (this.anim) {
		this.anim.destory();
		this.anim = null;
	}
	this.parent.reMoveSprite(this.__ID);
	delete this;
};
