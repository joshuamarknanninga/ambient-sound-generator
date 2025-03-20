import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button, ProgressBar } from 'react-bootstrap';
import * as Tone from 'tone';
import { api } from '../api';

export const MixdownPanel = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const { params } = useStore();

  const startMixdown = async () => {
    setIsRecording(true);
    const recorder = new Tone.Recorder();
    Tone.Destination.connect(recorder);
    
    try {
      const blob = await recorder.start();
      await new Promise(resolve => setTimeout(resolve, 5000)); // Record 5s
      const recording = await recorder.stop();
      
      // Send to backend
      const formData = new FormData();
      formData.append('audio', recording, 'mix.wav');
      formData.append('params', JSON.stringify(params));
      
      const { data } = await api.post('/mixdown', formData, {
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });
      
      setDownloadUrl(data.url);
    } catch (error) {
      console.error('Mixdown failed:', error);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="mixdown-panel">
      {!downloadUrl ? (
        <Button 
          variant="outline-light" 
          onClick={startMixdown}
          disabled={isRecording}
        >
          {isRecording ? `Recording... ${progress}%` : 'Create MP3 Mix'}
        </Button>
      ) : (
        <a 
          href={downloadUrl} 
          download="ambient-mix.mp3"
          className="btn btn-success"
        >
          Download MP3
        </a>
      )}
      {isRecording && <ProgressBar now={progress} className="mt-2" />}
    </div>
  );
};