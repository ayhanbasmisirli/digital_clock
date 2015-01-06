function ready() {


    var clock1 = new com.ankasoft.Clock ('clock_element', 120);
    var clock2 = new com.ankasoft.Clock ('clock_element2', -300, 'Toronto');
}


var com = com  || {};
com.ankasoft = com.ankasoft || {};



Date.__interval = 0;
Date.__aDates = [];
Date.addToInterval = function(date){
	this.__aDates.push(date)
	if (!Date.__interval) {
		Date.__interval = setInterval(function(){Date.updateDates()}, 1000)	
	};
}
Date.updateDates = function(){
	console.log(this.__aDates.length);
	for(var i =0 ;i<this.__aDates.length;i++)
	this.__aDates[i].updateSecond();	

}

Date.prototype.updateSecond = function() {
    //Date.addToInterval();		
    this.setSeconds(this.getSeconds() + 1)
};


Date.prototype.autoClock = function(isAuto){
	//clearInterval(this.clockInterval)
	if (isAuto) {
		// var that = this
		// this.clockInterval = setInterval(function(){that.updateSecond()},1000)
		Date.addToInterval(this)
	}
};

com.ankasoft.Clock = function (id, offset, label) {

    offset = offset || 0;
    label = label || ' ';
    var d = new Date();
    var offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
    console.log(d.autoClock(true));
    this.d = new Date(offset + d.getTime());
    this.d.autoClock(true);
    this.id = id;
    this.label = label;


    var that = this; //function inside the set interval doesnt have access the object refering so keep the object on we refer variable to 
    setInterval(function() {
        that.updateClock()
    }, 1000);
    this.updateClock();

}

com.ankasoft.Clock.prototype.updateClock = function() {
    var date = this.d
     //date.updateSecond();
    var element = document.getElementById(this.id);
    element.innerHTML = this.zerocorrect(date.getHours()) + ":" + this.zerocorrect(date.getMinutes()) + ":" + this.zerocorrect(date.getSeconds()) + ' ' + this.label
    //console.log(this);

};

com.ankasoft.Clock.prototype.zerocorrect = function(val) {
    if (val < 10) val = "0" + val;
    return val;
};


window.onload = ready