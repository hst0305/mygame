/**
 * 云层精灵类
 */
(function() {
	var Stair = function(cfg) {
		this.name = '';
		this.prop = null;
		Sprite.call(this, cfg);
	}
	GC.inherit(Stair, Sprite);
	Stair.prototype.oninit = function() {
		this.width = 256;
		this.height = 128;
		this.x = GC.Math.random(10, 313);
		var stairTypes = ['stair_friable', 'stair_moveable', 'stair_stable_01', 'stair_stable_02', 'stair_stable_03', 'stair_stable_04', 'stair_stable_05'];
		var name = stairTypes[GC.Math.random(0, 6)];
		if (name == 'stair_moveable') {
			this.speedX = GC.Math.random(10, 20) / 100;
			if (GC.Math.random(0, 1)) {
				this.speedX = -this.speedX;
			}
			this.onupdate = this.__moveableUpdate;
		}
		var anim = new Animation({
			image : GC.ImageManager.get(name),
			frames : getStairFrames(name),
			loop : false
		});
		anim.init();
		if(name == 'stair_friable'){
			anim.gotoAndStop(0);
		}
		this.name = name;
		this.anim = anim;
	}
	Stair.prototype.__moveableUpdate = function(deltaTime) {
		if ((this.x < 0) || (this.x > 322)) {
			this.speedX = -this.speedX;
		}
		if (this.prop && this.lastX != 0) {
			this.prop.x += (this.x - this.lastX);
		}	}
	window.Stair = Stair;
})();
