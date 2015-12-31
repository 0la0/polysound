import generateUniqueId from './uniqueGenerator.js';
/*
http://oreilly.com/digitalmedia/2006/06/29/secrets-of-the-arpeggiator.html
For example, let's suppose you've programmed a four-step pattern with note transpositions of 0, 2, 5, and –2. If you hold only one key on the keyboard, such as a D, the pattern will produce the series D-E-G-C. But when you hold a D minor triad (D, F, A), the arpeggiator will apply a different transposition to each note in the arpeggio. This table shows the result:
*/


export default class Synth {

  constructor (audioContext) {
    this.audioContext = audioContext;

    this.semitoneRatio = Math.pow(2, 1/12);
  	this.baseFreq = 440;
    this.uniqueId = generateUniqueId();
  }

  // play (frequency, startTime, duration) {
  //   var osc = this.audioContext.createOscillator();
  //   osc.connect(this.audioContext.destination);
  //
  //   osc.frequency.value = frequency;
  //   osc.start(startTime);
  //   osc.stop(startTime + duration);
  // }

  play (note, startTime, duration) {
    var osc = this.audioContext.createOscillator();
    osc.connect(this.audioContext.destination);

    var frequency = this.baseFreq * Math.pow(this.semitoneRatio, note);
    osc.type = 'sine'; //sine, square, sawtooth, triangle
    osc.frequency.value = frequency;
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

}

/*
function Synth(context, output){
	this.context = context;
	this.output = output;
	this.oscillator = null;
	this.arpIsOn = false;
	this.arpPos = 0;
	this.arpSeq = [0, 2 , 5, -2];
	this.semitoneRatio = Math.pow(2, 1/12);
	this.baseFreq = 440;
	this.obj = this;
}

Synth.prototype.setType = function(type){
	// sin : 0, squ : 1, saw : 2, tri : 3
	if (type < 0 || type > 3){
		console.warn('type outOfBounds error');
		return;
	}
	this.oscillator.type = type;
}

Synth.prototype.setFreq = function(freq){
	this.oscillator.frequency.value = freq;
}

Synth.prototype.play = function(freq, type){
	this.oscillator = this.context.createOscillator();
	this.oscillator.connect(this.output);
	this.oscillator.frequency.value = freq;
	this.oscillator.type = type;
	console.log(this.oscillator);
	this.oscillator.noteOn(0);
}

Synth.prototype.stop = function(){
	this.oscillator.noteOff(0);
	this.oscillator.disconnect();
	this.oscillator = null;
}

Synth.prototype.arp = function(freq, type){
	this.play(freq, type);
	this.arpIsOn = true;
	this.loop(this.obj);
}

Synth.prototype.loop = function(obj){
	this.arpPos = ++this.arpPos % 4;
	console.log('loop');
	console.log(this.semitoneRatio);
	setTimeout(function(){
		console.log(obj.semitoneRatio);
		console.log(obj.arpSeq[obj.arpPos]);
		var freq = 440 * Math.pow(obj.semitoneRatio, obj.arpSeq[obj.arpPos]);
		console.log(freq);
		obj.setFreq(freq);
		if (obj.arpIsOn){
			obj.loop(obj);
		}
	}, 100);
}

Synth.prototype.stopArp = function(){
	this.arpIsOn = false;
	this.stop();
}
*/
