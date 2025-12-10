
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientNodes: AudioNode[] = [];

  public init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startAmbience() {
      if (this.isMuted) return;
      if (!this.ctx) this.init();
      if (!this.ctx) return;

      // Stop any existing ambience first
      this.stopAmbience();

      const now = this.ctx.currentTime;

      // 1. Electrical Hum (Mains Hum simulation ~55-60Hz)
      const humOsc = this.ctx.createOscillator();
      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(58, now); // Slightly off 60hz for realism
      
      const humGain = this.ctx.createGain();
      // Increased gain for louder hum
      humGain.gain.setValueAtTime(0.05, now); 

      humOsc.connect(humGain);
      humGain.connect(this.ctx.destination);
      humOsc.start();
      
      this.ambientNodes.push(humOsc, humGain);

      // 2. "Air/Fan" Noise (Brownian-ish noise via filtered white noise)
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
      }

      const noiseSrc = this.ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;
      noiseSrc.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(120, now); // Deep rumble

      const noiseGain = this.ctx.createGain();
      // Increased base gain for louder fan noise
      noiseGain.gain.setValueAtTime(0.1, now);

      // 3. LFO for "Waving" effect (Modulates the noise volume slowly)
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.2, now); // 0.2Hz = one wave every 5 seconds

      const lfoGain = this.ctx.createGain();
      // Increased modulation depth
      lfoGain.gain.setValueAtTime(0.02, now); 

      lfo.connect(lfoGain);
      lfoGain.connect(noiseGain.gain); // Modulate the noise gain
      lfo.start();

      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noiseSrc.start();

      this.ambientNodes.push(noiseSrc, noiseFilter, noiseGain, lfo, lfoGain);
  }

  public stopAmbience() {
      this.ambientNodes.forEach(node => {
          try {
             if (node instanceof AudioBufferSourceNode || node instanceof OscillatorNode) {
                 node.stop();
             }
             node.disconnect();
          } catch (e) {
              // Ignore errors if node already stopped/disconnected
          }
      });
      this.ambientNodes = [];
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1) {
    if (this.isMuted) return;
    if (!this.ctx) this.init();
    if (!this.ctx) return; // safety

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    // Envelope to avoid clicking
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
  
  public playMove() { 
      // Retro "thock" / high beep
      this.playTone(600, 'square', 0.05, 0.05); 
      setTimeout(() => this.playTone(300, 'square', 0.05, 0.05), 30);
  }

  public playCapture() { 
      // Downward slide
      this.playTone(800, 'sawtooth', 0.1, 0.08); 
      setTimeout(() => this.playTone(400, 'sawtooth', 0.15, 0.08), 50);
  }

  public playCheck() {
      // Alarm style
      this.playTone(880, 'square', 0.1, 0.1);
      setTimeout(() => this.playTone(880, 'square', 0.1, 0.1), 150);
  }

  public playComputerProcessing() { 
      // Random high pitch computing chirps
      if (Math.random() > 0.7) return; // Don't play too often
      const freq = 1200 + Math.random() * 1000;
      this.playTone(freq, 'sine', 0.03, 0.02);
  }
  
  public playGameStart() {
      // Power up sound
      this.playTone(220, 'square', 0.1, 0.1);
      setTimeout(() => this.playTone(440, 'square', 0.1, 0.1), 100);
      setTimeout(() => this.playTone(880, 'square', 0.4, 0.1), 200);
  }
}

export const soundEngine = new SoundEngine();
