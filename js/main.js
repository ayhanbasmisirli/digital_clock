function ready (){
	
	
	var clock1 = new Clock('clock_element',120);
	var clock2 = new Clock('clock_element2',-300,'Toronto');
	
	
	


}

function Clock(id,offset,label){
       	
       	offset = offset || 0;
       	label = label || ' ';
       	var  d  = new Date();
 	this.offset = (offset+d.getTimezoneOffset())*60*1000;
 	this.updateClock = function(){
 		var date = new Date()
 		date = new Date(this.offset+date.getTime());
		var element = document.getElementById(id);
		element.innerHTML =  this.zerocorrect(date.getHours())+":"+this.zerocorrect(date.getMinutes())+":"+this.zerocorrect(date.getSeconds())+' '+label
		//console.log(this);
		
 	};

 	this.zerocorrect =function(val){
 		if(val<10) val = "0"+val;
		return val;
	};
 	
 	var that = this; //function inside the set interval doesnt have access the object refering so keep the object on we refer variable to 
 	setInterval(function(){that.updateClock()}, 1000);
 	this.updateClock();
 	
}


window.onload = ready