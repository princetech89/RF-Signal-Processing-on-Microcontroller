
import React, { useState, useEffect, useCallback } from 'react';
import SignalVisualizer from './SignalVisualizer';
import ControlPanel from './ControlPanel';
import { FilterParams, SignalDataPoint } from '../types';
import { generateSignal, HARDWARE_SPECS } from '../utils/dspUtils';

const Dashboard: React.FC = () => {
  const [params, setParams] = useState<FilterParams>({
    cutoffFreq: 50,
    noiseLevel: 0.2,
    sampleRate: 2000,
    carrierFreq: 100,
    modulatingFreq: 5
  });

  const [signalData, setSignalData] = useState<SignalDataPoint[]>([]);
  const [showRaw, setShowRaw] = useState(true);
  const [showFiltered, setShowFiltered] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(true);

  const updateSignal = useCallback(() => {
    const data = generateSignal(params, 400);
    setSignalData(data);
  }, [params]);

  useEffect(() => {
    updateSignal();
    const interval = setInterval(updateSignal, 100);
    return () => clearInterval(interval);
  }, [updateSignal]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Introduction Section */}
      <section className="bg-slate-800/40 rounded-2xl p-6 md:p-8 border border-slate-700">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Real-Time RF Processing Demo
          </h2>
          <p className="text-slate-300 leading-relaxed">
            This project explores the implementation of digital signal processing (DSP) algorithms on resource-constrained microcontrollers. 
            The visualizer below simulates an Amplitude Modulated (AM) signal being processed in real-time through a 
            low-pass filter (LPF) and an envelope detector for demodulation.
          </p>
        </div>
      </section>

      {/* Main Grid: Visualizer and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Live Scope View
              </h3>
              <div className="text-xs font-mono text-slate-400">
                Fs: {params.sampleRate}Hz | Buffer: 400 Samples
              </div>
            </div>
            <div className="p-6">
              <SignalVisualizer 
                data={signalData} 
                showRaw={showRaw} 
                showFiltered={showFiltered} 
                showEnvelope={showEnvelope} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 border-l-4 border-l-blue-500">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Algorithm</h4>
              <p className="text-lg font-semibold">FIR Low-Pass Filter</p>
              <p className="text-xs text-slate-500 mt-2">Removes high-frequency noise while preserving modulated carrier.</p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 border-l-4 border-l-emerald-500">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Demodulation</h4>
              <p className="text-lg font-semibold">Envelope Detection</p>
              <p className="text-xs text-slate-500 mt-2">Extracts the baseband signal from the modulated wave.</p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 border-l-4 border-l-amber-500">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Constraint</h4>
              <p className="text-lg font-semibold">Real-Time Execution</p>
              <p className="text-xs text-slate-500 mt-2">Designed for zero-latency processing on Cortex-M4 units.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <ControlPanel 
            params={params} 
            setParams={setParams}
            showRaw={showRaw} setShowRaw={setShowRaw}
            showFiltered={showFiltered} setShowFiltered={setShowFiltered}
            showEnvelope={showEnvelope} setShowEnvelope={setShowEnvelope}
          />
        </div>
      </div>

      {/* Hardware Section */}
      <section className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700">
        <h3 className="text-xl font-bold mb-6">Target Hardware Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HARDWARE_SPECS.map(spec => (
            <div key={spec.mcu} className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition-all cursor-default">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-1">{spec.mcu}</h4>
              <p className="text-sm text-slate-400 mb-4">{spec.architecture}</p>
              <ul className="space-y-2 text-sm font-mono text-slate-300">
                <li className="flex justify-between"><span>Clock:</span> <span className="text-blue-400">{spec.clockSpeed}</span></li>
                <li className="flex justify-between"><span>ADC:</span> <span className="text-blue-400">{spec.adcResolution}</span></li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
