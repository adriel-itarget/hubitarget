import { memo, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { id: 'roi-eventos', centro: 'Eventos', receitas: 85000, despesas: 45000, roi: 88.9 },
  { id: 'roi-cursos', centro: 'Cursos', receitas: 62000, despesas: 28000, roi: 121.4 },
  { id: 'roi-publicacoes', centro: 'Publicações', receitas: 38000, despesas: 22000, roi: 72.7 },
  { id: 'roi-certificacao', centro: 'Certificação', receitas: 95000, despesas: 35000, roi: 171.4 },
];

export const RoiChart = memo(function RoiChart() {
  const chartId = useMemo(() => `roi-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold mb-6">ROI por Centro de Custo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="centro" stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="receitas"
            fill="#5B4FF1"
            name="Receitas"
            radius={[8, 8, 0, 0]}
            isAnimationActive={false}
            animationDuration={0}
          />
          <Bar
            dataKey="despesas"
            fill="#ef4444"
            name="Despesas"
            radius={[8, 8, 0, 0]}
            isAnimationActive={false}
            animationDuration={0}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-4 gap-4">
        {data.map((item) => (
          <div key={item.id} className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{item.centro}</p>
            <p className="text-lg font-semibold text-green-600">+{item.roi}%</p>
          </div>
        ))}
      </div>
    </div>
  );
});
