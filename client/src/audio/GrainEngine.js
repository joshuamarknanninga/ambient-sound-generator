import { ToneBufferSource } from 'tone';

export class GrainEngine {
  constructor() {
    this.buffers = new Map();
    this.activeGrains = new Set();
  }

  async loadSample(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await Tone.context.decodeAudioData(arrayBuffer);
    this.buffers.set(url, buffer);
    return buffer;
  }

  createGrain(buffer, options) {
    const source = new ToneBufferSource(buffer).toDestination();
    Object.entries(options).forEach(([key, val]) => {
      source[key] = val;
    });
    source.start(options.when);
    source.onended = () => this.activeGrains.delete(source);
    this.activeGrains.add(source);
    return source;
  }

  dispose() {
    this.activeGrains.forEach(source => source.stop());
    this.buffers.clear();
  }
}