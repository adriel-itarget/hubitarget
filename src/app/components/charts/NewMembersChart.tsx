import { memo, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', members: 45 },
  { month: 'Fev', members: 52 },
  { month: 'Mar', members: 48 },
  { month: 'Abr', members: 61 },
  { month: 'Mai', members: 58 },
  { month: 'Jun', members: 67 },
];

export const NewMembersChart = memo(function NewMembersChart() {
  const chartId = useMemo(() => `new-members-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold mb-6">Novos Associados por Mês</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5B4FF1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#5B4FF1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="month" stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="members"
            stroke="#5B4FF1"
            fillOpacity={1}
            fill={`url(#gradient-${chartId})`}
            isAnimationActive={false}
            animationDuration={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
