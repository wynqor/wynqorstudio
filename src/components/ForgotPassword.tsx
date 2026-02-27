import React from 'react';

interface ForgotPasswordProps {
  onBackToLogin?: () => void;
  onResetPasswordClick?: () => void;
  onHomeClick?: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin, onResetPasswordClick, onHomeClick }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onResetPasswordClick?.();
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased overflow-hidden h-screen flex">
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col h-full bg-white dark:bg-[#111a22] border-r border-slate-200 dark:border-[#233648] relative z-10">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 dark:border-b-[#233648] px-6 lg:px-10 py-3 bg-white dark:bg-[#111a22] z-20 relative">
      <div className="flex items-center gap-4 text-black dark:text-white w-full justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2.5 group bg-transparent border-none cursor-pointer"
          >
            <div className="size-9 bg-primary rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center text-white font-black text-xl group-hover:bg-primary-dark transition-colors">W</div>
            <h1 className="text-2xl font-bold tracking-tight dark:text-white text-secondary font-display">Wynqor<span className="text-primary text-3xl leading-none">.</span></h1>
          </button>
        </div>
      </div>
      
    </header>
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 xl:px-24">
          <div className="mb-8">
            <h1 className="text-slate-900 dark:text-white text-[32px] font-bold leading-tight mb-3 tracking-tight">Forgot your password?</h1>
            <p className="text-slate-500 dark:text-[#92adc9] text-sm font-normal leading-relaxed">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal" htmlFor="email">
                Email Address / Mobile Number
              </label>
              <div className="relative flex w-full items-center rounded-lg">
                <input
                  className="form-input flex-1 w-full rounded-lg bg-slate-50 dark:bg-[#192633] text-slate-900 dark:text-white border border-slate-200 dark:border-[#324d67] h-12 px-4 placeholder:text-slate-400 dark:placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all"
                  id="email"
                  placeholder="name@example.com"
                  type="text"
                />
                <div className="absolute right-4 text-slate-400 dark:text-[#92adc9] pointer-events-none flex items-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
                </div>
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center rounded-lg h-12 bg-primary hover:bg-primary/90 text-white text-sm font-bold tracking-[0.015em] transition-colors shadow-lg shadow-primary/20"
              type="submit"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onBackToLogin}
              className="group inline-flex items-center gap-2 text-slate-500 dark:text-[#92adc9] hover:text-primary dark:hover:text-white text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1" style={{ fontSize: '18px' }}>arrow_back</span>
              <span>Back to log in</span>
            </button>
          </div>

          <div className="mt-auto py-6 lg:hidden text-center text-xs text-slate-400 dark:text-slate-600">
            © 2024 Wynqor. All rights reserved.
          </div>
        </div>

        <div className="hidden lg:flex justify-between items-center px-12 py-6 text-xs text-slate-400 dark:text-[#56697d]">
          <span>© 2024 Wynqor Inc.</span>
          <div className="flex gap-4">
            <a className="hover:text-slate-600 dark:hover:text-[#92adc9]" href="#">Privacy</a>
            <a className="hover:text-slate-600 dark:hover:text-[#92adc9]" href="#">Terms</a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 relative bg-slate-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="Abstract 3D dark blue waves and digital particles representing AI technology"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            data-alt="Abstract 3D dark blue waves and digital particles representing AI technology"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB35ZUCXxBMCYrkdcNUMTiv3w9Az1Ynzw471ZznouWrcGGvsvnWYHnjW9ZPBkr-FvDeMCJx1wOXpaOXN5BQeUfNsIfPcfTQ8J_TSIU4QytmvGSnwG8GL7DzrDOfnz2bUFz9Bqp2WgLReYJ1O1o-s7A-DA8zlW80pKdShviGkgIqWGPYKojKP0FMAteHvMaWvxmW6Mvd4xmq_ei32zXEaSC1EUd1Nnq32DOe6BcRidJOT4OEkRp3PgSa_bkujlmzO1sIWhUEq6Bti_0b"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101922] via-[#101922]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-lg text-center px-12">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl shadow-primary/30 rotate-12 backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '48px' }}>auto_awesome</span>
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-4 tracking-tight">AI-Powered Creative Solutions</h3>
          <p className="text-slate-300 text-lg leading-relaxed font-light">
            From affordable branding for startups to premium creative direction for global enterprises. Wynqor bridges the gap with intelligent design.
          </p>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Trusted by innovators globally</span>
            <div className="flex gap-2">
              <div className="flex -space-x-3">
                <img
                  alt="Portrait of a female designer"
                  className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  data-alt="Portrait of a female designer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt0-zzrenLm27Va_GxocXLWw_izalpFoT-cvNtvhjRHYjU38DF304BylJX4o5NK6HB9PlyozeMsx8KU1gPP64F_c6xebaSxWXp25SjsjotNRjHSOlvPLCetSTKV-EhhzOBEoLoWrYxY2SsCFEsx0KAQ1Km5y5EDoJO9HRceP49U-mCIxRrYsGLpY2dUyyceqPCLMKroSNXbbgw_EVeftUxCH0thUV16JTrwvn9CzK7b0hx5pzDYg9FlvwjmjRI2tQJDJ0gtlnwsn-v"
                />
                <img
                  alt="Portrait of a male creative director"
                  className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  data-alt="Portrait of a male creative director"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4O93UlIySYfvdvdo5md2ISc4ACkgUqirtiDNj8mRMdkNClhiSF3ecGsqj4LbrG5ii46RF53rB56CLF_VnUVSSvQ3oYs-CwS9iBvYA4WFKEfJYayc1HKpps3keLod8p_jHELMoMD26D5JaMI_l5IjlHkOpncMqxX2TakBREf8ehoAWYmXd-gAKNK5kMe4qbsaRyhYsOzjlMRnYbjb24-ZbN60YI2oOaGr0HZwR98eoM661HExhTGeXHg17_baoEz6fOJHv6F0S6MKz"
                />
                <img
                  alt="Portrait of a tech lead"
                  className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  data-alt="Portrait of a tech lead"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeOrCzoJf-bUI2H3iKY-UNGqmuNOKQnFiHeJ0EhA6JGn0b3z9i-MBi6AAYsr0iAi0r-UJCR0sA2lizq9vOtMm2F2089AsgL6Smyu_ccTznQzoX4Ru8Eetrg2Q-VLY1jZokM6ip6pQMk990dP7ZekI8Sev2SrAFnXM_2V9iEth_jTCXUmIy9PUTvWmO7TKmA6qF8Z0qdvquLBUbR-pKueR9K0-72QKsV7N1EeRGsHYBvjiKVVAx0QSlKTUSPrnOJ4WJalgzg-ba7jha"
                />
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-medium text-white">
                  +2k
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default ForgotPassword;
