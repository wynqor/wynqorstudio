import React from 'react';
import { categories } from '../data/servicesData';

interface ServicesNavigationProps {
  onCategoryClick?: (categoryId: string) => void;
}

const ServicesNavigation: React.FC<ServicesNavigationProps> = ({ onCategoryClick }) => {

  return (
    <section className="border-b border-slate-200 bg-white sticky top-20 z-40 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onCategoryClick?.('all')}
            className={`group shrink-0 flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors py-4 px-1 relative text-slate-600 bg-transparent border-none cursor-pointer`}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              apps
            </span>
            All Services
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => onCategoryClick?.(category.id)}
              className={`group shrink-0 flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors py-4 px-1 relative text-slate-600 bg-transparent border-none cursor-pointer`}
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                {category.icon}
              </span>
              {category.name}
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesNavigation;

