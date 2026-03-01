import React from 'react';
import logo from '../images/logo1.jpeg';

interface LoginHeaderProps {
  onHomeClick?: () => void;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ onHomeClick }) => {
  return (
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
  );
};

export default LoginHeader;
