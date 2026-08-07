export type Language = 'uz' | 'ru';

export interface Category {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  descriptionUz: string;
  descriptionRu: string;
  image: string;
  icon: string;
  productCount: number;
  active: boolean;
  sortOrder: number;
}

export interface ProductSpec {
  keyUz: string;
  keyRu: string;
  valueUz: string;
  valueRu: string;
}
export type SpecificationItem = ProductSpec;

export interface Product {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  categoryId: string;
  shortDescriptionUz: string;
  shortDescriptionRu: string;
  descriptionUz: string;
  descriptionRu: string;
  images: string[];
  price: number | null;
  showPrice: boolean;
  availability: 'in_stock' | 'on_order' | 'out_of_stock';
  capacity: string;
  power: string;
  specifications: ProductSpec[];
  featuresUz: string[];
  featuresRu: string[];
  warrantyUz: string;
  warrantyRu: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'INTERESTED' | 'ORDERED' | 'COMPLETED' | 'CANCELLED';

export interface Lead {
  id: string;
  type: 'product_request' | 'consultation';
  fullName: string;
  phone: string;
  productId?: string;
  productName?: string;
  category?: string;
  quantity?: number;
  comment?: string;
  source: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  adminNotes?: string;
}

export interface HeroBanner {
  id: string;
  bgType: 'image' | 'video';
  bgUrl: string;
  headingUz: string;
  headingRu: string;
  subtitleUz: string;
  subtitleRu: string;
  ctaPrimaryTextUz: string;
  ctaPrimaryTextRu: string;
  ctaPrimaryUrl: string;
  ctaSecondaryTextUz: string;
  ctaSecondaryTextRu: string;
  ctaSecondaryUrl: string;
  overlayOpacity: number;
  active: boolean;
  sortOrder: number;
}

export interface Service {
  id: string;
  titleUz: string;
  titleRu: string;
  descriptionUz: string;
  descriptionRu: string;
  icon: string;
  image: string;
  active: boolean;
  sortOrder: number;
}
export type ServiceItem = Service;

export interface Project {
  id: string;
  titleUz: string;
  titleRu: string;
  location: string;
  systemType: string;
  capacity: string;
  year: string;
  descriptionUz: string;
  descriptionRu: string;
  images: string[];
  featured: boolean;
  active: boolean;
}
export type ProjectItem = Project;

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  active: boolean;
  sortOrder: number;
}
export type PartnerItem = Partner;

export interface SiteSettings {
  companyName: string;
  phone1: string;
  phone2: string;
  telegram: string;
  instagram: string;
  facebook: string;
  youtube: string;
  addressUz: string;
  addressRu: string;
  workingHoursUz: string;
  workingHoursRu: string;
  mapCoordinates: string;
  logoUrl: string;
  seoTitleUz: string;
  seoTitleRu: string;
  seoDescriptionUz: string;
  seoDescriptionRu: string;
}

export interface AdminNotification {
  id: string;
  leadId: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
