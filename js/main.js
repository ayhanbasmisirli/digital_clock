function ready() {


    var clock1 = new com.ankasoft.AlarmClock ('clock_element', -300);
    var clock2 = new com.ankasoft.TextClock ('clock_element2', -300, 'Toronto');
    var clock3  = new com.ankasoft.Clock('clock_element3',-300)
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
    element.innerHTML = this.formatDisplay(date.getHours(),date.getMinutes(),date.getSeconds(),this.label);
    //console.log(this);

};
com.ankasoft.Clock.prototype.formatDisplay =function(h,m,s,label){

	return this.zerocorrect(h) + ":" + this.zerocorrect(m) + ":" + this.zerocorrect(s) + ' ' + label;
}

com.ankasoft.Clock.prototype.zerocorrect = function(val) {
    if (val < 10) val = "0" + val;
    return val;
};

com.ankasoft.TextClock = function(id, offset, label){
	com.ankasoft.Clock.apply(this,arguments)
}
com.ankasoft.TextClock.prototype = createObject(com.ankasoft.Clock.prototype);
com.ankasoft.TextClock.prototype.constructor = com.ankasoft.TextClock;


com.ankasoft.TextClock.prototype.formatDisplay =function(h,m,s,label){

	return this.zerocorrect(h) + ":" + this.zerocorrect(m) + ":" + this.zerocorrect(s) + ':' + label;
}






com.ankasoft.AlarmClock = function(id, offset, label,alarmHour,alarmMin){
    com.ankasoft.Clock.apply(this,arguments)
    this.alarmHour = alarmHour;
    this.alarmMin = alarmMin;
}
com.ankasoft.AlarmClock.prototype = createObject(com.ankasoft.Clock.prototype,com.ankasoft.AlarmClock);

com.ankasoft.AlarmClock.prototype.formatDisplay =function(h,m,s,label){
    var output;
    if (h == this.alarmHour && m == this.alarmMin ) {
        output = "Alarm Wake up";
        var snd = new Audio("beep.mp3");
        snd.play()

    }else{
         output = this.zerocorrect(h) + "-" + this.zerocorrect(m) + "-" + this.zerocorrect(s) 
    }
       
    return output ;


}




function createObject(proto){
    function c(){}
    c.prototype = proto
    return new c();
}


window.onload = ready