import { en, type Copy } from './en';
import { es } from './es';

export type Locale = 'en' | 'es';
export const copy: Record<Locale, Copy> = { en, es };
export const paths: Record<Locale, string> = { en: '/', es: '/es/' };
export const privacyPaths: Record<Locale, string> = { en: '/privacy/', es: '/es/privacidad/' };
