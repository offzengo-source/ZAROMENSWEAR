import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, language }) => {
  const [tab, setTab] = useState<'jackets' | 'shirts' | 'trousers' | 'shoes'>('jackets');
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
          <button onClick={onClose} className="p-1 text-[#0D1B2A] hover:text-[#C8A97E]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-xs text-[#0D1B2A]/70 font-light leading-relaxed">
            {t.sizeGuide.subtitle}
          </p>

          {/* Category Tabs */}
          <div className="flex border-b border-[#0D1B2A]/15 gap-4 overflow-x-auto text-xs uppercase tracking-wider">
            <button
              onClick={() => setTab('jackets')}
              className={`pb-2 transition-colors ${
                tab === 'jackets'
                  ? 'border-b-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold'
                  : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
              }`}
            >
              {t.sizeGuide.jackets}
            </button>
            <button
              onClick={() => setTab('shirts')}
              className={`pb-2 transition-colors ${
                tab === 'shirts'
                  ? 'border-b-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold'
                  : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
              }`}
            >
              {t.sizeGuide.shirts}
            </button>
            <button
              onClick={() => setTab('trousers')}
              className={`pb-2 transition-colors ${
                tab === 'trousers'
                  ? 'border-b-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold'
                  : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
              }`}
            >
              {t.sizeGuide.trousers}
            </button>
            <button
              onClick={() => setTab('shoes')}
              className={`pb-2 transition-colors ${
                tab === 'shoes'
                  ? 'border-b-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold'
                  : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
              }`}
            >
              {t.sizeGuide.shoes}
            </button>
          </div>

          {/* Table display */}
          <div className="overflow-x-auto">
            {tab === 'jackets' && (
              <table className="w-full text-xs text-left text-[#0D1B2A]/80">
                <thead className="bg-[#EFE9DE] uppercase text-[10px] text-[#0D1B2A] tracking-wider">
                  <tr>
                    <th className="p-2.5">Taille UE / TN</th>
                    <th className="p-2.5">Tour de poitrine (cm)</th>
                    <th className="p-2.5">Tour de taille (cm)</th>
                    <th className="p-2.5">Carrure épaules (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D1B2A]/10 font-light">
                  <tr><td className="p-2.5 font-medium">46 (S)</td><td className="p-2.5">92 - 95</td><td className="p-2.5">78 - 81</td><td className="p-2.5">44</td></tr>
                  <tr><td className="p-2.5 font-medium">48 (M)</td><td className="p-2.5">96 - 99</td><td className="p-2.5">82 - 85</td><td className="p-2.5">45</td></tr>
                  <tr><td className="p-2.5 font-medium">50 (L)</td><td className="p-2.5">100 - 103</td><td className="p-2.5">86 - 89</td><td className="p-2.5">46.5</td></tr>
                  <tr><td className="p-2.5 font-medium">52 (XL)</td><td className="p-2.5">104 - 107</td><td className="p-2.5">90 - 94</td><td className="p-2.5">48</td></tr>
                  <tr><td className="p-2.5 font-medium">54 (XXL)</td><td className="p-2.5">108 - 112</td><td className="p-2.5">95 - 100</td><td className="p-2.5">49.5</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'shirts' && (
              <table className="w-full text-xs text-left text-[#0D1B2A]/80">
                <thead className="bg-[#EFE9DE] uppercase text-[10px] text-[#0D1B2A] tracking-wider">
                  <tr>
                    <th className="p-2.5">Taille Col (cm)</th>
                    <th className="p-2.5">Tour de cou</th>
                    <th className="p-2.5">Longueur manche (cm)</th>
                    <th className="p-2.5">Correspondance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D1B2A]/10 font-light">
                  <tr><td className="p-2.5 font-medium">38 - 39</td><td className="p-2.5">38 - 39 cm</td><td className="p-2.5">64 cm</td><td className="p-2.5">S / M</td></tr>
                  <tr><td className="p-2.5 font-medium">40 - 41</td><td className="p-2.5">40 - 41 cm</td><td className="p-2.5">65 cm</td><td className="p-2.5">L</td></tr>
                  <tr><td className="p-2.5 font-medium">42 - 43</td><td className="p-2.5">42 - 43 cm</td><td className="p-2.5">66 cm</td><td className="p-2.5">XL</td></tr>
                  <tr><td className="p-2.5 font-medium">44</td><td className="p-2.5">44 cm</td><td className="p-2.5">67 cm</td><td className="p-2.5">XXL</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'trousers' && (
              <table className="w-full text-xs text-left text-[#0D1B2A]/80">
                <thead className="bg-[#EFE9DE] uppercase text-[10px] text-[#0D1B2A] tracking-wider">
                  <tr>
                    <th className="p-2.5">Taille UE / TN</th>
                    <th className="p-2.5">Tour de ceinture (cm)</th>
                    <th className="p-2.5">Bassin (cm)</th>
                    <th className="p-2.5">Largeur bas (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D1B2A]/10 font-light">
                  <tr><td className="p-2.5 font-medium">40</td><td className="p-2.5">80 - 82</td><td className="p-2.5">96</td><td className="p-2.5">18.5</td></tr>
                  <tr><td className="p-2.5 font-medium">42</td><td className="p-2.5">84 - 86</td><td className="p-2.5">100</td><td className="p-2.5">19</td></tr>
                  <tr><td className="p-2.5 font-medium">44</td><td className="p-2.5">88 - 90</td><td className="p-2.5">104</td><td className="p-2.5">19.5</td></tr>
                  <tr><td className="p-2.5 font-medium">46</td><td className="p-2.5">92 - 95</td><td className="p-2.5">108</td><td className="p-2.5">20</td></tr>
                  <tr><td className="p-2.5 font-medium">48</td><td className="p-2.5">96 - 100</td><td className="p-2.5">112</td><td className="p-2.5">20.5</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'shoes' && (
              <table className="w-full text-xs text-left text-[#0D1B2A]/80">
                <thead className="bg-[#EFE9DE] uppercase text-[10px] text-[#0D1B2A] tracking-wider">
                  <tr>
                    <th className="p-2.5">Pointure UE / TN</th>
                    <th className="p-2.5">Pointure UK</th>
                    <th className="p-2.5">Longueur du pied (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D1B2A]/10 font-light">
                  <tr><td className="p-2.5 font-medium">40</td><td className="p-2.5">6.5</td><td className="p-2.5">25.5 cm</td></tr>
                  <tr><td className="p-2.5 font-medium">41</td><td className="p-2.5">7.5</td><td className="p-2.5">26.2 cm</td></tr>
                  <tr><td className="p-2.5 font-medium">42</td><td className="p-2.5">8.0</td><td className="p-2.5">26.8 cm</td></tr>
                  <tr><td className="p-2.5 font-medium">43</td><td className="p-2.5">9.0</td><td className="p-2.5">27.5 cm</td></tr>
                  <tr><td className="p-2.5 font-medium">44</td><td className="p-2.5">10.0</td><td className="p-2.5">28.2 cm</td></tr>
                  <tr><td className="p-2.5 font-medium">45</td><td className="p-2.5">10.5</td><td className="p-2.5">29.0 cm</td></tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="p-4 bg-[#EFE9DE] border border-[#0D1B2A]/10 text-xs text-[#0D1B2A]/80 flex items-start gap-2">
            <Check className="w-4 h-4 text-[#1B3A2B] shrink-0 mt-0.5" />
            <p>
              Besoin d'un ourlet ou d'une retouche d'aisance ? Les retouches d'ourlet sont offertes lors de votre premier passage dans notre salon des Berges du Lac II.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
