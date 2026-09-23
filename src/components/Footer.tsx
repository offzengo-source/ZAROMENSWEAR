import React from 'react';
import { MessageCircle, CreditCard, Banknote, Landmark } from 'lucide-react';
import { Language, Category } from '../types';
import { TRANSLATIONS } from '../translations';

interface FooterProps {
  language: Language;
  onSelectCategory: (category: Category) => void;
  onOpenContact: () => void;
  onOpenSizeGuide: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onSelectCategory,
  onOpenContact,
  onOpenSizeGuide,
  onNavigateSection,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#0D1B2A] text-[#F7F3EC] pt-16 pb-12 border-t border-[#C8A97E]/30 relative overflow-hidden">
      {/* Subtle Berber geometric watermark in background */}
      <div 
        className="absolute bottom-6 right-6 pointer-events-none opacity-5 text-[#C8A97E]"
        aria-hidden="true"
      >
        <svg width="280" height="280" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <polygon points="50,5 95,50 50,95 5,50" />
          <polygon points="50,20 80,50 50,80 20,50" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#F7F3EC]/10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.25em] font-normal text-[#F7F3EC] block">
                ZAROMENSWEAR
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C8A97E] block mt-0.5">
                Maison de Tailleur Tunisienne
              </span>
            </div>

            <p className="text-xs text-[#F7F3EC]/70 font-light leading-relaxed">
              {t.footer.tagline} {t.footer.madeInTunisia}.
            </p>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#C8A97E] font-medium">
              {t.footer.col2Title}
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F3EC]/75 font-light">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('pulls');
                    onNavigateSection('products');
                  }}
                  className="hover:text-[#C8A97E] transition-colors"
                >
                  {t.footer.pullsLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('tshirts');
                    onNavigateSection('products');
                  }}
                  className="hover:text-[#C8A97E] transition-colors"
                >
                  {t.footer.tshirtsLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onNavigateSection('products');
                  }}
                  className="hover:text-[#C8A97E] transition-colors"
                >
                  {t.footer.allLink}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Client */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#C8A97E] font-medium">
              {t.footer.col3Title}
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F3EC]/75 font-light">
              <li className="flex items-center gap-1.5">
                <span>{t.footer.shippingInfo} (24h-48h)</span>
              </li>
              <li>
                <span>{t.footer.returns}</span>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#C8A97E] transition-colors text-left"
                >
                  {t.footer.sizeGuide}
                </button>
              </li>
              <li>
                <span>{t.footer.careGuide}</span>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#C8A97E] transition-colors text-left"
                >
                  {t.footer.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Salons Privés en Tunisie */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#C8A97E] font-medium">
              {t.footer.col4Title}
            </h4>
            <div className="space-y-2.5 text-xs text-[#F7F3EC]/75 font-light">
              <p className="leading-relaxed">
                {t.footer.address}
              </p>
              <p className="text-[#F7F3EC]">
                Tél : <span className="font-sans">{t.footer.phone}</span>
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/21671880200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-[#1B3A2B] hover:bg-[#1B3A2B]/80 text-[#F7F3EC] text-[11px] uppercase tracking-wider transition-colors border border-[#C8A97E]/30"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C8A97E]" />
                  <span>{t.footer.whatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F7F3EC]/60">
          {/* Payment Methods (Paiement à la livraison, Carte bancaire, Virement) */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 py-1 px-2.5 bg-[#F7F3EC]/5 border border-[#F7F3EC]/10 text-[11px] text-[#F7F3EC]/80">
              <Banknote className="w-3.5 h-3.5 text-[#C8A97E]" />
              <span>Paiement à la livraison</span>
            </div>
            <div className="flex items-center gap-1.5 py-1 px-2.5 bg-[#F7F3EC]/5 border border-[#F7F3EC]/10 text-[11px] text-[#F7F3EC]/80">
              <CreditCard className="w-3.5 h-3.5 text-[#C8A97E]" />
              <span>Cartes Bancaires (GIM-TEL / Visa)</span>
            </div>
            <div className="flex items-center gap-1.5 py-1 px-2.5 bg-[#F7F3EC]/5 border border-[#F7F3EC]/10 text-[11px] text-[#F7F3EC]/80">
              <Landmark className="w-3.5 h-3.5 text-[#C8A97E]" />
              <span>Virement bancaire</span>
            </div>
          </div>

          {/* Legal / Mention */}
          <div className="text-center md:text-right font-light text-[11px]">
            <p>ZAROMENSWEAR © 2026 — Conçu et confectionné en Tunisie.</p>
            <p className="text-[10px] text-[#F7F3EC]/40 mt-0.5">Élégance discrète · Savoir-faire d'atelier méditerranéen.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
