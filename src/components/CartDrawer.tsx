import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Check, Tag } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  language: Language;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
  onExplore: () => void;
  discountRate: number;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExplore,
  discountRate,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.product.priceDT * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * discountRate);
  const subtotal = rawSubtotal - discountAmount;
  const freeShippingThreshold = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 9; // 9 DT livraison standard Tunisie
  const total = subtotal + shippingCost;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim());
    if (success) {
      setPromoMessage(t.cart.promoApplied);
      setPromoInput('');
    } else {
      setPromoMessage(language === 'ar' ? 'رمز غير صالح' : 'Code invalide ou expiré');
    }
    setTimeout(() => setPromoMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F3EC] shadow-2xl flex flex-col justify-between border-l border-[#C8A97E]/30 z-10">
          {/* Header */}
          <div className="p-6 border-b border-[#0D1B2A]/10 flex items-center justify-between bg-[#F7F3EC]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C8A97E]" />
              <h2 className="font-serif text-xl text-[#0D1B2A] font-normal tracking-wide">
                {t.cart.title}
              </h2>
              <span className="text-xs text-[#0D1B2A]/50">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#0D1B2A] hover:text-[#C8A97E] transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#EFE9DE] px-6 py-3 border-b border-[#0D1B2A]/10 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-[#1B3A2B] font-medium">
                <Check className="w-4 h-4 text-[#1B3A2B] shrink-0" />
                <span>{t.cart.freeShippingSuccess}</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[#0D1B2A]/80 font-light">
                  {t.cart.freeShippingProgress(remainingForFreeShipping)}
                </p>
                <div className="w-full bg-[#0D1B2A]/10 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C8A97E] h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#0D1B2A]/70">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DE] flex items-center justify-center mb-4 text-[#C8A97E]">
                  <ShoppingBag className="w-6 h-6" strokeWidth={1.2} />
                </div>
                <h3 className="font-serif text-lg text-[#0D1B2A] mb-1">
                  {t.cart.empty}
                </h3>
                <p className="text-xs text-[#0D1B2A]/60 max-w-xs font-light mb-6">
                  {t.cart.emptySub}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-5 py-2.5 bg-[#0D1B2A] text-[#F7F3EC] text-xs uppercase tracking-widest hover:bg-[#C8A97E] hover:text-[#0D1B2A] transition-colors"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 pb-5 border-b border-[#0D1B2A]/10 last:border-b-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-26 object-cover bg-[#EFE9DE] border border-[#0D1B2A]/10"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm text-[#0D1B2A] leading-snug">
                          {language === 'ar' ? item.product.nameAr : item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-[#0D1B2A]/40 hover:text-red-700 transition-colors p-1"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 text-xs text-[#0D1B2A]/60 flex items-center gap-3">
                        <span>{t.cart.size}: <strong className="font-medium text-[#0D1B2A]">{item.size}</strong></span>
                        <span>·</span>
                        <span>{item.product.priceDT} {t.products.currency}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#0D1B2A]/20 bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-[#0D1B2A] hover:bg-[#F7F3EC]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-medium text-[#0D1B2A]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-[#0D1B2A] hover:bg-[#F7F3EC]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#0D1B2A]">
                        {item.product.priceDT * item.quantity} {t.products.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#EFE9DE]/50 border-t border-[#0D1B2A]/10 space-y-4">
              {/* Privilege code form */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1B2A]/40" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder={t.cart.promoCodePlaceholder}
                    className="w-full bg-white border border-[#0D1B2A]/20 py-2 pl-8 pr-3 text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#0D1B2A] text-[#F7F3EC] text-xs hover:bg-[#C8A97E] hover:text-[#0D1B2A] transition-colors"
                >
                  {t.cart.applyPromo}
                </button>
              </form>

              {promoMessage && (
                <p className="text-[11px] text-[#1B3A2B] font-medium">{promoMessage}</p>
              )}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-[#0D1B2A]/80 border-t border-[#0D1B2A]/10 pt-3">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span>{rawSubtotal} {t.products.currency}</span>
                </div>

                {discountRate > 0 && (
                  <div className="flex justify-between text-[#1B3A2B] font-medium">
                    <span>Remise privilège (-{Math.round(discountRate * 100)}%)</span>
                    <span>-{discountAmount} {t.products.currency}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t.cart.shipping}</span>
                  <span>{shippingCost === 0 ? t.cart.free : `${shippingCost} ${t.products.currency}`}</span>
                </div>

                <div className="flex justify-between text-base font-serif font-medium text-[#0D1B2A] border-t border-[#0D1B2A]/10 pt-2">
                  <span>{t.cart.total}</span>
                  <span>{total} {t.products.currency}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#0D1B2A] hover:bg-[#1B3A2B] text-[#F7F3EC] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t.cart.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#0D1B2A]/50">
                Paiement sécurisé ou règlement en espèces à la livraison.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
