import React from 'react';
import { Team } from '../types';
import { BADGES } from '../constants';
import { Award } from 'lucide-react';

interface DashboardProps {
  teams: Team[];
  currentTeamId?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ teams, currentTeamId }) => {
  // Sort by revenue for ranking
  const sortedTeams = [...teams].sort((a, b) => b.metrics.revenue - a.metrics.revenue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
      {teams.map((team) => {
        const isTurn = team.id === currentTeamId;
        const rank = sortedTeams.findIndex(t => t.id === team.id) + 1;
        
        return (
          <div 
            key={team.id}
            className={`relative p-1 rounded-2xl transition-all duration-300 ${
              isTurn 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-105 shadow-2xl z-10' 
              : 'bg-slate-700 opacity-90'
            }`}
          >
            <div className="bg-slate-900 h-full rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
               {/* Header */}
               <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${team.color.split(' ')[0]}`}></div>
                    <h3 className="font-bold text-lg text-white">{team.name}</h3>
                  </div>
                  {rank === 1 && <Award className="text-yellow-400" size={20} />}
               </div>

               {/* Metrics */}
               <div className="grid grid-cols-1 gap-2">
                 <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm">Rev</span>
                    <span className="text-green-400 font-mono font-bold text-lg">
                      ${team.metrics.revenue.toLocaleString()}
                    </span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm">Cust</span>
                    <span className="text-blue-400 font-mono font-bold">
                      {team.metrics.customers.toLocaleString()}
                    </span>
                 </div>
                 
                 {/* Progress Bars */}
                 <div className="mt-2 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Infrastructure</span>
                        <span>{team.metrics.infrastructure}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min(100, team.metrics.infrastructure)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Brand</span>
                        <span>{team.metrics.brandAwareness}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className="bg-pink-500 h-1.5 rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min(100, team.metrics.brandAwareness)}%` }}
                        ></div>
                      </div>
                    </div>
                 </div>
               </div>

               {/* Badge List */}
               {team.badges.length > 0 && (
                 <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap gap-1">
                   {team.badges.map(badgeId => {
                     const badgeDef = BADGES[badgeId];
                     if (!badgeDef) return null;
                     const BadgeIcon = badgeDef.icon;
                     return (
                       <div key={badgeId} className="group relative">
                         <div className={`p-1 rounded-md bg-slate-800 border border-slate-700 ${badgeDef.color}`}>
                            <BadgeIcon size={14} />
                         </div>
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-xs rounded text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                            {badgeDef.label}
                         </div>
                       </div>
                     )
                   })}
                 </div>
               )}

               {/* Turn Indicator Overlay */}
               {isTurn && (
                  <div className="absolute top-0 right-0 p-2">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </div>
               )}
            </div>
          </div>
        );
      })}
    </div>
  );
};