/**
 * Donkey Jump游戏类
 */
var DonkeyJump = {

	/**
	 * 视口对象
	 */
	viewport : null,

	/**
	 * 天空背景层
	 */
	skyLayer : null,

	/**
	 * 远景山丘背景层
	 */
	hillLayer : null,

	/**
	 * 近景山丘背景层
	 */
	hillNearLayer : null,

	/**
	 * 房子背景层
	 */
	floorLayer : null,

	/**
	 * 白云精灵层
	 */
	stairLayer : null,

	/**
	 * 驴子精灵层
	 */
	donkeyLayer : null,

	/**
	 * 驴子
	 */
	donkey : null,
	/**
	 * 驴子开始跳时的位置
	 */
	donkeyJumpStartY : 0,
	/**
	 * 驴子普通跳的高度
	 */
	jumpHeight : 400,
	/**
	 * 视口的初始化位置
	 */
	viewportDefault : [0, 45440],

	/**
	 * 按键状态
	 */
	keyDownLeft : false,
	keyDownRight : false,
	/**
	 * 预备时间
	 */
	readyTime : 0,
	/**
	 * 游戏对象
	 */
	game : null,
	LV : 0,

	/**
	 * 是否即将开始
	 */
	isGo : false

};

/**
 * @private
 * 创建游戏分层
 */
DonkeyJump.__createLayers = function() {
	// 创建视口对象
	DonkeyJump.viewport = new Viewport({
		width : 480,
		height : 800,
	});

	DonkeyJump.skyLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvassky",
		distance : 20
	});
	DonkeyJump.hillLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvashill",
		distance : 15
	});
	DonkeyJump.hillNearLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvashillnear",
		distance : 5
	});
	DonkeyJump.floorLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvasfloor",
	});
	DonkeyJump.stairLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvasstair",
	});
	DonkeyJump.propsLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvasprops",
	});
	DonkeyJump.donkeyLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvas"
	});
}
/**
 * @private
 * 创建驴子
 */
DonkeyJump.__createDonkey = function() {
	DonkeyJump.donkey = new Sprite({
		width : 128,
		height : 128,
		minTop : 0,
		direction : ''
	});
	DonkeyJump.donkeyLayer.putSprite(DonkeyJump.donkey);
}
DonkeyJump.random = function(min, max) {
	return Math.floor((max - min + 1) * Math.random()) + min;
}
DonkeyJump.getStairName = ["stair_friable", "stair_moveable", "stair_stable_01", "stair_stable_02", "stair_stable_03", "stair_stable_04", "stair_stable_05"];
DonkeyJump.getPropsName = ["prop_spring01", "props_balloon", "props_gliding01", "props_michael", "props_super", "props_ufo"];
DonkeyJump.propsLists = {
	prop_spring01 : {
		width : 41,
		height : 14
	},
	props_balloon : {
		width : 54,
		height : 64
	},
	props_gliding01 : {
		width : 75,
		height : 64
	},
	props_michael : {
		width : 80,
		height : 45
	},
	props_super : {
		width : 58,
		height : 84
	},
	props_ufo : {
		width : 71,
		height : 44
	}
};
DonkeyJump.getProps = function() {
	var propsName = DonkeyJump.getPropsName[DonkeyJump.random(0, 5)];
	//var __prop=DonkeyJump.propsLists[propsName];
	var prop = new Sprite(DonkeyJump.propsLists[propsName]);
	prop.anim = new Animation({
		image : GC.ImageManager.get(propsName),
		frames : getPropFrames(propsName),
		loop : false
	});
	DonkeyJump.propsLayer.putSprite(prop);
	prop.init(DonkeyJump.propsLayer);
	return prop;
}
DonkeyJump.stairTop = DonkeyJump.viewportDefault[1] + 560;
DonkeyJump.creatStair = function() {
	var index = DonkeyJump.random(0, 6);
	var stairName = DonkeyJump.getStairName[index];
	DonkeyJump.stairTop -= (200 + DonkeyJump.LV * 10);
	var stair = new Sprite({
		width : 256,
		height : 128,
		y : DonkeyJump.stairTop,
		x : DonkeyJump.random(0, 350)
	});
	stair.anim = new Animation({
		image : GC.ImageManager.get(stairName),
		frames : getStairFrames(stairName)
	});
	if (5 == index) {
		stair.prop = DonkeyJump.getProps();
		stair.prop.x = stair.x + Math.abs(stair.prop.width - 128) / 2;
		stair.prop.y = stair.y - stair.prop.height + 10;
	}
	stair.update = function() {
		if (this.y > DonkeyJump.viewport.y + 800) {
			this.destory();
			DonkeyJump.creatStair();
		} else if (this.stair_moveable) {
			if ((this.x < 0 ) || (this.x > 350 )) {
				this.speedX = -this.speedX;
			}
		}
		this.parent.change();
	}
	DonkeyJump.stairLayer.putSprite(stair);
	stair.init(DonkeyJump.stairLayer);
	if (stairName == "stair_moveable") {
		stair.speedX = DonkeyJump.random(10, 20) / 100;
		if (DonkeyJump.random(1, 10) == 5) {
			stair.speedX = -stair.speedX;
		}
		stair.stair_moveable = true;
	}
	if (stairName == "stair_friable") {
		stair.anim.loop = false;
		stair.anim.gotoAndStop(0);
		stair.stair_friable = true;
	}
}
/**
 * @private
 * 创建场景
 */
DonkeyJump.__createScene = function() {
	var skySprite = new MapSprite({
		image : GC.ImageManager.get("sky"),
	});
	var hillSprite = new MapSprite({
		image : GC.ImageManager.get("hill"),
		width : 480,
		height : 603,
		y : DonkeyJump.viewportDefault[1] + (800 - 603) * DonkeyJump.hillLayer.distance
	});
	var hillnearSprite = new MapSprite({
		image : GC.ImageManager.get("hillnear"),
		width : 480,
		height : 613,
		y : DonkeyJump.viewportDefault[1] + (800 - 613) * DonkeyJump.hillNearLayer.distance
	});
	var floorSprite = new MapSprite({
		image : GC.ImageManager.get("floor"),
		width : 480,
		height : 584,
		y : DonkeyJump.viewportDefault[1] + (800 - 584) * DonkeyJump.floorLayer.distance
	});
	DonkeyJump.skyLayer.putSprite(skySprite);
	DonkeyJump.hillLayer.putSprite(hillSprite);
	DonkeyJump.hillNearLayer.putSprite(hillnearSprite);
	DonkeyJump.floorLayer.putSprite(floorSprite);
}
/**
 * 初始化游戏
 */
DonkeyJump.init = function() {
	DonkeyJump.__createLayers();
	DonkeyJump.__createDonkey();
	DonkeyJump.__createScene();
	DonkeyJump.donkey.anim = new Animation({
		image : GC.ImageManager.get("jump"),
		frames : getDonkeyFrames("jump")
	});
	DonkeyJump.donkey.animName="jump";
	DonkeyJump.donkey.setAnim=function(animName){
		this.anim.frames=getDonkeyFrames(animName);
		this.animName=animName;
	}
	DonkeyJump.game = new Game({
		instance : "DonkeyJump.game",
		FPS : 30
	});
	DonkeyJump.game.putLayer(DonkeyJump.skyLayer);
	DonkeyJump.game.putLayer(DonkeyJump.hillLayer);
	DonkeyJump.game.putLayer(DonkeyJump.hillNearLayer);
	DonkeyJump.game.putLayer(DonkeyJump.floorLayer);
	DonkeyJump.game.putLayer(DonkeyJump.stairLayer);
	DonkeyJump.game.putLayer(DonkeyJump.propsLayer);
	DonkeyJump.game.putLayer(DonkeyJump.donkeyLayer);
	DonkeyJump.game.init();
	DonkeyJump.stateInit();
}
DonkeyJump.renderBg = function() {
	DonkeyJump.skyLayer.change();
	DonkeyJump.hillLayer.change();
	DonkeyJump.hillNearLayer.change();
	DonkeyJump.floorLayer.change();
	DonkeyJump.stairLayer.change();
	DonkeyJump.propsLayer.change();
}
/**
 * 初始化状态
 */
DonkeyJump.stateInit = function() {
	GC.DOM.get("startBut").onclick = function() {
		// 移动视口到默认位置
		DonkeyJump.viewport.move(DonkeyJump.viewportDefault[0], DonkeyJump.viewportDefault[1], true);
		// 初始化驴子状态
		DonkeyJump.donkey.x = 176;
		DonkeyJump.donkey.y = DonkeyJump.viewportDefault[1] + 530;
		DonkeyJump.donkey.minTop = DonkeyJump.donkey.y;
		DonkeyJump.donkey.speedY = -1;
		DonkeyJump.donkey.acceY = 1 / 600;
		DonkeyJump.game.start();
		for (var i = 0; i < 10; i++) {
			DonkeyJump.creatStair();
		}
		GC.DOM.get("gameCanvas").className = "";
		GC.DOM.get("startBut").className = "none";
	};

	// 停止游戏时
	DonkeyJump.game.onstop = function() {
		GC.KeyEvent.removeListener();
	}
	// 开始游戏时
	DonkeyJump.game.onstart = function() {
		GC.KeyEvent.addListener();
	}
	// 游戏状态更新
	DonkeyJump.game.onupdate = function() {
		if (GC.KeyEvent.check('VK_LEFT') || GC.KeyEvent.check('A')) {
			DonkeyJump.keyDownLeft = true;
		} else {
			DonkeyJump.keyDownLeft = false;
		}

		if (GC.KeyEvent.check('VK_RIGHT') || GC.KeyEvent.check('D')) {
			DonkeyJump.keyDownRight = true;
		} else {
			DonkeyJump.keyDownRight = false;
		}	}
	DonkeyJump.donkey.update = function(deltaTime) {
		if (DonkeyJump.keyDownLeft) {
			if (this.direction != 'left') {
				this.flipX = true;
				this.direction = 'left';
			}
			this.speedX = -0.25;
		} else if (DonkeyJump.keyDownRight) {
			if (this.direction != 'right') {
				this.flipX = false;
				this.direction = 'right';
			}
			this.speedX = 0.25;
		} else {
			this.lastSpeedX = 0;
			this.speedX = 0;
		}

		if (this.lastY > this.y) {
			if (this.y < 45776) {
				var vy = this.y - 336;
				vy = vy > DonkeyJump.viewport.y ? DonkeyJump.viewport.y : vy;
				DonkeyJump.renderBg();
				DonkeyJump.viewport.move(0, vy, true);
			}

		} else {
			var stair = DonkeyJump.stairLayer.sprite;
			for (var i = 0, ln = stair.length; i < ln; i++) {
				var __stair = stair[i];
				if (this.hitTest(__stair)) {
					if (__stair.stair_friable) {
						__stair.anim.play();
					};
					if (__stair.prop) {
						if (this.hitTest(__stair.prop)) {
							__stair.prop.destory();
							__stair.prop.parent.change();
						}
					}
					this.minTop = this.y;
					this.lastSpeedY = 0;
					this.speedY = -1;
					this.acceY = 1 / 600;
					this.anim.init();
					break;
				}
			}
			if (this.y > this.minTop) {
				this.speedY = 0;
				this.acceY = 0;
				DonkeyJump.game.stop();
			}
		}		this.parent.change();	}}
/**
 * 根据视口位置更新层状态
 */
DonkeyJump.layerChnage = function() {
	var y = this.viewport.y;

	this.skyLayer.change();
	if (y > 36300) {
		this.hillLayer.change();
	}
	if (y > 4230) {
		this.hillNearLayer.change();
	}
	if (y > 44800) {
		this.floorLayer.change();
	}
}
/**
 * @private
 * 普通跳跃
 */
DonkeyJump.jump = function() {
	if (DonkeyJump.donkey.animName != 'jump') {
		this.setAnim('jump');
		this.speedY = -1;
		this.acceY = 1 / 600;
		this.width = 128;
		this.height = 128;
	}
}
/**
 * 超人跳跃
 */
DonkeyJump.superJump = function() {
	if (this.__superJumpHeight > 1200) {
		this.__superJumpHeight = 0;
		this.stateUpdate = this.__jump;
		return false;
	} else {
		this.__superJumpHeight += (this.lastY - this.y);
	}

	if (this.animName != 'superjump') {
		Audio.play('ogg_super');
		this.setAnim('superjump');
		this.speedY = -0.8;
		this.acceY = 0;
	}
}
/**
 * MJ
 */
DonkeyJump.MJ = function() {
	if (this.__MJHeight > 1200) {
		this.__MJHeight = 0;
		this.stateUpdate = this.__jump;
		return false;
	} else {
		this.__MJHeight += (this.lastY - this.y);
	}

	if (this.animName != 'MJ') {
		this.setAnim('MJ');
		this.speedY = -0.5;
		this.acceY = 0;
		this.flipX = false;
	}
}
/**
 * 滑行
 */
DonkeyJump.gliding = function() {
	if (this.__glidingHeight > 1200) {
		this.__glidingHeight = 0;
		this.stateUpdate = this.__jump;
		return false;
	} else {
		this.__glidingHeight += (this.lastY - this.y);
	}

	if (this.animName != 'plan') {
		this.setAnim('plan');
		this.speedY = -0.5;
		this.acceY = 0;
		this.flipX = false;
		this.width = 256;
		this.height = 256;
	}
}
/**
 * UFO
 */
DonkeyJump.UFO = function() {
	if (this.__UFOHeight > 1200) {
		this.__UFOHeight = 0;
		this.stateUpdate = this.__jump;
		return false;
	} else {
		this.__UFOHeight += (this.lastY - this.y);
	}

	if (this.animName != 'UFO') {
		this.setAnim('UFO');
		this.speedY = -0.5;
		this.acceY = 0;
		this.flipX = false;
		this.width = 256;
		this.height = 512;
	}
}
/**
 * 气球
 */
DonkeyJump.balloon = function() {
	if (this.__balloonHeight > 1200) {
		this.__balloonHeight = 0;
		this.stateUpdate = this.__jump;
		return false;
	} else {
		this.__balloonHeight += (this.lastY - this.y);
	}

	if (this.animName != 'qiqiu') {
		this.setAnim('qiqiu');
		this.speedY = -0.5;
		this.acceY = 0;
		this.flipX = false;
		this.width = 128;
		this.height = 128;
	}
}
/**
 * 死亡
 */
DonkeyJump.dead = function() {
	Audio.pause('ogg_background');
	Audio.play('ogg_die');
	this.stateUpdate = this.__dead;
	this.setAnim('dead');
	this.speedX = 0;
	this.speedY = 0.15;
	this.acceX = 0;
	this.acceY = 1 / 1000;
	this.flipX = false;
}
/**
 * 预备状态
 * @return {Boolean} 返回预备状态是否完毕
 */
DonkeyJump.ready = function(deltaTime) {
	var go = false;

	if (deltaTime <= 0) {
		return false;
	}

	if (this.readyTime == 0) {
		this.ui.beingReadyVisible(true);
		Audio.play('ogg_321');
	} else if (this.readyTime > 3000) {
		this.ui.beingGoVisible(false);
		go = true;
		Audio.play('ogg_go');
		this.ui.btnPauseVisible(true);
	} else if (this.readyTime > 2000) {
		if (!this.isGo) {
			this.ui.beingReadyVisible(false);
			this.ui.beingGoVisible(true);
			this.isGo = true;
			Audio.play('ogg_321');
		}
	} else if (this.readyTime > 1000) {
		if (this.readyTime + deltaTime > 2000) {
			Audio.play('ogg_321');
		}
	} else {
		if (this.readyTime + deltaTime > 1000) {
			Audio.play('ogg_321');
		}
	}
	this.readyTime += deltaTime;

	return go;
}
/**
 * 暂停游戏
 */
DonkeyJump.pause = function() {
	this.stop();
	Audio.pauseAll();
}
/**
 * 游戏结束
 */
DonkeyJump.gameover = function() {
	var ui = this.ui;

	this.stop();
	ui.updateResult(null, this.score);
	ui.toOver();
}

