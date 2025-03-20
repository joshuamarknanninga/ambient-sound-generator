import React, { memo, useCallback, useEffect } from 'react';
import { useGesture } from 'react-use-gesture';
import { GrainEngine } from '../audio/GrainEngine';

const GranularEngine = memo(({ buffer }) => {
  const engine = React.useRef(new GrainEngine());
  
  const bind = useGesture({
    onDrag: ({ movement: [mx, my], active }) => {
      const position = Math.min(Math.max(mx / 300, 0), 1);
      const rate = 0.5 + (my / 200);
      if (active) {
        engine.current.createGrain(buffer, {
          playbackRate: rate,
          grainStart: position * buffer.duration,
          grainDuration: 0.2
        });
      }
    }
  });

  useEffect(() => () => engine.current.dispose(), []);

  return (
    <div {...bind()} className="granular-pad">
      <div className="crosshair" />
    </div>
  );
});