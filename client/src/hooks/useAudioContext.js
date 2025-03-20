import { useState, useEffect } from 'react';
import { getContext } from 'tone';

export const useAudioContext = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const ctx = getContext();
    const resume = async () => {
      if (ctx.state !== 'running') {
        await ctx.resume();
        setIsReady(true);
      }
    };
    
    const handleClick = () => resume();
    document.addEventListener('click', handleClick, { once: true });
    
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return isReady;
};