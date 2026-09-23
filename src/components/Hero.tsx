import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeroProps {
  language: Language;
  onExplore: () => void;
  onHeritage: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExplore, onHeritage }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative min-h-[90vh] md:min-h-[92vh] flex items-end justify-start overflow-hidden bg-[#0D1B2A]">
      {/* Background imagery: Photo requested by user (man with convertible car at sunset wearing the signature knit polo) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/polo_maille_hero_1790183116725.jpg"
          alt="Polo tricoté bicolore chocolat & ivoire - Maison ZAROMENSWEAR"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.04] transition-transform duration-1000 scale-[1.01]"
        />
        {/* Subtle dual gradient overlay: dark bottom for readable contrast, warm bronze ambient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/95 via-[#0D1B2A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/80 via-transparent to-transparent hidden md:block" />
      </div>

      {/* Floating Product Highlight Card on desktop */}
      <div className="absolute top-24 right-8 lg:right-16 z-20 hidden md:block max-w-xs p-4 bg-[#F7F3EC]/90 backdrop-blur-md border border-[#C8A97E]/40 shadow-2xl">
        <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A97E]" />
          <span>{language === 'ar' ? 'قطعة الموسم الحصرية' : 'Édition Spéciale 2026'}</span>
        </div>
        <h3 className="font-serif text-sm text-[#0D1B2A] font-medium leading-snug">
          {language === 'ar' ? 'بولو تريكو ريفيرا شوكولاتة وعاجي' : 'Polo en Maille Riviera Bicolore'}
        </h3>
        <p className="text-[11px] text-[#0D1B2A]/70 font-light mt-1">
          {language === 'ar' ? 'حياكة إيطالية فاخرة بقطن ناعم' : 'Maille tricotée fine en coton & soie'}
        </p>
        <div className="mt-3 pt-2.5 border-t border-[#0D1B2A]/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#0D1B2A]">290 DT</span>
          <button
            onClick={onExplore}
            className="text-[11px] uppercase tracking-wider text-[#C8A97E] hover:text-[#0D1B2A] font-medium flex items-center gap-1 transition-colors"
          >
            <span>{language === 'ar' ? 'طلب القطعة' : 'Commander'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content overlay in bottom left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 pt-32">
        <div className="max-w-2xl text-left">
          {/* Subtle kicker */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-[#C8A97E]" />
            <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C8A97E] font-medium">
              {t.hero.kicker}
            </span>
          </div>

          {/* Master motto */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F7F3EC] font-normal leading-[1.15] mb-5 tracking-tight">
            {t.hero.title}
          </h1>

          {/* Quiet subtitle */}
          <p className="text-sm sm:text-base text-[#F7F3EC]/80 font-light leading-relaxed mb-8 max-w-xl">
            {t.hero.subtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#F7F3EC] text-[#0D1B2A] text-xs sm:text-sm font-medium tracking-[0.16em] uppercase hover:bg-[#C8A97E] hover:text-[#0D1B2A] transition-all duration-300 shadow-sm"
            >
              <span>{t.hero.discoverBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onHeritage}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#F7F3EC]/40 text-[#F7F3EC] text-xs sm:text-sm font-light tracking-[0.16em] uppercase hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors"
            >
              <span>{t.hero.heritageBtn}</span>
            </button>
          </div>

          {/* Provenance note */}
          <div className="mt-10 pt-6 border-t border-[#F7F3EC]/15 flex items-center gap-2 text-[11px] text-[#F7F3EC]/60 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A2B] border border-[#C8A97E]/50"></span>
            <span>{t.hero.madeInTunisia}</span>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <button
        onClick={onExplore}
        className="absolute bottom-6 right-8 z-10 text-[#F7F3EC]/50 hover:text-[#C8A97E] transition-colors hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase"
      >
        <span>Défiler</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
