import React from 'react';
import LoginHeader from './LoginHeader';
import LoginSidebar from './LoginSidebar';
import LoginForm from './LoginForm';

interface LoginProps {
  onHomeClick?: () => void;
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onHomeClick, onRegisterClick, onForgotPasswordClick, onLoginSuccess }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col overflow-x-hidden">
      <LoginHeader onHomeClick={onHomeClick} />
      <div className="flex flex-1 flex-col lg:flex-row h-full">
        <LoginSidebar />
        <LoginForm
          onRegisterClick={onRegisterClick}
          onForgotPasswordClick={onForgotPasswordClick}
          onLoginSuccess={onLoginSuccess}
        />
      </div>
    </div>
  );
};

export default Login;
