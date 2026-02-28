import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

import Header from './components/Header';
import Hero from './components/Hero';
import ServicesNavigation from './components/ServicesNavigation';
import PopularServices from './components/PopularServices';
import FeaturedPackages from './components/FeaturedPackages';
import WhyChooseUs from './components/WhyChooseUs';
import Statistics from './components/Statistics';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import OtpConfirmation from './components/OtpConfirmation';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AllServices from './components/AllServices';
import ServiceDetails from './components/ServiceDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Success from './components/Success';
import BecomeProvider from './components/BecomeProvider';
import Dashboard from './components/Dashboard';
import Failed from './components/Failed';
import { categories } from './data/servicesData';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WatchlistProvider>
          <AppContent />
        </WatchlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'otp' | 'forgot-password' | 'reset-password' | 'all-services' | 'service-details' | 'cart' | 'checkout' | 'success' | 'failed' | 'provider' | 'dashboard'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const togglePage = (page: 'home' | 'login' | 'register' | 'otp' | 'forgot-password' | 'reset-password' | 'all-services' | 'service-details' | 'cart' | 'checkout' | 'success' | 'failed' | 'provider' | 'dashboard', serviceId?: string) => {
    setCurrentPage(page);
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
    setCurrentPage('all-services');
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategory('');
      setSearchQuery('');
      setCurrentPage('all-services');
    } else {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setSelectedCategory(category.name);
        setSearchQuery('');
        setCurrentPage('all-services');
      }
    }
  };

  if (currentPage === 'login') {
    return <Login
      onHomeClick={() => togglePage('home')}
      onRegisterClick={() => togglePage('register')}
      onForgotPasswordClick={() => togglePage('forgot-password')}
      onLoginSuccess={() => togglePage('home')}
    />;
  }

  if (currentPage === 'register') {
    return <Register
      onLoginClick={() => togglePage('login')}
      onOtpClick={() => togglePage('otp')}
      onHomeClick={() => togglePage('home')}
    />;
  }

  if (currentPage === 'otp') {
    return <OtpConfirmation
      onBackToSignup={() => togglePage('register')}
      onHomeClick={() => togglePage('home')}
    />;
  }

  if (currentPage === 'forgot-password') {
    return <ForgotPassword
      onBackToLogin={() => togglePage('login')}
      onResetPasswordClick={() => togglePage('reset-password')}
      onHomeClick={() => togglePage('home')}
    />;
  }

  if (currentPage === 'reset-password') {
    return <ResetPassword
      onBackToLogin={() => togglePage('login')}
      onHomeClick={() => togglePage('home')}
    />;
  }

  if (currentPage === 'all-services') {
    return <AllServices
      onHomeClick={() => togglePage('home')}
      onLoginClick={() => togglePage('login')}
      onSearch={handleSearch}
      onProviderClick={() => togglePage('provider')}
      onClearAllFilters={handleClearAllFilters}
      onServiceDetails={(serviceId) => togglePage('service-details', serviceId)}
      onCartClick={() => togglePage('cart')}
      searchQuery={searchQuery}
      selectedCategory={selectedCategory}
    />;
  }

  if (currentPage === 'service-details') {
    return <ServiceDetails
      serviceId={selectedServiceId}
      onHomeClick={() => togglePage('home')}
      onLoginClick={() => togglePage('login')}
      onBackToServices={() => togglePage('all-services')}
      onProviderClick={() => togglePage('provider')}
      onCartClick={() => togglePage('cart')}
      onSearch={handleSearch}
      onServiceDetails={(serviceId) => togglePage('service-details', serviceId)}
    />;
  }

  if (currentPage === 'cart') {
    return (
      <Cart
        onHomeClick={() => togglePage('home')}
        onLoginClick={() => togglePage('login')}
        onBackToServices={() => togglePage('all-services')}
        onCheckout={() => togglePage('checkout')}
        onContinueShopping={() => togglePage('all-services')}
        onSearch={handleSearch}
        onCartClick={() => togglePage('cart')}
      />
    );
  }

  if (currentPage === 'checkout') {
    return (
      <Checkout
        onHomeClick={() => togglePage('home')}
        onLoginClick={() => togglePage('login')}
        onBackToCart={() => togglePage('cart')}
        onSearch={handleSearch}
        onCartClick={() => togglePage('cart')}
        onSubmitSuccess={(requestId, error) => {
          if (requestId) {
            // Success - navigate to success page with request ID
            togglePage('success');
            // Store request ID for success page
            setTimeout(() => {
              // In a real app, you'd pass the requestId to the success page
              console.log('Request submitted successfully with ID:', requestId);
            }, 100);
          } else {
            // Error - navigate to failed page
            togglePage('failed');
            console.error('Request submission failed:', error);
          }
        }}
      />
    );
  }

  if (currentPage === 'success') {
    // In a real app, you'd store the requestId from the checkout process
    const requestId = sessionStorage.getItem('lastRequestId') || `REQ-${Date.now().toString().slice(-6).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    return (
      <Success
        requestId={requestId}
        onHomeClick={() => togglePage('home')}
        onLoginClick={() => togglePage('login')}
        onSearch={handleSearch}
        onCartClick={() => togglePage('cart')}
        onDashboardClick={() => togglePage('dashboard')}
        onExploreServices={() => togglePage('all-services')}
      />
    );
  }

  if (currentPage === 'failed') {
    return (
      <Failed
        onHomeClick={() => togglePage('home')}
        onLoginClick={() => togglePage('login')}
        onSearch={handleSearch}
        onCartClick={() => togglePage('cart')}
        onProviderClick={() => togglePage('provider')}
        onTryAgain={() => togglePage('checkout')}
        onContactSupport={() => alert('Support contact coming soon!')}
      />
    );
  }
  
  if (currentPage === 'provider') {
    return <BecomeProvider
      onHomeClick={() => togglePage('home')}
      onLoginClick={() => togglePage('login')}
      onSearch={handleSearch}
      onCartClick={() => togglePage('cart')}
    />;
  }
  
  if (currentPage === 'dashboard') {
    if (!isAuthenticated || !user) {
      setCurrentPage('login');
    }
    return <Dashboard
      onHomeClick={() => togglePage('home')}
      onLoginClick={() => togglePage('login')}
      onSearch={handleSearch}
      onCartClick={() => togglePage('cart')}
      onServiceDetails={(serviceId) => togglePage('service-details', serviceId)}
    />;
  }

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header
        onLoginClick={() => togglePage('login')}
        onHomeClick={() => togglePage('home')}
        onSearch={handleSearch}
        onCartClick={() => togglePage('cart')}
        onProviderClick={() => togglePage('provider')}
        onUserClick={() => togglePage('dashboard')}
      />
      <main className="w-full">
        <Hero onSearch={handleSearch} />
        <ServicesNavigation onCategoryClick={handleCategorySelect} />
        <PopularServices onServiceDetails={(serviceId) => togglePage('service-details', serviceId)} />
        <FeaturedPackages />
        <WhyChooseUs />
        <Statistics />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
