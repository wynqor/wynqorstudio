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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className={`size-20 rounded-2xl bg-${feature.color}-50 flex items-center justify-center text-${feature.color}-600 mb-8 group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-4">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

