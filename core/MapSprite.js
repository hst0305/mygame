function MapSprite(cfg) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	/**
	 * 图片对象
	 */
	this.image = null;
	/**
	 * 重复绘制
	 */
	this.repeat = false;
	/**
	 * @private
	 */
	this.__pattern = null;
	this.visible = true;
	this.parent = null;
	this.initialized = false;
	GC.extend(this, cfg);
}

MapSprite.prototype.init = function(oParent) {
	this.parent = oParent;
	if (this.image && (this.width == 0 || this.height == 0)) {
		this.width = this.image.width;
		this.height = this.image.height;
	}
	this.initialized = true;
};
MapSprite.prototype._update = function(deltaTime) {
};
/**
 * 绘制图片
 * @param {Context Object} context
 */
MapSprite.prototype.draw = function(context) {
	// if (this.repeat) {
	// if (!this.__pattern) {
	// this.__pattern = context.createPattern(this.image, 'repeat');
	// }
	// context.fillStyle = this.__pattern;
	// context.fillRect(this.x, this.y, this.width, this.height);
	// } else {
	// image.src = "./images/sky.jpg";
	//var context=GC.DOM.get("canvassky").getContext("2d");
	context.drawImage(this.image, 0,0);
	// }
};
/**
 * 销毁图像对象
 */
MapSprite.prototype.destory = function() {
	this.image = null;
};