import React from 'react';

const Statistics: React.FC = () => {
  const stats = [
    { number: '2.5k+', label: 'Happy Clients' },
    { number: '5k+', label: 'Projects Done' },
    { number: '4.9', label: 'Avg. Rating' },
    { number: '25+', label: 'Global Countries' }
  ];

  return (
    <section className="py-20 bg-secondary text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-x-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <h4 className="text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2">
                {stat.number}
              </h4>
              <p className="text-slate-400 font-medium tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;

