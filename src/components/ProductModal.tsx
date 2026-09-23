import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Check, Ruler, Truck, Shield, Sparkles } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ProductModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const t = TRANSLATIONS[language];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1B2A]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#F7F3EC] shadow-2xl z-10 border border-[#C8A97E]/30 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0D1B2A]/10 bg-[#F7F3EC]">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8A97E] font-medium">
            {language === 'ar' ? product.categoryNameAr : product.categoryName} · {product.origin}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-[#0D1B2A] hover:text-[#C8A97E] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Gallery Column */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div className="aspect-3/4 w-full bg-[#EFE9DE] overflow-hidden border border-[#0D1B2A]/5 relative">
              <img
                src={selectedImage}
                alt={language === 'ar' ? product.nameAr : product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors ${
                  isWishlisted
                    ? 'bg-[#C8A97E] text-white'
                    : 'bg-[#F7F3EC]/80 text-[#0D1B2A] hover:bg-[#F7F3EC] hover:text-[#C8A97E]'
                }`}
                title="Favoris"
              >
                <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex gap-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 overflow-hidden border ${
                      selectedImage === img
                        ? 'border-[#0D1B2A] ring-1 ring-[#0D1B2A]'
                        : 'border-[#0D1B2A]/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Aperçu" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C8A97E] font-medium">
                  {language === 'ar' ? product.fabricAr : product.fabric}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#0D1B2A] mt-1 font-normal leading-snug">
                  {language === 'ar' ? product.nameAr : product.name}
                </h2>
                <div className="mt-2 text-xl font-medium text-[#0D1B2A]">
                  {product.priceDT} <span className="text-sm font-normal uppercase text-[#0D1B2A]/70">{t.products.currency}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#0D1B2A]/80 font-light leading-relaxed">
                {language === 'ar' ? product.descriptionAr : product.description}
              </p>

              {/* Size Selector */}
              <div className="pt-2 border-t border-[#0D1B2A]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#0D1B2A] font-medium">
                    {t.products.selectSize}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#C8A97E] hover:text-[#0D1B2A] flex items-center gap-1 font-light transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t.products.sizeGuideBtn}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 py-2 px-3 text-xs tracking-wider transition-all border ${
                        selectedSize === size
                          ? 'border-[#0D1B2A] bg-[#0D1B2A] text-[#F7F3EC]'
                          : 'border-[#0D1B2A]/20 bg-transparent text-[#0D1B2A] hover:border-[#C8A97E]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-[#0D1B2A] font-medium">
                  {t.cart.quantity}
                </span>
                <div className="flex items-center border border-[#0D1B2A]/20 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm hover:bg-[#F7F3EC]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm hover:bg-[#F7F3EC]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Sartorial Details list */}
              <div className="pt-3 border-t border-[#0D1B2A]/10 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#0D1B2A] font-medium block">
                  {t.products.detailsTitle}
                </span>
                <ul className="text-xs text-[#0D1B2A]/75 space-y-1 font-light">
                  {(language === 'ar' ? product.detailsAr : product.details).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C8A97E] mt-0.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Care instructions */}
              <div className="text-xs text-[#0D1B2A]/70 italic font-serif">
                <span className="font-medium not-italic font-sans text-[11px] uppercase tracking-wider text-[#0D1B2A] block mb-0.5">
                  {t.products.careTitle}
                </span>
                {language === 'ar' ? product.careAr : product.care}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="mt-8 pt-4 border-t border-[#0D1B2A]/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAdd}
                disabled={added}
                className="w-full py-3.5 bg-[#0D1B2A] hover:bg-[#1B3A2B] text-[#F7F3EC] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-[#C8A97E]" />
                    <span>{t.products.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.products.addToCart}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#0D1B2A]/60 pt-2">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C8A97E]" />
                  <span>Livraison offerte dès 250 DT</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#C8A97E]" />
                  <span>Échanges offerts 14 jours</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
