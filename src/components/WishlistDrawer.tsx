import React from 'react';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  language: Language;
  onRemoveWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  language,
  onRemoveWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F3EC] shadow-2xl flex flex-col justify-between border-l border-[#C8A97E]/30 z-10">
          <div className="p-6 border-b border-[#0D1B2A]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C8A97E]" />
              <h2 className="font-serif text-xl text-[#0D1B2A]">
                {language === 'ar' ? 'القطع المفضلة' : 'Vos Pièces Favorites'}
              </h2>
              <span className="text-xs text-[#0D1B2A]/50">({wishlistProducts.length})</span>
            </div>
            <button onClick={onClose} className="p-1.5 text-[#0D1B2A] hover:text-[#C8A97E]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#0D1B2A]/70">
                <Heart className="w-8 h-8 text-[#C8A97E]/50 mb-3" strokeWidth={1} />
                <p className="text-sm font-serif text-[#0D1B2A]">Aucun favori enregistré</p>
                <p className="text-xs text-[#0D1B2A]/60 font-light mt-1 max-w-xs">
                  Sélectionnez le cœur sur vos créations préférées pour les retrouver à tout instant.
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-4 p-3 bg-white border border-[#0D1B2A]/10 items-center justify-between"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-20 object-cover bg-[#EFE9DE] cursor-pointer"
                    onClick={() => {
                      onQuickView(p);
                      onClose();
                    }}
                  />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase text-[#C8A97E] tracking-wider">
                      {language === 'ar' ? p.categoryNameAr : p.categoryName}
                    </span>
                    <h4
                      className="font-serif text-xs sm:text-sm text-[#0D1B2A] cursor-pointer hover:text-[#C8A97E]"
                      onClick={() => {
                        onQuickView(p);
                        onClose();
                      }}
                    >
                      {language === 'ar' ? p.nameAr : p.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#0D1B2A] mt-1">
                      {p.priceDT} {t.products.currency}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onAddToCart(p, p.sizes[0] || 'M')}
                      className="p-2 bg-[#0D1B2A] text-white hover:bg-[#C8A97E] hover:text-[#0D1B2A] transition-colors"
                      title="Ajouter au vestiaire"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(p.id)}
                      className="p-2 text-[#0D1B2A]/40 hover:text-red-700 transition-colors"
                      title="Retirer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-[#EFE9DE]/50 border-t border-[#0D1B2A]/10">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#0D1B2A] text-[#F7F3EC] text-xs uppercase tracking-widest hover:bg-[#1B3A2B] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
