import React from 'react';
import { ICONS } from '../constants';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: keyof typeof ICONS;
  color?: string;
  trend?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color = "text-white", trend }) => {
  const Icon = ICONS[icon];
  
  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-slate-700 ${color}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">{label}</p>
          <p className="text-xl font-bold text-white font-mono">{value}</p>
        </div>
      </div>
      {trend !== undefined && trend !== 0 && (
        <div className={`flex items-center text-sm font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          <ICONS.Trend size={16} className={trend < 0 ? 'rotate-180' : ''} />
          <span>{trend > 0 ? '+' : ''}{trend}</span>
        </div>
      )}
    </div>
  );
};
