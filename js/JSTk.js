var Joystick = function(paper, event, obj, icons){
	this.jContainer;
	this.area;
	this.radius = 60;
	this.nIcons = 6;
	this.cAngle = 6;
	this.sAngle = 360/this.nIcons;
	this.x0 = event.offsetX;
	this.y0 = event.offsetY;
	this.iconRepo = icons;

   	this.destroy = function(){
		var jtks = paper.selectAll('svg.radialnav');
		if(jtks.length>0){
			for (var i = 0, hm = jtks.length; i < hm; i++) {
				jtks[i].remove();
			}
			//this.area.remove();
		}
	};

	this.init = function(){

		var _this = this;
		_this.destroy();
		this.area = paper.svg().addClass('radialnav');
		this.jContainer = this.area.g();
	
			
		for(var icon in this.iconRepo){
			//if(icon.node.hasClass('background')) return false;
			var x1 = this.x0 + this.radius*Math.cos(this.cAngle/180 * Math.PI),
				y1 = this.y0 + this.radius*Math.sin(this.cAngle/180 * Math.PI),
				//TODO add fon in sprite
				bCircle = this.area.circle(x1, y1, 20).attr({fill:'#4e8ee3', stroke:'#267', strokeWidth:1}).addClass('background'),
				//backgr = this.iconRepo['back'].clone().transform('t'+(x1-10)+','+(y1-10)),
				btn = this.jContainer.g(bCircle,this.iconRepo[icon].transform('t'+(x1-12)+','+(y1-12))).attr('id', 'icon_'+icon);
			this.cAngle += this.sAngle;

			if(icon == 'delete'){
				btn.click(function(e){
					e.stopPropagation();
					obj.remove();
					_this.destroy();
				});
			}
			if(icon == 'copy'){
				btn.click(function(e){
					var clone = obj.clone().drag(),
						size = clone.getBBox();
					objOrd.push(clone);
					clone.transform('t '+10+','+10);
					clone.click(function(e){
						new Joystick(paper, e, this, icons).init();
					});
					_this.destroy();
				});
			}
			if(icon == 'flip'){
				btn.click(function(e){
					var size = obj.getBBox();
					obj.transform('t'+size.width+20+','+10).drag();
					obj.transform('s -1,1');
					obj.click(function(e){
						new Joystick(paper, e, this, icons).init();
					});
					_this.destroy();
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
					_this.destroy();
				});
			}
		}
	}

	//this.jContainer.before(obj);
}