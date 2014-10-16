Game = {
	tank1: Tank(),
	Initialize: function(){
		Game.tank1.LoadTextures();
	},
	Update: function(){
		drawing.bindUpdate(Game.tank1.Update);
		drawing.update();
	},
	Draw: function(){
		drawing.bindDraw(Game.tank1.Draw)
		drawing.draw();
	}
}

Game.Initialize();
Game.Update();
Game.Draw();