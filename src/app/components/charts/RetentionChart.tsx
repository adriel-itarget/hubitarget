import { memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', taxa: 92 },
  { month: 'Fev', taxa: 91 },
  { month: 'Mar', taxa: 94 },
  { month: 'Abr', taxa: 93 },
  { month: 'Mai', taxa: 95 },
  { month: 'Jun', taxa: 96 },
];

export const RetentionChart = memo(function RetentionChart() {
  const chartId = useMemo(() => `retention-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold mb-6">Taxa de Retenção (%)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="month" stroke="#71717a" />
          <YAxis domain={[85, 100]} stroke="#71717a" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="taxa"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 5 }}
            isAnimationActive={false}
            animationDuration={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
