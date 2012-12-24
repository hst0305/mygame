/**
 * Donkey Jump游戏类
 */
var DonkeyJump = {
	viewport : null,
	skyLayer : null,
	hillLayer : null,
	hillNearLayer : null,
	floorLayer : null,
	stairLayer : null,
	effctLayer : null,
	donkeyLayer : null,
	donkey : null,
	donkeyJumpStartY : 0,
	jumpHeight : 400,
	viewportDefault : [0, 45440],
	keyDownLeft : false,
	keyDownRight : false,
	readyTime : 0,
	game : null,
	LV : 0,
	isGo : false,
	__superJumpHeight : 0,
	__MJHeight : 0,
	__glidingHeight : 0,
	__UFOHeight : 0,
	__balloonHeight : 0,
	__powerJumpHeight : 0,
	point : 0,
	deadHeight : 1000,
	isDead : false,
	music : true,
	jumpState : GC.fn

};
/**
 * 初始化游戏
 */
DonkeyJump.init = function() {
	GC.DOM.removeClass(GC.DOM.get("btn"), "none");
	GC.DOM.removeClass(GC.DOM.get("music"), "none");
	GC.DOM.addClass(GC.DOM.get("msg"), "none");
	DonkeyJump.__createLayers();
	DonkeyJump.__createDonkey();
	DonkeyJump.__createScene();
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
	DonkeyJump.game.putLayer(DonkeyJump.effctLayer);
	DonkeyJump.game.init();
	DonkeyJump.stateInit();
}
/**
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
	DonkeyJump.effctLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvaseffct",
	});
	DonkeyJump.donkeyLayer = new Layer({
		viewport : DonkeyJump.viewport,
		canvas : "canvas"
	});
}
/**
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
 * 创建驴子
 */
DonkeyJump.__createDonkey = function() {
	var donkey = new Sprite({
		minTop : 0,
		direction : ''
	});
	donkey.anim = new Animation({
		frames : getDonkeyFrames('daiji'),
		image : GC.ImageManager.get('daiji')
	});
	donkey.setAnim = function(animName) {
		donkey.anim.frames = getDonkeyFrames(animName);
		donkey.anim.image = GC.ImageManager.get(animName);
		donkey.animName = animName;
	};
	donkey.jump = function() {
		if (this.animName != 'jump') {
			if (DonkeyJump.music) {
				Audio.play('ogg_jump');
			}
			this.setAnim('jump');
			this.width = 128;
			this.height = 128;
			this.minTop = this.y;
			this.lastSpeedY = 0;
			this.speedY = -1;
			this.acceY = 1 / 600;
			this.anim.init(this);
		}
	};
	donkey.__jump = function() {
		if (DonkeyJump.music) {
			Audio.play('ogg_jump');
		}
		this.setAnim('jump');
		this.width = 128;
		this.height = 128;
		this.minTop = this.y;
		this.lastSpeedY = 0;
		this.speedY = -1;
		this.acceY = 1 / 600;
		this.anim.init(this);
	};
	donkey.powerJump = function() {
		if (DonkeyJump.__powerJumpHeight > 1200) {
			DonkeyJump.__powerJumpHeight = 0;
			this.stateUpdate = this.jump;
			return;
		} else {
			DonkeyJump.__powerJumpHeight += (this.lastY - this.y);
		}

		if (this.animName != 'run') {
			if (DonkeyJump.music) {
				Audio.play('ogg_super');
			}
			this.minTop = this.y;
			this.setAnim('run');
			this.lastSpeedY = 0;
			this.speedY = -0.8;
			this.acceY = 0;
			this.anim.init(this);
		}

	};
	donkey.superJump = function() {
		if (DonkeyJump.__superJumpHeight > 1200) {
			DonkeyJump.__superJumpHeight = 0;
			this.stateUpdate = this.jump;
			return;
		} else {
			DonkeyJump.__superJumpHeight += (this.lastY - this.y);
		}

		if (this.animName != 'superjump') {
			if (DonkeyJump.music) {
				Audio.play('ogg_super');
			}
			this.minTop = this.y;
			this.setAnim('superjump');
			this.lastSpeedY = 0;
			this.speedY = -0.8;
			this.acceY = 0;
			this.anim.init(this);
		}
	};
	donkey.MJ = function() {
		if (DonkeyJump.__MJHeight > 1200) {
			DonkeyJump.__MJHeight = 0;
			this.stateUpdate = this.jump;
			return;
		} else {
			DonkeyJump.__MJHeight += (this.lastY - this.y);
		}

		if (this.animName != 'MJ') {
			if (DonkeyJump.music) {
				Audio.play('ogg_mj');
			}
			this.setAnim('MJ');
			this.minTop = this.y;
			this.speedY = -0.5;
			this.acceY = 0;
			this.flipX = false;
		}
	};
	donkey.gliding = function() {
		if (DonkeyJump.__glidingHeight > 1200) {
			DonkeyJump.__glidingHeight = 0;
			this.stateUpdate = this.jump;
			return;
		} else {
			DonkeyJump.__glidingHeight += (this.lastY - this.y);
		}

		if (this.animName != 'plan') {
			if (DonkeyJump.music) {
				Audio.play('ogg_gliding');
			}
			this.minTop = this.y;
			this.setAnim('plan');
			this.speedY = -0.5;
			this.acceY = 0;
			this.width = 256;
			this.height = 256;
		}
	};
	donkey.UFO = function() {
		if (DonkeyJump.__UFOHeight > 1200) {
			DonkeyJump.__UFOHeight = 0;
			this.stateUpdate = this.jump;
			return;
		} else {
			DonkeyJump.__UFOHeight += (this.lastY - this.y);
		}

		if (this.animName != 'UFO') {
			if (DonkeyJump.music) {
				Audio.play('ogg_ufo');
			}
			this.minTop = this.y;
			this.setAnim('UFO');
			this.speedY = -0.5;
			this.acceY = 0;
			this.width = 256;
			this.height = 512;
		}
	};
	donkey.balloon = function() {
		if (DonkeyJump.__balloonHeight > 1200) {
			DonkeyJump.__balloonHeight = 0;
			this.stateUpdate = this.jump;
			return;
		} else {
			DonkeyJump.__balloonHeight += (this.lastY - this.y);
		}

		if (this.animName != 'qiqiu') {
			if (DonkeyJump.music) {
				Audio.play('ogg_balloon');
			}
			this.minTop = this.y;
			this.setAnim('qiqiu');
			this.speedY = -0.5;
			this.acceY = 0;
			this.width = 128;
			this.height = 128;
		}
	};
	donkey.dead = function() {
		if (this.animName != 'dead') {
			if (DonkeyJump.music) {
				Audio.pause('ogg_background');
				Audio.play('ogg_die');
			}
			this.stateUpdate = this.__dead;
			DonkeyJump.isDead = true;
			this.setAnim('dead');
			this.speedY = 0.15;
			this.acceY = 1 / 1000;
			this.flipX = false;
		}
	};
	donkey.__dead = function() {
		if (DonkeyJump.deadHeight > 0) {
			var diffY = this.y - this.lastY, viewport = DonkeyJump.viewport;

			if (this.deadViewportFixed) {
				//
			} else if (this.y >= viewport.y + 400) {
				viewport.move(0, diffY * 2);
			} else {
				this.deadViewportFixed = true;
			}

			DonkeyJump.deadHeight -= diffY;
		} else {
			DonkeyJump.gameover();
		}
	};
	donkey.update = function(deltaTime) {
		if (!DonkeyJump.isGo) {
			DonkeyJump.isGo = DonkeyJump.ready(deltaTime);
			this.width = 128;
			this.height = 128;
			this.parent.change();
			return;
		}
		if (DonkeyJump.keyDownLeft) {
			if (this.direction != 'left') {
				if (this.animName == "jump") {
					this.flipX = true;
				}
				this.direction = 'left';
			}
			this.speedX = -0.25;
		} else if (DonkeyJump.keyDownRight) {
			if (this.direction != 'right') {
				if (this.animName == "jump") {
					this.flipX = false;
				}
				this.direction = 'right';
			}
			this.speedX = 0.25;
		} else {
			this.lastSpeedX = 0;
			this.speedX = 0;
		}
		this.stateUpdate();
		if (DonkeyJump.isDead) {
			this.parent.change();
			this.speedX = 0;
			return;
		} else {
			if (this.x < -64) {
				this.x = -64;
			}
			if (this.x > 416) {
				this.x = 416;
			}
		}
		if (this.lastY > this.y) {
			if (this.y < 45776) {
				var vy = this.y - 336;
				vy = vy > DonkeyJump.viewport.y ? DonkeyJump.viewport.y : vy;
				DonkeyJump.layerChnage();
				DonkeyJump.viewport.move(0, vy, true);
				DonkeyJump.changePoint(this.y);
			}
		} else if (this.lastY < this.y) {
			var stair = DonkeyJump.stairLayer.getSprite();
			for (var i = 0, ln = stair.length; i < ln; i++) {
				var __stair = stair[i];
				if (__stair.prop) {
					if (this.hitTest(__stair.prop)) {
						var prop = __stair.prop;
						switch(prop.propsName) {
							case "prop_spring01":
								this.stateUpdate = this.superJump;
								break;
							case "props_balloon":
								this.stateUpdate = this.balloon;
								break;
							case "props_gliding01":
								this.stateUpdate = this.gliding;
								break;
							case "props_michael":
								this.stateUpdate = this.MJ;
								break;
							case "props_super":
								this.stateUpdate = this.superJump;
								break;
							case "props_ufo":
								this.stateUpdate = this.UFO;
								break;
						}
						if (prop.propsName == "prop_spring01") {
							prop.anim.image = GC.ImageManager.get("prop_spring03");
							prop.height = 30;
							prop.y -= 16;
							this.y -= 16;
						} else {
							prop.destory();
						}
						break;
					}
				}
				if (this.hitTest(__stair)) {
					DonkeyJump.creatCloud({
						x : this.x + 40,
						y : this.y + this.height - 40
					});
					if (__stair.stair_friable) {
						if (DonkeyJump.music) {
							Audio.play('ogg_step_broken');
						}
						__stair.anim.play();
					}
					this.__jump()
					break;
				}
			}
		}
		if (this.y > DonkeyJump.viewport.y + 710) {
			this.speedY = 0;
			this.acceY = 0;
			this.dead();
		}
		this.parent.change();
	}
	
	DonkeyJump.donkeyLayer.putSprite(donkey);
	DonkeyJump.donkey = donkey;
}
/**
 * 创建驴子踩在云层上的效果精灵
 */
DonkeyJump.creatCloud = function(property) {
	var cloud = new Sprite(property);
	cloud.width = 64;
	cloud.height = 16;
	cloud.anim = new Animation({
		image : GC.ImageManager.get('cloud'),
		frames : getEffectFrames('cloud'),
		loop : false,
		onend : function() {
			this.parent.visible = false;
		}
	});
	cloud.update = function() {
		if (this.y > DonkeyJump.viewport.y + 800) {
			this.destory();
		} else {
			this.parent.change();
		}
	}
	DonkeyJump.effctLayer.putSprite(cloud);
	cloud.init(DonkeyJump.effctLayer);
}

DonkeyJump.random = function(min, max) {
	return Math.floor((max - min + 1) * Math.random()) + min;
}
/**
 * 云类型集合
 */
DonkeyJump.getStairName = ["stair_friable", "stair_moveable", "stair_stable_01", "stair_stable_02", "stair_stable_03", "stair_stable_04", "stair_stable_05"];
/**
 * 创建云时，云应该出现的Y坐标
 */
DonkeyJump.stairTop = DonkeyJump.viewportDefault[1] + 360;
/**
 * 创建云精灵
 */
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
	stair.update = function() {
		if (this.y > DonkeyJump.viewport.y + 800) {
			this.destory();
			DonkeyJump.creatStair();
		} else if (this.stair_moveable) {
			if ((this.x < 0 ) || (this.x > 350 )) {
				this.speedX = -this.speedX;
			}
			this.parent.change();
		} else {
			this.parent.change();
		}
	}
	DonkeyJump.stairLayer.putSprite(stair);
	stair.init(DonkeyJump.stairLayer);
	if (stairName == "stair_moveable") {
		stair.speedX = DonkeyJump.random(10, 20) / 100;
		stair.stair_moveable = true;
	} else if (5 == index) {
		stair.prop = DonkeyJump.getProps();
		stair.prop.x = stair.x + Math.abs(stair.prop.width - 128) / 2;
		stair.prop.y = stair.y - stair.prop.height + 10;
	}
	if (stairName == "stair_friable") {
		stair.anim.loop = false;
		stair.anim.gotoAndStop(0);
		stair.stair_friable = true;
	}
}
/**
 * 道具类型集合
 */
DonkeyJump.getPropsName = ["prop_spring01", "props_balloon", "props_gliding01", "props_michael", "props_super", "props_ufo"];
/**
 * 道具大小信息
 */
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
/**
 * 随机获取一个道具
 */
DonkeyJump.getProps = function() {
	var propsName = DonkeyJump.getPropsName[DonkeyJump.random(0, 5)];
	var prop = new Sprite(DonkeyJump.propsLists[propsName]);
	prop.anim = new Animation({
		image : GC.ImageManager.get(propsName),
		frames : getPropFrames(propsName),
		loop : false
	});
	prop.update = function() {
		if (this.y > DonkeyJump.viewport.y + 800) {
			this.destory();
		} else {
			this.parent.change();
		}
	}
	DonkeyJump.propsLayer.putSprite(prop);
	prop.init(DonkeyJump.propsLayer);
	prop.propsName = propsName;
	return prop;
}
/**
 * 初始化状态
 */
DonkeyJump.stateInit = function() {
	Audio.play('ogg_background');
	GC.DOM.get("startBut").onclick = function() {
		DonkeyJump.viewport.move(DonkeyJump.viewportDefault[0], DonkeyJump.viewportDefault[1], true);
		DonkeyJump.donkey.x = 176;
		DonkeyJump.donkey.y = DonkeyJump.viewportDefault[1] + 530;
		for (var i = 0; i < 5; i++) {
			DonkeyJump.creatStair();
		}
		GC.DOM.get("gameCanvas").className = "";
		GC.DOM.get("point").className = "";
		GC.DOM.get("btn").className = "none";
		DonkeyJump.game.start();
	};
	GC.DOM.get("reStartBut").onclick = function() {
		DonkeyJump.reSet();
		DonkeyJump.init();
		GC.DOM.get("dead").className = "none";
		GC.DOM.get("startBut").click();
	};
	GC.DOM.get("music").onclick = function() {
		var __m = GC.DOM.get("music");
		if (GC.DOM.hasClass(__m, "music_on")) {
			Audio.pauseAll();
			DonkeyJump.music = false;
			__m.className = "music_off";
		} else {
			Audio.play('ogg_background');
			DonkeyJump.music = true;
			__m.className = "music_on";
		}
	};
	GC.DOM.get("submitPoint").onclick = function() {
		showModlePanel("submitPanel", 300, 200);
	};
	GC.DOM.get("submitBtn").onclick = function() {
		hiddModlePanel("submitPanel");
		var userName = GC.DOM.get("userName").value;
		Storage.set(userName, DonkeyJump.point, 2);
	};
	GC.DOM.get("ranking").onclick = function() {
		TOP.update("T_C", 2);
		showModlePanel("Top10", 400, 280);
	};
	GC.DOM.get("game_stop").onclick = function() {
		GC.DOM.get("game_stop").className = "none";
		GC.DOM.get("game_start").className = "";
		DonkeyJump.game.stop();
		Audio.pauseAll();
	};
	GC.DOM.get("game_start").onclick = function() {
		GC.DOM.get("game_stop").className = "";
		GC.DOM.get("game_start").className = "none";
		DonkeyJump.game.start();
		if (DonkeyJump.music) {
			Audio.play('ogg_background');
		}
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
		}
	}
}
/**
 * 根据视口位置更新层状态
 */
DonkeyJump.layerChnage = function() {
	var y = DonkeyJump.viewport.y;
	if (y > 0) {
		DonkeyJump.skyLayer.change();
	}
	if (y > 36300) {
		DonkeyJump.hillLayer.change();
	}
	if (y > 4230) {
		DonkeyJump.hillNearLayer.change();
	}
	if (y > 44800) {
		DonkeyJump.floorLayer.change();
	}
}
/**
 * 计算分数-以高度为准
 */
DonkeyJump.changePoint = function(DonkeyHeight) {
	DonkeyJump.point = DonkeyJump.viewportDefault[1] - DonkeyHeight + 530;
	if (DonkeyJump.point > 50000) {
		DonkeyJump.LV = 11;
	} else if (DonkeyJump.point > 40000) {
		DonkeyJump.LV = 10;
	} else if (DonkeyJump.point > 30000) {
		DonkeyJump.LV = 9;
	} else if (DonkeyJump.point > 20000) {
		DonkeyJump.LV = 8;
	} else if (DonkeyJump.point > 25000) {
		DonkeyJump.LV = 7;
	} else if (DonkeyJump.point > 20000) {
		DonkeyJump.LV = 6;
	} else if (DonkeyJump.point > 15000) {
		DonkeyJump.LV = 5;
	} else if (DonkeyJump.point > 10000) {
		DonkeyJump.LV = 4;
	} else if (DonkeyJump.point > 5000) {
		DonkeyJump.LV = 3;
	} else if (DonkeyJump.point > 3000) {
		DonkeyJump.LV = 2;
	}
	var aPoint = Array.prototype.slice.call("" + DonkeyJump.point, 0);
	for (var i = 0, ln = aPoint.length; i < ln; i++) {
		var id = "num_" + (i + 1)
		GC.DOM.get(id).className = "num_" + aPoint[ln - i - 1];
	}
}
/**
 * 游戏结束
 */
DonkeyJump.gameover = function() {
	GC.DOM.get("dead").className = "";
	GC.DOM.get("startBut").className = "none";
	GC.DOM.get("reStartBut").className = "reStart";
	GC.DOM.get("btn").className = "";
	GC.DOM.get("point").className = "none";
	GC.DOM.get("game_stop").className = "none";
	GC.DOM.get("end_point").innerHTML = DonkeyJump.point;
	DonkeyJump.game.gameOver();
}
/**
 * 重新开始
 */
DonkeyJump.reSet = function() {
	DonkeyJump.viewport = null;
	DonkeyJump.skyLayer = null;
	DonkeyJump.hillLayer = null;
	DonkeyJump.hillNearLayer = null;
	DonkeyJump.floorLayer = null;
	DonkeyJump.stairLayer = null;
	DonkeyJump.effctLayer = null;
	DonkeyJump.donkeyLayer = null;
	DonkeyJump.donkey = null;
	DonkeyJump.donkeyJumpStartY = 0;
	DonkeyJump.jumpHeight = 400;
	DonkeyJump.viewportDefault = [0, 45440];
	DonkeyJump.keyDownLeft = false;
	DonkeyJump.keyDownRight = false;
	DonkeyJump.readyTime = 0;
	DonkeyJump.game = null;
	DonkeyJump.LV = 0;
	DonkeyJump.isGo = false;
	DonkeyJump.__superJumpHeight = 0;
	DonkeyJump.__MJHeight = 0;
	DonkeyJump.__glidingHeight = 0;
	DonkeyJump.__UFOHeight = 0;
	DonkeyJump.__balloonHeight = 0;
	DonkeyJump.__powerJumpHeight = 0;
	DonkeyJump.point = 0;
	DonkeyJump.deadHeight = 1000;
	DonkeyJump.isDead = false;
	DonkeyJump.stairTop = DonkeyJump.viewportDefault[1] + 360;
	DonkeyJump.jumpState = GC.fn;
	GC.DOM.get("num_1").className = "num_0";
	GC.DOM.get("num_2").className = "num_0";
	GC.DOM.get("num_3").className = "num_0";
	GC.DOM.get("num_4").className = "num_0";
	GC.DOM.get("num_5").className = "num_0";
	GC.DOM.get("num_6").className = "num_0";
}
/**
 * 预备状态
 */
DonkeyJump.ready = function(deltaTime) {
	var go = false;
	if (deltaTime <= 0) {
		return false;
	}
	if (DonkeyJump.readyTime == 0) {
		GC.DOM.get("ready").className = "";
		if (DonkeyJump.music) {
			Audio.play('ogg_321');
		}
	} else if (DonkeyJump.readyTime > 3000) {
		GC.DOM.get("ready").className = "none";
		GC.DOM.get("go").className = "none";
		go = true;
		DonkeyJump.donkey.stateUpdate = DonkeyJump.donkey.superJump;
		GC.DOM.get("game_stop").className = "";
		if (DonkeyJump.music) {
			Audio.play('ogg_go');
		}
	} else if (DonkeyJump.readyTime > 2000) {
		if (!DonkeyJump.isGo) {
			GC.DOM.get("ready").className = "none";
			GC.DOM.get("go").className = "";
			DonkeyJump.isGo = true;
			if (DonkeyJump.music) {
				Audio.play('ogg_321');
			}
		}
	} else if (DonkeyJump.readyTime > 1000) {
		if (DonkeyJump.readyTime + deltaTime > 2000 && DonkeyJump.music) {
			Audio.play('ogg_321');
		}
	} else {
		if (DonkeyJump.readyTime + deltaTime > 1000 && DonkeyJump.music) {
			Audio.play('ogg_321');
		}
	}
	DonkeyJump.readyTime += deltaTime;
	return go;
}

