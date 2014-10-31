var Grid = {
	square: drawing.LoadImage("images/grid.png"),
	mx: 1000,
	my: 1000,

	dimension: 50,

	Draw: function(){
		var period = Grid.mx / Grid.dimension;
		var y = 0;
		var x = 0;
		for (var i = 0; i < period; i++){
			drawing.DrawImage(Grid.square, x * Grid.dimension, 0);
			
			for (var j = 1; j < period; j++){
				drawing.DrawImage(Grid.square, x * Grid.dimension, j * Grid.dimension);
			}
			x++;
		}
	},
	Update: function(){

	}
}




var Game = {
	tank1: Tank(),
	Initialize: function(){
		//drawing.canvasContext.webkitRequestFullScreen();
		document.getElementById("canvas").onclick = function(){
			drawing.FullScreen(document.getElementById("canvas"), true);
		}
		Game.tank1.LoadTextures();
	},
	Update: function(){
		//drawing.bindUpdate(Game.tank1.Update);
		drawing.update();
	},
	Draw: function(){
		//drawing.bindDraw(Game.tank1.Draw)
		drawing.bindDraw(Grid.Draw);
		drawing.draw();
	}
}

Game.Initialize();
Game.Update();
Game.Draw();

