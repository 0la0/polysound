export default function buildAdsr (audioContext, output, schedule, adsrObj) {
  let adsr = audioContext.createGain();
  adsr.connect(output);

  adsr.gain.setValueAtTime(0, schedule);
  adsr.gain.linearRampToValueAtTime(1, schedule + adsrObj.attack);
  adsr.gain.linearRampToValueAtTime(1, schedule + adsrObj.attack + adsrObj.sustain);
  adsr.gain.linearRampToValueAtTime(0, schedule + adsrObj.attack + adsrObj.sustain + adsrObj.release);

  return adsr;
}
