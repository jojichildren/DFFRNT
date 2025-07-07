
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { History, HistoryEntry } from '../types';

interface DashboardProps {
  history: History;
}

const getPastSevenDaysData = (history: History) => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const entry = history[dateString];

    let percentage = 0;
    if (entry && entry.totalTasks > 0) {
      percentage = Math.round((entry.completedTasks.length / entry.totalTasks) * 100);
    }
    
    data.push({
      name: dateString.substring(5).replace('-', '/'), // Format to MM/DD
      completion: percentage,
    });
  }
  return data;
};

const formatSleepDuration = (durationMs: number): string => {
    if (durationMs <= 0) return "N/A";
    const totalMinutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
};


const Dashboard: React.FC<DashboardProps> = ({ history }) => {
  const chartData = getPastSevenDaysData(history);

  const getYesterdayDateString = () => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return d.toISOString().split('T')[0];
  }
  const yesterdayHistory = history[getYesterdayDateString()];
  const lastNightSleepDuration = (yesterdayHistory?.sleepEndTime && yesterdayHistory?.sleepStartTime)
      ? yesterdayHistory.sleepEndTime - yesterdayHistory.sleepStartTime
      : 0;

  return (
    <div className="w-full bg-surface rounded-lg p-4 animate-fade-in space-y-8">
        <div>
            <h3 className="text-secondary text-sm font-bold tracking-widest uppercase mb-2 text-center">Last Night's Sleep</h3>
            <p className="text-primary text-4xl font-black text-center">
                {formatSleepDuration(lastNightSleepDuration)}
            </p>
        </div>
        <div>
            <h3 className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 text-center">Last 7 Days Consistency</h3>
            <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="name" stroke="#A3A3A3" tick={{ fill: '#A3A3A3' }} />
                    <YAxis stroke="#A3A3A3" unit="%" tick={{ fill: '#A3A3A3' }} domain={[0, 100]} />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: '#0A0A0A',
                        borderColor: '#2A2A2A',
                        color: '#F5F5F5'
                        }}
                        cursor={{ fill: 'rgba(245, 245, 245, 0.1)' }}
                    />
                    <Bar dataKey="completion" fill="#F5F5F5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
