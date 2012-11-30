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
	if(5==index){
		stair.prop = DonkeyJump.getProps();
		stair.prop.x=stair.x+Math.abs(stair.prop.width-128)/2;
		stair.prop.y=stair.y-stair.prop.height+10;
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
				var __stair=stair[i];
				if (this.hitTest(__stair)) {
					if (__stair.stair_friable) {
						__stair.anim.play();
					};
					if(__stair.prop){
						if(this.hitTest(__stair.prop)){
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
		}		this.parent.change();	}	// this.donkey.minTop = this.donkey.y;
	// this.donkey.reset();
	// // 预备时间清零
	// this.readyTime = 0;
	// this.isGo = false;
	// // 积分清零
	// this.setScore(0);
	// // 创建默认云层
	// this.__createDefaultStair();
	// // 重绘
	// this.skyLayer.change();
	// this.hillLayer.change();
	// this.hillNearLayer.change();
	// this.floorLayer.change();
	// this.stairLayer.change();
	// this.effectLayer.change();
	// this.donkeyLayer.change();
	// // UI
	// this.ui.btnPauseVisible(false);
}
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
 * 驴子垂直移动时控制视口
 */
DonkeyJump.viewportMove = function() {
	// var donkey = DonkeyJump.donkey, donkeyY = donkey.y, viewport = DonkeyJump.viewport;
	// if (donkeyY < donkey.lastY) {// 向上移动
	// if (donkeyY < donkey.minTop) {
	//
	// }
	// }
	//if(DonkeyJump.jumpHeight>366){
	//DonkeyJump.jumpHeight=0;
	//DonkeyJump.donkey.speedY = 0;
	// DonkeyJump.viewport.move(0,2);
	// DonkeyJump.donkey.y-=2;
	// DonkeyJump.renderBg();	//}
	// if (DonkeyJump.test) {
	// DonkeyJump.test = false;
	// DonkeyJump.viewport.move(0, 360);
	// DonkeyJump.renderBg();
	// }
	// var donkey = this.donkey, viewport = this.viewport;
	// var donkeyY = donkey.y;
	//
	// if (donkeyY < donkey.lastY) {// 向上移动
	// if (donkeyY < donkey.minTop) {
	// if (donkeyY < 45776) {
	// viewport.move(0, donkeyY - 336, true);
	// }
	//
	// this.setScore(45970 - donkeyY);
	// this.layerChnage();
	//
	// donkey.minTop = donkeyY;
	// this.__stairControl();
	// }
	// } else if (donkey.animName == 'jump') {// 跳跃时向下移动
	// if (donkey.y + donkey.height > viewport.y + 800) {// 死亡
	// donkey.dead();
	// } else {
	// var stairLayer = this.stairLayer;
	// var stairs = stairLayer.getChilds();
	//
	// for (var i = 0, len = stairs.length; i < len; i++) {
	// var stair = stairs[i];
	//
	// if (stair && donkey.hitTest(stair)) {
	// // 与云层碰撞
	// if ( stair instanceof Prop) {
	// stair.stepon(donkey);
	// } else {
	// var cloud = new Cloud({
	// x : donkey.x + (donkey.direction == 'left' ? 45 : 35),
	// y : stair.y - 16,
	// width : 64,
	// height : 16
	// });
	// var self = this;
	//
	// cloud.onupdate = cloud.ondestory = function() {
	// self.effectLayer.change();
	// }
	// this.effectLayer.appendChild(cloud);
	// cloud.init();
	//
	// var name = stair.name;
	// if (name == 'stair_friable') {// 脆弱的云
	// Audio.play('ogg_step_broken');
	// stair.anim.play();
	// } else if (name == 'stair_moveable') {// 会移动的云
	// stair.anim.gotoAndPlay(1);
	// }
	//
	// donkey.jump();
	// }
	// }
	// }
	// }
	// }
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

