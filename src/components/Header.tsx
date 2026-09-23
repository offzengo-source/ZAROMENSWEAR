import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { Language, Category } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeaderProps {
  language: Language;
  cartCount: number;
  onOpenCart: () => void;
  onOpenContact: () => void;
  onSelectCategory: (category: Category) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  cartCount,
  onOpenCart,
  onOpenContact,
  onSelectCategory,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, category?: Category) => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    onNavigateSection(sectionId);
  };

  return (
    <>
      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EC]/95 backdrop-blur-md shadow-xs border-b border-[#0D1B2A]/10 py-3.5'
            : 'bg-[#F7F3EC]/80 backdrop-blur-xs border-b border-[#0D1B2A]/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#0D1B2A] hover:text-[#C8A97E] transition-colors focus:outline-hidden"
                aria-label="Menu"
              >
                <Menu strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Left navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] uppercase tracking-[0.18em] text-[#0D1B2A]/85 font-normal">
              <button
                onClick={() => handleNavClick('products', 'pulls')}
                className="hover:text-[#C8A97E] transition-colors relative py-1 hover:border-b hover:border-[#C8A97E]"
              >
                {t.nav.pulls}
              </button>
              <button
                onClick={() => handleNavClick('products', 'tshirts')}
                className="hover:text-[#C8A97E] transition-colors relative py-1 hover:border-b hover:border-[#C8A97E]"
              >
                {t.nav.tshirts}
              </button>
            </nav>

            {/* Central brand mark */}
            <div className="text-center cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="block font-serif text-xl sm:text-2xl tracking-[0.24em] font-normal text-[#0D1B2A] hover:text-[#1B3A2B] transition-colors">
                ZAROMENSWEAR
              </span>
              <span className="block text-[8px] uppercase tracking-[0.35em] text-[#C8A97E] -mt-0.5">
                Tunis · Depuis 2024
              </span>
            </div>

            {/* Desktop Right navigation & actions */}
            <div className="flex items-center gap-5 sm:gap-6">
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] uppercase tracking-[0.18em] text-[#0D1B2A]/85 font-normal">
                <button
                  onClick={() => handleNavClick('products', 'all')}
                  className="hover:text-[#C8A97E] transition-colors relative py-1 hover:border-b hover:border-[#C8A97E]"
                >
                  {t.nav.allModels}
                </button>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#C8A97E] transition-colors relative py-1 hover:border-b hover:border-[#C8A97E]"
                >
                  {t.nav.contact}
                </button>
              </nav>

              {/* Shopping Bag only */}
              <div className="flex items-center pl-2 lg:border-l lg:border-[#0D1B2A]/10">
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="relative p-1.5 text-[#0D1B2A] hover:text-[#C8A97E] transition-colors flex items-center gap-1.5"
                  title="Panier"
                  aria-label="Panier"
                >
                  <ShoppingBag strokeWidth={1.4} className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="w-4 h-4 bg-[#0D1B2A] text-[#F7F3EC] font-medium text-[9px] rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-[#0D1B2A]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative ml-0 w-full max-w-xs bg-[#F7F3EC] h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-[#C8A97E]/30">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#0D1B2A]/10">
                <div>
                  <span className="font-serif text-lg tracking-[0.2em] font-normal text-[#0D1B2A]">
                    ZAROMENSWEAR
                  </span>
                  <span className="block text-[8px] tracking-[0.3em] uppercase text-[#C8A97E]">
                    Tunis
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#0D1B2A] hover:text-[#C8A97E]"
                  aria-label="Fermer"
                >
                  <X strokeWidth={1.5} className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="py-6 flex flex-col space-y-4 text-sm tracking-[0.15em] uppercase text-[#0D1B2A]/90">
                <button
                  onClick={() => handleNavClick('products', 'pulls')}
                  className="text-left hover:text-[#C8A97E] transition-colors py-1"
                >
                  {t.nav.pulls}
                </button>
                <button
                  onClick={() => handleNavClick('products', 'tshirts')}
                  className="text-left hover:text-[#C8A97E] transition-colors py-1"
                >
                  {t.nav.tshirts}
                </button>
                <button
                  onClick={() => handleNavClick('products', 'all')}
                  className="text-left hover:text-[#C8A97E] transition-colors py-1"
                >
                  {t.nav.allModels}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="text-left hover:text-[#C8A97E] transition-colors py-1 flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8A97E]" />
                  {t.nav.contact}
                </button>
              </div>
            </div>

            {/* Bottom concierge contact */}
            <div className="pt-6 border-t border-[#0D1B2A]/10 text-xs text-[#0D1B2A]/70 space-y-2">
              <p className="font-serif italic text-sm text-[#0D1B2A]">
                "L'élégance ne se crie pas."
              </p>
              <p className="text-[11px] tracking-wider text-[#C8A97E]">
                Confectionné avec honneur en Tunisie
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
