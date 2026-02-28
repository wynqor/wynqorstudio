import React from 'react';
import { services, Service } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import { useWatchlist } from '../context/WatchlistContext';

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
              <span className="material-symbols-outlined text-[14px] fill text-yellow-500">star</span> {service.rating}
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

interface PopularServicesProps {
  onServiceDetails?: (serviceId: string) => void;
}

const PopularServices: React.FC<PopularServicesProps> = ({ onServiceDetails }) => {
  // Show first 10 popular services
  const popularServices = services.slice(0, 10);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h3 className="text-3xl font-bold text-secondary mb-3 font-display">Popular Feature Services</h3>
            <p className="text-slate-500 text-lg">Curated professional subservices tailored for your growth.</p>
          </div>
          {/* <a className="text-primary font-bold hover:underline decoration-2 underline-offset-4 flex items-center gap-1 transition-all hover:translate-x-1" href="#">
            View All Categories <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </a> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {popularServices.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onDetailsClick={() => onServiceDetails?.(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;

  
