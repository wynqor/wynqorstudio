import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { initializeGoogleAuth, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Google Auth when component mounts
  useEffect(() => {
    if (!isInitialized && !authLoading) {
      if (import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true' && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        initializeGoogleAuth();
      }
      setIsInitialized(true);
    }
  }, [initializeGoogleAuth, isInitialized, authLoading]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      onLoginSuccess?.();
    }
  }, [isAuthenticated, onLoginSuccess]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white dark:bg-background-dark relative">
      <div className="w-full max-w-[440px] flex flex-col gap-6">
        <div className="text-center mb-4">
          <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">Welcome Back</h1>
          <p className="text-gray-500 dark:text-text-secondary text-base font-normal leading-normal mt-2">
            Access your creative dashboard and manage your projects.
          </p>
        </div>

        {import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true' && import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
          <div className="w-full">
            <div id="google-signin-button" className="w-full"></div>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Google login is disabled on this environment.
          </div>
        )}

        {authLoading && (
          <div className="flex items-center justify-center py-4">
            <span className="material-symbols-outlined animate-spin text-primary">refresh</span>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default LoginForm;
