import React, { useState, useMemo } from 'react';
import { Product, Language, Category } from '../types';
import { CATEGORIES_LIST } from '../data/products';
import { ProductCard } from './ProductCard';
import { TRANSLATIONS } from '../translations';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  language: Language;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  language,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const t = TRANSLATIONS[language];

  const filteredProducts = useMemo(() => {
    let list = selectedCategory === 'all' 
      ? [...products] 
      : products.filter(p => p.category === selectedCategory);

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceDT - b.priceDT);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceDT - a.priceDT);
    }
    return list;
  }, [products, selectedCategory, sortBy]);

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#C8A97E]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8A97E] font-medium">
              {t.products.titleKicker}
            </span>
            <span className="h-px w-8 bg-[#C8A97E]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#0D1B2A] font-normal leading-tight mb-4">
            {t.products.title}
          </h2>

          <p className="text-sm text-[#0D1B2A]/75 font-light leading-relaxed">
            {t.products.subtitle}
          </p>
        </div>

        {/* Clean Filter Bar & Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#0D1B2A]/10 mb-12">
          {/* Category Tabs (zero pill discipline: clean underline / active state) */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const label = language === 'ar' ? cat.nameAr : cat.nameFr;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id as Category)}
                  className={`text-xs uppercase tracking-[0.16em] whitespace-nowrap py-2 px-1 relative transition-colors ${
                    isActive
                      ? 'text-[#0D1B2A] font-medium border-b-2 border-[#0D1B2A]'
                      : 'text-[#0D1B2A]/60 hover:text-[#C8A97E]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-3 text-xs self-end md:self-auto text-[#0D1B2A]/70">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8A97E]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 border-b border-[#0D1B2A]/20 py-1 pl-2 pr-6 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E] cursor-pointer"
            >
              <option value="featured">
                {language === 'ar' ? 'اختيارات الدار' : 'Sélection Maison'}
              </option>
              <option value="price-asc">
                {language === 'ar' ? 'السعر: من الأقل إلى الأعلى' : 'Prix croissant'}
              </option>
              <option value="price-desc">
                {language === 'ar' ? 'السعر: من الأعلى إلى الأقل' : 'Prix décroissant'}
              </option>
            </select>
          </div>
        </div>

        {/* 3 columns Grid with generous air and whitespace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Atelier guarantee banner */}
        <div className="mt-20 pt-12 border-t border-[#0D1B2A]/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-xs text-[#0D1B2A]/80">
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-[#0D1B2A] mb-1">
              {language === 'ar' ? 'توصيل مجاني وسريع' : 'Livraison Discrète en Tunisie'}
            </span>
            <p className="font-light text-[#0D1B2A]/65">
              {language === 'ar' ? 'مجاني للطلبات الأكثر من 250 د.ت بين 24 و 48 ساعة' : 'Offerte dès 250 DT sous 24h à 48h partout en Tunisie'}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-[#0D1B2A] mb-1">
              {language === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la Livraison'}
            </span>
            <p className="font-light text-[#0D1B2A]/65">
              {language === 'ar' ? 'نقداً عند معاينة طردك واستلامه' : 'Réglez directement en espèces auprès de notre coursier'}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-[#0D1B2A] mb-1">
              {language === 'ar' ? 'خدمة القياس والتعديل' : 'Ajustement & Demi-Mesure'}
            </span>
            <p className="font-light text-[#0D1B2A]/65">
              {language === 'ar' ? 'إمكانية ضبط الأطوال والأكمام في صالوناتنا' : 'Retouches offertes dans nos salons de Tunis et La Marsa'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
