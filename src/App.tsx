import React, { useState, useEffect } from 'react';
import { Product, CartItem, Language, Category } from './types';
import { PRODUCTS } from './data/products';
import { TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('zaromenswear_lang');
    return (saved === 'ar' ? 'ar' : 'fr') as Language;
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zaromenswear_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zaromenswear_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Promo code & discount
  const [discountRate, setDiscountRate] = useState<number>(0);

  // Subtle toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync language with HTML dir and lang
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('zaromenswear_lang', language);
  }, [language]);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem('zaromenswear_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist with localStorage
  useEffect(() => {
    localStorage.setItem('zaromenswear_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Show toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });

    const prodName = language === 'ar' ? product.nameAr : product.name;
    showToast(
      language === 'ar'
        ? `تمت إضافة "${prodName}" إلى خزانة الطلب`
        : `"${prodName}" ajouté à votre vestiaire`
    );
  };

  // Update cart item quantity
  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  // Promo code validation
  const handleApplyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CERCLE10' || clean === 'HERITAGE' || clean === 'ZARO10') {
      setDiscountRate(0.10);
      return true;
    }
    return false;
  };

  // Smooth scroll
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart total items
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Products saved in wishlist
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className={`min-h-screen bg-[#F7F3EC] text-[#0D1B2A] flex flex-col font-sans ${language === 'ar' ? 'font-arabic' : ''}`}>
      {/* Global Navigation Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartCount={cartItemCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavigateSection('products');
        }}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section featuring the user's signature knit polo */}
        <Hero
          language={language}
          onExplore={() => handleNavigateSection('products')}
          onHeritage={() => handleNavigateSection('products')}
        />

        {/* Catalog & Product Grid (Pulls & T-shirts only) */}
        <ProductGrid
          products={PRODUCTS}
          language={language}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setSelectedProduct}
          onAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onLanguageChange={setLanguage}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavigateSection('products');
        }}
        onOpenContact={() => setContactOpen(true)}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        language={language}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, size, qty) => {
          handleAddToCart(prod, size, qty);
          setSelectedProduct(null);
        }}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onExplore={() => {
          setCartOpen(false);
          handleNavigateSection('products');
        }}
        discountRate={discountRate}
        onApplyPromo={handleApplyPromo}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        language={language}
        discountRate={discountRate}
        onOrderCompleted={() => {
          setCart([]);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        language={language}
        onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((item) => item !== id))}
        onQuickView={(p) => setSelectedProduct(p)}
        onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        language={language}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Contact & Private Salons Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        language={language}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        language={language}
      />

      {/* Quiet Toast Notification for Cart Add */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D1B2A] text-[#F7F3EC] py-3 px-5 border border-[#C8A97E]/40 shadow-xl flex items-center gap-3 animate-fade-in text-xs max-w-sm">
          <div className="w-5 h-5 rounded-full bg-[#1B3A2B] text-[#C8A97E] flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-[#C8A97E]" />
          </div>
          <p className="flex-1 font-light leading-snug">{toastMessage}</p>
          <button
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="text-[11px] uppercase tracking-wider text-[#C8A97E] hover:text-white underline whitespace-nowrap pl-2"
          >
            {language === 'ar' ? 'عرض' : 'Voir'}
          </button>
        </div>
      )}
    </div>
  );
}
