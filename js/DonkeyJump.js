/**
 * Donkey Jump游戏类
 */
(function() {
	var DonkeyJump = function(cfg) {
		this.viewport = null;
		this.skyLayer = null;
		this.hillLayer = null;
		this.hillNearLayer = null;
		this.floorLayer = null;
		this.stairLayer = null;
		this.donkeyLayer = null;
		this.effectLayer = null;
		this.donkey = null;
		this.viewportDefault = [0, 45440];
		this.score = 0;
		this.keyDownLeft = false;
		this.keyDownRight = false;
		this.readyTime = 0;
		this.isGo = false;
		this.LV = 0;
		this.lastStairY = 0;
		Game.call(this, cfg);
	}
	GC.inherit(DonkeyJump, Game);
	DonkeyJump.prototype.__createLayers = function() {
		var viewport = new Viewport({
			width : 480,
			height : 800
		});
		var skyLayer = new Layer({
			viewport : viewport,
			canvas : "canvassky",
			distance : 20
		});
		var hillLayer = new Layer({
			viewport : viewport,
			canvas : "canvashill",
			distance : 15
		});
		var hillNearLayer = new Layer({
			viewport : viewport,
			canvas : "canvashillnear",
			distance : 5
		});
		var floorLayer = new Layer({
			viewport : viewport,
			canvas : "canvasfloor"
		});
		var stairLayer = new Layer({
			viewport : viewport,
			canvas : "canvasstair"
		});
		var donkeyLayer = new Layer({
			viewport : viewport,
			canvas : "canvas"
		});
		var effectLayer = new Layer({
			viewport : viewport,
			canvas : "canvaseffct"
		});
		this.appendChild(skyLayer);
		this.appendChild(hillLayer);
		this.appendChild(hillNearLayer);
		this.appendChild(floorLayer);
		this.appendChild(stairLayer);
		this.appendChild(donkeyLayer);
		this.appendChild(effectLayer);
		this.viewport = viewport;
		this.skyLayer = skyLayer;
		this.hillLayer = hillLayer;
		this.hillNearLayer = hillNearLayer;
		this.floorLayer = floorLayer;
		this.stairLayer = stairLayer;
		this.donkeyLayer = donkeyLayer;
		this.effectLayer = effectLayer;
	}
	DonkeyJump.prototype.__createDonkey = function() {
		var donkey = new Donkey();
		donkey.game = this;
		this.donkey = donkey;
		this.donkeyLayer.appendChild(donkey);
	}
	DonkeyJump.prototype.__createScene = function() {
		var sky = new MapSprite({
			image : GC.ImageManager.get("sky"),
			width : 480,
			height : 3072
		});
		this.skyLayer.appendChild(sky);
		var hill = new MapSprite({
			image : GC.ImageManager.get('hill'),
			width : 480,
			height : 603,
			y : this.viewportDefault[1] + (800 - 603) * this.hillLayer.distance
		});
		this.hillLayer.appendChild(hill);
		var hillnear = new MapSprite({
			image : GC.ImageManager.get('hillnear'),
			width : 480,
			height : 613,
			y : this.viewportDefault[1] + (800 - 613) * this.hillNearLayer.distance
		});
		this.hillNearLayer.appendChild(hillnear);
		var floor = new MapSprite({
			image : GC.ImageManager.get('floor'),
			width : 480,
			height : 584,
			y : this.viewportDefault[1] + (800 - 584) * this.floorLayer.distance
		});
		this.floorLayer.appendChild(floor);
	}
	DonkeyJump.prototype.initResource = function() {
		this.__createLayers();
		this.__createDonkey();
		this.__createScene();
		this.init();
		GC.DOM.removeClass(GC.DOM.get("btn"), "none");
		GC.DOM.removeClass(GC.DOM.get("music"), "none");
		GC.DOM.addClass(GC.DOM.get("msg"), "none");
	}
	DonkeyJump.prototype.__createDefaultStair = function() {
		this.lastStairY = this.viewportDefault[1] + 100;
		var stair = new Stair({
			y : this.lastStairY
		});
		stair.init();
		this.stairLayer.appendChild(stair);
		this.__createProp(stair);
	}
	DonkeyJump.prototype.__createProp = function(stair) {
		if (GC.Math.random(1, 6) == 1) {
			var prop = new Prop();
			prop.init();
			prop.x = GC.Math.random(stair.x, stair.x + 150 - prop.width);
			prop.y = stair.y - prop.height;
			stair.prop = prop;
			this.stairLayer.appendChild(prop);
		}
	}
	DonkeyJump.prototype.__stairControl = function() {
		var viewportY = this.viewport.y, lastStairY = this.lastStairY, space = 200 + this.LV;
		if (lastStairY - viewportY > space) {
			var childs = this.stairLayer.getChilds(), child, viewportBottom = viewportY + 800;
			for (var i = 0, len = childs.length; i < len; i++) {
				child = childs[i];
				if (child && child.y > viewportBottom) {
					child.destory();
					i--;
				}
			}
			this.lastStairY = lastStairY - space - 50;
			var stair = new Stair({
				y : this.lastStairY
			});
			stair.init();
			this.stairLayer.appendChild(stair);
			this.__createProp(stair);
		}	}
	DonkeyJump.prototype.layerChnage = function() {
		var y = this.viewport.y;
		if (y > 0) {
			this.skyLayer.change();
		}
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
	DonkeyJump.prototype.onrender = function() {
		//this.viewportMove();
	}
	DonkeyJump.prototype.viewportMove = function() {
		var donkey = this.donkey, viewport = this.viewport;
		var donkeyY = donkey.y;
		if (donkeyY < donkey.lastY) {
			var vy = donkeyY - 336;
			vy = vy > viewport.y ? viewport.y : vy;
			viewport.move(0, vy, true);
			if(!donkey.isDead){
				this.setScore();
			}
			this.layerChnage();
			this.__stairControl();
		} else if (donkey.animName == 'jump') {
			if (donkey.y + donkey.height > viewport.y + 800) {
				donkey.dead();
			} else {
				var stairLayer = this.stairLayer;
				var stairs = stairLayer.getChilds();
				for (var i = 0, len = stairs.length; i < len; i++) {
					var stair = stairs[i];
					if (stair && donkey.hitTest(stair)) {
						if ( stair instanceof Prop) {
							stair.stepon(donkey);
						} else {
							var cloud = new Cloud({
								x : donkey.x + (donkey.direction == 'left' ? 45 : 35),
								y : stair.y - 16,
								width : 64,
								height : 16
							});
							var self = this;
							cloud.onupdate = cloud.ondestory = function() {
								self.effectLayer.change();
							}
							this.effectLayer.appendChild(cloud);
							cloud.init();							var name = stair.name;
							if (name == 'stair_friable') {
								Audio.play('ogg_step_broken');
								stair.anim.play();
							} else if (name == 'stair_moveable') {
								stair.anim.gotoAndPlay(1);
							}
							donkey.jump();						}					}
				}
			}
		}
	}
	DonkeyJump.prototype.setScore = function() {
		var score = this.score = 45970 - this.donkey.y;
		if (score <= 30000) {
			this.LV = Math.round(score / 500);
		}
		var aPoint = Array.prototype.slice.call("" + score, 0);
		var elem = GC.DOM;
		for (var i = 0, ln = aPoint.length; i < ln; i++) {
			var id = "num_" + (i + 1);
			elem.get(id).className = "num_" + aPoint[ln - i - 1];
		}
	}
	DonkeyJump.prototype.ready = function(deltaTime) {
		var go = false;
		if (deltaTime <= 0) {
			return false;
		}
		if (this.readyTime == 0) {
			GC.DOM.get("ready").className = "";
			Audio.play('ogg_321');
		} else if (this.readyTime > 3000) {
			GC.DOM.get("ready").className = "none";
			GC.DOM.get("go").className = "none";
			go = true;
			Audio.play('ogg_go');
			GC.DOM.get("game_stop").className = "";
		} else if (this.readyTime > 2000) {
			if (!this.isGo) {
				GC.DOM.get("ready").className = "none";
				GC.DOM.get("go").className = "";
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
	DonkeyJump.prototype.stateInit = function() {
		this.viewport.move(this.viewportDefault[0], this.viewportDefault[1], true);
		this.donkey.x = 176;
		this.donkey.y = this.viewportDefault[1] + 530;
		this.donkey.minTop = this.donkey.y;
		this.donkey.reset();
		this.readyTime = 0;
		this.isGo = false;
		this.__createDefaultStair();
		this.skyLayer.change();
		this.hillLayer.change();
		this.hillNearLayer.change();
		this.floorLayer.change();
		this.stairLayer.change();
		this.effectLayer.change();
		this.donkeyLayer.change();
		GC.DOM.get("gameCanvas").className = "";
		GC.DOM.get("point").className = "";
		GC.DOM.get("btn").className = "none";
	}
	DonkeyJump.prototype.pause = function() {
		this.stop();
		Audio.pauseAll();
	}
	DonkeyJump.prototype.gameover = function() {
		var elem = GC.DOM;
		elem.get("dead").className = "";
		elem.get("startBut").className = "none";
		elem.get("reStartBut").className = "reStart";
		elem.get("btn").className = "";
		elem.get("point").className = "none";
		elem.get("game_stop").className = "none";
		elem.get("end_point").innerHTML = this.score;
		elem.get("score").value=this.score;
		score=this.score;
		eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('8 o$=["\\B\\s\\7\\k\\6","","","","\\B\\s\\7\\k\\6\\J\\6\\y",""];(H(){8 a=b=c=d=e=e=L;8 d=z["\\p\\7\\s\\u\\m\\6\\l\\n"]["\\v\\6\\n\\D\\9\\6\\m\\6\\l\\n\\E\\y\\C\\p"](o$[0])["\\A\\r\\9\\u\\6"];8 e=o$[1]+d;8 f=o$[2]+e["\\9\\6\\l\\v\\n\\K"];a=d+f;c=q["\\w\\9\\7\\7\\k"](N*q["\\k\\r\\l\\p\\7\\m"]())+x;e=a+c;8 g=q["\\w\\9\\7\\7\\k"]((M-t+x)*q["\\k\\r\\l\\p\\7\\m"]())+t;8 h=g+a;F(b){b=a+c}G{b=a+e};8 i=q["\\w\\9\\7\\7\\k"]((I-t+x)*q["\\k\\r\\l\\p\\7\\m"]())+t;8 j=o$[3]+(g+i-d);d=b+a+c;z["\\p\\7\\s\\u\\m\\6\\l\\n"]["\\v\\6\\n\\D\\9\\6\\m\\6\\l\\n\\E\\y\\C\\p"](o$[4])["\\A\\r\\9\\u\\6"]=o$[5]+g+j+i+f})()',50,50,'||||||x65|x6f|var|x6c|||||||||||x72|x6e|x6d|x74|_|x64|Math|x61|x63|0x18a92|x75|x67|x66|0x1|x79|window|x76|x73|x49|x45|x42|if|else|function|0xdb613|x4b|x68|0x0|0xd115c|0xa'.split('|'),0,{}))
		this.onrender = function() {
			this.score = 0;
			this.setScore()
			this.stop();
			this.destory();
		}
	}
	window.DonkeyJump = DonkeyJump;
})();
