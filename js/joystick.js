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