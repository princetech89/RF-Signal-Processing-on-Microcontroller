
import { FilterParams, SignalDataPoint } from '../types';

/**
 * Simulates a sampled RF signal with noise and applies a basic FIR-like filter.
 */
export const generateSignal = (params: FilterParams, count: number): SignalDataPoint[] => {
  const data: SignalDataPoint[] = [];
  const dt = 1 / params.sampleRate;
  
  // Simple low-pass filter coefficients (Exponential Moving Average)
  const alpha = 0.1; // Filter responsiveness
  let prevFiltered = 0;
  let prevEnvelope = 0;

  for (let i = 0; i < count; i++) {
    const t = i * dt;
    
    // Carrier wave (e.g., 100Hz) modulated by a slower signal (e.g., 5Hz)
    const carrier = Math.sin(2 * Math.PI * params.carrierFreq * t);
    const modulator = 0.5 * (1 + Math.sin(2 * Math.PI * params.modulatingFreq * t));
    const noise = (Math.random() - 0.5) * params.noiseLevel;
    
    const raw = (carrier * modulator) + noise;
    
    // Simple DSP: Real-time Low-Pass Filter (EMA)
    const filtered = alpha * raw + (1 - alpha) * prevFiltered;
    prevFiltered = filtered;

    // Basic Envelope Detection (Diode-like Rectification + Filtering)
    const rectified = Math.max(0, raw);
    const envelope = 0.05 * rectified + (1 - 0.05) * prevEnvelope;
    prevEnvelope = envelope;

    data.push({
      time: parseFloat(t.toFixed(4)),
      raw: parseFloat(raw.toFixed(3)),
      filtered: parseFloat(filtered.toFixed(3)),
      envelope: parseFloat((envelope * 2).toFixed(3)) // Scale for visibility
    });
  }
  
  return data;
};

export const HARDWARE_SPECS = [
  { mcu: 'STM32F407', architecture: 'Cortex-M4', clockSpeed: '168 MHz', adcResolution: '12-bit' },
  { mcu: 'ESP32-S3', architecture: 'Xtensa LX7', clockSpeed: '240 MHz', adcResolution: '12-bit' },
  { mcu: 'Teensy 4.1', architecture: 'Cortex-M7', clockSpeed: '600 MHz', adcResolution: '16-bit' }
];
