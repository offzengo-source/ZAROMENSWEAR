import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  language: Language;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  language,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[language];

  const quickKeywords = ['Laine', 'Cachemire', 'Oxford', 'Lin', 'Mocassins', 'Prince de Galles'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q) || p.nameAr.includes(q);
      const matchFabric = p.fabric.toLowerCase().includes(q) || p.fabricAr.includes(q);
      const matchDesc = p.description.toLowerCase().includes(q) || p.descriptionAr.includes(q);
      const matchCat = p.categoryName.toLowerCase().includes(q) || p.categoryNameAr.includes(q);
      return matchName || matchFabric || matchDesc || matchCat;
    });
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
      <div className="fixed inset-0 bg-[#0D1B2A]/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#F7F3EC] shadow-2xl z-10 border border-[#C8A97E]/30 overflow-hidden">
        {/* Search input bar */}
        <div className="p-4 sm:p-6 border-b border-[#0D1B2A]/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C8A97E]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث بالاسم، نوع القماش (صوف، كشمير، كتان)...'
                : 'Rechercher une pièce, une étoffe (laine, cachemire, lin)...'
            }
            className="flex-1 bg-transparent text-sm sm:text-base text-[#0D1B2A] placeholder:text-[#0D1B2A]/40 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#0D1B2A]/50 hover:text-[#0D1B2A]"
            >
              Effacer
            </button>
          )}
          <button onClick={onClose} className="p-1 text-[#0D1B2A] hover:text-[#C8A97E]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick keywords suggestions */}
        <div className="px-6 py-3 bg-[#EFE9DE] border-b border-[#0D1B2A]/10 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#0D1B2A]/50 whitespace-nowrap text-[11px] uppercase tracking-wider">
            Recherches courantes :
          </span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="px-2 py-0.5 bg-[#F7F3EC] text-[#0D1B2A] text-[11px] hover:bg-[#C8A97E] hover:text-white transition-colors border border-[#0D1B2A]/10 whitespace-nowrap"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6 space-y-3">
          {query.trim() === '' ? (
            <p className="text-center text-xs text-[#0D1B2A]/50 py-8 font-light">
              {language === 'ar'
                ? 'اكتب اسم القطعة أو نوع النسيج للعثور على ما تبحث عنه'
                : 'Saisissez un terme pour explorer notre vestiaire sartorial.'}
            </p>
          ) : results.length === 0 ? (
            <p className="text-center text-xs text-[#0D1B2A]/60 py-8 font-light">
              Aucune création ne correspond à "{query}". Nos conseillers restent à votre disposition.
            </p>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 bg-white hover:bg-[#EFE9DE]/50 border border-[#0D1B2A]/10 cursor-pointer transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-18 object-cover bg-[#EFE9DE]"
                />
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#C8A97E]">
                    {language === 'ar' ? product.categoryNameAr : product.categoryName}
                  </span>
                  <h4 className="font-serif text-sm text-[#0D1B2A] leading-snug">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h4>
                  <p className="text-xs text-[#0D1B2A]/60 line-clamp-1 mt-0.5">
                    {language === 'ar' ? product.fabricAr : product.fabric}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#0D1B2A]">
                    {product.priceDT} {t.products.currency}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A97E] ml-auto mt-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
