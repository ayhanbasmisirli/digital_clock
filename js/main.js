function ready() {


    var clock1 = new Clock('clock_element', 120);
    var clock2 = new Clock('clock_element2', -300, 'Toronto');
}


Date.prototype.updateSecond = function() {
    this.setSeconds(this.getSeconds() + 1)
};


Date.prototype.autoClock = function(isAuto){
	clearInterval(this.clockInterval)
	if (isAuto) {
		var that = this
		this.clockInterval = setInterval(function(){that.updateSecond()},1000)
	}
};

function Clock(id, offset, label) {

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

Clock.prototype.updateClock = function() {
    var date = this.d
     //date.updateSecond();
    var element = document.getElementById(this.id);
    element.innerHTML = this.zerocorrect(date.getHours()) + ":" + this.zerocorrect(date.getMinutes()) + ":" + this.zerocorrect(date.getSeconds()) + ' ' + this.label
    //console.log(this);

};

Clock.prototype.zerocorrect = function(val) {
    if (val < 10) val = "0" + val;
    return val;
};


window.onload = ready