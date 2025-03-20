import { Button } from 'react-bootstrap';
import * as Tone from 'tone';

const SoundPad = ({ synth }) => {
  const notes = ['C4', 'E4', 'G4', 'B4'];
  
  const playNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  return (
    <div className="sound-pad">
      {notes.map((note) => (
        <Button
          key={note}
          variant="outline-light"
          className="pad-button"
          onMouseDown={() => playNote(note)}
          onMouseUp={() => synth.triggerRelease(note)}
        >
          {note}
        </Button>
      ))}
    </div>
  );
};

export default SoundPad;