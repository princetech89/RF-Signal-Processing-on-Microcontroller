
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ConceptExplorer from './components/ConceptExplorer';
import { SignalDataPoint, FilterParams, FilterType } from './types';
import { generateSignal } from './utils/dspUtils';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white">RF-MCU Signal Pro</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Embedded DSP Portfolio</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-blue-400 transition-colors">Dashboard</Link>
            <Link to="/explorer" className="text-sm font-medium hover:text-blue-400 transition-colors">AI Concept Explorer</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-green-500">SYSTEM_READY</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explorer" element={<ConceptExplorer />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Senior Academic Project Showcase • Built with React & Gemini API
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
