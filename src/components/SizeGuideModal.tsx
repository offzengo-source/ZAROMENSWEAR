import React, { useState } from 'react';
import { X, Ruler, Check, Info } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, language }) => {
  const [tab, setTab] = useState<'pulls' | 'tshirts' | 'advice'>('pulls');
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-[#0D1B2A]/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#F7F3EC] shadow-2xl z-10 border border-[#C8A97E]/30 overflow-hidden my-8">
        <div className="p-6 border-b border-[#0D1B2A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#C8A97E]" />
            <h2 className="font-serif text-xl text-[#0D1B2A]">{t.sizeGuide.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-[#0D1B2A] hover:text-[#C8A97E]" aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-xs text-[#0D1B2A]/70 font-light leading-relaxed">
            {t.sizeGuide.subtitle}
          </p>

          {/* Category Tabs */}
          <div className="flex border-b border-[#0D1B2A]/15 gap-6 text-xs uppercase tracking-wider">
            <button
              onClick={() => setTab('pulls')}
              className={`pb-2.5 transition-colors relative ${
                tab === 'pulls'
                  ? 'border-b-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold'
                  : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
              }`}
            >
              Pulls & Mailles Tricotées
            </button>
            <button
              onClick={() => setTab('tshirts')}
              className={`pb-2.5 transition-colors relative ${
                tab === 'tshirts'
                  ? 'border-b-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold'
                  : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
              }`}
            >
              T-Shirts & Polos
            </button>
            <button
              onClick={() => setTab('advice')}
              className={`pb-2.5 transition-colors relative ${
                tab === 'advice'
                  ? 'border-b-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold'
                  : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
              }`}
            >
              Conseils de Coupe
            </button>
          </div>

          {/* Table display */}
          <div className="overflow-x-auto">
            {tab === 'pulls' && (
              <table className="w-full text-xs text-left text-[#0D1B2A]/80">
                <thead className="bg-[#EFE9DE] uppercase text-[10px] text-[#0D1B2A] tracking-wider">
                  <tr>
                    <th className="p-2.5">Taille</th>
                    <th className="p-2.5">Tour de poitrine (cm)</th>
                    <th className="p-2.5">Carrure épaules (cm)</th>
                    <th className="p-2.5">Longueur manches (cm)</th>
                    <th className="p-2.5">Longueur totale (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D1B2A]/10 font-light">
                  <tr><td className="p-2.5 font-medium">S (46)</td><td className="p-2.5">92 – 96</td><td className="p-2.5">43 – 44</td><td className="p-2.5">63</td><td className="p-2.5">66</td></tr>
                  <tr><td className="p-2.5 font-medium">M (48)</td><td className="p-2.5">97 – 101</td><td className="p-2.5">44 – 45.5</td><td className="p-2.5">64</td><td className="p-2.5">68</td></tr>
                  <tr><td className="p-2.5 font-medium">L (50)</td><td className="p-2.5">102 – 106</td><td className="p-2.5">46 – 47.5</td><td className="p-2.5">65</td><td className="p-2.5">70</td></tr>
                  <tr><td className="p-2.5 font-medium">XL (52)</td><td className="p-2.5">107 – 112</td><td className="p-2.5">48 – 49.5</td><td className="p-2.5">66</td><td className="p-2.5">72</td></tr>
                  <tr><td className="p-2.5 font-medium">XXL (54)</td><td className="p-2.5">113 – 118</td><td className="p-2.5">50 – 51.5</td><td className="p-2.5">67</td><td className="p-2.5">74</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'tshirts' && (
              <table className="w-full text-xs text-left text-[#0D1B2A]/80">
                <thead className="bg-[#EFE9DE] uppercase text-[10px] text-[#0D1B2A] tracking-wider">
                  <tr>
                    <th className="p-2.5">Taille</th>
                    <th className="p-2.5">Tour de poitrine (cm)</th>
                    <th className="p-2.5">Carrure épaules (cm)</th>
                    <th className="p-2.5">Longueur dos (cm)</th>
                    <th className="p-2.5">Tour de bras (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D1B2A]/10 font-light">
                  <tr><td className="p-2.5 font-medium">S</td><td className="p-2.5">90 – 94</td><td className="p-2.5">42 – 43</td><td className="p-2.5">67</td><td className="p-2.5">32</td></tr>
                  <tr><td className="p-2.5 font-medium">M</td><td className="p-2.5">95 – 99</td><td className="p-2.5">44 – 45</td><td className="p-2.5">69</td><td className="p-2.5">34</td></tr>
                  <tr><td className="p-2.5 font-medium">L</td><td className="p-2.5">100 – 105</td><td className="p-2.5">46 – 47</td><td className="p-2.5">71</td><td className="p-2.5">36</td></tr>
                  <tr><td className="p-2.5 font-medium">XL</td><td className="p-2.5">106 – 111</td><td className="p-2.5">48 – 49</td><td className="p-2.5">73</td><td className="p-2.5">38</td></tr>
                  <tr><td className="p-2.5 font-medium">XXL</td><td className="p-2.5">112 – 117</td><td className="p-2.5">50 – 51</td><td className="p-2.5">75</td><td className="p-2.5">40</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'advice' && (
              <div className="space-y-3 text-xs text-[#0D1B2A]/80 leading-relaxed font-light">
                <div className="p-3.5 bg-white border border-[#0D1B2A]/10 space-y-1">
                  <strong className="text-[#0D1B2A] font-serif text-sm block">Coupe Sartoriale Ajustée</strong>
                  <p>
                    Nos polos et t-shirts en coton Giza et Supima possèdent une coupe droite semi-ajustée qui souligne les épaules tout en laissant une belle liberté de mouvement au niveau de la taille.
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-[#0D1B2A]/10 space-y-1">
                  <strong className="text-[#0D1B2A] font-serif text-sm block">Pour les Pulls & Tricots</strong>
                  <p>
                    Si vous comptez porter votre pull zippé ou torsadé par-dessus un t-shirt épais ou une chemise, nous vous conseillons de privilégier votre taille habituelle ou une taille au-dessus pour un tombé plus décontracté.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#EFE9DE] border border-[#0D1B2A]/10 text-xs text-[#0D1B2A]/80 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-[#1B3A2B] shrink-0 mt-0.5" />
            <p>
              Un doute sur votre taille ? Notre service conciergerie peut inclure deux tailles à l'essayage lors de la livraison à domicile sur le Grand Tunis. Contactez-nous sur WhatsApp au (+216) 71 880 200.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
