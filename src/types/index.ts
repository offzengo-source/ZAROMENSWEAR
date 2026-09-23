export type Language = 'fr' | 'ar';

export type Category = 
  | 'all'
  | 'pulls'
  | 'tshirts';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: Category;
  categoryName: string;
  categoryNameAr: string;
  priceDT: number;
  description: string;
  descriptionAr: string;
  fabric: string;
  fabricAr: string;
  details: string[];
  detailsAr: string[];
  sizes: string[];
  image: string;
  gallery: string[];
  badge?: string;
  badgeAr?: string;
  color: string;
  colorAr: string;
  care: string;
  careAr: string;
  origin: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderCustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  governorate: string;
  postalCode: string;
  paymentMethod: 'cod' | 'card' | 'transfer';
  notes?: string;
}
