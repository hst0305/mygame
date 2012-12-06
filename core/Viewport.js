/**
 * 游戏视口管理
 */
function Viewport(cfg) {
	/**
	 * 视口x轴位置
	 */
	this.x = 0;
	/**
	 * 视口y轴位置
	 */
	this.y = 0;
	/**
	 * 视口宽度
	 */
	this.width = 0;
	/**
	 * 视口高度
	 */
	this.height = 0;
	/**
	 * 视口上一次x轴位置
	 */
	this.__lastX = 0;
	/**
	 * 视口上一次y轴位置
	 */
	this.__lastY = 0;
	GC.extend(this, cfg);
}

/**
 * 移动视口
 */
Viewport.prototype.move = function(x, y, absolute) {
	this.__lastX = this.x;
	this.__lastY = this.y;

	if (absolute) {
		this.x = x;
		this.y = y;
	} else {
		this.x += x;
		this.y += y;
	}
};
