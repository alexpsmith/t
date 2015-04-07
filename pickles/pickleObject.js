pickleMaster = {
	pickles: [],
	startXBuffer: pipin.viewport.width,
	startYBuffer: 100,
	xMove: 50,
	genAmount: 30,
	waves: 0,
	Load: function(){
		pipin.LoadTexture({
			path: "pickles/pickle0.png",
			id: "pickle0",
			scale: true,
			width: 0.5,
			height: 0.5
		});
		pickleMaster.GeneratePickles();
	},
	Update: function(){
		pickleMaster.MovePickles();
		pickleMaster.CheckPickleIntersectionWithEachOther();
		pickleMaster.KeepPopulatingPickles();
		pickleMaster.KeepPicklesInBoundaries();
	},
	Draw: function(){
		pickleMaster.DrawPickles();
	},



	KeepPopulatingPickles: function(){
		var noMorePickles = true;
		for (var i = pickleMaster.pickles.length - 1; i >= 0; i--) {
			if (pickleMaster.pickles[i].rectangle.x >= 300){
				noMorePickles = false;
			}
		}
		if (noMorePickles){
			pickleMaster.GeneratePickles();
			pickleMaster.waves++;
		}
	},
	MovePickles: function(){
		var pickles = pickleMaster.pickles;
		for (var i = pickles.length - 1; i >= 0; i--){
			pickles[i].rectangle.x -= (pickleMaster.xMove * pipin.deltaTime);
			pickles[i].rectangle.y += (pickles[i].yMove * pipin.deltaTime);	
		}
	},
	DrawPickles: function(){
		var pickles = pickleMaster.pickles;
		for (var i = pickles.length - 1; i >= 0; i--){
			var texture = pipin.GetTexture("pickle" + pickles[i].imageId);
			pickles[i].rotation += (pipin.deltaTime * pickles[i].spin);
			pipin.Draw(texture, {
				rectangle: pickles[i].rectangle,
				rotation: pickles[i].rotation
			});
		}
	},
	GeneratePickles: function(){
		for (var i = 0; i < pickleMaster.genAmount; i++){
			var x = pickleMaster.startXBuffer + (1000 * Math.random());
			var y = pickleMaster.startYBuffer + (500 * Math.random());
			var spin = 2 + (Math.PI * Math.random());
			var yMoveSwitch = Math.random();
			if (yMoveSwitch >= 0.5){
				yMoveSwitch = -1;
			}else{
				yMoveSwitch = 1;
			}

			var yMove = yMoveSwitch * (10 + (Math.random() * 30));
			if (Math.random() < 0.2){
				yMove = 0;
			}
			var pickleImageIndex = 0; //just one for now
			pickleMaster.pickles.push({
				rectangle: {x:x,y:y},
				imageId: pickleImageIndex,
				spin: spin * -1,
				rotation: 0,
				yMove: yMove
			});
		}
	},

	CheckPickleIntersectionWithEachOther: function(){
		var pickles = pickleMaster.pickles;
		for (var i = pickles.length - 1; i >= 0; i--){
			var pickle1 = pickles[i];
			for (var j = pickles.length - 1; j >= 0; j--){
				if (i != j){
					pickle2 = pickles[j]
					if (pipin.Touches(pickle1, pickle2, 50)){
						pickle1.yMove *= -1;
						//pickle2.rectangle.y += (1) * (pickle1.yMove * -1);
						pickle2.yMove = -1 * pickle1.yMove;
					}
				}
			}
		}
	},

	KeepPicklesInBoundaries: function(){
		var pickles = pickleMaster.pickles;
		for (var i = pickles.length - 1; i >= 0; i--) {
			if (pickles[i].rectangle.y >= pipin.viewport.height || pickles[i].rectangle.y <= 0){
				pickles[i].yMove *= -1;
			}
		};
	}
}