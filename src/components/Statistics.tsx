import React from 'react';
import { metrics } from '../data/metrics';
const Statistics: React.FC = () => {
  const stats = metrics;

  return (
    <section className="py-20 bg-secondary text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
                <span className="text-[11px] uppercase tracking-widest text-slate-300 font-bold">{stat.label}</span>
              </div>
              <h4 className="mt-3 text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-300">
                {stat.value}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;

