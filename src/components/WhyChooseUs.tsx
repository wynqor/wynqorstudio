import React from 'react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: 'payments',
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprise costs. Affordable rates for startups and premium scalability for global enterprises.',
      color: 'primary'
    },
    {
      icon: 'verified',
      title: 'Vetted Top 1% Talent',
      description: 'Every creative is rigorously tested. Our quality assurance team reviews every project before delivery.',
      color: 'purple'
    },
    {
      icon: 'rocket_launch',
      title: 'AI-Enhanced Efficiency',
      description: 'We leverage cutting-edge AI tools to accelerate workflows, delivering projects 3x faster without compromising creativity.',
      color: 'emerald'
    }
  ];
  const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
    primary: { bg: 'from-primary/15 to-primary/5', text: 'text-primary', ring: 'ring-primary/20' },
    purple: { bg: 'from-purple-500/15 to-purple-500/5', text: 'text-purple-600', ring: 'ring-purple-500/20' },
    emerald: { bg: 'from-emerald-500/15 to-emerald-500/5', text: 'text-emerald-600', ring: 'ring-emerald-500/20' },
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-6 font-display">
            Why Leaders Choose Wynqor
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            We bridge the gap between quality and affordability with our global network of top-tier creatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="absolute -top-px left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary/60 via-purple-500/60 to-emerald-500/60"></div>
              <div className="flex items-start gap-5">
                <div className={`size-16 rounded-xl ring-8 ${colorMap[feature.color].ring} bg-gradient-to-br ${colorMap[feature.color].bg} flex items-center justify-center ${colorMap[feature.color].text} shadow-inner`}>
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-secondary">{feature.title}</h4>
                  <p className="mt-2 text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Wynqor Advantage</span>
                <span className="text-[11px] font-bold text-slate-400">Trusted by teams</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

