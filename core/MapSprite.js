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
	this.visible = true;
	this.parent = null;
	this.initialized = false;
	GC.extend(this, cfg);
}

MapSprite.prototype.init = function() {
	if (this.image && (this.width == 0 || this.height == 0)) {
		this.width = this.image.width;
		this.height = this.image.height;
	}
	this.initialized = true;
};
MapSprite.prototype.update = GC.fn;
/**
 * 绘制图片
 */
MapSprite.prototype.draw = function(context) {
	// if (this.repeat) {
	// if (!this.__pattern) {
	// this.__pattern = context.createPattern(this.image, 'repeat');
	// }
	// context.fillStyle = this.__pattern;
	// context.fillRect(this.x, this.y, this.width, this.height);
	// } else {	// var image = new Image();
	// image.src = "./images/sky.jpg";
	//var context=GC.DOM.get("canvassky").getContext("2d");
	context.drawImage(this.image, 0, 0);
	// }
};
MapSprite.prototype.destory = function() {
	this.image = null;
	if(this.parent){
		this.parent.removeChild(this);
	}
};
