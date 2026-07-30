export type Language = 'uz' | 'ru' | 'en';

export interface Product {
  id: string;
  name: string;
  category: 'panels' | 'inverters' | 'batteries' | 'heaters' | 'turnkey';
  categoryLabel: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  badge?: Record<Language, string>;
  powerRating?: string;
  efficiency?: string;
  warranty?: string;
  specs: { label: Record<Language, string>; value: string }[];
  isPopular?: boolean;
  priceEstimate?: string;
}

export interface Service {
  id: string;
  iconName: string;
  title: Record<Language, string>;
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  features: Record<Language, string[]>;
}

export interface Project {
  id: string;
  title: Record<Language, string>;
  category: 'industrial' | 'residential' | 'commercial' | 'agriculture';
  categoryLabel: Record<Language, string>;
  capacity: string;
  location: Record<Language, string>;
  image: string;
  year: string;
  annualSavings: string;
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
}

export interface NewsItem {
  id: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  content: Record<Language, string>;
  category: Record<Language, string>;
  date: string;
  readTime: string;
  image: string;
  author: string;
  isFeatured?: boolean;
}

export interface TimelineEvent {
  year: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  stat?: string;
}

export interface Advantage {
  id: string;
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  highlight: string;
}

export interface Partner {
  id: string;
  name: string;
  logoText: string;
  country: string;
  tier: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyType: 'home' | 'business' | 'industrial' | 'agriculture';
  monthlyBill: string;
  region: string;
  comments: string;
  calculatedCapacity?: string;
}
