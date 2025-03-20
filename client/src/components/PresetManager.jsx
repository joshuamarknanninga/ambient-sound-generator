import { useState } from 'react';
import { Button, Form, InputGroup, Card } from 'react-bootstrap';
import { useStore } from '../store/useStore';
import axios from 'axios';

const PresetManager = () => {
  const [presetName, setPresetName] = useState('');
  const { presets, savePreset, loadPreset } = useStore();

  const handleSave = async () => {
    savePreset(presetName);
    try {
      await axios.post('/api/presets', { 
        name: presetName, 
        params: useStore.getState().effects 
      });
    } catch (error) {
      console.error('Failed to save preset:', error);
    }
    setPresetName('');
  };

  return (
    <Card className="preset-manager">
      <Card.Body>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
          />
          <Button variant="outline-light" onClick={handleSave}>
            Save
          </Button>
        </InputGroup>

        <div className="preset-list">
          {Object.keys(presets).map((name) => (
            <Button
              key={name}
              variant="outline-light"
              className="preset-button"
              onClick={() => loadPreset(name)}
            >
              {name}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PresetManager;