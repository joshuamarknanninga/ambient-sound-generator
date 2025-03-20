import React from 'react';
import { Button } from 'react-bootstrap';
import * as Tone from 'tone';

const SynthPad = ({ synth }) => {
  const playNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  return (
    <div className="synth-pad">
      <Button 
        variant="outline-light" 
        onMouseDown={() => playNote('C4')}
        onMouseUp={() => synth.triggerRelease('C4')}
      >
        C4
      </Button>
      {/* Add more buttons for other notes */}
    </div>
  );
};

export default SynthPad;