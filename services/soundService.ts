
// Simple synthesizer for game sound effects using Web Audio API

let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number, vol = 0.1) => {
  const ctx = getCtx();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  
  gain.gain.setValueAtTime(vol, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
};

export const playMoneySound = () => {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const now = ctx.currentTime;
  // "Cha-ching" effect - two high tones
  playTone(1200, 'sine', 0.1, now, 0.1);
  playTone(1800, 'sine', 0.3, now + 0.1, 0.1);
};

export const playLossSound = () => {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const now = ctx.currentTime;
  // Descending "womp womp"
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.linearRampToValueAtTime(100, now + 0.4);
  
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);
};

export const playMilestoneSound = () => {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const now = ctx.currentTime;
  // Major triad arpeggio
  playTone(523.25, 'triangle', 0.3, now, 0.1);       // C5
  playTone(659.25, 'triangle', 0.3, now + 0.1, 0.1); // E5
  playTone(783.99, 'triangle', 0.6, now + 0.2, 0.1); // G5
  playTone(1046.50, 'triangle', 0.8, now + 0.3, 0.08); // C6
};

export const playStartSound = () => {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const now = ctx.currentTime;
  // Rising sweep
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
  
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.4);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);
};

export const playClickSound = () => {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const now = ctx.currentTime;
  playTone(800, 'sine', 0.05, now, 0.05);
};
