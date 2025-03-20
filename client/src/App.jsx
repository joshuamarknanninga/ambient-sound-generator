import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Tone from 'tone';
import StepSequencer from './components/StepSequencer';
import SynthPad from './components/SynthPad';
import './App.css';

function App() {
  const [synth] = useState(new Tone.PolySynth().toDestination());
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  const startAudio = async () => {
    await Tone.start();
    Tone.Transport.start();
    setIsAudioStarted(true);
  };

  return (
    <Container fluid>
      {!isAudioStarted && (
        <button onClick={startAudio} className="start-btn">
          Start Audio Engine
        </button>
      )}
      
      <Row>
        <Col md={8}>
          <StepSequencer synth={synth} />
        </Col>
        <Col md={4}>
          <SynthPad synth={synth} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;