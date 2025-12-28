
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { SignalDataPoint } from '../types';

interface Props {
  data: SignalDataPoint[];
  showRaw: boolean;
  showFiltered: boolean;
  showEnvelope: boolean;
}

const SignalVisualizer: React.FC<Props> = ({ data, showRaw, showFiltered, showEnvelope }) => {
  return (
    <div className="w-full h-80 bg-slate-900/50 rounded-xl border border-slate-700 p-4 shadow-inner">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            fontSize={10} 
            tickFormatter={(val) => `${val}s`} 
          />
          <YAxis stroke="#64748b" fontSize={10} domain={[-2, 2]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          {showRaw && (
            <Line 
              type="monotone" 
              dataKey="raw" 
              stroke="#6366f1" 
              strokeWidth={1} 
              dot={false} 
              isAnimationActive={false}
              name="Raw Signal"
            />
          )}
          {showFiltered && (
            <Line 
              type="monotone" 
              dataKey="filtered" 
              stroke="#10b981" 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={false}
              name="Filtered"
            />
          )}
          {showEnvelope && (
            <Line 
              type="monotone" 
              dataKey="envelope" 
              stroke="#f59e0b" 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={false}
              name="Demodulated Envelope"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignalVisualizer;
