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
		fBlur = mainSc.filter(Snap.filter.blur(20, 30)),
		iconRepo = {},
		objOrd = [],
		sClY = 40,
		area = mainSc.svg().addClass('radialnav'),
		jContainer = area.g(),
		iconNames = ['ic_move', 'ic_color_lens', 'ic_copy', 'ic_delete', 'ic_flip_black', 'ic_group_work'],
		gradients = {
			c1: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#fff-#ded1d1-#9d9797"),
			c2: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#FF99CC"),
			c3: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#CC6666"),
			c4: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#ff6375-#e30d11-#c4140e"),
			c5: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#FF6633"),
			c6: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#FFCCCC"),
			c7: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#993333"),
			c8: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#663333"),
			c9: mainSc.gradient("r(0.5, 0.5, 0.5)#fff-#ffdd7f-#ffbf0f-#fabb0d"),
			c10: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#FFCC33"),
			c11: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#33CC66"),
			c12: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#33CC99"),
			c13: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#99CC33"),
			c14: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#339933"),
			c15: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#336633"),
			c16: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#006666"),
			c17: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#339999"),
			c18: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#3399CC"),
			c19: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#336699"),
			c20: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#6699CC"),
			c21: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#9966CC"),
			c22: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#663399"),
			c23: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#333399"),
			c24: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#CC6633"),
			c25: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#663333"),
			c26: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#CCFFFF"),
			c27: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#999999"),
			c28: mainSc.gradient("r(0.5, 0.5, 0.2)#fff-#333333"),
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
	
	Snap.load('svg/icons.svg', function(f){
		// iconRepo.inBefore = f.select('#icon_insertbefore');
		// iconRepo.inAfter = f.select('#icon_insertafter');
		iconRepo.copy = f.select('#icon_copy');
		iconRepo.scale = f.select('#icon_scale');
		//iconRepo.palette = f.select('#icon_palette');
		iconRepo.flip = f.select('#icon_flip');
		iconRepo.delete = f.select('#icon_delete');
		iconRepo.jremove = f.select('#icon_jremove');
	});

	// Snap.load('svg/main.svg', function(f){
	// 	svgRepo.garland = f.select('#garland');
	// 	svgRepo.t_table = f.select('#t_table');
	// 	svgRepo.screnn = f.select('#screnn');
	// 	svgRepo.ball_1 = f.select('#ball_y');
	// 	svgRepo.ball_2 = f.select('#ball_g');
	// });

	//console.log(iconRepo);

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
			var mBalls = mainSc.group();
			mBalls.append(f).drag();
			objOrd.push(mBalls);
		});
	}

	var sidebarG = document.getElementById('garland-section');
	sidebarG.onclick=function(){
		Snap.load("svg/arka_new_v2.svg", function(f){
			var mG = mainSc.group();
			mG.append(f).drag();
			objOrd.push(mG);
			chColorGrl(gradients.c4, gradients.c9, mG);
			onClickGrl(mG);
			mG.click(function(e){
				makeJoystik(e, this);
			});
		});
	}

	var sidebarSc = document.getElementById('screen-section');
	sidebarSc.onclick=function(){
		Snap.load("svg/screen_ready.svg", function(f){
			var mSc = mainSc.group();
			mSc.append(f).drag();
			objOrd.push(mSc);
			mSc.click(function(e){
				makeJoystik(e, this);
			});
			var ribbon = mSc.selectAll("#_1563766051712 .scr_bl1, #_1563766051712 .scr_bl1_dark, #_1563766051712 .scr_bl1_light");
			for (var i = 0, rbc = ribbon.length; i < rbc; i++) {
				ribbon[i].dblclick(function(e){
					for (var j = 0; j < rbc; j++) {
						if(ribbon[j].hasClass('scr_bl1_dark'))
							ribbon[j].attr({fill: '#000', opacity: .5});
						else if(ribbon[j].hasClass('scr_bl1_light'))
							ribbon[j].attr({fill: colors[currentC.attr('cc')], opacity: .5});
						else
							ribbon[j].attr({fill: colors[currentC.attr('cc')]});
					}
					
				});
			}
			var shleif = mSc.selectAll("#_1563766051712 .scr_shleif, #_1563766051712 .scr_shleif_l, #_1563766051712 .scr_shleif_d");
			for (var i = 0, shbc = shleif.length; i < shbc; i++) {
				shleif[i].dblclick(function(e){
					for (var j = 0; j < shbc; j++) {
						if(shleif[j].hasClass('scr_shleif_d'))
							shleif[j].attr('fill', colors[currentC.attr('cc')]);
						else if(shleif[j].hasClass('scr_shleif_l'))
							shleif[j].attr({fill: colors[currentC.attr('cc')], opacity: .5});
						else
							shleif[j].attr({fill: colors[currentC.attr('cc')], opacity: .75});
					}
					
				});
			}
		});
	}

	function makeJoystik(e, obj){
		removeJoystik();
				
		var rP = 60, nIcons = 6, cAngle = 0, sAngle = 360/nIcons, x1, y1, x0 = e.offsetX, y0 = e.offsetY;
		for(var icon in iconRepo){
			x1 = x0 + rP*Math.cos(degToRad(cAngle));
			y1 = y0 + rP*Math.sin(degToRad(cAngle));
			var bCircle = mainSc.circle(x1, y1, 20).attr({fill:'#4e8ee3', /*filter: fBlur,*/stroke:'#267', strokeWidth:1})
			var btn = jContainer.g(bCircle,iconRepo[icon].transform('t'+(x1-12)+','+(y1-12))).attr('id', 'icon_'+icon);
			cAngle += sAngle;
			if(icon == 'delete'){
				btn.click(function(e){
					e.stopPropagation();
					obj.remove();
					removeJoystik();
				});
			}
			if(icon == 'copy'){
				btn.click(function(e){
					var clone = obj.clone().drag(),
						size = clone.getBBox();
					objOrd.push(clone);
					clone.transform('t'+size.width+20+','+sClY);
					clone.click(function(e){
						makeJoystik(e, this);
					});
					sClY+=40;
					removeJoystik();
				});
			}
			if(icon == 'flip'){
				btn.click(function(e){
					var size = obj.getBBox();
					obj.transform('t'+size.width+20+','+sClY).drag();
					obj.transform('s -1,1');
					obj.click(function(e){
						makeJoystik(e, this);
					});

					sClY+=40;
					removeJoystik();
				});
			}
			if(icon == 'scale'){
				btn.click(function(e){
					//function addHandleFunc() {
						var dragging = 0;
						var handleGroup;
						//var obj = obj;

						var start = function() {
					        obj.data('origTransform', obj.transform().local);
						}

						var move = function(dx,dy) {
					        var scale = 1 + dx / 50;
					        obj.attr({
					            transform: obj.data('origTransform') + (obj.data('origTransform') ? "S" : "s") + scale
					        });
						}

						var stop = function() {
							//dragging = 0;
			                mainSc.append(obj);
			                handleGroup.selectAll('handler').remove();
			                handleGroup.remove();
						};

				        if( dragging == 0 ) {
			                dragging = 1;
			                var bb = obj.getBBox();
			                var handle = new Array();
			                handle[0] = mainSc.circle(bb.x,bb.y,10).attr({class: 'handler'});;
			                handle[1] = mainSc.circle(bb.x+bb.width, bb.y, 10).attr({class: 'handler'});
			                handleGroup = mainSc.group(this, handle[0], handle[1]);
			                handleGroup.drag(move,start,stop);
				        } else {
			                dragging = 0;
			                mainSc.append(this);
			                handleGroup.selectAll('handler').remove();
			                handleGroup.remove();
				        }
					//}
					removeJoystik();
				});
			}
			if(icon == 'inBefore'){
				btn.click(function(e){
					var lOr = objOrd.length;
					if( lOr>1){
						for(var i = 0;i<lOr;i++){
							if(obj == objOrd[i]){
								if(i==lOr-1){
									return;
								}else{
									var tmpI = i+1;
									var tmp = objOrd[tmpI];
									obj.before(tmp);
									objOrd[tmpI]=obj;
									objOrd[i]=tmp;
								}
								return;
							}
						}
					}
				});
			}
			if(icon == 'inAfter'){
				btn.click(function(e){
					var lOr = objOrd.length;
					if( lOr>1){
						for(var i = 0;i<lOr;i++){
							if(obj == objOrd[i]){
								if(i==0){
									return;
								}else{
									var tmpI = i-1;
									var tmp = objOrd[tmpI];
									obj.after(tmp);
									objOrd[tmpI]=obj;
									objOrd[i]=tmp;
								}
								return;
							}
						}
					}
				});
			}
			if(icon == 'jremove'){
				btn.click(function(e){
					removeJoystik();
				});
			}
		}
		jContainer.before(obj);
		
	}
	
	function removeJoystik(){
		jContainer.clear();
	}

	function addTable(){
		Snap.load("svg/t_table.svg", function(f){
			var mT = mainSc.group();
			mT.append(f).attr('id', 'first_table').drag();
			objOrd.push(mT);
			mT.click(function(e){
				makeJoystik(e, this);
			});
			var t_cloth = mT.selectAll(".tbl-cloth-gx, .tbl-cloth-gy");
			var chairs = mT.selectAll(".chair_sp, .chair_sid");
			var rings = mT.select("#t_rings");
			// console.log(rings);
			// rings.dblclick(function(e){
			// 	e.stopPropagation();
			// 	this.attr('fill', colors[currentC.attr('cc')]);
			// });
			for (var i = 0, tcc = t_cloth.length; i < tcc; i++) {
				t_cloth[i].dblclick(function(e){
					this.attr('fill', colors[currentC.attr('cc')]);
				});
			}
			for (var i = 0, chc = chairs.length; i < chc; i++) {
				chairs[i].dblclick(function(e){
					for (var j = 0; j < chc; j++) {
						chairs[j].attr('fill', colors[currentC.attr('cc')]);
					}
				});
			}
		});
	}

	function chColorGrl(gr1, gr2, obj) {
		var balls = obj.selectAll("#svg2 g#garland path");
		for (var i = 0, bc = balls.length; i < bc; i++) {
			if(balls[i].hasClass('oddball'))
				balls[i].attr('fill', gr1);
			else
				balls[i].attr('fill', gr2);
		}
	}

	function onClickGrl(obj) {
		var balls = obj.selectAll("#svg2 g#garland path");
		for (var i = 0, bc = balls.length; i < bc; i++) {
			balls[i].dblclick(function(e){
				//e.stopPropagation();
				var bClass = (this.hasClass('oddball')) ? 'oddball' : 'evenball';
				var nb = obj.selectAll('#svg2 g#garland path.'+bClass);
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