import React, { useState } from 'react';
import { X, Check, ShieldCheck, Banknote, CreditCard, Landmark, ArrowRight, MessageCircle } from 'lucide-react';
import { CartItem, Language, OrderCustomerInfo } from '../types';
import { TUNISIAN_GOVERNORATES } from '../data/products';
import { TRANSLATIONS } from '../translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  language: Language;
  discountRate: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  language,
  discountRate,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState<OrderCustomerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    governorate: 'Tunis',
    postalCode: '',
    paymentMethod: 'cod',
    notes: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.product.priceDT * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * discountRate);
  const subtotal = rawSubtotal - discountAmount;
  const isFreeShipping = subtotal >= 250;
  const shippingCost = isFreeShipping ? 0 : 9;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `ZARO-TN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    onOrderCompleted();
  };

  const handleCloseAll = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1B2A]/70 backdrop-blur-xs transition-opacity"
        onClick={handleCloseAll}
      />

      <div className="relative w-full max-w-3xl bg-[#F7F3EC] shadow-2xl z-10 border border-[#C8A97E]/30 my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#0D1B2A]/10 bg-[#F7F3EC] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#0D1B2A] font-normal">
              {orderConfirmed ? t.checkout.orderSuccessTitle : t.checkout.title}
            </h2>
            <p className="text-xs text-[#0D1B2A]/60 font-light mt-0.5">
              {orderConfirmed ? `Référence : ${orderId}` : t.checkout.subtitle}
            </p>
          </div>
          <button
            onClick={handleCloseAll}
            className="p-1 text-[#0D1B2A] hover:text-[#C8A97E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderConfirmed ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#1B3A2B]/10 text-[#1B3A2B] rounded-full flex items-center justify-center mx-auto border border-[#C8A97E]/30">
              <Check className="w-8 h-8 text-[#1B3A2B]" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                {t.checkout.orderNumber} : {orderId}
              </span>
              <h3 className="font-serif text-2xl text-[#0D1B2A]">
                {language === 'ar' ? 'شكراً لثقتكم الراقية' : 'Merci pour votre confiance'}
              </h3>
              <p className="text-xs text-[#0D1B2A]/75 font-light leading-relaxed">
                {t.checkout.orderSuccessMsg}
              </p>
            </div>

            {/* Order summary pill */}
            <div className="max-w-md mx-auto p-4 bg-[#EFE9DE] border border-[#0D1B2A]/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Destinataire :</span>
                <strong>{formData.firstName} {formData.lastName}</strong>
              </div>
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Téléphone :</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Lieu de livraison :</span>
                <span>{formData.city}, {formData.governorate}</span>
              </div>
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Paiement retenu :</span>
                <span>
                  {formData.paymentMethod === 'cod' && 'Paiement à la livraison (Espèces)'}
                  {formData.paymentMethod === 'card' && 'Carte bancaire en ligne'}
                  {formData.paymentMethod === 'transfer' && 'Virement bancaire'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-serif font-semibold border-t border-[#0D1B2A]/10 pt-2 text-[#0D1B2A]">
                <span>Total à régler :</span>
                <span>{total} {t.products.currency}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={`https://wa.me/21671880200?text=${encodeURIComponent(`Bonjour ZAROMENSWEAR, je viens de passer la commande ${orderId} pour un montant de ${total} DT.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B3A2B] hover:bg-[#12281D] text-white text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C8A97E]" />
                <span>{t.checkout.whatsappTrack}</span>
              </a>

              <button
                onClick={handleCloseAll}
                className="w-full sm:w-auto px-6 py-3 border border-[#0D1B2A] text-[#0D1B2A] text-xs uppercase tracking-wider hover:bg-[#0D1B2A] hover:text-[#F7F3EC] transition-colors"
              >
                {t.checkout.close}
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1B2A] font-semibold border-b border-[#0D1B2A]/10 pb-2">
                {t.checkout.contactInfo}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    {t.checkout.firstName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    {t.checkout.lastName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    {t.checkout.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+216 -- --- ---"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    {t.checkout.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address in Tunisia */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1B2A] font-semibold border-b border-[#0D1B2A]/10 pb-2">
                {t.checkout.deliveryAddress} (Tunisie)
              </h3>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                  Adresse complète *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.checkout.addressPlaceholder}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    {t.checkout.governorate} *
                  </label>
                  <select
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  >
                    {TUNISIAN_GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    {t.checkout.city} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: La Marsa, Ennasr, Sousse Ville..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    {t.checkout.postalCode}
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 2070"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                  {t.checkout.notes}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Indication pour le coursier, code porte, horaire souhaité..."
                  className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1B2A] font-semibold border-b border-[#0D1B2A]/10 pb-2">
                {t.checkout.paymentMethod}
              </h3>

              <div className="space-y-3">
                {/* Cash on delivery */}
                <label
                  className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#0D1B2A] bg-white ring-1 ring-[#0D1B2A]'
                      : 'border-[#0D1B2A]/15 bg-white/60 hover:border-[#C8A97E]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-1 accent-[#0D1B2A]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#C8A97E]" />
                      <strong className="text-xs text-[#0D1B2A]">{t.checkout.paymentCOD}</strong>
                    </div>
                    <p className="text-[11px] text-[#0D1B2A]/60 font-light mt-0.5">
                      {t.checkout.paymentCODDesc}
                    </p>
                  </div>
                </label>

                {/* Card */}
                <label
                  className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#0D1B2A] bg-white ring-1 ring-[#0D1B2A]'
                      : 'border-[#0D1B2A]/15 bg-white/60 hover:border-[#C8A97E]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="mt-1 accent-[#0D1B2A]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#C8A97E]" />
                      <strong className="text-xs text-[#0D1B2A]">{t.checkout.paymentCard}</strong>
                    </div>
                    <p className="text-[11px] text-[#0D1B2A]/60 font-light mt-0.5">
                      {t.checkout.paymentCardDesc}
                    </p>
                  </div>
                </label>

                {/* Wire Transfer */}
                <label
                  className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'transfer'
                      ? 'border-[#0D1B2A] bg-white ring-1 ring-[#0D1B2A]'
                      : 'border-[#0D1B2A]/15 bg-white/60 hover:border-[#C8A97E]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                    className="mt-1 accent-[#0D1B2A]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#C8A97E]" />
                      <strong className="text-xs text-[#0D1B2A]">{t.checkout.paymentTransfer}</strong>
                    </div>
                    <p className="text-[11px] text-[#0D1B2A]/60 font-light mt-0.5">
                      {t.checkout.paymentTransferDesc}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="p-4 bg-[#EFE9DE] border border-[#0D1B2A]/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Sous-total articles :</span>
                <span>{rawSubtotal} {t.products.currency}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#1B3A2B] font-medium">
                  <span>Remise cercle :</span>
                  <span>-{discountAmount} {t.products.currency}</span>
                </div>
              )}
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Livraison en Tunisie :</span>
                <span>{shippingCost === 0 ? 'Offerte' : `${shippingCost} ${t.products.currency}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-medium text-[#0D1B2A] border-t border-[#0D1B2A]/10 pt-2">
                <span>Total net :</span>
                <span>{total} {t.products.currency}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0D1B2A] hover:bg-[#1B3A2B] text-[#F7F3EC] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>{t.checkout.confirmOrder}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
