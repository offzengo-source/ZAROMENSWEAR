import { Product } from '../types';

export const CATEGORIES_LIST = [
  { id: 'all', nameFr: 'Tous les modèles', nameAr: 'كافة القطع' },
  { id: 'pulls', nameFr: 'Pulls & Tricots', nameAr: 'السترات والتريكو' },
  { id: 'tshirts', nameFr: 'T-Shirts & Polos', nameAr: 'التي شيرت والبولو' },
];

export const TUNISIAN_GOVERNORATES = [
  'Ariana',
  'Béja',
  'Ben Arous',
  'Bizerte',
  'Gabès',
  'Gafsa',
  'Jendouba',
  'Kairouan',
  'Kasserine',
  'Kébili',
  'Le Kef',
  'Mahdia',
  'La Manouba',
  'Médenine',
  'Monastir',
  'Nabeul',
  'Sfax',
  'Sidi Bouzid',
  'Siliana',
  'Sousse',
  'Tataouine',
  'Tozeur',
  'Tunis',
  'Zaghouan'
];

export const PRODUCTS: Product[] = [
  {
    id: 'polo-maille-riviera-bicolore',
    name: 'Polo Tricoté en Maille Bicolore — Chocolat & Ivoire',
    nameAr: 'قميص بولو تريكو بلونين — شوكولاتة وعاجي',
    category: 'pulls',
    categoryName: 'Pulls & Tricots',
    categoryNameAr: 'السترات والتريكو',
    priceDT: 290,
    badge: 'Pièce Signature · Édition Limitée',
    badgeAr: 'قطعة مميزة · إصدار محدود',
    description: 'La pièce emblématique de la nouvelle capsule ZAROMENSWEAR. Inspiré de l\'élégance décontractée de la Riviera méditerranéenne, ce polo en maille tricotée fine associe des manches et un dos chocolat profond à un plastron vertical ivoire côtelé avec liseré contrasté. Tombé impeccable et confort thermique optimal.',
    descriptionAr: 'القطعة الأيقونية لتشكيلتنا الجديدة. مستوحاة من أناقة الريفيرا المتوسطية، تجمع بين أكمام وظهر بلون الشوكولاتة الداكنة مع صدرية عمودية مضلعة بلون عاجي راقٍ وأزرار متقنة الصنع.',
    fabric: '100% Coton peigné mercerisé & soie douce (jauge 14) — Filatures d\'Italie',
    fabricAr: '100% قطن ناعم ممشط ولمسة حرير إيطالي ناعم',
    details: [
      'Maille tricotée bicolore chocolat noir et panneau ivoire texturé',
      'Col chemisier tailleur à revers souple et patte de boutonnage épurée',
      'Bords-côtes élastiqués aux manches et au bas du vêtement',
      'Boutons fins en corne véritable cousus sur queue',
      'Coupe droite moderne, ni trop ample ni trop cintrée',
      'Confectionné artisanalement dans nos ateliers de Tunisie'
    ],
    detailsAr: [
      'تريكو متقن بلونين: شوكولاتة دافئة وصدرية عاجية ذات ملمس ناعم',
      'ياقة قميص كلاسيكية مع فتحة أزرار أنيقة ومخفية',
      'أطراف مطاطية مضلعة على الأكمام وأسفل القميص',
      'أزرار من قرن طبيعي مثبتة يدوياً',
      'قصة معتدلة مريحة تمنح قواماً رشيقاً',
      'صنع يدوي في ورشاتنا في تونس'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/polo_maille_hero_1790183116725.jpg',
    gallery: [
      '/src/assets/images/polo_maille_hero_1790183116725.jpg',
      '/src/assets/images/polo_maille_chocolat_1790183130764.jpg'
    ],
    color: 'Chocolat Profond & Ivoire',
    colorAr: 'شوكولاتة داكنة وعاجي',
    care: 'Lavage délicat à la main ou programme laine à 30°C. Séchage à plat impératif. Repassage doux à l\'envers.',
    careAr: 'غسيل يدوي لطيف أو برنامج صوف على 30 درجة. تجفيف أفقي. كي خفيف على الوجه الداخلي.',
    origin: 'Atelier Monastir, Tunisie'
  },
  {
    id: 'pull-col-zippe-merinos-ecru',
    name: 'Pull Col Camionneur Zippé en Laine Mérinos Écru',
    nameAr: 'كنزة صوف ميرينو بياقة مرتفعة وسحاب عاجي',
    category: 'pulls',
    categoryName: 'Pulls & Tricots',
    categoryNameAr: 'السترات والتريكو',
    priceDT: 380,
    badge: 'Essentiel Sartorial',
    badgeAr: 'أساسي فاخر',
    description: 'Tricoté dans une laine mérinos extrafine d\'une infinie douceur. Col semi-montant doté d\'une fermeture à glissière en métal vieilli finition ruthénium, idéal superposé à un t-shirt immaculé ou sous un blazer déstructuré.',
    descriptionAr: 'كنزة مصنوعة من صوف الميرينو فائق النعومة. ياقة مرتفعة مزودة بسحاب معدني بتشطيب فاخر، مثالية فوق التي شيرت أو تحت السترة.',
    fabric: '100% Laine Mérinos Extrafine 19.5 microns — Tollegno 1900',
    fabricAr: '100% صوف ميرينو ناعم استثنائي 19.5 ميكرون',
    details: [
      'Maille jersey dense et thermorégulatrice',
      'Curseur de zip personnalisé en finition argent vieilli',
      'Finitions bords-côtes 2x2 aux poignets et à la taille',
      'Diminutions apparentes aux emmanchures napolitaines'
    ],
    detailsAr: [
      'حياكة جيرسيه كثيفة ومقاومة للتمدد',
      'سحاب فضي معتق بتصميم كلاسيكي',
      'أساور وخصر مضلع بحياكة مزدوجة متينة'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/pull_col_zippe_ecru_1790183141974.jpg',
    gallery: [
      '/src/assets/images/pull_col_zippe_ecru_1790183141974.jpg'
    ],
    color: 'Écru Albâtre',
    colorAr: 'عاجي طبيعي',
    care: 'Nettoyage à sec doux ou lavage manuel eau froide. Ne pas essorer en machine.',
    careAr: 'تنظيف جاف لطيف أو غسيل يدوي بماء بارد.',
    origin: 'Atelier Tunis, Tunisie'
  },
  {
    id: 'tshirt-coton-giza-blanc',
    name: 'T-Shirt Essentiel Coupe Tailleur Coton Giza 87 Blanc',
    nameAr: 'تي شيرت قطن جيزة مصري 87 بقصة متقنة أبيض',
    category: 'tshirts',
    categoryName: 'T-Shirts & Polos',
    categoryNameAr: 'التي شيرت والبولو',
    priceDT: 160,
    badge: 'Best-Seller',
    badgeAr: 'الأكثر طلباً',
    description: 'Le t-shirt parfait existe enfin. Confectionné dans un jersey lourd de 240g en coton Giza 87 égyptien double retors, il offre un tombé plombant, aucune transparence et un col ras-du-cou qui ne gondole jamais au lavage.',
    descriptionAr: 'التي شيرت المثالي بلا منازع. منسوج من قطن جيزة 87 المصري الفاخر بوزن ثقيل 240 غرام ليمنح قواماً ثابتاً دون أي شفافية.',
    fabric: '100% Coton Giza 87 double retors peigné 240g/m²',
    fabricAr: '100% قطن جيزة 87 مصري فاخر وزن 240 غرام/م²',
    details: [
      'Poids substantiel de 240g/m² garantissant une opacité totale',
      'Bande de propreté renforcée d\'épaule à épaule',
      'Col en côte 1x1 ultra-résistant de 2,2 cm',
      'Coupe régulière ajustée aux épaules avec liberté au torse'
    ],
    detailsAr: [
      'وزن ثقيل ومثالي 240 غرام/م² غير شفاف إطلاقاً',
      'شريط تقوية داخلي على طول الأكتاف',
      'ياقة دائرية محكمة لا تتمدد بعد الغسيل'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/tshirt_giza_blanc_1790183154162.jpg',
    gallery: [
      '/src/assets/images/tshirt_giza_blanc_1790183154162.jpg'
    ],
    color: 'Blanc Craie Immoculé',
    colorAr: 'أبيض ناصع كلاسيكي',
    care: 'Lavage en machine à 30°C sur l\'envers. Essorage doux 600 tours. Séchage sur cintre.',
    careAr: 'غسيل في الغسالة على 30 درجة على الوجه الداخلي.',
    origin: 'Atelier Monastir, Tunisie'
  },
  {
    id: 'pull-col-rond-cachemire-marine',
    name: 'Pull Col Rond Maille Perlée Laine & Cachemire Marine',
    nameAr: 'كنزة كلاسيكية بياقة دائرية صوف وكشمير كحلي',
    category: 'pulls',
    categoryName: 'Pulls & Tricots',
    categoryNameAr: 'السترات والتريكو',
    priceDT: 420,
    badge: 'Pure Laine & Cachemire',
    badgeAr: 'صوف وكشمير خالص',
    description: 'Une nuance bleu marine nocturne d\'une grande sobriété. Alliant la tenue de la laine mérinos à la chaleur caressante du cachemire mongol, ce pull col rond s\'associe avec aisance à vos tenues les plus soignées.',
    descriptionAr: 'درجة زرقاء كحلية عميقة توحي بالهدوء والرقي. تمزج بين متانة صوف الميرينو ودفء الكشمير الطبيعي الناعم.',
    fabric: '90% Laine d\'agneau Geelong, 10% Cachemire peigné',
    fabricAr: '90% صوف خروف جيلونغ ناعم، 10% كشمير منغولي ممشط',
    details: [
      'Tricotage point jersey en jauge 12',
      'Bord-côte tubulaire sans couture gênante',
      'Emmanchures marteau pour une aisance totale',
      'Fil teinté dans la masse pour une tenue éclatante des couleurs'
    ],
    detailsAr: [
      'حياكة دائرية مريحة دون درزات مزعجة',
      'ياقة دائرية كلاسيكية محكمة',
      'ألوان ثابتة تدوم لسنوات طوال'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/pull_tricot_marine_1790183164927.jpg',
    gallery: [
      '/src/assets/images/pull_tricot_marine_1790183164927.jpg'
    ],
    color: 'Bleu Nuit Sartorial',
    colorAr: 'أزرق كحلي ليلي داكن',
    care: 'Lavage à froid à la main. Sécher à plat sur serviette éponge.',
    careAr: 'غسيل بماء بارد يدوياً والتجفيف على سطح مستوٍ.',
    origin: 'Atelier Tunis, Tunisie'
  },
  {
    id: 'tshirt-supima-noir-dense',
    name: 'T-Shirt Coupe Tailleur Coton Supima Noir Intense',
    nameAr: 'تي شيرت قطن سوبيما أمريكي فخم أسود داكن',
    category: 'tshirts',
    categoryName: 'T-Shirts & Polos',
    categoryNameAr: 'التي شيرت والبولو',
    priceDT: 160,
    description: 'Un noir d\'ébène profond qui ne délave pas, obtenu par une teinture réactive de pointe. Le coton Supima californien à fibres extra-longues procure un lustre soyeux et un toucher d\'une exceptionnelle douceur.',
    descriptionAr: 'لون أسود عميق لا يبهت مع الغسيل بفضل صباغة تفاعلية خاصة. قطن سوبيما بألياف طويلة يعطي ملمساً كالحرير.',
    fabric: '100% Coton Supima 230g/m² à fibres extra-longues',
    fabricAr: '100% قطن سوبيما بألياف طويلة 230 غرام/م²',
    details: [
      'Noir d\'ébène certifié grand teint',
      'Drapé sculptural et tenue irréprochable',
      'Ourlets piqués à double aiguille discrète',
      'Sans étiquette grattante, marquage intérieur discret'
    ],
    detailsAr: [
      'لون أسود حالك ثابت تماماً',
      'تطريز مزدوج دقيق غير مرئي',
      'بدون بطاقات قماشية مزعجة على الرقبة'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/tshirt_noir_supima_1790183180330.jpg',
    gallery: [
      '/src/assets/images/tshirt_noir_supima_1790183180330.jpg'
    ],
    color: 'Noir Ébène',
    colorAr: 'أسود فحمي فاخر',
    care: 'Lavage 30°C avec couleurs similaires. Pas de sèche-linge.',
    careAr: 'غسيل على 30 درجة مع ألوان مماثلة.',
    origin: 'Atelier Monastir, Tunisie'
  },
  {
    id: 'pull-torsade-cachemire-camel',
    name: 'Pull Torsadé en Cachemire & Laine Vierge Camel',
    nameAr: 'كنزة صوف وكشمير مجدولة جملي دافئ',
    category: 'pulls',
    categoryName: 'Pulls & Tricots',
    categoryNameAr: 'السترات والتريكو',
    priceDT: 460,
    badge: 'Inspiration Hiver',
    badgeAr: 'إصدار شتوي فاخر',
    description: 'L\'archétype de l\'élégance aristocratique décontractée. Ses torsades en relief créent des jeux d\'ombre et de lumière somptueux dans une tonalité camel chaleureuse inspirée des dunes du Sud tunisien.',
    descriptionAr: 'عنوان الأناقة الكلاسيكية الدافئة. جدائل بارزة متقنة الصنع مستوحاة من رمال الصحراء التونسية بدرجة جملية ساحرة.',
    fabric: '70% Laine vierge d\'Australie, 30% Cachemire pur',
    fabricAr: '70% صوف أسترالي بكر، 30% كشمير خالص',
    details: [
      'Torsades irlandaises revisitées en jauge moyenne 7',
      'Col rond remaillé main pour un confort absolu',
      'Poignets et ourlet côtelés à mémoire de forme',
      'Teinte naturelle sans traitement chimique agressif'
    ],
    detailsAr: [
      'جدائل هندسية راقية بحياكة دقيقة',
      'ياقة دائرية محاكة يدوياً لراحة الرقبة',
      'صوف طبيعي خام دون معالجات كيميائية قاسية'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/pull_torsade_camel_1790183191994.jpg',
    gallery: [
      '/src/assets/images/pull_torsade_camel_1790183191994.jpg'
    ],
    color: 'Camel Saharien',
    colorAr: 'جملي صحراوي دافئ',
    care: 'Lavage à la main avec shampoing pour laine. Séchage à plat.',
    careAr: 'غسيل يدوي بشامبو الصوف المخصص وتجفيف أفقي.',
    origin: 'Atelier Tunis, Tunisie'
  },
  {
    id: 'tshirt-maille-gaufree-sauge',
    name: 'T-Shirt en Maille Côtelée Sauge Méditerranéenne',
    nameAr: 'تي شيرت تريكو مضلع خفيف بلون أخضر مريمي',
    category: 'tshirts',
    categoryName: 'T-Shirts & Polos',
    categoryNameAr: 'التي شيرت والبولو',
    priceDT: 175,
    badge: 'Nouveauté',
    badgeAr: 'وصل حديثاً',
    description: 'Un tee-shirt en maille tricotée fine doté d\'une subtile texture gaufrée respirante. Une teinte vert sauge patinée évoquant les oliveraies du Sahel tunisien.',
    descriptionAr: 'تي شيرت تريكو خفيف بنقشة بارزة مسامية وناعمة. لون أخضر مريمي ترابي مستوحى من حقول الزيتون التونسية العريقة.',
    fabric: '100% Coton peigné texturé 210g/m²',
    fabricAr: '100% قطن ممشط بنقشة بارزة 210 غرام/م²',
    details: [
      'Micro-texture respirante apportant du relief visuel',
      'Col chemisier miniature sans boutonnière',
      'Bords de manches francs et finitions raffinées'
    ],
    detailsAr: [
      'نسيج مضلع دقيق يسمح بمرور الهواء',
      'ياقة راقية تعزز المظهر الكلاسيكي',
      'تشطيبات متقنة لا تتلف مع الاستخدام اليومي'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/tshirt_maille_sauge_1790183204597.jpg',
    gallery: [
      '/src/assets/images/tshirt_maille_sauge_1790183204597.jpg'
    ],
    color: 'Sauge Méditerranéenne',
    colorAr: 'أخضر مريمي ترابي',
    care: 'Lavage délicat à 30°C. Repassage doux à la vapeur.',
    careAr: 'غسيل خفيف على 30 درجة وكي بالبخار.',
    origin: 'Atelier Monastir, Tunisie'
  },
  {
    id: 'polo-maille-chocolat-studio',
    name: 'Polo en Tricot Texturé Chocolat Noir & Crème',
    nameAr: 'قميص بولو تريكو محبوك شوكولاتة وكريمي',
    category: 'pulls',
    categoryName: 'Pulls & Tricots',
    categoryNameAr: 'السترات والتريكو',
    priceDT: 290,
    badge: 'Vue Studio',
    badgeAr: 'عرض تفصيلي',
    description: 'Gros plan studio sur la texture de la maille du polo Riviera. Remarquez la précision du point de tricot italien et l\'équilibre subtil des proportions entre le col et le plastron crème.',
    descriptionAr: 'إطلالة مفصلة على حياكة قميص بولو ريفيرا المتقنة. تناسق فريد بين الياقة والصدرية العاجية بدرجات الشوكولاتة الداكنة.',
    fabric: '100% Coton égyptien mercerisé et filature fine',
    fabricAr: '100% قطن مصري معالج ممشط',
    details: [
      'Plastron ivoire travaillé en point de riz miniature',
      'Boutons cousus à la main au fil ciré résistant',
      'Maille légère aérée conçue pour les soirées douces'
    ],
    detailsAr: [
      'صدرية عاجية بنقشة متموجة دقيقة',
      'أزرار مثبتة يدوياً بخيط متين',
      'تريكو صيفي خفيف للمساء والنزهات الراقية'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/src/assets/images/polo_maille_chocolat_1790183130764.jpg',
    gallery: [
      '/src/assets/images/polo_maille_chocolat_1790183130764.jpg',
      '/src/assets/images/polo_maille_hero_1790183116725.jpg'
    ],
    color: 'Chocolat & Crème',
    colorAr: 'شوكولاتة وكريمي',
    care: 'Lavage main délicat ou programme laine.',
    careAr: 'غسيل يدوي خفيف.',
    origin: 'Atelier Monastir, Tunisie'
  }
];
