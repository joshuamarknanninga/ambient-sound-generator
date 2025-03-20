import { Form, Card } from 'react-bootstrap';
import { useStore } from '../store/useStore';

const EffectsPanel = () => {
  const { effects, setEffect } = useStore();

  return (
    <Card className="effects-panel">
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Reverb: {effects.reverb.toFixed(1)}s</Form.Label>
            <Form.Range 
              min="0" 
              max="5" 
              step="0.1"
              value={effects.reverb}
              onChange={(e) => setEffect('reverb', parseFloat(e.target.value))}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Delay: {effects.delay.toFixed(1)}s</Form.Label>
            <Form.Range
              min="0"
              max="1"
              step="0.1"
              value={effects.delay}
              onChange={(e) => setEffect('delay', parseFloat(e.target.value))}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Distortion: {effects.distortion.toFixed(1)}</Form.Label>
            <Form.Range
              min="0"
              max="1"
              step="0.1"
              value={effects.distortion}
              onChange={(e) => setEffect('distortion', parseFloat(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EffectsPanel;