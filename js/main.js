window.onload = function() {
	var tablesSc = Snap('#tables'),
		
		styleTbls = {fill:"#000"/*, stroke: "#ccc", strokeWidth: 2*/},
		styleTblsR = {fill:"transparent", stroke: "#ccc", strokeWidth: 2},
		t1r = tablesSc.rect(0, 0, 60, 70).attr(styleTblsR),
		t1t = tablesSc.rect(10, 10, 40, 10).attr(styleTbls),
		t1b = tablesSc.rect(25, 20, 10, 40).attr(styleTbls),
		t1 = tablesSc.group(t1r, t1t, t1b).attr('id', 't_table'),
		t2r = tablesSc.rect(70, 0, 60, 70).attr(styleTblsR),
		t2t = tablesSc.rect(80, 10, 40, 10).attr(styleTbls),
		t2b = tablesSc.rect(80, 20, 10, 40).attr(styleTbls),
		t2 = tablesSc.group(t2r, t2t, t2b).attr('id', 'g_table'),
		t3r = tablesSc.rect(140, 0, 60, 70).attr(styleTblsR),
		t3t = tablesSc.rect(150, 10, 40, 10).attr(styleTbls),
		t3b = tablesSc.rect(150, 20, 10, 40).attr(styleTbls),
		t3b2 = tablesSc.rect(180, 20, 10, 40).attr(styleTbls),
		t3 = tablesSc.group(t3r, t3t, t3b).attr('id', 'p_table'),
		mainSc = Snap('#scene'),
		mT = mainSc.group(),
		mG = mainSc.group(),
		mSc = mainSc.group(),
		mBalls = mainSc.group(),
		fBlur = mainSc.filter(Snap.filter.blur(20, 30)),
		arrIcons = [],
		iconRep = [],
		svgRepo = {},
		iconNames = ['ic_move', 'ic_color_lens', 'ic_copy', 'ic_delete', 'ic_flip_black', 'ic_group_work'],
		gradients = {
			c1: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#fff-#ded1d1-#9d9797"),
			c2: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#FF99CC"),
			c3: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#CC6666"),
			c4: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#ff6375-#e30d11-#c4140e"),
			c5: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#FF6633"),
			c6: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#FFCCCC"),
			c7: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#993333"),
			c8: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#663333"),
			c9: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#ffdd7f-#ffbf0f-#fabb0d"),
			c10: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#FFCC33"),
			c11: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#33CC66"),
			c12: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#33CC99"),
			c13: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#99CC33"),
			c14: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#339933"),
			c15: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#336633"),
			c16: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#006666"),
			c17: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#339999"),
			c18: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#3399CC"),
			c19: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#336699"),
			c20: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#6699CC"),
			c21: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#9966CC"),
			c22: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#663399"),
			c23: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#333399"),
			c24: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#CC6633"),
			c25: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#663333"),
			c26: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#CCFFFF"),
			c27: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#999999"),
			c28: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#333333"),
		},
		stPX = 70,
		stPY = 640,
		colors = {
			c1: "#ffffff",
			c2: "#FF99CC",
			c3: "#CC6666",
			c4: "#c4140e",
			c5: "#FF6633",
			c6: "#FFCCCC",
			c7: "#993333",
			c8: "#663333",
			c9: "#fabb0d",
			c10: "#FFCC33",
			c11: "#33CC66",
			c12: "#33CC99",
			c13: "#99CC33",
			c14: "#339933",
			c15: "#336633",
			c16: "#006666",
			c17: "#339999",
			c18: "#3399CC",
			c19: "#336699",
			c20: "#6699CC",
			c21: "#9966CC",
			c22: "#663399",
			c23: "#333399",
			c24: "#CC6633",
			c25: "#663333",
			c26: "#CCFFFF",
			c27: "#999999",
			c28: "#333333",
		};

	var currentC = mainSc.rect(5, 620, 42, 84).attr({stroke: "#000", strokeWidth: 3, fill: colors.c4, cc: "c4"});
	
	// Snap.load('svg/icons.svg', function(f){
	// 	iconRep.push(f.select('#icon_move'));
	// 	iconRep.push(f.select('#icon_copy'));
	// 	iconRep.push(f.select('#icon_palette'));
	// 	iconRep.push(f.select('#icon_flip'));
	// 	iconRep.push(f.select('#icon_delete'));
	// 	iconRep.push(f.select('#icon_plus1'));
	// });
	// Snap.load('svg/main.svg', function(f){
	// 	svgRepo.garland = f.select('#garland');
	// 	svgRepo.t_table = f.select('#t_table');
	// 	svgRepo.screnn = f.select('#screnn');
	// 	svgRepo.ball_1 = f.select('#ball_y');
	// 	svgRepo.ball_2 = f.select('#ball_g');
	// });

	//console.log(svgRepo);

	//palette generating
	for(var key in colors){
		var pel = mainSc.circle(stPX, stPY, 20);
		pel.attr({fill: colors[key], id: key, stroke: '#000', strokeWidth: 2});
		if(key == 'c14'){
			stPX = 70;
			stPY = 682;
		}
		else
			stPX+=42;

		pel.click(function(){
			currentC.attr({fill: colors[this.attr('id')], cc: this.attr('id')});
			currentC
			.stop().animate({opacity:0.5}, 100, mina.easeinout, function(){
				this.stop().animate({opacity:1}, 100, mina.elastic);
			});
		});
	}

	//TODO onclick
	t1.click(function(){
		addTable();
	});
	//

	var sidebarB1 = document.getElementById('ball_1');
	sidebarB1.onclick=function(){
		Snap.load("svg/ball_v2.min.svg", function(f){
			mBalls.append(f).drag();
		});
	}

	var sidebarG = document.getElementById('garland-section');
	sidebarG.onclick=function(){
		Snap.load("svg/arka_new_v2.svg", function(f){
			mG.append(f).ftCreateHandles();
			if(mT) mG.insertBefore(mT);
			chColorGrl(gradients.c4, gradients.c9);
			onClickGrl();
		});
	}

	
	var sidebarSc = document.getElementById('screen-section');
	sidebarSc.onclick=function(){
		Snap.load("svg/screen.svg", function(f){
			mSc.append(f).ftCreateHandles();
			//var iconPath = mainSc.circle();
			if(mT) mSc.insertBefore(mT);
			if(mG) mSc.insertBefore(mG);
			
			/*mSc.click(function(e){
				
				//this.clone().drag();
				//iconPath.remove();
				//iconPath = mainSc.circle(e.offsetX, e.offsetY, 60)
									//.attr({fill:'transparent',stroke:'#267', strokeWidth:3});
				// var icBox = iconPath.getBBox();
				
				//removeJoystik(e);
				makeJoystik(e, this);
				
			});*/
		});
	}

	function makeJoystik(e, obj){
		var rP = 60, nIcons = 6, cAngle = 0, sAngle = 360/nIcons, x1, y1, x0 = e.offsetX, y0 = e.offsetY,
		btns = mBtn.selectAll('g');
				
		for (var i = 0; i < 6; i++) {

			x1 = x0 + rP*Math.cos(degToRad(cAngle));
			y1 = y0 + rP*Math.sin(degToRad(cAngle));
			//var point = mainSc.circle(x1, y1, 20).attr({fill:'transparent', /*filter: fBlur,*/stroke:'#267', strokeWidth:1})
			
			mainSc.append(iconRep[i]);
			iconRep[i].transform('t'+x1+','+y1 + ' ' + 's2');
			//var sI = iconRep[i].getBBox();
			//var pI = point.getBBox();
			//point.transform('t'+sI.cx-pI.cx+','+sI.cy-pI.cy);
			// iconRep[i].transform('t'+x1-sI.cx+','+y1-sI.cy);
			

			//arrIcons.push(point);
			//mainSc.group(point, btns[i]);
			cAngle += sAngle;
		}

		//copy
		iconRep[1].click(function(e){
			e.stopPropagation();
			var clone = obj.clone(),
				size = clone.getBBox();
			clone.transform('t'+size.width+20+',0');
			clone.click(function(e){
				makeJoystik(e, this);
			});
			for(var i=0; i<6; i++){
				iconRep[i].remove();
			}
		});
		//flip
		iconRep[3].click(function(e){
			e.stopPropagation();
			var clone = obj.clone(),
				size = clone.getBBox();
			clone.transform('s-1,-1 t'+size.width+20+',0');
			clone.click(function(e){
				makeJoystik(e, this);
			});
			for(var i=0; i<6; i++){
				iconRep[i].remove();
			}
		});
		//delete
		iconRep[4].click(function(e){
			e.stopPropagation();
			obj.remove();
			for(var i=0; i<6; i++){
				iconRep[i].remove();
			}
		});
	}
	
	function removeJoystik(){
		if(arrIcons.length>0){
			arrIcons.forEach(function(item, i, arr){
				item.remove();
			});
		}
	}

	function addTable(){
		Snap.load("svg/tables.svg", function(f){
			mT.append(f).ftCreateHandles();
		});
	}

	function chColorGrl(gr1, gr2) {
		var balls = mG.selectAll("#svg2 g#garland path");
		for (var i = 0, bc = balls.length; i < bc; i++) {
			if(balls[i].hasClass('oddball'))
				balls[i].attr('fill', gr1);
			else
				balls[i].attr('fill', gr2);
		}
	}

	function onClickGrl() {
		var balls = mG.selectAll("#svg2 g#garland path");
		for (var i = 0, bc = balls.length; i < bc; i++) {
			balls[i].click(function(){
				var bClass = (this.hasClass('oddball')) ? 'oddball' : 'evenball';
				var nb = mG.selectAll('#svg2 g#garland path.'+bClass);
				for (var j = 0, nbc = nb.length; j < nbc; j++) {
					nb[j].attr('fill', gradients[currentC.attr('cc')]);
				}
			});
		}
	}

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function degToRad (deg) { return deg / 180 * Math.PI; }
	function radToDeg (rad) { return rad / Math.PI * 180; }

	

}