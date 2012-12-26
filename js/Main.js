(function() {
	var imageResources = GC.getImageRes();
	GC.ImageManager.load(imageResources, loadImageResources);
	function loadImageResources(number) {
		GC.DOM.get('msg').innerHTML = '正在加载图片...(' + ~~ (number / imageResources.length * 100) + '%)';
		if (number >= (imageResources.length)) {
			GC.DOM.get('msg').innerHTML = '图片加载完成';
			if (!buzz.isOGGSupported() && !buzz.isMP3Supported()) {
				init();
			} else {
				loadAudioResources();
			}
		}
	}
	function loadAudioResources(number) {
		var res = getAudioRes(),
		len = res.length;
		var group = [],
		item,
		a;
		for (var i = 0; i < len; i++) {
			item = res[i];
			a = new buzz.sound(item.src, {
				formats: ['ogg', 'mp3'],
				preload: true,
				autoload: true,
				loop: !!item.loop
			});
			group.push(a);
			Audio.list[item.id] = a;
		}
		var buzzGroup = new buzz.group(group);
		var number = 1;
		buzzGroup.bind('loadeddata',
		function(e) {
			GC.DOM.get('msg').innerHTML = '正在加载音乐...(' + ~~ (number / len * 100) + '%)';
			if (number >= len) {
				init();
			} else {
				number++;
			}
		});
	}
	function init() {
		Audio.play('ogg_background');
		donkeyJump = new DonkeyJump({
			instance : "donkeyJump",
			FPS : 60
		});
		donkeyJump.initResource();
		donkeyJump.onstop = function() {
			GC.KeyEvent.removeListener();
		}
		donkeyJump.onstart = function() {
			GC.KeyEvent.addListener();
		}
		donkeyJump.onupdate = function() {
			if (GC.KeyEvent.check('VK_LEFT') || GC.KeyEvent.check('A')) {
				donkeyJump.keyDownLeft = true;
			} else {
				donkeyJump.keyDownLeft = false;
			}
			if (GC.KeyEvent.check('VK_RIGHT') || GC.KeyEvent.check('D')) {
				donkeyJump.keyDownRight = true;
			} else {
				donkeyJump.keyDownRight = false;
			}
			donkeyJump.stairLayer.change();
			donkeyJump.viewportMove();
		}
		GC.DOM.get("startBut").onclick = function() {
			GC.DOM.get("gameCanvas").className = "";
			GC.DOM.get("point").className = "";
			GC.DOM.get("btn").className = "none";
			donkeyJump.stateInit();
			donkeyJump.start();
		};
		GC.DOM.get("music").onclick = function() {
			var __m = GC.DOM.get("music");
			if (GC.DOM.hasClass(__m, "music_on")) {
				Audio.mute = true;
				Audio.pauseAll();
				__m.className = "music_off";
			} else {
				Audio.mute = false;
				Audio.play('ogg_background', true);
				__m.className = "music_on";
			}
		};
		GC.DOM.get("game_stop").onclick = function() {
			GC.DOM.get("game_stop").className = "none";
			GC.DOM.get("game_start").className = "";
			donkeyJump.pause();
			Audio.pauseAll();
		};
		GC.DOM.get("game_start").onclick = function() {
			GC.DOM.get("game_stop").className = "";
			GC.DOM.get("game_start").className = "none";
			donkeyJump.start();
			Audio.play('ogg_background', true);
		};
		GC.DOM.get("reStartBut").onclick = function() {
			var elem = GC.DOM;
			elem.get("num_1").className = "num_0";
			elem.get("num_2").className = "num_0";
			elem.get("num_3").className = "num_0";
			elem.get("num_4").className = "num_0";
			elem.get("num_5").className = "num_0";
			elem.get("num_6").className = "num_0";
			GC.DOM.get("dead").className = "none";
			init();
			GC.DOM.get("startBut").click();
		};
		GC.DOM.get("submitPoint").onclick = function() {
			showModlePanel("submitPanel", 300, 200);
		};
	/*
		GC.DOM.get("submitBtn").onclick = function() {
			hiddModlePanel("submitPanel");
			var userName = GC.DOM.get("userName").value;
			Storage.set(userName, score, 2);
		};*/
		GC.DOM.get("ranking").onclick = function() {
			showModlePanel("Top10", 400, 280);
		};
	}
})();