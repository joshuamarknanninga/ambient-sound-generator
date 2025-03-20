import { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const StepSequencer = ({ synth }) => {
  const [steps] = useState(Array(16).fill(false));
  const [currentStep, setCurrentStep] = useState(0);
  const [sequence] = useState(['C3', 'E3', 'G3', 'B3']);

  useEffect(() => {
    const loop = new Tone.Loop(time => {
      if (steps[currentStep]) {
        synth.triggerAttackRelease(sequence[currentStep % 4], '8n', time);
      }
      setCurrentStep((prev) => (prev + 1) % 16);
    }, '16n').start();

    return () => loop.dispose();
  }, [steps, currentStep, synth, sequence]);

  const toggleStep = (index) => {
    steps[index] = !steps[index];
  };

  return (
    <div className="sequencer">
      <Row>
        {steps.map((active, index) => (
          <Col key={index}>
            <Button
              variant={active ? 'danger' : 'outline-secondary'}
              onClick={() => toggleStep(index)}
              active={active}
              className={`step ${index === currentStep ? 'active-step' : ''}`}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StepSequencer;