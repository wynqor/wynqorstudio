import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { services, Service } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import { useWatchlist } from '../context/WatchlistContext';
import { recommendationsData } from '../data/recommendationsData';

interface AllServicesProps {
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onSearch?: (query: string) => void;
  onClearAllFilters?: () => void;
  onServiceDetails?: (serviceId: string) => void;
  onCartClick?: () => void;
  onProviderClick?: () => void;
  searchQuery?: string;
  selectedCategory?: string;
}

interface ServiceCardProps {
  service: Service;
  onDetailsClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onDetailsClick
}) => {
  const { addToCart, isInCart } = useCart();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onDetailsClick
    addToCart(service);
  };
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm card-hover-effect transition-all duration-300 flex flex-col h-full">
      <div className="h-48 relative overflow-hidden">
        <img
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={service.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {service.isBestseller && (
          <span className="absolute top-3 left-3 bg-secondary/90 backdrop-blur shadow-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider z-10">
            Bestseller
          </span>
        )}
        {service.isTrending && (
          <span className="absolute top-3 left-3 bg-red-500/90 backdrop-blur shadow-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider z-10">
            Trending
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isInWatchlist(service.id)) {
              removeFromWatchlist(service.id);
            } else {
              addToWatchlist(service);
            }
          }}
          className={`absolute top-3 right-3 size-8 ${
            isInWatchlist(service.id) ? 'bg-white text-rose-600' : 'bg-white/20 text-white hover:bg-white hover:text-rose-500'
          } backdrop-blur rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10`}
        >
          <span className={`material-symbols-outlined text-[18px] ${isInWatchlist(service.id) ? 'fill' : ''}`}>favorite</span>
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{service.category}</span>
          {service.rating && (
            <span className="ml-auto flex items-center gap-0.5 text-xs font-bold text-slate-700">
              <span className="material-symbols-outlined text-[14px] fill text-yellow-500">star</span>
              {service.rating}
            </span>
          )}
        </div>
        <h4 className="font-bold text-base text-slate-800 line-clamp-2 mb-3 group-hover:text-primary transition-colors leading-snug">
          {service.title}
        </h4>
        <div className="mt-auto mb-3 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Starting at</span>
            <span className="text-lg font-black text-slate-800">{service.price}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{service.duration}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onDetailsClick}
            className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
          >
            Details
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isInCart(service.id)}
            className="size-10 flex-none rounded-lg bg-primary hover:bg-primary-dark disabled:bg-slate-400 text-white flex items-center justify-center shadow-md transition-colors disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isInCart(service.id) ? 'check' : 'add_shopping_cart'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AllServices: React.FC<AllServicesProps> = ({
  onHomeClick,
  onLoginClick,
  onSearch,
  onClearAllFilters,
  onServiceDetails,
  onCartClick,
  onProviderClick,
  searchQuery = '',
  selectedCategory = ''
}) => {
  const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory || 'All Services');
  const [hasUserChangedCategory, setHasUserChangedCategory] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under-1000' | '1000-5000' | '5000-10000' | 'over-10000'>('all');
  const [durationRange, setDurationRange] = useState<'all' | '1-3' | '4-7' | '8-14' | 'over-14'>('all');
  const [ratingFilter, setRatingFilter] = useState<'all' | '4.5+' | '4.0+' | '3.5+'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'price-low' | 'price-high'>('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 4 rows × 5 columns max
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Update category state when prop changes (user navigates to new category)
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategoryState(selectedCategory);
      setHasUserChangedCategory(false); // Reset flag when prop changes
    } else {
      // If selectedCategory becomes empty (cleared), reset to All Services
      setSelectedCategoryState('All Services');
      setHasUserChangedCategory(false);
    }
  }, [selectedCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedCategoryState, priceRange, durationRange, ratingFilter, sortBy]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of services section
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (currentPage <= 3) {
        // Near the start
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter services based on all criteria
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by search query (from props)
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category - use local state if user has manually changed it, otherwise use prop
    const activeCategoryFilter = hasUserChangedCategory ? selectedCategoryState : selectedCategory;
    if (activeCategoryFilter && activeCategoryFilter !== 'All Services') {
      filtered = filtered.filter(service => service.category === activeCategoryFilter);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(service => {
        const price = parseInt(service.price.replace('₹', '').replace(',', ''));
        switch (priceRange) {
          case 'under-1000': return price < 1000;
          case '1000-5000': return price >= 1000 && price <= 5000;
          case '5000-10000': return price >= 5000 && price <= 10000;
          case 'over-10000': return price > 10000;
          default: return true;
        }
      });
    }

    // Filter by duration
    if (durationRange !== 'all') {
      filtered = filtered.filter(service => {
        const duration = parseInt(service.duration.split(' ')[0]);
        switch (durationRange) {
          case '1-3': return duration >= 1 && duration <= 3;
          case '4-7': return duration >= 4 && duration <= 7;
          case '8-14': return duration >= 8 && duration <= 14;
          case 'over-14': return duration > 14;
          default: return true;
        }
      });
    }

    // Filter by rating
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(service => {
        const rating = parseFloat(service.rating || '0');
        switch (ratingFilter) {
          case '4.5+': return rating >= 4.5;
          case '4.0+': return rating >= 4.0;
          case '3.5+': return rating >= 3.5;
          default: return true;
        }
      });
    }

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', ''));
        case 'price-high':
          return parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', ''));
        case 'newest':
          // For demo purposes, we'll assume services with higher ratings are "newer"
          return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
        case 'recommended':
        default:
          // Recommended: prioritize by rating, then by bestseller/trending status
          const aScore = (parseFloat(a.rating || '0') * 10) + (a.isBestseller ? 50 : 0) + (a.isTrending ? 25 : 0);
          const bScore = (parseFloat(b.rating || '0') * 10) + (b.isBestseller ? 50 : 0) + (b.isTrending ? 25 : 0);
          return bScore - aScore;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedCategoryState, priceRange, durationRange, ratingFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // Use static recommendations data
  const recommendations = recommendationsData;

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onSearch={onSearch}
        onCartClick={onCartClick}
        onProviderClick={onProviderClick}
      />


      <main className="w-full min-h-screen pb-20">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-primary/30 z-0"></div>
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="text-primary-light font-bold text-sm tracking-wider uppercase mb-2 block">
                Explore Our Marketplace
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                All Professional Services
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Browse our comprehensive list of creative and technical services. From quick fixes to enterprise-grade projects, find exactly what you need.
              </p>
            </div>
          </div>
        </section>

        {/* Filter/Sort Section */}
        <section className="border-b border-slate-200 bg-white sticky top-20 lg:top-[4.9rem] z-40 shadow-sm">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500 font-medium">
              Showing <span className="text-secondary font-bold">{((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredServices.length)}</span> of <span className="text-secondary font-bold">{filteredServices.length}</span> services
            </div>
            <div className="flex items-center gap-3">
              <div className="relative" ref={filterDropdownRef}>
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white hover:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span> Filter
                  <span className="material-symbols-outlined text-[14px]">
                    {showFilterDropdown ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {showFilterDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-4">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                          id="category-filter"
                          value={selectedCategoryState}
                          onChange={(e) => {
                            setSelectedCategoryState(e.target.value);
                            setHasUserChangedCategory(true);
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="All Services">All Services</option>
                          <option value="Branding & Identity Design">Branding & Identity Design</option>
                          <option value="Poster & Graphic Design">Poster & Graphic Design</option>
                          <option value="Outdoor Advertising & Media">Outdoor Advertising & Media</option>
                          <option value="Website Design & Development">Website Design & Development</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Content Writing">Content Writing</option>
                          <option value="Video Creation & Animation">Video Creation & Animation</option>
                          <option value="Photography & Creative Media">Photography & Creative Media</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="price-range" className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
                        <select
                          id="price-range"
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value as any)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="all">All Prices</option>
                          <option value="under-1000">Under ₹1,000</option>
                          <option value="1000-5000">₹1,000 - ₹5,000</option>
                          <option value="5000-10000">₹5,000 - ₹10,000</option>
                          <option value="over-10000">Over ₹10,000</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="duration-range" className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                        <select
                          id="duration-range"
                          value={durationRange}
                          onChange={(e) => setDurationRange(e.target.value as any)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="all">All Durations</option>
                          <option value="1-3">1-3 Days</option>
                          <option value="4-7">4-7 Days</option>
                          <option value="8-14">8-14 Days</option>
                          <option value="over-14">Over 14 Days</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="rating-filter" className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                        <select
                          id="rating-filter"
                          value={ratingFilter}
                          onChange={(e) => setRatingFilter(e.target.value as any)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="all">All Ratings</option>
                          <option value="4.5+">4.5+ Stars</option>
                          <option value="4.0+">4.0+ Stars</option>
                          <option value="3.5+">3.5+ Stars</option>
                        </select>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            // Clear parent state (search query and navigation category)
                            onClearAllFilters?.();

                            // Clear local filter states
                            setSelectedCategoryState('All Services');
                            setHasUserChangedCategory(false);
                            setPriceRange('all');
                            setDurationRange('all');
                            setRatingFilter('all');
                          }}
                          className="flex-1 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={() => {
                            setShowFilterDropdown(false);
                            setCurrentPage(1);
                          }}
                          className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <label htmlFor="sort-by" className="sr-only">Sort by</label>
                <span>Sort by:</span>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none py-0 pl-0 pr-8 text-sm font-bold text-secondary focus:ring-0 cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {paginatedServices.map((service, index) => (
                <ServiceCard
                  key={`${service.id}-${index}`}
                  service={service}
                  onDetailsClick={() => onServiceDetails?.(service.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 transition-colors ${
                      currentPage === 1
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-600 hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>

                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={`size-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                          page === currentPage
                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                            : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 transition-colors ${
                      currentPage === totalPages
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-600 hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Recommendations */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-secondary font-display">
                You Might Be Interested In
              </h3>
              <a className="text-sm font-semibold text-primary hover:underline" href="#">
                View Recommendations
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div
                  key={index}
                  onClick={() => onServiceDetails?.(rec.id)}
                  className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group cursor-pointer"
                >
                  <div className="size-24 rounded-lg overflow-hidden shrink-0">
                    <img alt={rec.title} className="w-full h-full object-cover" src={rec.image} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide block mb-1">
                      {rec.category}
                    </span>
                    <h4 className="font-bold text-slate-800 leading-tight mb-1 group-hover:text-primary transition-colors">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">{rec.description}</p>
                    <span className="font-black text-sm text-secondary">{rec.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllServices;
