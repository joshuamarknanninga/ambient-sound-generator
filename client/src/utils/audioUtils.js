export const initAudioContext = async () => {
    if (!Tone.context) {
      await Tone.start();
      Tone.context.latencyHint = 'playback';
      Tone.setContext(new Tone.Context({ latencyHint: 'playback' }));
    }
    return Tone.context;
  };
  
  export const createMasterChain = () => {
    const reverb = new Tone.Reverb(3).toDestination();
    const delay = new Tone.FeedbackDelay(0.3, 0.6).toDestination();
    const limiter = new Tone.Limiter(-3).toDestination();
    
    return {
      reverb,
      delay,
      limiter,
      dispose: () => {
        reverb.dispose();
        delay.dispose();
        limiter.dispose();
      }
    };
  };