import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ProductCardProps {
  product: Product;
  language: Language;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [justAdded, setJustAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const t = TRANSLATIONS[language];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article 
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onQuickView(product)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#EFE9DE] border border-[#0D1B2A]/5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
        />

        {/* Subtle category kicker on top left */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="text-[10px] uppercase tracking-wider text-[#0D1B2A]/85 bg-[#F7F3EC]/90 px-2 py-1 backdrop-blur-xs font-light shadow-xs">
            {product.categoryName}
          </span>
        </div>

        {/* Exclusive badge on top right */}
        {product.badge && (
          <div className="absolute top-3 right-3 pointer-events-none z-10">
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#C8A97E] bg-[#0D1B2A]/90 px-2 py-1 backdrop-blur-xs font-medium border border-[#C8A97E]/30 shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Hover Quick actions overlay (Desktop) */}
        <div 
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1B2A]/85 via-[#0D1B2A]/50 to-transparent p-4 transition-all duration-300 hidden sm:flex flex-col gap-2 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {/* Quick size selection inside card */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] px-2 py-1 transition-all ${
                  selectedSize === size
                    ? 'bg-[#F7F3EC] text-[#0D1B2A] font-semibold'
                    : 'bg-[#0D1B2A]/60 text-[#F7F3EC] hover:bg-[#C8A97E] hover:text-[#0D1B2A]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quick add button */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={justAdded}
            className="w-full py-2 px-3 bg-[#F7F3EC] text-[#0D1B2A] hover:bg-[#C8A97E] text-[11px] font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#1B3A2B]" />
                <span>{t.products.addedToCart}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t.products.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 pb-2 flex flex-col text-left">
        {/* Subtle fabric note */}
        <span className="text-[11px] text-[#C8A97E] font-medium tracking-wide line-clamp-1 mb-1">
          {product.fabric}
        </span>

        {/* Product title in classic serif */}
        <h3 className="font-serif text-base sm:text-lg text-[#0D1B2A] group-hover:text-[#1B3A2B] transition-colors leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Price in DT */}
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-sm font-medium text-[#0D1B2A] tracking-wider">
            {product.priceDT} <span className="text-xs text-[#0D1B2A]/70 uppercase">{t.products.currency}</span>
          </p>

          <span className="text-[11px] text-[#0D1B2A]/60 group-hover:text-[#C8A97E] transition-colors flex items-center gap-1 font-light">
            <Eye className="w-3 h-3" />
            <span className="text-[11px] font-sans">Aperçu & Tailles</span>
          </span>
        </div>
      </div>
    </article>
  );
};
