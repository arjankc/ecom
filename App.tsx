import React, { useState, useEffect, useCallback } from 'react';
import { GamePhase, Team, Scenario, Choice } from './types';
import { INITIAL_REVENUE, INITIAL_CUSTOMERS, INITIAL_INFRA, INITIAL_BRAND, TEAM_CONFIGS, SCENARIOS, BADGES } from './constants';
import { Dashboard } from './components/Dashboard';
import { StatsCard } from './components/StatsCard';
import { generateMarketAnalysis } from './services/geminiService';
import { playMoneySound, playLossSound, playMilestoneSound, playStartSound, playClickSound } from './services/soundService';
import { Play, RotateCcw, Users as UsersIcon, Settings, ChevronRight, TrendingUp, TrendingDown, Award, Crown, Sparkles, Star } from 'lucide-react';

interface TurnResult {
  teamName: string;
  teamColor: string;
  choiceLabel: string;
  feedback: string;
  impact: Choice['impact'];
  unlockedBadges: string[];
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.SETUP);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentRound, setCurrentRound] = useState(0); // Index for SCENARIOS
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [numTeams, setNumTeams] = useState(2);
  const [marketAnalysis, setMarketAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [turnResult, setTurnResult] = useState<TurnResult | null>(null);

  // -- Setup Helpers --

  const startGame = () => {
    playStartSound();
    const newTeams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
      id: i,
      name: TEAM_CONFIGS[i].name,
      color: TEAM_CONFIGS[i].color,
      metrics: {
        revenue: INITIAL_REVENUE,
        customers: INITIAL_CUSTOMERS,
        infrastructure: INITIAL_INFRA,
        brandAwareness: INITIAL_BRAND
      },
      badges: [],
      history: []
    }));
    setTeams(newTeams);
    setCurrentRound(0);
    setCurrentTeamIndex(0);
    setPhase(GamePhase.SCENARIO_INTRO);
  };

  // -- Game Loop Logic --

  const checkForBadges = (team: Team): string[] => {
    const newBadges: string[] = [];
    const { revenue, customers, infrastructure, brandAwareness } = team.metrics;

    // Badge Logic
    if (revenue >= 40000 && !team.badges.includes('UNICORN')) newBadges.push('UNICORN');
    if (customers >= 2500 && !team.badges.includes('VIRAL_SENSATION')) newBadges.push('VIRAL_SENSATION');
    if (infrastructure >= 80 && !team.badges.includes('TECH_TITAN')) newBadges.push('TECH_TITAN');
    if (brandAwareness >= 80 && !team.badges.includes('BRAND_ICON')) newBadges.push('BRAND_ICON');
    if (infrastructure >= 60 && !team.badges.includes('SCALABLE')) newBadges.push('SCALABLE');

    return newBadges;
  };

  const handleChoice = (choice: Choice) => {
    const updatedTeams = [...teams];
    const team = updatedTeams[currentTeamIndex];

    // Apply Impacts
    team.metrics.revenue += choice.impact.revenue;
    team.metrics.customers += choice.impact.customers;
    team.metrics.infrastructure += choice.impact.infrastructure;
    team.metrics.brandAwareness += choice.impact.brandAwareness;
    
    // Log history
    team.history.push(choice.label);

    // Check for new badges
    const newBadges = checkForBadges(team);
    if (newBadges.length > 0) {
      team.badges.push(...newBadges);
    }

    setTeams(updatedTeams);

    // Audio Feedback Logic
    if (newBadges.length > 0) {
      playMilestoneSound();
    } else if (choice.impact.revenue < 0) {
      playLossSound();
    } else if (choice.impact.revenue > 2000 || choice.impact.customers > 300) {
      playMoneySound();
    } else {
      playClickSound();
    }
    
    setTurnResult({
      teamName: team.name,
      teamColor: team.color,
      choiceLabel: choice.label,
      feedback: choice.feedback,
      impact: choice.impact,
      unlockedBadges: newBadges
    });

    // Automatic progression removed to allow reading time
  };

  const handleProceed = () => {
    playClickSound();
    setTurnResult(null);
    if (currentTeamIndex < numTeams - 1) {
      setCurrentTeamIndex(prev => prev + 1);
    } else {
      endRound();
    }
  };

  const endRound = async () => {
    // Only play round end sound if we didn't just play a milestone sound
    if (!turnResult?.unlockedBadges?.length) {
       playMilestoneSound(); 
    }
    setPhase(GamePhase.ROUND_SUMMARY);
    setIsAnalyzing(true);
    const currentScenario = SCENARIOS[currentRound];
    const analysis = await generateMarketAnalysis(teams, currentScenario, currentRound + 1);
    setMarketAnalysis(analysis);
    setIsAnalyzing(false);
  };

  const nextRound = () => {
    playStartSound();
    if (currentRound < SCENARIOS.length - 1) {
      setCurrentRound(prev => prev + 1);
      setCurrentTeamIndex(0);
      setPhase(GamePhase.SCENARIO_INTRO);
    } else {
      setPhase(GamePhase.GAME_OVER);
    }
  };

  const resetGame = () => {
    setPhase(GamePhase.SETUP);
    setTeams([]);
  };

  // -- Renders --

  const renderSetup = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-2xl w-full bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          E-Com Tycoon
        </h1>
        <p className="text-slate-400 text-xl mb-10">
          Classroom Business Simulator
        </p>
        
        <div className="mb-8">
          <label className="block text-slate-300 mb-4 text-lg">Number of Teams</label>
          <div className="flex justify-center gap-4">
            {[2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => { playClickSound(); setNumTeams(n); }}
                className={`w-20 h-20 text-3xl font-bold rounded-2xl transition-all ${
                  numTeams === n 
                  ? 'bg-blue-600 text-white shadow-lg scale-110' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startGame}
          className="bg-emerald-700 hover:bg-emerald-600 text-white text-2xl font-bold py-4 px-12 rounded-full transition-all hover:scale-105 flex items-center gap-3 mx-auto"
        >
          <Play size={32} /> Start Simulation
        </button>
      </div>
    </div>
  );

  const renderScenarioIntro = () => {
    const scenario = SCENARIOS[currentRound];
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-4xl mx-auto animate-fade-in">
        <div className="bg-indigo-900/50 text-indigo-300 px-4 py-2 rounded-full font-bold mb-6 text-lg border border-indigo-500/30">
          ROUND {currentRound + 1} / {SCENARIOS.length} • {scenario.unit}
        </div>
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          {scenario.title}
        </h2>
        <p className="text-2xl text-slate-300 mb-12 leading-relaxed">
          {scenario.description}
        </p>
        <button
          onClick={() => { playClickSound(); setPhase(GamePhase.TEAM_TURN); }}
          className="bg-blue-700 hover:bg-blue-600 text-white text-xl font-bold py-4 px-10 rounded-xl transition-all flex items-center gap-2"
        >
          Begin Decision Phase <ChevronRight size={24} />
        </button>
      </div>
    );
  };

  const renderTeamTurn = () => {
    const scenario = SCENARIOS[currentRound];
    const activeTeam = teams[currentTeamIndex];

    if (turnResult) {
      const gradientColors = turnResult.teamColor.replace('bg-', 'from-').replace('border-', 'to-');
      const isLastTeam = currentTeamIndex === numTeams - 1;
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in w-full px-4">
           <div className={`w-full max-w-3xl rounded-[2rem] p-1 bg-gradient-to-br ${gradientColors} shadow-2xl`}>
              <div className="bg-slate-900 rounded-[1.8rem] p-10 md:p-14 text-center relative overflow-hidden h-full flex flex-col items-center">
                 {/* Top Label */}
                 <div className="mb-6">
                    <span className="text-slate-400 uppercase tracking-widest font-bold text-sm bg-slate-800 px-4 py-1 rounded-full border border-slate-700">
                      {turnResult.teamName} Selected
                    </span>
                 </div>
                 
                 {/* Choice Title */}
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    {turnResult.choiceLabel}
                 </h2>
                 
                 {/* Feedback Text */}
                 <div className="relative mb-10">
                   <div className="absolute -left-4 -top-4 text-slate-700 text-6xl font-serif opacity-30">“</div>
                   <p className="text-2xl md:text-3xl text-emerald-100 font-medium leading-normal relative z-10 px-6">
                      {turnResult.feedback}
                   </p>
                   <div className="absolute -right-4 -bottom-4 text-slate-700 text-6xl font-serif opacity-30">”</div>
                 </div>

                 {/* New Badges Notification */}
                 {turnResult.unlockedBadges.length > 0 && (
                   <div className="mb-8 flex gap-4 animate-bounce">
                      {turnResult.unlockedBadges.map(badgeId => {
                         const badge = BADGES[badgeId];
                         const BadgeIcon = badge.icon;
                         return (
                           <div key={badgeId} className="flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 px-4 py-2 rounded-full">
                              <BadgeIcon className="text-yellow-400" size={24} />
                              <span className="text-yellow-200 font-bold uppercase tracking-wide">Badge Unlocked: {badge.label}</span>
                           </div>
                         )
                      })}
                   </div>
                 )}

                 {/* Impact Metrics */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl border-t border-slate-800 pt-8 mb-8">
                     {[
                       { label: 'Revenue', value: turnResult.impact.revenue, isCurrency: true },
                       { label: 'Customers', value: turnResult.impact.customers },
                       { label: 'Infra', value: turnResult.impact.infrastructure },
                       { label: 'Brand', value: turnResult.impact.brandAwareness }
                     ].map((metric, idx) => (
                        <div key={idx} className={`flex flex-col items-center ${metric.value === 0 ? 'opacity-30 grayscale' : ''}`}>
                           <span className="text-xs font-bold text-slate-400 uppercase mb-1">{metric.label}</span>
                           <div className={`flex items-center text-xl font-mono font-bold ${metric.value > 0 ? 'text-green-400' : metric.value < 0 ? 'text-red-400' : 'text-slate-500'}`}>
                              {metric.value !== 0 && (metric.value > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />)}
                              {metric.value > 0 ? '+' : ''}{metric.isCurrency ? '$' : ''}{metric.value}
                           </div>
                        </div>
                     ))}
                 </div>

                 {/* Proceed Button */}
                 <button 
                    onClick={handleProceed}
                    className="bg-white text-slate-900 hover:bg-slate-200 font-bold text-xl py-4 px-12 rounded-full transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                 >
                    {isLastTeam ? "Finish Round" : "Next Team"} <ChevronRight size={24} />
                 </button>
              </div>
           </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="text-center mb-4">
          <span className="text-slate-400 uppercase tracking-widest font-bold text-sm">Current Decision Maker</span>
          <h2 className={`text-4xl font-bold mt-2 ${activeTeam.color.replace('bg-', 'text-').split(' ')[0]}`}>
            {activeTeam.name}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenario.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="group bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-blue-400 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-600 group-hover:bg-blue-400 transition-colors"></div>
              <h3 className="text-2xl font-bold text-white mb-3">{choice.label}</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{choice.description}</p>
              
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Projected Impact</span>
                <div className="flex gap-4 mt-2 text-sm">
                   {choice.impact.revenue > 0 && <span className="text-green-400">High Rev</span>}
                   {choice.impact.customers > 0 && <span className="text-blue-400">New Cust</span>}
                   {choice.impact.infrastructure > 20 && <span className="text-purple-400">Scale</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    const sortedTeams = [...teams].sort((a, b) => b.metrics.revenue - a.metrics.revenue);
    const leader = sortedTeams[0];

    return (
      <div className="flex flex-col items-center animate-fade-in max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">Round {currentRound + 1} Summary</h2>
        
        <div className="w-full bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-700">
           <div className="flex items-center gap-4 mb-4">
             <div className="bg-indigo-500 p-2 rounded-lg"><UsersIcon size={24} className="text-white"/></div>
             <h3 className="text-2xl font-bold text-white">Market Analysis</h3>
           </div>
           
           {isAnalyzing ? (
             <div className="animate-pulse flex space-x-4">
               <div className="flex-1 space-y-4 py-1">
                 <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                 <div className="h-4 bg-slate-600 rounded"></div>
               </div>
             </div>
           ) : (
             <p className="text-xl text-slate-300 italic border-l-4 border-indigo-500 pl-4 py-2">
               "{marketAnalysis}"
             </p>
           )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
           <StatsCard 
              label="Market Leader" 
              value={leader.name} 
              icon="Winner" 
              color="text-yellow-400" 
            />
             <StatsCard 
              label="Top Revenue" 
              value={`$${leader.metrics.revenue.toLocaleString()}`} 
              icon="Revenue" 
              color="text-green-400" 
            />
        </div>

        <button
          onClick={nextRound}
          className="bg-emerald-700 hover:bg-emerald-600 text-white text-xl font-bold py-4 px-12 rounded-full transition-all shadow-lg hover:shadow-emerald-500/20"
        >
          Proceed to Next Round
        </button>
      </div>
    );
  };

  const renderGameOver = () => {
    const sortedTeams = [...teams].sort((a, b) => b.metrics.revenue - a.metrics.revenue);
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] animate-fade-in w-full pb-10">
        
        {/* Celebration Header */}
        <div className="text-center mb-10 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="flex items-center justify-center gap-4 mb-2">
             <Sparkles className="text-yellow-400 animate-pulse" size={32} />
             <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500">
               Simulation Complete!
             </h1>
             <Sparkles className="text-yellow-400 animate-pulse" size={32} />
          </div>
          <p className="text-2xl text-slate-400">Final Market Standings & Achievements</p>
        </div>

        {/* Leaderboard Grid */}
        <div className="grid grid-cols-1 gap-6 w-full max-w-5xl mb-12">
          {sortedTeams.map((team, index) => {
             const isWinner = index === 0;
             return (
              <div 
                key={team.id} 
                className={`relative flex flex-col md:flex-row items-center md:items-stretch bg-slate-800 rounded-2xl border transition-all duration-500 ${
                  isWinner 
                  ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)] scale-105 z-10' 
                  : 'border-slate-700 opacity-90'
                }`}
              >
                 {/* Rank Section */}
                 <div className={`flex flex-col items-center justify-center p-6 w-full md:w-32 ${isWinner ? 'bg-gradient-to-b from-yellow-500/20 to-transparent' : 'bg-slate-800'} rounded-l-2xl border-r border-slate-700/50`}>
                    {isWinner ? <Crown size={40} className="text-yellow-400 mb-2 drop-shadow-lg" /> : <span className="text-3xl font-bold text-slate-500">#{index + 1}</span>}
                    {isWinner && <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Winner</span>}
                 </div>

                 {/* Team Info */}
                 <div className="flex-1 p-6 flex flex-col justify-center border-r border-slate-700/50 w-full">
                    <div className="flex items-center gap-3 mb-3">
                       <div className={`w-4 h-4 rounded-full ${team.color.split(' ')[0]}`}></div>
                       <h2 className={`text-3xl font-bold ${isWinner ? 'text-white' : 'text-slate-200'}`}>{team.name}</h2>
                    </div>
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                       <div>
                          <p className="text-slate-400 text-xs uppercase">Revenue</p>
                          <p className="text-lg font-mono font-bold text-green-400">${team.metrics.revenue.toLocaleString()}</p>
                       </div>
                       <div>
                          <p className="text-slate-400 text-xs uppercase">Customers</p>
                          <p className="text-lg font-mono font-bold text-blue-400">{team.metrics.customers.toLocaleString()}</p>
                       </div>
                       <div>
                          <p className="text-slate-400 text-xs uppercase">Infra</p>
                          <p className="text-lg font-mono font-bold text-slate-300">{team.metrics.infrastructure}%</p>
                       </div>
                       <div>
                          <p className="text-slate-400 text-xs uppercase">Brand</p>
                          <p className="text-lg font-mono font-bold text-slate-300">{team.metrics.brandAwareness}%</p>
                       </div>
                    </div>
                 </div>

                 {/* Badges Section */}
                 <div className="p-6 w-full md:w-1/3 bg-slate-900/50 rounded-r-2xl flex flex-col justify-center">
                    <p className="text-slate-400 text-xs uppercase font-bold mb-3 flex items-center gap-2">
                      <Award size={14} /> Earned Badges
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {team.badges.length > 0 ? team.badges.map(badgeId => {
                         const badge = BADGES[badgeId];
                         const Icon = badge.icon;
                         return (
                           <div key={badgeId} className="group relative p-2 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                              <Icon size={20} className={badge.color} />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-xs rounded text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                {badge.label}
                              </div>
                           </div>
                         )
                      }) : (
                        <p className="text-slate-600 text-sm italic">No special badges earned.</p>
                      )}
                    </div>
                 </div>
              </div>
             )
          })}
        </div>

        <button
          onClick={resetGame}
          className="bg-slate-700 hover:bg-slate-600 text-white text-lg font-bold py-4 px-10 rounded-full flex items-center gap-2 transition-all shadow-xl hover:scale-105"
        >
          <RotateCcw size={20} /> Start New Simulation
        </button>
      </div>
    );
  };

  // -- Main Layout --

  if (phase === GamePhase.SETUP) return renderSetup();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-lg">
                <Settings className="text-white" size={20} />
             </div>
             <span className="font-bold text-xl tracking-tight">E-Com Tycoon</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400 uppercase font-bold">Round</span>
                <span className="text-xl font-mono font-bold text-white">{currentRound + 1} <span className="text-slate-600">/ {SCENARIOS.length}</span></span>
             </div>
             <button onClick={resetGame} className="text-slate-400 hover:text-red-400 transition-colors" title="Reset Game">
               <RotateCcw size={20} />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          
          {/* Always show Dashboard unless Game Over or Intro */}
          {phase !== GamePhase.GAME_OVER && phase !== GamePhase.SCENARIO_INTRO && (
            <Dashboard teams={teams} currentTeamId={phase === GamePhase.TEAM_TURN ? teams[currentTeamIndex].id : undefined} />
          )}

          {/* Dynamic Stage Content */}
          <div className="flex-1 flex flex-col justify-center">
             {phase === GamePhase.SCENARIO_INTRO && renderScenarioIntro()}
             {phase === GamePhase.TEAM_TURN && renderTeamTurn()}
             {phase === GamePhase.ROUND_SUMMARY && renderSummary()}
             {phase === GamePhase.GAME_OVER && renderGameOver()}
          </div>
        </div>
      </main>
    </div>
  );
}