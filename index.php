<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta charset="UTF-8" />
		<title>HTML5版驴子跳(Donkey Jump) - HTML5游戏 - 仅供学习之用！</title>
		<meta name="description" content="这是一个基于HTML5 Canvas和Audio开发的游戏" />
		<meta name="keywords"
		content="Web前端, 前端开发, JavaScript, HTML, Canvas, Audio, HTML5画布, HTML5游戏, HTML5版驴子跳(Donkey Jump)" />
		<link type="text/css" rel="stylesheet" href="css/main.css" />
	</head>
	<body>

		<div id="panelBg" class="panelBg none"></div>
		<div id="submitPanel" class="submitPanel modlePanel none">
			<div class="T_T">
				<p>
					提交分数
				</p>
			</div>
			<div class="T_C">
				<form action="index.php" method="post">
					<input type="hidden" name="score"
					value="" id="score">
					<input type="hidden" name="scoreKey"
					value="" id="scoreKey">
					<p>
						姓名：
					</p>
					<input id="userName" type="text" name="userName" />
					<br />
					<input value="提交" name="sub" type="submit" />
					<input value="关闭"
					type="button" onclick="hiddModlePanel('submitPanel')" />
				</form>
			</div>
		</div>
		<div id="donkeyJump">
			<!-- 游戏主体 -->
			<div class="WF">
				<h3>游戏玩法</h3>
				<p>
					1、当游戏开后，驴子会自动的往上跳。
				</p>
				<p>
					2、你只要用键盘的<span class="red fb">左右键</span>来控制驴子的左右移动即可。
				</p>
				<p>
					3、当驴子掉下来的时候需要踩住云才能在往上跳。
				</p>
				<p>
					4、你只能往前冲，没有回头路！
				</p>
			</div>
			<div id="Top10" class="submitPanel modlePanel none">
				<div class="T_T">
					<p>
						得分排行榜
					</p>
				</div>
				<div class="T_C" id="T_C"></div>
				<div class="tc">
					<input value="关闭" type="button"
					onclick="hiddModlePanel('Top10')" />
				</div>
			</div>
			<div id="gameBody" class="block">
				<div id="gameCanvas" class="fbg">
					<canvas width="480" height="800"
					id="canvassky"></canvas>
					<canvas width="480" height="800"
					id="canvashill"></canvas>
					<canvas width="480" height="800"
					id="canvashillnear"></canvas>
					<canvas width="480" height="800"
					id="canvasfloor"></canvas>
					<canvas width="480" height="800"
					id="canvasstair"></canvas>
					<canvas width="480" height="800"
					id="canvasprops"></canvas>
					<canvas width="480" height="800" id="canvas"></canvas>
					<canvas width="480" height="800" id="canvaseffct">
						<div class="ont_sp_canvas">
							<p>
								您使用的浏览器不支持HTML5技术，请使用Google Chrome或Mozilla Firefox。
							</p>
							<p>
								您也可以使用其它扶持HTML5的浏览器。建议使用Google Chrome浏览器！
							</p>
						</div>
					</canvas>
					<div id="ready" class="none">
						<span class="none">准备</span>
					</div>
					<div id="go" class="none">
						<span class="none">开始</span>
					</div>
					<div id="point" class="none">
						<span id="num_6" class="num_0"></span><span
						id="num_5" class="num_0"></span><span id="num_4" class="num_0"></span>
						<span id="num_3" class="num_0"></span><span id="num_2" class="num_0"></span>
						<span id="num_1" class="num_0"></span>
					</div>
					<div id="dead" class="none">
						<div class="point">
							<p>
								游戏玩家
							</p>
							<p id="end_point">
								得分情况
							</p>
						</div>
						<div id="submitPoint" class="btn">
							提交分数
						</div>
					</div>
					<div id="btn" class="btnArea none">
						<div class="ranking" id="ranking">
							<span class="none">排行榜</span>
						</div>
						<div id="startBut" class="reStart">
							<span class="none">开始游戏</span>
						</div>
						<div id="reStartBut" class="none">
							<span class="none">重新开始</span>
						</div>
						<div class="more">
							<span class="none">更多</span>
						</div>
					</div>
					<div id="music" class="music_on none">
						<span class="none">音乐开关</span>
					</div>
					<div id="game_stop" class="none">
						<span class="none">游戏暂停</span>
					</div>
					<div id="game_start" class="none">
						<div id="go_on">
							<span class="none">游戏开始</span>
						</div>
					</div>
					<div id="msg" class="loadState">
						游戏加载....
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="util/util.js"></script>
		<script type="text/javascript" src="core/Game.js"></script>
		<script type="text/javascript" src="core/Layer.js"></script>
		<script type="text/javascript" src="core/Viewport.js"></script>
		<script type="text/javascript" src="core/Sprite.js"></script>
		<script type="text/javascript" src="core/MapSprite.js"></script>
		<script type="text/javascript" src="core/Animation.js"></script>
		<script type="text/javascript" src="tools/buzz.js"></script>
		<script type="text/javascript" src="util/KeyEvent.js"></script>
		<script type="text/javascript" src="util/Audio.js"></script>
		<script type="text/javascript" src="db/frames.js"></script>
		<script type="text/javascript" src="db/db.js"></script>

		<script type="text/javascript" src="js/Stair.js"></script>
		<script type="text/javascript" src="js/DonkeyJump.js"></script>
		<script type="text/javascript" src="js/Cloud.js"></script>
		<script type="text/javascript" src="js/Donkey.js"></script>
		<script type="text/javascript" src="js/Prop.js"></script>
		<script type="text/javascript" src="js/Main.js"></script>

		<script type="text/javascript" src="webStorage/storage.js"></script>

</html>
