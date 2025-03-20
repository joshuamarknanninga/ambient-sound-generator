import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Tone from 'tone';
import { useStore } from './store/useStore';
import StepSequencer from './components/StepSequencer';
import SoundPad from './components/SoundPad';
import EffectsPanel from './components/EffectsPanel';
import PresetManager from './components/PresetManager';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [synth, setSynth] = useState(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const { effects } = useStore();

  // Initialize audio engine
  useEffect(() => {
    let reverb, delay, distortion;
    
    const initSynth = async () => {
      await Tone.start();
      
      // Create effects
      reverb = new Tone.Reverb(effects.reverb).toDestination();
      delay = new Tone.FeedbackDelay(effects.delay, 0.6).toDestination();
      distortion = new Tone.Distortion(effects.distortion).toDestination();
      
      // Initialize synth with effects chain
      const newSynth = new Tone.PolySynth().chain(
        distortion,
        delay,
        reverb
      );
      
      setSynth(newSynth);
      Tone.Transport.start();
    };

    if (isAudioStarted) {
      initSynth();
    }

    // Cleanup function
    return () => {
      if (synth) {
        synth.dispose();
      }
      [reverb, delay, distortion].forEach(effect => {
        if (effect) effect.dispose();
      });
    };
  }, [isAudioStarted]); // Removed effects from dependencies

  return (
    <ErrorBoundary>
      <Container fluid className="main-container">
        {!isAudioStarted ? (
          <div className="start-screen">
            <h1>Ambient Sound Generator</h1>
            <button 
              className="start-button" 
              onClick={() => setIsAudioStarted(true)}
            >
              Initialize Audio Engine
            </button>
          </div>
        ) : (
          <Row>
            <Col md={8}>
              {synth && (
                <>
                  <StepSequencer synth={synth} />
                  <SoundPad synth={synth} />
                </>
              )}
            </Col>
            
            <Col md={4}>
              <EffectsPanel />
              <PresetManager />
            </Col>
          </Row>
        )}
      </Container>
    </ErrorBoundary>
  );
}

export default App;