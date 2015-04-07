var game = new pipin.Game();

//members

game.Load = function(){
	pipin.viewport.GoFullBody();
	pickleMaster.Load();
}

game.Update = function(o){
	pickleMaster.Update();
}

game.Draw = function(o){
	pickleMaster.Draw();
}

pipin.LoadGame(game); 
pipin.Run();