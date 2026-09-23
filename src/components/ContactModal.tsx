import React, { useState } from 'react';
import { X, MessageCircle, Phone, MapPin, Clock, Check, Send } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, language }) => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'sur-mesure',
    message: '',
  });

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-[#0D1B2A]/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#F7F3EC] shadow-2xl z-10 border border-[#C8A97E]/30 overflow-hidden my-8">
        <div className="p-6 border-b border-[#0D1B2A]/10 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#0D1B2A]">{t.contactModal.title}</h2>
            <p className="text-xs text-[#0D1B2A]/60 font-light mt-0.5">{t.contactModal.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-1 text-[#0D1B2A] hover:text-[#C8A97E]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Quick Direct WhatsApp concierge button */}
          <div className="p-4 bg-[#1B3A2B] text-[#F7F3EC] border border-[#C8A97E]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] block">
                Conciergerie Instantanée
              </span>
              <p className="text-xs font-light">
                Échangez en direct avec un maître tailleur ZAROMENSWEAR sur WhatsApp.
              </p>
            </div>
            <a
              href="https://wa.me/21671880200"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C8A97E] text-[#0D1B2A] text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ouvrir WhatsApp</span>
            </a>
          </div>

          {/* Salons details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#0D1B2A]/80">
            <div className="p-4 bg-[#EFE9DE] border border-[#0D1B2A]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#0D1B2A] font-serif text-sm">
                <MapPin className="w-4 h-4 text-[#C8A97E]" />
                <span>Salon Les Berges du Lac II</span>
              </div>
              <p className="font-light text-[#0D1B2A]/70 leading-relaxed">
                Avenue de la Bourse, Résidence Les Étoiles, 1053 Tunis. Sur rendez-vous privé.
              </p>
            </div>

            <div className="p-4 bg-[#EFE9DE] border border-[#0D1B2A]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#0D1B2A] font-serif text-sm">
                <Clock className="w-4 h-4 text-[#C8A97E]" />
                <span>Horaires d'Accueil</span>
              </div>
              <p className="font-light text-[#0D1B2A]/70 leading-relaxed">
                Du Lundi au Samedi : 10h00 – 19h30.<br />
                Permanence téléphonique : (+216) 71 880 200
              </p>
            </div>
          </div>

          {/* Appointment Request form */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1B2A] font-semibold border-b border-[#0D1B2A]/10 pb-2 mb-4">
              Demande de Rendez-vous Privé ou Retouches
            </h3>

            {sent ? (
              <div className="p-4 bg-[#1B3A2B]/10 text-[#1B3A2B] border border-[#C8A97E]/30 text-center text-xs space-y-1">
                <Check className="w-5 h-5 mx-auto text-[#1B3A2B]" />
                <p className="font-medium">Votre demande a bien été transmise à notre conciergerie.</p>
                <p className="text-[11px] text-[#0D1B2A]/70">Nous prendrons contact avec vous sous 24h ouvrées.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Votre Nom & Prénom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Téléphone mobile (+216)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Adresse courriel"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  />
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                  >
                    <option value="sur-mesure">Demi-mesure & Prise de cotes</option>
                    <option value="retouches">Ajustements & Retouches</option>
                    <option value="conseil">Conseil stylistique & Étoffes</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Précisions utiles, date ou créneau souhaité..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#0D1B2A]/20 p-2.5 text-xs text-[#0D1B2A] focus:outline-hidden focus:border-[#C8A97E]"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0D1B2A] hover:bg-[#1B3A2B] text-[#F7F3EC] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
