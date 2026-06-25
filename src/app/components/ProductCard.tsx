import { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
}

export function ProductCard({ icon: Icon, title, description, features, benefits }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Icon className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
        </div>
        <ArrowUpRight
          className={`w-5 h-5 text-blue-400 transition-transform ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}
          strokeWidth={2}
        />
      </div>

      <h3 className="text-2xl text-white mb-3" style={{ fontWeight: 600 }}>
        {title}
      </h3>

      <p className="text-blue-200 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm text-blue-300 mb-3" style={{ fontWeight: 500 }}>
            Recursos principais
          </h4>
          <ul className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="text-sm text-blue-100 pl-4 relative">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {benefits.slice(0, 2).map((benefit, index) => (
              <span key={index} className="text-xs text-blue-200 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}