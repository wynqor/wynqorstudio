import React, { useState } from 'react';
import logo from '../images/logo1.jpeg';

interface ResetPasswordProps {
  onBackToLogin?: () => void;
  onHomeClick?: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onBackToLogin, onHomeClick }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 'Weak', width: '30%', color: 'bg-red-500' };
    if (score <= 3) return { level: 'Medium', width: '60%', color: 'bg-yellow-500' };
    return { level: 'Strong', width: '100%', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased overflow-x-hidden">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 dark:border-b-[#233648] px-6 lg:px-10 py-3 bg-white dark:bg-[#111a22] z-20 relative">
      <div className="flex items-center gap-4 text-black dark:text-white w-full justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2.5 group bg-transparent border-none cursor-pointer"
          >
            <img src={logo} alt="Wynqor" className="size-9 rounded-xl shadow-lg shadow-primary/20 object-cover" />
            <h1 className="text-2xl font-bold tracking-tight dark:text-white text-secondary font-display">Wynqor<span className="text-primary text-3xl leading-none">.</span></h1>
          </button>
        </div>
      </div>
      
    </header>
      <div className="relative flex min-h-screen w-full flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 xl:px-32 relative z-10 bg-background-light dark:bg-background-dark">
        
      

          <div className="mx-auto w-full max-w-[480px] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">Set New Password</h1>
              <p className="text-slate-500 dark:text-[#92adc9] text-sm font-normal leading-normal">
                Please enter a new password for your account. Make sure it's at least 8 characters long.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <label className="flex flex-col flex-1">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">New Password</p>
                <div className="relative">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92adc9] p-[15px] pr-12 text-base font-normal leading-normal"
                    placeholder="Enter your new password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#92adc9] hover:text-primary transition-colors"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </label>

              <div className="flex flex-col gap-2">
                <div className="flex gap-6 justify-between items-center">
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Password Strength</p>
                  <span className="text-primary text-xs font-bold uppercase tracking-wide">{passwordStrength.level}</span>
                </div>
                <div className="rounded-full bg-slate-200 dark:bg-[#324d67] overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${passwordStrength.color}`}
                    style={{ width: passwordStrength.width }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#92adc9]">Must contain at least 1 uppercase letter, 1 number, and 1 symbol.</p>
              </div>

              <label className="flex flex-col flex-1 mt-1">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Confirm Password</p>
                <div className="relative">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92adc9] p-[15px] pr-12 text-base font-normal leading-normal"
                    placeholder="Confirm your new password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#92adc9] hover:text-primary transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </label>

              <div className="pt-2">
                <button
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary hover:bg-[#355238] transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-green-900/20"
                  onClick={handleSubmit}
                >
                  <span className="truncate">Reset Password</span>
                </button>
              </div>

              <div className="flex justify-center mt-2">
                <button
                  onClick={onBackToLogin}
                  className="text-slate-500 dark:text-[#92adc9] text-sm font-medium hover:text-primary dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 relative bg-background-dark overflow-hidden items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
            data-alt="Abstract dark fluid 3D shapes representing creative design"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB869Wxmmxz08ttZcyN7bArRnZe2HmvYS8MWSivL2ctFK2UYn25fsuqXElAyA5lJl8L26QCQ9Oc9WMzpLxuImpjCLa5H417WtXSgx8A-stxjLgb6S-rmFlBZcKYofvglHkhANPrOYuXPiQi2MbjFr3UwcpKVIH6qswp1y7eBqpvLZvuCPBtpfpKhOWtfxVhxxRR1aGCZXn1npxEkGejo4nEYfZ0RHJi8CGDRK0t0wRUCdIyoZFFpD5SVdxQVbGV_q4dvesljXoirmnD')"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-transparent to-primary/20"></div>

          <div className="relative z-10 p-12 max-w-xl">
            <div className="size-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-8 border border-primary/30 text-white">
              <span className="material-symbols-outlined text-3xl">security</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Secure Your Creative Space</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Protecting your portfolio and client data is our priority. Reset your password to get back to creating amazing work with Wynqor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
