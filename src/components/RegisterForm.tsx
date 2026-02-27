import React, { useState } from 'react';

interface RegisterFormProps {
  onLoginClick?: () => void;
  onOtpClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginClick, onOtpClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
      <div className="max-w-[520px] mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-slate-500 dark:text-[#92adc9]">Unlock premium design solutions today.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onOtpClick?.(); }} className="space-y-6">
          <div className="space-y-2">
            <label className="text-slate-700 dark:text-white text-sm font-medium" htmlFor="fullname">
              Full Name
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-lg border-slate-300 dark:border-[#324d67] bg-slate-50 dark:bg-[#192633] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9] focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm p-3.5 pl-11"
                id="fullname"
                placeholder="Enter your full name"
                type="text"
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-[#92adc9]">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-700 dark:text-white text-sm font-medium" htmlFor="mobile">
              Mobile Number
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-[#92adc9]">
                  <span className="material-symbols-outlined text-[20px]">smartphone</span>
                </div>
                <input
                  className="block w-full rounded-lg border-slate-300 dark:border-[#324d67] bg-slate-50 dark:bg-[#192633] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9] focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm p-3.5 pl-11"
                  id="mobile"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>
              <button
                className="whitespace-nowrap px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg text-sm font-semibold transition-colors"
                type="button"
              >
                Generate OTP
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-700 dark:text-white text-sm font-medium" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-lg border-slate-300 dark:border-[#324d67] bg-slate-50 dark:bg-[#192633] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9] focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm p-3.5 pl-11"
                id="email"
                placeholder="name@example.com"
                type="email"
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-[#92adc9]">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-700 dark:text-white text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-lg border-slate-300 dark:border-[#324d67] bg-slate-50 dark:bg-[#192633] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9] focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm p-3.5 pl-11 pr-10"
                id="password"
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-[#92adc9]">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-[#92adc9] hover:text-slate-600 dark:hover:text-white transition-colors"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#92adc9] mt-1">Must be at least 8 characters long.</p>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <div className="flex h-5 items-center">
              <input
                className="h-4 w-4 rounded border-slate-300 dark:border-[#324d67] bg-slate-50 dark:bg-[#192633] text-primary focus:ring-primary dark:focus:ring-offset-gray-900"
                id="terms"
                name="terms"
                type="checkbox"
              />
            </div>
            <div className="text-sm">
              <label className="font-medium text-slate-700 dark:text-slate-300" htmlFor="terms">
                I agree to the <a className="text-primary hover:text-[#355237] hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:text-[#355237] hover:underline" href="#">Privacy Policy</a>.
              </label>
            </div>
          </div>

          <button
            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-[#355237] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            type="button"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?
            <button
              onClick={onLoginClick}
              className="font-semibold text-primary hover:text-[#355237] transition-colors ml-1"
            >
              Log In
            </button>
          </p>
        </div>

        <div className="relative mt-10">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-[#324d67]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-[#16212c] px-2 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Trusted by design leaders
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <span className="material-symbols-outlined text-3xl text-slate-600 dark:text-white" title="Partner 1">pentagon</span>
          <span className="material-symbols-outlined text-3xl text-slate-600 dark:text-white" title="Partner 2">hexagon</span>
          <span className="material-symbols-outlined text-3xl text-slate-600 dark:text-white" title="Partner 3">diamond</span>
          <span className="material-symbols-outlined text-3xl text-slate-600 dark:text-white" title="Partner 4">change_history</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
