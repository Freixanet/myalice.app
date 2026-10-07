import { en, type Copy } from './en';
import { es } from './es';

export type Locale = 'en' | 'es';
export const copy: Record<Locale, Copy> = { en, es };
export const paths: Record<Locale, string> = { en: '/', es: '/es/' };
