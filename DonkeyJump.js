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
	donkeyJumpStartY:0,
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
		direction:'',
		inertia:0
	});
	DonkeyJump.donkeyLayer.putSprite(DonkeyJump.donkey);
}
DonkeyJump.__createStair =function(){
	DonkeyJump.stair = new Sprite({
		width : 256,
		height : 128
	});
	DonkeyJump.stair2 = new Sprite({
		width : 256,
		height : 128
	});
	DonkeyJump.stair3 = new Sprite({
		width : 256,
		height : 128
	});
	DonkeyJump.stairLayer.putSprite(DonkeyJump.stair);
	DonkeyJump.stairLayer.putSprite(DonkeyJump.stair2);
	DonkeyJump.stairLayer.putSprite(DonkeyJump.stair3);
};
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
		//y:9275
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
	DonkeyJump.__createStair();
	DonkeyJump.__createDonkey();
	DonkeyJump.__createScene();
	DonkeyJump.donkey.anim = new Animation({
		image : GC.ImageManager.get("jump"),
		frames : getDonkeyFrames("jump")
	});
	DonkeyJump.stair.anim = new Animation({
		image : GC.ImageManager.get("stair_stable_01"),
		frames : getStairFrames("stair_stable_01")
	});
	DonkeyJump.stair2.anim = new Animation({
		image : GC.ImageManager.get("stair_stable_01"),
		frames : getStairFrames("stair_stable_01")
	});
	DonkeyJump.stair3.anim = new Animation({
		image : GC.ImageManager.get("stair_stable_01"),
		frames : getStairFrames("stair_stable_01")
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
	
}
/**
 * 初始化状态
 */
DonkeyJump.stateInit = function() {
	// 移动视口到默认位置
	DonkeyJump.viewport.move(DonkeyJump.viewportDefault[0], DonkeyJump.viewportDefault[1], true);
	// 初始化驴子状态
	DonkeyJump.donkey.x = 176;
	DonkeyJump.donkey.y = DonkeyJump.viewportDefault[1] + 530;
	DonkeyJump.donkey.minTop = DonkeyJump.donkey.y;
	DonkeyJump.stair.x = 176;
	DonkeyJump.stair.y = DonkeyJump.viewportDefault[1]+360;
	DonkeyJump.stair2.x = 176;
	DonkeyJump.stair2.y = DonkeyJump.viewportDefault[1]+200;
	DonkeyJump.stair3.x = 176;
	DonkeyJump.stair3.y = DonkeyJump.viewportDefault[1]+40;
	GC.DOM.get("startBut").onclick = function() {
		GC.DOM.get("gameCanvas").className = "";
		GC.DOM.get("startBut").className = "none";
		//DonkeyJump.donkey.mimTop = 0;
		DonkeyJump.donkey.speedY = -1;
		DonkeyJump.donkey.acceY = 1 / 600;
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
		//DonkeyJump.jumpHeight+=Math.abs(DonkeyJump.donkey.lastY-DonkeyJump.donkey.y);

		//GC.DOM.get("msg1").innerHTML=DonkeyJump.jumpHeight;

		// this.mimTop += Math.abs(this.y - this.lastY);
		// if (this.jumpHeight >= 500) {
		// this.speedY = 0.5;
		// this.acceY = 1 / 600;
		// this.jumpHeight = 0;
		// }
		// if (this.y > 550) {
		// this.speedY = 0;
		// this.acceY = 0;
		// //this.parent.viewport.move(0, 0);
		// } else {
		// //this.parent.viewport.move(0, 5);
		// }
		
		//DonkeyJump.donkeyJumpStartY+=Math.abs(DonkeyJump.donkey.lastY-DonkeyJump.donkey.y);		//DonkeyJump.viewportMove();
		
        
        if(DonkeyJump.keyDownLeft) {
            if(this.direction != 'left') {
                this.parent.flipX = true;
                this.direction = 'left';
            }
            this.speedX = -0.25;
        } else if(DonkeyJump.keyDownRight) {
            if(this.direction != 'right') {
                this.parent.flipX = false;
                this.direction = 'right';
            }
            this.speedX = 0.25;
        } else {
           	this.lastSpeedX=0;
            this.speedX = 0;
        }
        
		if(this.lastY>this.y){
			if(this.y < 45776) {
				var vy=this.y - 336;
				vy=vy>DonkeyJump.viewport.y?DonkeyJump.viewport.y:vy;
				DonkeyJump.renderBg();
	        	DonkeyJump.viewport.move(0, vy, true);
	        }
			
		}else{
			if(this.hitTest(DonkeyJump.stair)||this.hitTest(DonkeyJump.stair2)||this.hitTest(DonkeyJump.stair3)){
				//DonkeyJump.game.stop();
				var donkeyY=this.y;
				this.minTop=donkeyY;
				this.lastSpeedY=0;
				this.speedY = -1;
				this.acceY = 1 / 600;
				this.anim.init();
			}else{
				if(this.y>this.minTop){
					DonkeyJump.donkey.speedY = 0;
					DonkeyJump.donkey.acceY = 0;
					DonkeyJump.game.stop();
				}
			}
		}		
		this.parent.change();
	}	// this.donkey.minTop = this.donkey.y;
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

