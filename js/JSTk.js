var Joystick = function(paper, e, obj){
	this.jContainer;
	this.radius = 60;
	this.nIcons = 6;
	this.cAngle = 6;
	this.sAngle = 360/nIcons;
	this.x0 = this.event.offsetX;
	this.y0 = this.event.offsetY;
	this.iconRepo = {};
    Snap.load('svg/icons.svg', function(f){
		// this.iconRepo.inBefore = f.select('#icon_insertbefore');
		// this.iconRepo.inAfter = f.select('#icon_insertafter');
		this.iconRepo.copy = f.select('#icon_copy');
		this.iconRepo.scale = f.select('#icon_scale');
		//this.iconRepo.palette = f.select('#icon_palette');
		this.iconRepo.flip = f.select('#icon_flip');
		this.iconRepo.delete = f.select('#icon_delete');
		this.iconRepo.jremove = f.select('#icon_jremove');
	});

	this.remove = function(){
		this.jContainer.clear();
	};

	this.init = function(){
		var area = paper.svg().addClass('radialnav');
		this.jContainer = area.g();
	
			
		for(var icon in this.iconRepo){
			var x1 = this.x0 + this.rP*Math.cos(degToRad(this.cAngle));
			var y1 = this.y0 + this.rP*Math.sin(degToRad(this.cAngle));
			var bCircle = paper.circle(x1, y1, 20).attr({fill:'#4e8ee3', /*filter: fBlur,*/stroke:'#267', strokeWidth:1})
			var btn = this.jContainer.g(bCircle,this.iconRepo[icon].transform('t'+(x1-12)+','+(y1-12))).attr('id', 'icon_'+icon);
			this.cAngle += this.sAngle;

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
						Joystick(paper,e, this);
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
						Joystick(paper,e, this);
					});

					sClY+=40;
					removeJoystik();
				});
			}
			if(icon == 'inBefore'){
				btn.click(function(e){
					var lOr = objOrd.length;
					//el maybe first or last
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
					this.remove();
				});
			}
		}
	}

	//this.jContainer.before(obj);
}