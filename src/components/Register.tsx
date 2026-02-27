import React from 'react';
import RegisterHeader from './RegisterHeader';
import RegisterSidebar from './RegisterSidebar';
import RegisterForm from './RegisterForm';

interface RegisterProps {
  onLoginClick?: () => void;
  onOtpClick?: () => void;
  onHomeClick?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLoginClick, onOtpClick, onHomeClick }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root">
      <RegisterHeader onLoginClick={onLoginClick} onHomeClick={onHomeClick} />
      <main className="flex-grow flex items-center justify-center p-4 lg:p-8 relative">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] opacity-30"></div>
        </div>
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row bg-white dark:bg-[#192633]/60 dark:backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-[#233648] overflow-hidden shadow-2xl z-10">
          <RegisterSidebar />
          <RegisterForm onLoginClick={onLoginClick} onOtpClick={onOtpClick} />
        </div>
      </main>
    </div>
  );
};

export default Register;
