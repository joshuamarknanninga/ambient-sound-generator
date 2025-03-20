import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set, get) => ({
    presets: {},
    effects: {
      reverb: 2.4,
      delay: 0.3,
      distortion: 0
    },
    setEffect: (name, value) => set(state => ({
      effects: { ...state.effects, [name]: value }
    })),
    savePreset: (name) => set(state => ({
      presets: { ...state.presets, [name]: state.effects }
    })),
    loadPreset: (name) => set({ effects: get().presets[name] })
  }),
  {
    name: 'audio-store',
  }
));

export default useStore;