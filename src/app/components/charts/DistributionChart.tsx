import { memo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { id: 'dist-ativos-2026', name: 'Ativos', value: 342, color: '#5B4FF1' },
  { id: 'dist-inativos-2026', name: 'Inativos', value: 58, color: '#e4e4e7' },
  { id: 'dist-pendentes-2026', name: 'Pendentes', value: 23, color: '#f59e0b' },
];

export const DistributionChart = memo(function DistributionChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold mb-6">Distribuição de Membros</h3>
      <ResponsiveContainer width="100%" height={200} key="distribution-chart-container">
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }} id="distribution-pie-chart">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={false}
            animationDuration={0}
          >
            {data.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 space-y-3">
        {data.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm">{item.name}</span>
            </div>
            <span className="text-sm font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
