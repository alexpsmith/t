function Tank(){
	t = {
		bodyRot: 0,
		moveTrans:{
			tr: Math.PI / 4,
			tl: (3 * Math.PI) / 4,
			bl: (5 * Math.PI) / 4,
			br: (7 * Math.PI) / 4
		},
		keys: {s:false,w:false,a:false,d:false},
		topTrans : {x:50,y:35, rot:0},
		speed: 2,
		textures: [],
		baseRectangle: new Rectangle(400,400,100,100),

		LoadTextures: function(){
			t.textures["back"] = drawing.LoadImage("images/tanks/basic/final/body.png");
			t.textures["top"] = drawing.LoadImage("images/tanks/basic/final/top.png");
		},

		Draw: function(){
			drawing.ExactDraw(t.textures["back"], t.baseRectangle.x, t.baseRectangle.y, t.bodyRot, 1);
			drawing.ExactDraw(t.textures["top"], t.baseRectangle.x + t.topTrans.x, t.baseRectangle.y + t.topTrans.y, t.topTrans.rot, 1, 3);
		},
		Update: function(){
			t.getRotation();
			t.rotateBody();
			if (drawing.keys['s'].down){
				t.baseRectangle.y += t.speed;
				t.keys.s = true;
			}
			else{
				t.keys.s = false;
			}
			if (drawing.keys['w'].down){
				t.baseRectangle.y -= t.speed;
				t.keys.w = true;
			}
			else{
				t.keys.w = false;
			}	
			if (drawing.keys['a'].down){
				t.baseRectangle.x -= t.speed;
				t.keys.a = true;
			}
			else{
				t.keys.a = false;
			}
			if (drawing.keys['d'].down){
				t.baseRectangle.x += t.speed;
				t.keys.d = true;
			}
			else{
				t.keys.d = false;
			}
		},
		getRotation: function(){
			r = new Rectangle(t.baseRectangle.x + t.topTrans.x, t.baseRectangle.y + t.topTrans.y, 50, 50);
			var res = (drawing.mouse.y - r.y) / (drawing.mouse.x - r.x);
			t.topTrans.rot = Math.atan2(drawing.mouse.y - r.y, drawing.mouse.x - r.x);
		},
		rotateBody: function(){
			console.log(t.keys);
			var k = t.keys;

			if (k.w && k.d){
				t.bodyRot = t.moveTrans.tr;
				t.topTrans = {x:0,y:0, rot:t.topTrans.rot}
			}else if(k.w && k.a){
				t.bodyRot = t.moveTrans.tl;
				t.topTrans = {x:0,y:0, rot:t.topTrans.rot}
			}else if(k.s && k.d){
				t.bodyRot = t.moveTrans.br;
				t.topTrans = {x:0,y:0, rot:t.topTrans.rot}
			}else if(k.s && k.a){
				t.bodyRot = t.moveTrans.bl;
				t.topTrans = {x:0,y:0, rot:t.topTrans.rot}
			}
			else{
				t.bodyRot = 0;
				t.topTrans = {x:50,y:35, rot:t.topTrans.rot}
			}
		}
	}

	return t;
}