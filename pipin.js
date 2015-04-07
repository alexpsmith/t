function TrackMouse_Move(event)
{
	pipin.mouse.x = event.pageX;
	pipin.mouse.y = event.pageY;
}
function TrackMouse_Down(event)
{
	pipin.mouse.down = true;
	pipin.mouse.up = false;
}
function TrackMouse_Up(event)
{
	pipin.mouse.down = false;
	pipin.mouse.up = true;
}
function Track_Scroll(event)
{
	pipin.mouse.wheelDelta = event.wheelDelta;
}
var pipin = {
	//members
	time: null,
	deltaTime: null,
	fps: 0,
	ActiveGame: null,
	Textures: [],
	TextureMap: [],
	Sounds: [],
	SoundMap: [],
	loading: false,
	canvas: document.getElementsByTagName("canvas")[0].getContext("2d"),
	viewport: {
		x: 0,
		y: 0,
		width: document.getElementsByTagName("canvas")[0].width, 
		height: document.getElementsByTagName("canvas")[0].height,
		SetOrientation: function(x, y){
			pipin.viewport.x = x;
			pipin.viewport.y = y;
			pipin.canvas.translate(x,y);
		},
		SetDimensions: function(width, height){
			pipin.viewport.width = width;
			pipin.viewport.height = height;

			document.getElementsByTagName("canvas")[0].width = width;
			document.getElementsByTagName("canvas")[0].height = height;
		},
		GoFullBody: function(){
			var width = document.body.clientWidth;
			var height = document.body.clientHeight;
			pipin.viewport.SetDimensions(width,height);
		}
	},
	mouse: {
		x:0, 
		y:0,
		wheelDelta: 0,
		visible: true,
		SetVisibility: function(visible){
			pipin.mouse.visible = visible;
			if (visible){
				document.getElementsByTagName("canvas")[0].style.cursor = "default";
			}else{
				document.getElementsByTagName("canvas")[0].style.cursor = "none";
			}
		}
	},
	//special inits
	mouse_init: document.getElementsByTagName("canvas")[0].addEventListener('mousemove', TrackMouse_Move, false),
	mouse__init: document.getElementsByTagName("canvas")[0].addEventListener('mousedown', TrackMouse_Down, false),
	mouse___init: document.getElementsByTagName("canvas")[0].addEventListener('mouseup', TrackMouse_Up, false),
	mouse____init: document.getElementsByTagName("canvas")[0].addEventListener('mousewheel', Track_Scroll, false),
	//functions
	Run: function(Game){

		window.requestAnimationFrame(function(timestamp){
			pipin.ActiveGame.Run(timestamp, pipin.ActiveGame);
		});

		//A "game" has a update and draw loop inside a function
		//called "Run"
	},
	Loop: function(timestamp){
		if (!pipin.time){ pipin.time = timestamp;}
		pipin.deltaTime = (timestamp - pipin.time)/1000;
		pipin.time = timestamp;
		window.requestAnimationFrame(function(timestamp){
			pipin.ActiveGame.Run(timestamp, pipin.ActiveGame);
		});
	},
	Game: function(){
		this.engine = pipin;
		this.Load = function(){
			//place to load all textures, etc.
		};
		this.Update = function(o){

		};
		this.Draw = function(o){

		};
		this.Run = function(timestamp, o){
			if (!pipin.loading){
				pipin.canvas.clearRect(pipin.viewport.x,pipin.viewport.y,pipin.viewport.width,pipin.viewport.height)
				o.Draw(o);
				o.Update(o); 
			}
			o.engine.Loop(timestamp);
		}; 
	},

	LoadGame: function(Game){
		pipin.ActiveGame = Game;
		Game.engine = pipin;
		Game.Load();
	},

	LoadTexture: function(textureData){
		pipin.loading = true;
		var image = new Image();
		image.src = textureData.path;
		image.onload = function(){

			var displayWidth = textureData.scale ? image.width * textureData.width : textureData.width;
			var displayHeight = textureData.scale ? image.height * textureData.height : textureData.height;

			pipin.Textures.push({
				id: textureData.id,
				path: textureData.path,
				texture: image,
				actualWidth: image.width,
				actualHeight: image.height,
				width: displayWidth,
				height: displayHeight
			});
			pipin.TextureMap[textureData.id] = pipin.Textures.length - 1;
			pipin.loading = false;
		}
	},

	GetTexture: function(id){
		return pipin.Textures[pipin.TextureMap[id]];
	},

	LoadSound: function(soundData){
		pipin.loading = true;
		var audio = new Audio();
		audio.src = soundData.path;
		audio.onload = function(){
			pipin.Sounds.push({
				id: soundData.id,
				path: soundData.path,
				sound: audio
			});
			pipin.SoundMap[soundData.id] = pipin.Sounds.length - 1;
			pipin.loading = false;	
		}
	},

	GetSound: function(id){
		return pipin.Sounds[pipin.SoundMap[id]];
	},

	//Drawing
	Draw: function(texture, params){
		pipin.canvas.save();

		var x = params.rectangle.x;
		var y = params.rectangle.y;
		var rotation = params.rotation ? params.rotation: 0;
		pipin.canvas.globalAlpha = params.alpha ? params.alpha : pipin.canvas.globalAlpha;
		pipin.canvas.translate(x + texture.width / 2, y + texture.height / 2);
		pipin.canvas.rotate(rotation);
		pipin.canvas.drawImage(texture.texture, -texture.width/2, -texture.height/2, texture.width, texture.height);

		pipin.canvas.restore();
	},
	Write: function(text, params){
		pipin.canvas.save();

		var x = params.rectangle.x;
		var y = params.rectangle.y;
		pipin.canvas.font = params.size + " " + params.font;
		pipin.canvas.fillStyle = params.color;
		pipin.canvas.fillText(text, x, y);

		pipin.canvas.restore();
	},
	Touches: function(o1, o2, touch){
		var x = (o1.rectangle.x - o2.rectangle.x);
		x = x * x;

		var y = (o1.rectangle.y - o2.rectangle.y);
		y = y * y;

		var dist = Math.sqrt(x + y);
		if (dist <= touch){
			return true;
		}return false;
	}
}
/*
var samp = new pipin.Game();

samp.Load = function(){
	pipin.LoadTexture({
		path: "beautyandnerd.png",
		scale: true,
		width: 0.5,
		height: 0.5,
		id: "bn"
	});
}
samp.rot = 0;
samp.alpha = 0;

samp.Update = function(o){
	var fps = 1000000 / pipin.deltaTime;
	pipin.fps = fps;
	o.rot += 0.01;
	o.alpha = Math.sin(o.rot);
}
samp.Draw = function(o){
	pipin.Draw(pipin.GetTexture("bn"), {
		alpha: o.alpha,
		rotation: o.rot,
		rectangle: {x:200, y:200},
	});
}
pipin.LoadGame(samp); 
pipin.Run();
*/
