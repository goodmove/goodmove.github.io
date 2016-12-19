function Repo(){
	this.objs = [];

	this.getCount = function(){
		return this.objs.length;
	}

	this.add = function(o){
		this.objs.push(o);
	}

	this.clear = function(){
		this.objs = [];
	}
}