function Palette(paper, colors){
	var sY = window.innerHeight - 104;
	this.currentC = paper.rect(0, sY, 42, 84).attr({stroke: "#000", strokeWidth: 3, fill: colors.c4, cc: "c4"});
	this.cc = colors.c4;
	this.gk = 'c4';

	this.init = function(){
		var _this = this, stPX = 70, stPY = sY + 20;
		for(var key in colors){
			var pel = paper.circle(stPX, stPY, 20);
			pel.attr({fill: colors[key], id: key, stroke: '#000', strokeWidth: 2});
			if(key == 'c14'){
				stPX = 70;
				stPY = sY + 62;
			}
			else
				stPX+=42;

			pel.click(function(){
				_this.setCurrentColor(colors[this.attr('id')]);
				_this.setGradientKey(this.attr('id'));
				
				_this.currentC.attr({fill: colors[this.attr('id')], cc: this.attr('id')});
				_this.currentC
				.stop().animate({opacity:0.5}, 100, mina.easeinout, function(){
					this.stop().animate({opacity:1}, 100, mina.elastic);
				});
			});
		}
	}

	this.getCurrentColor = function(){
		return this.cc;
	}

	this.getGradientKey = function(){
		return this.gk;
	}

	this.setGradientKey = function(gk){
		this.gk = gk;
	}

	this.setCurrentColor = function(c){
		this.cc = c;
	};
}