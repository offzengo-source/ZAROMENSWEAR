import React, { useState } from 'react';
import { X, Check, Banknote, CreditCard, Landmark, ArrowRight, MessageCircle, Copy, CheckCheck } from 'lucide-react';
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
  const [copiedRIB, setCopiedRIB] = useState(false);
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

  const copyRibToClipboard = () => {
    navigator.clipboard.writeText('08 000 0001234567890 45');
    setCopiedRIB(true);
    setTimeout(() => setCopiedRIB(false), 2500);
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
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderConfirmed ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-10 text-center space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="w-16 h-16 bg-[#1B3A2B]/10 text-[#1B3A2B] rounded-full flex items-center justify-center mx-auto border border-[#C8A97E]/30">
              <Check className="w-8 h-8 text-[#1B3A2B]" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                {t.checkout.orderNumber} : {orderId}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0D1B2A]">
                Merci pour votre confiance
              </h3>
              <p className="text-xs text-[#0D1B2A]/75 font-light leading-relaxed">
                Votre commande a bien été enregistrée. Notre service conciergerie vous contactera sous peu pour confirmer l'expédition et le créneau de livraison.
              </p>
            </div>

            {/* Order summary card */}
            <div className="max-w-md mx-auto p-5 bg-[#EFE9DE] border border-[#0D1B2A]/10 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-[#0D1B2A]">
                <span className="text-[#0D1B2A]/70">Destinataire :</span>
                <strong>{formData.firstName} {formData.lastName}</strong>
              </div>
              <div className="flex justify-between text-[#0D1B2A]">
                <span className="text-[#0D1B2A]/70">Téléphone de contact :</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex justify-between text-[#0D1B2A]">
                <span className="text-[#0D1B2A]/70">Lieu de livraison :</span>
                <span>{formData.city}, {formData.governorate}</span>
              </div>
              <div className="flex justify-between text-[#0D1B2A]">
                <span className="text-[#0D1B2A]/70">Mode de paiement :</span>
                <span className="font-medium">
                  {formData.paymentMethod === 'cod' && 'Paiement à la livraison (Espèces)'}
                  {formData.paymentMethod === 'card' && 'Carte bancaire (Visa / ClicToPay)'}
                  {formData.paymentMethod === 'transfer' && 'Virement bancaire (BIAT)'}
                </span>
              </div>

              {formData.paymentMethod === 'transfer' && (
                <div className="mt-3 p-3 bg-white border border-[#C8A97E]/40 text-[11px] space-y-1">
                  <div className="flex items-center justify-between font-medium text-[#0D1B2A]">
                    <span>RIB BIAT (Maison ZAROMENSWEAR) :</span>
                    <button
                      type="button"
                      onClick={copyRibToClipboard}
                      className="text-[#C8A97E] hover:text-[#0D1B2A] flex items-center gap-1 font-sans"
                    >
                      {copiedRIB ? <CheckCheck className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRIB ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>
                  <p className="font-mono text-[#0D1B2A] text-xs">08 000 0001234567890 45</p>
                  <p className="text-[10px] text-[#0D1B2A]/60">Veuillez indiquer la référence {orderId} dans l'objet de votre virement.</p>
                </div>
              )}

              <div className="flex justify-between text-sm font-serif font-semibold border-t border-[#0D1B2A]/10 pt-2.5 text-[#0D1B2A]">
                <span>Total net à régler :</span>
                <span>{total} {t.products.currency}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/21671880200?text=${encodeURIComponent(`Bonjour Maison ZAROMENSWEAR, je viens de passer la commande ${orderId} pour un montant de ${total} DT (${formData.firstName} ${formData.lastName}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B3A2B] hover:bg-[#12281D] text-white text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C8A97E]" />
                <span>Suivre ma commande sur WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCloseAll}
                className="w-full sm:w-auto px-6 py-3 border border-[#0D1B2A] text-[#0D1B2A] text-xs uppercase tracking-wider hover:bg-[#0D1B2A] hover:text-[#F7F3EC] transition-colors"
              >
                Retourner à la boutique
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1B2A] font-semibold border-b border-[#0D1B2A]/10 pb-2">
                1. Vos Coordonnées
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Youssef"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    Nom de famille *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ben Salem"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    Numéro de Téléphone Tunisien *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(+216) 98 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    Adresse Courriel *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@exemple.tn"
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
                2. Adresse de Livraison (Tunisie)
              </h3>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                  Adresse complète (Rue, Numéro, Résidence) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 14 Rue de Carthage, Résidence Jasmin Appt 3"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    Gouvernorat *
                  </label>
                  <select
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E] cursor-pointer"
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
                    Ville / Délégation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: La Marsa, Les Berges du Lac, Ennasr..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#0D1B2A]/70 mb-1">
                    Code Postal
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
                  Indications pour le coursier (Optionnel)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Code interphone, créneau horaire préféré en journée..."
                  className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1B2A] font-semibold border-b border-[#0D1B2A]/10 pb-2">
                3. Modalité de Règlement
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
                      <strong className="text-xs text-[#0D1B2A]">Paiement en espèces à la livraison</strong>
                    </div>
                    <p className="text-[11px] text-[#0D1B2A]/60 font-light mt-0.5">
                      Réglez en mains propres directement auprès du livreur lors de la réception de votre colis.
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
                      <strong className="text-xs text-[#0D1B2A]">Carte Bancaire Sécurisée</strong>
                    </div>
                    <p className="text-[11px] text-[#0D1B2A]/60 font-light mt-0.5">
                      Cartes tunisiennes (GIM-TEL / ClicToPay / Visa / Mastercard).
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
                      <strong className="text-xs text-[#0D1B2A]">Virement Bancaire (BIAT)</strong>
                    </div>
                    <p className="text-[11px] text-[#0D1B2A]/60 font-light mt-0.5">
                      RIB communiqué dès validation. Expédition dès réception du justificatif de virement.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="p-4 bg-[#EFE9DE] border border-[#0D1B2A]/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Sous-total vestiaire :</span>
                <span>{rawSubtotal} {t.products.currency}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#1B3A2B] font-medium">
                  <span>Remise privilège (-{Math.round(discountRate * 100)}%) :</span>
                  <span>-{discountAmount} {t.products.currency}</span>
                </div>
              )}
              <div className="flex justify-between text-[#0D1B2A]">
                <span>Livraison en Tunisie :</span>
                <span>{shippingCost === 0 ? 'Offerte (commande ≥ 250 DT)' : `${shippingCost} ${t.products.currency}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-medium text-[#0D1B2A] border-t border-[#0D1B2A]/10 pt-2">
                <span>Total à régler :</span>
                <span>{total} {t.products.currency}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0D1B2A] hover:bg-[#1B3A2B] text-[#F7F3EC] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Valider la commande ({total} DT)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
