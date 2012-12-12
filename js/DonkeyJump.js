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
	__powerJumpHeight:0,
	point:0,
	deadHeight : 1000,
	isDead : false,
	jumpState : GC.fn

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
			Audio.play('ogg_jump');
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
		Audio.play('ogg_jump');
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
			Audio.play('ogg_super');
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
			Audio.play('ogg_super');
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
			Audio.play('ogg_mj');
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
			Audio.play('ogg_gliding');
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
			Audio.play('ogg_ufo');
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
			Audio.play('ogg_balloon');
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
			Audio.pause('ogg_background');
			Audio.play('ogg_die');
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
	DonkeyJump.donkeyLayer.putSprite(donkey);
	DonkeyJump.donkey = donkey;
}
DonkeyJump.gameover = function() {
	GC.DOM.get("dead").className = "";
	GC.DOM.get("btn").className = "";
	GC.DOM.get("point").className = "none";
	GC.DOM.get("end_point").innerHTML = DonkeyJump.point;
	DonkeyJump.game.destory();
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
	prop.update = function() {
		if (this.y > DonkeyJump.viewport.y + 800) {
			this.destory();
		} 
		this.parent.change();
	}
	DonkeyJump.propsLayer.putSprite(prop);
	prop.init(DonkeyJump.propsLayer);
	prop.propsName = propsName;
	return prop;
}
DonkeyJump.stairTop = DonkeyJump.viewportDefault[1] + 360;
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
		stair.prop.y = stair.y - stair.prop.height+10;
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
/**
 * 初始化状态
 */
DonkeyJump.stateInit = function() {
	Audio.play('ogg_background');
	GC.DOM.get("startBut").onclick = function() {
		DonkeyJump.viewport.move(DonkeyJump.viewportDefault[0], DonkeyJump.viewportDefault[1], true);
		DonkeyJump.donkey.x = 176;
		DonkeyJump.donkey.y = DonkeyJump.viewportDefault[1] + 530;
		for (var i = 0; i < 10; i++) {
			DonkeyJump.creatStair();
		}
		GC.DOM.get("gameCanvas").className = "";
		GC.DOM.get("point").className = "";
		GC.DOM.get("btn").className = "none";
		DonkeyJump.game.start();
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
			var stair = DonkeyJump.stairLayer.sprite;
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
						if(prop.propsName=="prop_spring01"){
							prop.anim.image=GC.ImageManager.get("prop_spring03");
							prop.height=30;
							prop.y-=16;
							this.y-=16;
						}else{
							prop.destory();
						}
						prop.parent.change();
						break;
					}
				}
				if (this.hitTest(__stair)) {
					if (__stair.stair_friable) {
						Audio.play('ogg_step_broken');
						__stair.anim.play();
					};
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
		this.parent.change();	}}
/**
 * 根据视口位置更新层状态
 */
DonkeyJump.layerChnage = function() {
	var y = DonkeyJump.viewport.y;
	if(y>0){
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
DonkeyJump.changePoint=function(DonkeyHeight){
	DonkeyJump.point=DonkeyJump.viewportDefault[1]-DonkeyHeight+530;
	if(DonkeyJump.point>50000){
		DonkeyJump.LV=11;
	}else if(DonkeyJump.point>40000){
		DonkeyJump.LV=10;
	}else if(DonkeyJump.point>30000){
		DonkeyJump.LV=9;
	}else if(DonkeyJump.point>20000){
		DonkeyJump.LV=8;
	}else if(DonkeyJump.point>25000){
		DonkeyJump.LV=7;
	}else if(DonkeyJump.point>20000){
		DonkeyJump.LV=6;
	}else if(DonkeyJump.point>15000){
		DonkeyJump.LV=5;
	}else if(DonkeyJump.point>10000){
		DonkeyJump.LV=4;
	}else if(DonkeyJump.point>5000){
		DonkeyJump.LV=3;
	}else if(DonkeyJump.point>3000){
		DonkeyJump.LV=2;
	}
	var aPoint=Array.prototype.slice.call(""+DonkeyJump.point,0);
	for(var i=0,ln=aPoint.length;i<ln;i++){
		var id="num_"+(i+1)
		GC.DOM.get(id).className="num_"+aPoint[ln-i-1];
	}}
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
		Audio.play('ogg_321');
	} else if (DonkeyJump.readyTime > 3000) {
		GC.DOM.get("ready").className = "none";
		GC.DOM.get("go").className = "none";
		go = true;
		DonkeyJump.donkey.stateUpdate = DonkeyJump.donkey.superJump;
		Audio.play('ogg_go');
		//this.ui.btnPauseVisible(true);
	} else if (DonkeyJump.readyTime > 2000) {
		if (!DonkeyJump.isGo) {
			GC.DOM.get("ready").className = "none";
			GC.DOM.get("go").className = "";
			DonkeyJump.isGo = true;
			Audio.play('ogg_321');
		}
	} else if (DonkeyJump.readyTime > 1000) {
		if (DonkeyJump.readyTime + deltaTime > 2000) {
			Audio.play('ogg_321');
		}
	} else {
		if (DonkeyJump.readyTime + deltaTime > 1000) {
			Audio.play('ogg_321');
		}
	}
	DonkeyJump.readyTime += deltaTime;

	return go;
}
/**
 * 暂停游戏
 */
DonkeyJump.pause = function() {
	DonkeyJump.game.stop();
	Audio.pauseAll();
}

