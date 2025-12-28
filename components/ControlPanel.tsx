
import React from 'react';
import { FilterParams } from '../types';

interface Props {
  params: FilterParams;
  setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
  showRaw: boolean;
  setShowRaw: (v: boolean) => void;
  showFiltered: boolean;
  setShowFiltered: (v: boolean) => void;
  showEnvelope: boolean;
  setShowEnvelope: (v: boolean) => void;
}

const ControlPanel: React.FC<Props> = ({ 
  params, 
  setParams, 
  showRaw, setShowRaw, 
  showFiltered, setShowFiltered, 
  showEnvelope, setShowEnvelope 
}) => {
  const handleChange = (key: keyof FilterParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl h-full">
      <h3 className="text-lg font-bold mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Simulation Controls
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">Carrier Freq (Hz)</label>
            <span className="text-sm font-mono text-blue-400">{params.carrierFreq}</span>
          </div>
          <input 
            type="range" min="10" max="500" step="10"
            value={params.carrierFreq}
            onChange={(e) => handleChange('carrierFreq', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">Modulation Freq (Hz)</label>
            <span className="text-sm font-mono text-blue-400">{params.modulatingFreq}</span>
          </div>
          <input 
            type="range" min="1" max="50" step="1"
            value={params.modulatingFreq}
            onChange={(e) => handleChange('modulatingFreq', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">Noise Amplitude</label>
            <span className="text-sm font-mono text-blue-400">{params.noiseLevel.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.05"
            value={params.noiseLevel}
            onChange={(e) => handleChange('noiseLevel', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="pt-4 space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={showRaw} 
              onChange={() => setShowRaw(!showRaw)}
              className="form-checkbox h-5 w-5 text-indigo-500 rounded border-slate-600 bg-slate-700 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">View Raw RF</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={showFiltered} 
              onChange={() => setShowFiltered(!showFiltered)}
              className="form-checkbox h-5 w-5 text-emerald-500 rounded border-slate-600 bg-slate-700 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">View LPF Output</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={showEnvelope} 
              onChange={() => setShowEnvelope(!showEnvelope)}
              className="form-checkbox h-5 w-5 text-amber-500 rounded border-slate-600 bg-slate-700 focus:ring-amber-500"
            />
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">View Envelope (Demod)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
