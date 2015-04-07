var game = new pipin.Game();
game.time = 0;
game.translate = {
	x: 0,
	y:0
};
//members

game.Load = function(){
	pipin.viewport.GoFullBody();
}

game.Update = function(o){
	game.time += pipin.deltaTime;
	pipin.viewport.SetOrientation(pipin.viewport.x, pipin.viewport.y + game.translate.y);
	var mouse = pipin.mouse;
	if (mouse.y >= (pipin.viewport.y + pipin.viewport.height)){
		
	}
}

game.Draw = function(o){
	timeString = String(o.time);
	var minutes = String(Math.floor(o.time / 60));
	var seconds = String(parseInt(timeString.split('.')[0]) - (60 * Math.floor(o.time / 60)));
	var decimals = timeString.split('.')[1];
	if (!decimals){
		decimals = "0000";
	}
	decimals = decimals.slice(0,2);
	pipin.Write("Time: " + minutes + ":" + seconds + ":" + decimals, {
		rectangle: {x:200,y:200},
		font: "Impact",
		color: "red",
		size: "200px"
	});
	pipin.Write("Time: " + minutes + ":" + seconds + ":" + decimals, {
		rectangle: {x:205,y:200},
		font: "Impact",
		color: "black",
		size: "200px"
	});
	pipin.Write("Time: " + minutes + ":" + seconds + ":" + decimals, {
		rectangle: {x:210,y:200},
		font: "Impact",
		color: "blue",
		size: "200px"
	});
}

pipin.LoadGame(game); 
pipin.Run();