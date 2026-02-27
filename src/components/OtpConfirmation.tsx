import React, { useState, useEffect, useRef } from 'react';

interface OtpConfirmationProps {
  onBackToSignup?: () => void;
  onHomeClick?: () => void;
}

const OtpConfirmation: React.FC<OtpConfirmationProps> = ({ onBackToSignup, onHomeClick }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];

    pasteData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#111a22] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-[#233648] px-6 py-4 md:px-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onHomeClick}
              className="flex items-center gap-4 bg-transparent border-none cursor-pointer"
            >
              <div className="size-8 text-primary">
                <span className="material-symbols-outlined text-[32px]">design_services</span>
              </div>
              <h2 className="text-[#111a22] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Wynqor</h2>
            </button>
          </div>
          <a className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
            <span className="material-symbols-outlined text-[20px]">help</span>
            Need Help?
          </a>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-surface-light p-6 shadow-sm dark:border-[#233648] dark:bg-surface-dark md:p-10">
              <div>
                <button
                  onClick={onBackToSignup}
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Back to Sign Up
                </button>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[24px]">lock_reset</span>
                </div>
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#111a22] dark:text-white">Verify Your Account</h1>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  We've sent a 6-digit code to <span className="font-medium text-[#111a22] dark:text-white">user@example.com</span>. Please enter it below to continue.
                </p>
              </div>

              <div className="flex justify-center py-2">
                <fieldset className="flex gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      autoFocus={index === 0}
                      className="flex h-12 w-10 sm:h-14 sm:w-12 items-center justify-center rounded-lg border border-gray-300 bg-transparent text-center text-xl font-semibold text-[#111a22] outline-none ring-offset-2 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-[#324d67] dark:text-white dark:focus:border-primary dark:focus:ring-primary/20"
                    />
                  ))}
                </fieldset>
              </div>

              <button className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Verify & Proceed
              </button>

              <div className="text-center text-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  Didn't receive the code?
                  <button
                    className={`ml-1 font-semibold ${
                      resendTimer > 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-primary hover:underline'
                    }`}
                    disabled={resendTimer > 0}
                  >
                    {resendTimer > 0 ? `Resend in ${formatTime(resendTimer)}` : 'Resend'}
                  </button>
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <a className="hover:text-primary" href="#">Privacy Policy</a>
              <a className="hover:text-primary" href="#">Terms of Service</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OtpConfirmation;
