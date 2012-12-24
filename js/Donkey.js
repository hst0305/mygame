(function() {
	var Donkey = function(cfg) {
		this.game = null;
		this.minTop = 0;
		this.direction = '';
		this.animName = '';
		this.__superJumpHeight = 0;
		this.__MJHeight = 0;
		this.__glidingHeight = 0;
		this.__UFOHeight = 0;
		this.__balloonHeight = 0;
		this.__powerJumpHeight = 0;
		this.deadHeight = 1000;
		this.inertia = 0;
		this.isDead = false;
		this.jumpState = GC.fn;
		Sprite.call(this, cfg);
	};
	GC.inherit(Donkey, Sprite);
	Donkey.prototype.oninit = function() {
		this.reset();
	};
	Donkey.prototype.setAnim = function(animName, donplay) {
		this.animName = animName;
		var anim = new Animation({
			frames : getDonkeyFrames(animName),
			image : GC.ImageManager.get(animName)
		});
		var notLoopAnims = ['daiji', 'jump'];
		for (var i = 0, len = notLoopAnims.length; i < len; i++) {
			if (notLoopAnims[i] == animName) {
				anim.loop = false;
				break;
			}
		}
		anim.init(this);
		if (!donplay) {
			anim.play();
		}
		this.anim = anim;
	};
	Donkey.prototype.__borderCheck = function() {
		if (this.direction == 'left' && this.x < -64) {
			this.x = -64;
		} else if (this.direction == 'right' && this.x > 416) {
			this.x = 416;
		}
	}
	Donkey.prototype.jump = function() {
		this.animName = '';
		this.__jump();
	};
	Donkey.prototype.__jump = function() {
		if (this.animName != 'jump') {
			Audio.play('ogg_jump');
			this.setAnim('jump');
			this.width = 128;
			this.height = 128;
			this.lastSpeedY = 0;
			this.speedY = -1;
			this.acceY = 1 / 600;
		}
		this.__keyControl(true);
		this.parent.change();
	};
	Donkey.prototype.superJump = function() {
		if (this.__superJumpHeight > 1200) {
			this.__superJumpHeight = 0;
			this.stateUpdate = this.__jump;
			return;
		} else {
			this.__superJumpHeight += (this.lastY - this.y);
		}
		if (this.animName != 'superjump') {
			Audio.play('ogg_super');
			this.setAnim('superjump');
			this.lastSpeedY = 0;
			this.speedY = -0.8;
			this.acceY = 0;
		}
		this.__keyControl(true);
		this.parent.change();
	};
	Donkey.prototype.MJ = function() {
		if (this.__MJHeight > 1200) {
			this.__MJHeight = 0;
			this.stateUpdate = this.__jump;
			return;
		} else {
			this.__MJHeight += (this.lastY - this.y);
		}
		if (this.animName != 'MJ') {
			Audio.play('ogg_mj');
			this.setAnim('MJ');
			this.minTop = this.y;
			this.speedY = -0.5;
			this.acceY = 0;
			this.flipX = false;
		}
		this.__keyControl();
		this.parent.change();
	};
	Donkey.prototype.gliding = function() {
		if (this.__glidingHeight > 1200) {
			this.__glidingHeight = 0;
			this.stateUpdate = this.__jump;
			return;
		} else {
			this.__glidingHeight += (this.lastY - this.y);
		}
		if (this.animName != 'plan') {
			Audio.play('ogg_gliding');
			this.minTop = this.y;
			this.setAnim('plan');
			this.speedY = -0.5;
			this.acceY = 0;
			this.width = 256;
			this.height = 256;
		}
		this.__keyControl();
		this.parent.change();
	};
	Donkey.prototype.UFO = function() {
		if (this.__UFOHeight > 1200) {
			this.__UFOHeight = 0;
			this.stateUpdate = this.__jump;
			return;
		} else {
			this.__UFOHeight += (this.lastY - this.y);
		}
		if (this.animName != 'UFO') {
			Audio.play('ogg_ufo');
			this.minTop = this.y;
			this.setAnim('UFO');
			this.speedY = -0.5;
			this.acceY = 0;
			this.width = 256;
			this.height = 512;
		}
		this.__keyControl();
		this.parent.change();
	};
	Donkey.prototype.balloon = function() {
		if (this.__balloonHeight > 1200) {
			this.__balloonHeight = 0;
			this.stateUpdate = this.__jump;
			return;
		} else {
			this.__balloonHeight += (this.lastY - this.y);
		}
		if (this.animName != 'qiqiu') {
			Audio.play('ogg_balloon');
			this.minTop = this.y;
			this.setAnim('qiqiu');
			this.speedY = -0.5;
			this.acceY = 0;
			this.width = 128;
			this.height = 128;
		}
		this.__keyControl();
		this.parent.change();
	};
	Donkey.prototype.dead = function() {
		if (this.animName != 'dead') {
			Audio.pause('ogg_background');
			Audio.play('ogg_die');
			this.stateUpdate = this.__dead;
			this.isDead = true;
			this.setAnim('dead');
			this.speedY = 0.15;
			this.acceY = 1 / 1000;
			this.flipX = false;
			this.lastSpeedX = 0;
			this.speedX = 0;
		}
		this.parent.change();
	};
	Donkey.prototype.__dead = function() {
		if (this.deadHeight > 0) {
			var diffY = this.y - this.lastY, viewport = this.game.viewport;
			if (this.deadViewportFixed) {
			} else if (this.y >= viewport.y + 400) {
				viewport.move(0, diffY * 2);
			} else {
				this.deadViewportFixed = true;
			}
			this.deadHeight -= diffY;
			this.parent.change();
		} else {
			this.game.gameover();
		}
	};
	Donkey.prototype.__stateReady = function(deltaTime) {
		var game = this.game;
		if (game.ready(deltaTime)) {
			this.stateUpdate = this.superJump;
			return false;
		}
		if (game.keyDownLeft) {
			if (this.direction != 'left') {
				this.setAnim('run');
				this.flipX = true;
				this.speedX = -0.2;
				this.direction = 'left';
			}
			this.__borderCheck();
			this.parent.change();
		} else if (game.keyDownRight) {
			if (this.direction != 'right') {
				this.setAnim('run');
				this.flipX = false;
				this.speedX = 0.2;
				this.direction = 'right';
			}
			this.__borderCheck();
			this.parent.change();
		} else {
			if (this.direction != 'front') {
				this.setAnim('daiji');
				this.flipX = false;
				this.speedX = 0;
				this.direction = 'front';
				this.parent.change();
			}
		}
	}
	Donkey.prototype.__keyControl = function(flipX) {
		var game = this.game;
		if (game.keyDownLeft) {
			if (this.direction != 'left') {
				this.flipX = !!flipX;
				this.direction = 'left';
			}
			this.speedX = -0.25;
			this.inertia = this.speedX;
			this.__borderCheck();
		} else if (game.keyDownRight) {
			if (this.direction != 'right') {
				this.flipX = false;
				this.direction = 'right';
			}
			this.speedX = 0.25;
			this.inertia = this.speedX;
			this.__borderCheck();
		} else {
			if (this.inertia < 0) {
				this.inertia += 0.005;
			} else if (this.inertia > 0) {
				this.inertia -= 0.005;
			}
			this.speedX = this.inertia;
		}
	}
	Donkey.prototype.onupdate = function(deltaTime) {
		this.stateUpdate(deltaTime);
	}
	Donkey.prototype.reset = function() {
		this.width = 128;
		this.height = 128;
		this.flipX = false;
		this.speedX = 0;
		this.speedY = 0;
		this.acceX = 0;
		this.acceY = 0;
		this.inertia = 0;
		this.direction = 'front';
		this.setAnim('daiji');
		this.stateUpdate = this.__stateReady;
		this.__superJumpHeight = 0;
		this.__MJHeight = 0;
		this.__glidingHeight = 0;
		this.__UFOHeight = 0;
		this.__balloonHeight = 0;
		this.deadHeight = 1000;
		this.deadViewportFixed = false;
	}
	window.Donkey = Donkey;
})()
