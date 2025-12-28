
export interface SignalDataPoint {
  time: number;
  raw: number;
  filtered: number;
  envelope: number;
}

export interface FilterParams {
  cutoffFreq: number;
  noiseLevel: number;
  sampleRate: number;
  carrierFreq: number;
  modulatingFreq: number;
}

export enum FilterType {
  LOWPASS = 'Low Pass',
  HIGHPASS = 'High Pass',
  BANDPASS = 'Band Pass'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface HardwareSpec {
  mcu: string;
  architecture: string;
  clockSpeed: string;
  adcResolution: string;
}
