export default function buildAdsr (audioContext, output, schedule, attack, sustain, release) {
  let adsr = audioContext.createGain();
  adsr.connect(output);

  adsr.gain.setValueAtTime(0, schedule);
  adsr.gain.linearRampToValueAtTime(1, schedule + attack);
  adsr.gain.linearRampToValueAtTime(1, schedule + attack + sustain);
  adsr.gain.linearRampToValueAtTime(0, schedule + attack + sustain + release);

  return adsr;
}
