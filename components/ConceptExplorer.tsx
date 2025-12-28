
import React, { useState } from 'react';
import { getDSPExplanation, analyzeSignalCode } from '../services/gemini';

const CONCEPT_CHIPS = [
  "FIR Filter Coefficients",
  "FFT Windowing",
  "IQ Sampling",
  "Nyquist Theorem",
  "ADC Quantization Noise",
  "DMA Audio Buffering"
];

const ConceptExplorer: React.FC = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (topic?: string) => {
    const activeTopic = topic || query;
    if (!activeTopic) return;
    
    setLoading(true);
    setResponse("");
    const result = await getDSPExplanation(activeTopic);
    setResponse(result || "No explanation available.");
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">AI DSP Assistant</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Deep dive into the theory behind the bits. Ask about signal processing mathematics, 
          C++ implementation details, or hardware optimization tricks.
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-2xl">
        <div className="flex flex-wrap gap-2 mb-6">
          {CONCEPT_CHIPS.map(chip => (
            <button 
              key={chip}
              onClick={() => handleAsk(chip)}
              className="px-4 py-1.5 bg-slate-700 hover:bg-blue-600 rounded-full text-xs font-medium transition-colors border border-slate-600"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about Nyquist frequency, FIR implementation, etc..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={() => handleAsk()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            {loading ? 'Thinking...' : 'Analyze'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-mono text-sm">QUERYING_NEURAL_DSP_ENGINE...</p>
        </div>
      )}

      {response && !loading && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 prose prose-invert max-w-none shadow-2xl">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold m-0 text-indigo-300">Expert Analysis</h3>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed text-slate-300">
            {response}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
        <div className="bg-slate-800/40 p-6 rounded-2xl border border-dashed border-slate-600">
          <h4 className="font-bold mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Example C++ FIR Logic
          </h4>
          <pre className="bg-slate-900 p-4 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
{`float filter(float input) {
  static float buf[N] = {0};
  static int i = 0;
  buf[i] = input;
  float output = 0;
  for(int j=0; j<N; j++) {
    output += buf[(i+j)%N] * coeffs[j];
  }
  i = (i+1)%N;
  return output;
}`}
          </pre>
        </div>
        <div className="bg-slate-800/40 p-6 rounded-2xl border border-dashed border-slate-600">
          <h4 className="font-bold mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5V2a1 1 0 112 0v5a1 1 0 01-1 1h-5zM11 13a1 1 0 110 2H6v5a1 1 0 11-2 0v-5a1 1 0 011-1h5z" clipRule="evenodd" />
              <path d="M4.414 7L8.293 3.121 7.121 1.95 3.25 5.821a3 3 0 000 4.242l3.871 3.872 1.172-1.172L4.414 9H11a1 1 0 100-2H4.414z" />
            </svg>
            Optimization Tip
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "When implementing on Cortex-M4, use CMSIS-DSP library's ARM_MATH_CM4 primitives. 
            The SIMD instructions can perform four 16-bit MAC operations in one cycle, 
            significantly reducing real-time overhead."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConceptExplorer;
