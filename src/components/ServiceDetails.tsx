import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { services, Service } from '../data/servicesData';
import { getServiceDetails } from '../data/servicesDetailsData';
import { useCart } from '../context/CartContext';
import { useWatchlist } from '../context/WatchlistContext';

interface ServiceDetailsProps {
  serviceId?: string;
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onBackToServices?: () => void;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
  onProviderClick?: () => void;
  onUserClick?: () => void;
  onServiceDetails?: (serviceId: string) => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onBlogClick?: () => void;
  onHelpClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}


const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  serviceId,
  onHomeClick,
  onLoginClick,
  onBackToServices,
  onCartClick,
  onSearch,
  onUserClick,
  onServiceDetails,
  onAboutClick,
  onCareersClick,
  onBlogClick,
  onHelpClick,
  onTermsClick,
  onPrivacyClick
}) => {
  const { addToCart, isInCart } = useCart();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  const handleAddToCart = () => {
    addToCart(service);
  };

  const service = services.find(s => s.id === serviceId) || services[0];
  const staticContent = getServiceDetails(service.id);
  const content = {
    id: service.id,
    description: staticContent?.description || `${service.title} - Professional service to meet your business needs.`,
    whyChoose: staticContent?.whyChoose || `Choose our professional ${service.title.toLowerCase()} service for quality results.`,
    process: staticContent?.process || ['Planning', 'Execution', 'Delivery'],
    features: staticContent?.features || ['Professional Service', 'Quality Guarantee', 'Expert Support'],
    relatedServices: (staticContent?.relatedServices || []).map(id => services.find(s => s.id === id)).filter(Boolean) as Service[]
  };

  // Generate image gallery (using same image for demo)
  const images = [
    service.image,
    service.image,
    service.image,
    service.image
  ];

  // Fullscreen handlers
  const openFullscreen = () => {
    setFullscreenImageIndex(selectedImage);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const nextImage = () => {
    setFullscreenImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setFullscreenImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (event.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const breadcrumbItems = [
    { label: 'Home', href: '#', onClick: onHomeClick },
    { label: 'Services', href: '#', onClick: onBackToServices },
    { label: service.category, href: '#', onClick: onBackToServices },
    { label: service.title, href: '#', current: true }
  ];

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onSearch={onSearch}
        onCartClick={onCartClick}
        onUserClick={onUserClick}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white sticky top-20 z-40">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex items-center h-14 text-sm text-slate-500">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pr-4">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
                  )}
                  {item.current ? (
                    <span className="text-slate-900 font-semibold">{item.label}</span>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="w-full pb-20">
        <section className="py-10 lg:py-14">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Main Content */}
              <div className="lg:col-span-7 space-y-6">
                {/* Main Image */}
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative group">
                  <img
                    alt={service.title}
                    className="w-full h-full object-cover"
                    src={images[selectedImage]}
                  />
                  <button
                    onClick={openFullscreen}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-slate-800 p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
                  >
                    <span className="material-symbols-outlined">fullscreen</span>
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${
                        index === selectedImage
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        src={image}
                      />
                    </button>
                  ))}
                </div>

                {/* About Section - Desktop */}
                <div className="hidden lg:block pt-10 border-t border-slate-200 mt-10">
                  <h3 className="text-xl font-bold text-secondary mb-6 font-display">About This Service</h3>
                  <div className="prose prose-slate text-slate-600 max-w-none">
                    <p className="mb-4">{content.description}</p>
                    <p className="mb-4">{content.whyChoose}</p>
                    <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Our Process:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {content.process.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-40 space-y-8">
                  {/* Service Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {service.isBestseller && (
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          Bestseller
                        </span>
                      )}
                      {service.isTrending && (
                        <span className="bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          Trending
                        </span>
                      )}
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">•</span>
                      <button
                        onClick={onBackToServices}
                        className="text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        {service.category}
                      </button>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-secondary font-display leading-tight mb-4">
                      {service.title}
                    </h1>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined fill text-yellow-400 text-[20px]">star</span>
                        <span className="text-slate-900 font-bold text-lg">{service.rating}</span>
                        <span className="text-slate-400 text-sm ml-1">(127 Reviews)</span>
                      </div>
                      <div className="h-4 w-px bg-slate-300"></div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Verified Pro
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInWatchlist(service.id)) {
                              removeFromWatchlist(service.id);
                            } else {
                              addToWatchlist(service);
                            }
                          }}
                          className={`size-8 ${isInWatchlist(service.id) ? 'bg-white text-rose-600' : 'bg-white/20 text-slate-600 hover:bg-white hover:text-rose-500'} backdrop-blur rounded-full flex items-center justify-center transition-all`}
                          title={isInWatchlist(service.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        >
                          <span className={`material-symbols-outlined text-[18px] ${isInWatchlist(service.id) ? 'fill' : ''}`}>favorite</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {service.title} - Perfect for businesses looking to make a professional impression.
                    </p>
                  </div>

                  {/* Pricing Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="p-6 md:p-8 space-y-6">
                      <div className="flex items-baseline justify-between border-b border-slate-100 pb-6">
                        <div>
                          <span className="text-sm text-slate-500 font-medium block mb-1">Starting at</span>
                          <span className="text-4xl font-black text-secondary">{service.price}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            {service.duration} Delivery
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">inventory_2</span>
                          What You'll Get
                        </h4>
                        <ul className="space-y-3">
                          {content.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                              <span className="material-symbols-outlined text-emerald-500 text-[20px] shrink-0">check</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 pt-2">
                        <button
                          onClick={handleAddToCart}
                          disabled={isInCart(service.id)}
                          className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-400 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isInCart(service.id) ? (
                            <>
                              <span className="material-symbols-outlined">check</span>
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined">add_shopping_cart</span>
                              Add to Cart
                            </>
                          )}
                        </button>
                        <button className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-secondary font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                          Contact Seller
                        </button>
                      </div>

                      {/* Trust Badges */}
                      <div className="flex items-center justify-center gap-4 pt-2">
                        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <span className="material-symbols-outlined text-[16px]">lock</span> Secure Payment
                        </div>
                        <div className="h-3 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <span className="material-symbols-outlined text-[16px]">verified</span> Quality Guarantee
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
                    <div className="size-14 rounded-full bg-slate-200 overflow-hidden shrink-0">
                      <img
                        alt="Seller"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLqKN7izwbiUmkazVuSykHcmS3fOEOaNinbCErc_SNB-txaJIqfE3U3HoGAoYp22h5Yab-DI6fI4lZGYYjZsEdu1z5_UEjfKNAPc69nUbX_ny8lNVvs97KRuAu9Ro-L9Ni_mMXm7lyf6Ui33rG1mzlQWENaKlfnkbuBbKh_psOdw1Mgfz5xxd8mWNqd3MzjOz-RKt-o1IqnL3mFTT5amF5y5U0XHQzxtVApouU5a17ZwYg4XE73Bd8hYQstVT7rqilZiyHpzjls_50"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">Wynqor Studio Team</h4>
                      <p className="text-xs text-slate-500 truncate">Global Creative Collective • 98% Job Success</p>
                    </div>
                    <button className="text-primary font-bold text-sm hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile About Section */}
              <div className="lg:hidden col-span-1 pt-8 border-t border-slate-200">
                <h3 className="text-xl font-bold text-secondary mb-4 font-display">About This Service</h3>
                <div className="prose prose-slate text-slate-600 max-w-none">
                  <p className="mb-4">{content.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {content.relatedServices.length > 0 && (
          <section className="py-16 bg-slate-100/50 border-t border-slate-200">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold text-secondary font-display">
                  Related Services in {service.category}
                </h3>
                <div className="flex gap-2">
                  <button className="size-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary flex items-center justify-center transition-all shadow-sm">
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <button className="size-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary flex items-center justify-center transition-all shadow-sm">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 lg:-mx-6 lg:px-6">
                <div className="flex gap-6 w-max">
                  {content.relatedServices.map((relatedService, index) => (
                    <div
                      key={index}
                      onClick={() => onServiceDetails?.(relatedService.id)}
                      className="w-[300px] group cursor-pointer"
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative shadow-sm border border-slate-200/60">
                        <img
                          alt={relatedService.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={relatedService.image}
                        />
                        {relatedService.rating && (
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined fill text-yellow-400 text-[12px]">star</span>
                            {relatedService.rating}
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors mb-1">
                        {relatedService.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                          Starting at <span className="font-bold text-slate-700">{relatedService.price}</span>
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="size-5 rounded-full bg-slate-200 overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLqKN7izwbiUmkazVuSykHcmS3fOEOaNinbCErc_SNB-txaJIqfE3U3HoGAoYp22h5Yab-DI6fI4lZGYYjZsEdu1z5_UEjfKNAPc69nUbX_ny8lNVvs97KRuAu9Ro-L9Ni_mMXm7lyf6Ui33rG1mzlQWENaKlfnkbuBbKh_psOdw1Mgfz5xxd8mWNqd3MzjOz-RKt-o1IqnL3mFTT5amF5y5U0XHQzxtVApouU5a17ZwYg4XE73Bd8hYQstVT7rqilZiyHpzjls_50"
                              alt="Service provider avatar"
                            />
                          </span>
                          <span className="text-xs text-slate-500">Wynqor Pro</span>
                        </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInWatchlist(relatedService.id)) {
                                removeFromWatchlist(relatedService.id);
                              } else {
                                addToWatchlist(relatedService);
                              }
                            }}
                            className={`ml-2 size-6 ${isInWatchlist(relatedService.id) ? 'bg-white text-rose-600' : 'bg-white/20 text-slate-600 hover:bg-white hover:text-rose-500'} rounded-full flex items-center justify-center`}
                            title={isInWatchlist(relatedService.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                          >
                            <span className={`material-symbols-outlined text-[16px] ${isInWatchlist(relatedService.id) ? 'fill' : ''}`}>favorite</span>
                          </button>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onBlogClick={onBlogClick}
        onHelpClick={onHelpClick}
        onTermsClick={onTermsClick}
        onPrivacyClick={onPrivacyClick}
      />

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 z-10 bg-white/10 backdrop-blur text-white p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-6 z-10 bg-white/10 backdrop-blur text-white p-4 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
            disabled={images.length <= 1}
          >
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 z-10 bg-white/10 backdrop-blur text-white p-4 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
            disabled={images.length <= 1}
          >
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>

          {/* Main Image */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={images[fullscreenImageIndex]}
              alt={`${service.title} - Image ${fullscreenImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium">
            {fullscreenImageIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto no-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setFullscreenImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === fullscreenImageIndex
                    ? 'border-white shadow-lg scale-110'
                    : 'border-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
