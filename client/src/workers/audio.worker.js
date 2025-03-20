import { GrainEngine } from '../audio/GrainEngine';
import * as Comlink from 'comlink';

class AudioProcessor {
  constructor() {
    this.engine = new GrainEngine();
    this.isProcessing = false;
  }

  async processEvent(event) {
    switch(event.type) {
      case 'startGranular':
        this.isProcessing = true;
        this.processAudio();
        break;
      case 'stopGranular':
        this.isProcessing = false;
        break;
    }
  }

  async processAudio() {
    while(this.isProcessing) {
      const grain = this.engine.createGrain(
        event.buffer,
        event.position,
        event.duration
      );
      // Send audio data back to main thread
      Comlink.proxy(grain);
      await new Promise(resolve => 
        setTimeout(resolve, grain.duration * 1000)
      );
    }
  }
}

Comlink.expose(AudioProcessor);