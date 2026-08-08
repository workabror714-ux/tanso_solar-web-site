export type Language = 'uz' | 'ru';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ProductSpec {
  id: string;
  keyUz: string;
  keyRu: string;
  valueUz: string;
  valueRu: string;
}
export type SpecificationItem = ProductSpec;

export interface Product {
  id: string;
  titleUz: string;
  titleRu: string;
  slug: string;
  categoryId: string;
  shortDescUz: string;
  shortDescRu: string;
  fullDescUz: string;
  fullDescRu: string;
  priceUSD: number;
  priceUZS?: number;
  images: string[];
  specs: ProductSpec[];
  inStock: boolean;
  featured: boolean;
  popular: boolean;
  viewsCount?: number;
  salesCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  nameUz: string;
  nameRu: string;
  slug: string;
  iconName?: string;
  imageUrl?: string;
  descriptionUz?: string;
  descriptionRu?: string;
  active: boolean;
  sortOrder: number;
}

export interface HeroBanner {
  id: string;
  titleUz: string;
  titleRu: string;
  subtitleUz: string;
  subtitleRu: string;
  badgeUz?: string;
  badgeRu?: string;
  buttonTextUz: string;
  buttonTextRu: string;
  buttonLink: string;
  bgImageUrl: string;
  active: boolean;
  sortOrder: number;
}

export interface Lead {
  id: string;
  type: 'product_request' | 'consultation' | 'contact_form' | 'custom';
  fullName: string;
  phone: string;
  productId?: string;
  productName?: string;
  category?: string;
  quantity?: number;
  comment?: string;
  source?: string; // page route where lead was sent
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  adminNotes?: string;
}

export interface AdminNotification {
  id: string;
  leadId: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface Service {
  id: string;
  titleUz: string;
  titleRu: string;
  descUz: string;
  descRu: string;
  iconName: string;
  imageUrl?: string;
  active: boolean;
  sortOrder: number;
}
export type ServiceItem = Service;

export interface Project {
  id: string;
  titleUz: string;
  titleRu: string;
  locationUz: string;
  locationRu: string;
  capacity: string; // e.g. "50 kW" or "3000 Liters/day"
  year: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
}
export type ProjectItem = Project;

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  active: boolean;
  sortOrder: number;
}
export type PartnerItem = Partner;

export interface SiteSettings {
  companyName: string;
  phone1: string;
  phone2: string;
  email: string;
  addressUz: string;
  addressRu: string;
  telegram: string;
  instagram: string;
  facebook: string;
  youtube: string;
  mapIframeUrl: string;
  workingHoursUz: string;
  workingHoursRu: string;
}
