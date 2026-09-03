import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'de', 'pt-br', 'fr', 'es', 'it', 'hi', 'ja', 'ar', 'ko'] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/disclaimer': '/disclaimer',
    '/favorites': '/favorites',
    '/calculators/business': '/calculators/business',
    '/calculators/nutrition': '/calculators/nutrition',
    '/break-even-roas-calculator': {
      en: '/break-even-roas-calculator',
      de: '/break-even-roas-rechner',
      'pt-br': '/calculadora-roas-ponto-de-equilibrio',
      fr: '/calculateur-roas',
      es: '/calculadora-roas',
      it: '/calcolatore-roas',
      hi: '/break-even-roas-calculator',
      ja: '/break-even-roas-calculator',
      ko: '/break-even-roas-calculator',
      ar: '/break-even-roas-calculator'
    },
    '/nutrition-gap-scanner': {
      en: '/nutrition-gap-scanner',
      de: '/naehrwertrechner',
      'pt-br': '/calculadora-nutricional',
      fr: '/calculateur-nutritionnel',
      es: '/calculadora-nutricional',
      it: '/calcolatore-nutrizionale',
      hi: '/nutrition-calculator',
      ja: '/nutrition-calculator',
      ko: '/nutrition-calculator',
      ar: '/nutrition-calculator'
    },
    '/profit-margin-calculator': {
      en: '/profit-margin-calculator',
      de: '/profit-margin-rechner',
      'pt-br': '/calculadora-de-margem-de-lucro',
      fr: '/calculateur-marge-beneficiaire',
      es: '/calculadora-margen-beneficio',
      it: '/calcolatore-margine-di-profitto',
      hi: '/profit-margin-calculator',
      ja: '/profit-margin-calculator',
      ko: '/profit-margin-calculator',
      ar: '/profit-margin-calculator'
    },
    '/cpa-calculator': {
      en: '/cpa-calculator',
      de: '/cpa-rechner',
      'pt-br': '/calculadora-cpa',
      fr: '/calculateur-cpa',
      es: '/calculadora-cpa',
      it: '/calcolatore-cpa',
      hi: '/cpa-calculator',
      ja: '/cpa-calculator',
      ko: '/cpa-calculator',
      ar: '/cpa-calculator'
    },
    '/ecommerce-profit-calculator': {
      en: '/ecommerce-profit-calculator',
      de: '/ecommerce-gewinn-rechner',
      'pt-br': '/calculadora-lucro-ecommerce',
      fr: '/calculateur-profit-ecommerce',
      es: '/calculadora-beneficio-ecommerce',
      it: '/calcolatore-profitto-ecommerce',
      hi: '/ecommerce-profit-calculator',
      ja: '/ecommerce-profit-calculator',
      ko: '/ecommerce-profit-calculator',
      ar: '/ecommerce-profit-calculator'
    },
    '/saas-unit-economics-calculator': {
      en: '/saas-unit-economics-calculator',
      de: '/saas-unit-economics-rechner',
      'pt-br': '/calculadora-unit-economics-saas',
      fr: '/calculateur-economie-saas',
      es: '/calculadora-economia-saas',
      it: '/calcolatore-economia-saas',
      hi: '/saas-calculator',
      ja: '/saas-calculator',
      ko: '/saas-calculator',
      ar: '/saas-calculator'
    },
    '/smart-meal-builder': {
      en: '/smart-meal-builder',
      de: '/smarter-mahlzeitenplaner',
      'pt-br': '/planejador-refeicoes',
      fr: '/planificateur-repas',
      es: '/planificador-comidas',
      it: '/pianificatore-pasti',
      hi: '/meal-planner',
      ja: '/meal-planner',
      ko: '/meal-planner',
      ar: '/meal-planner'
    },
    '/bmi-calculator': {
      en: '/bmi-calculator',
      de: '/bmi-rechner',
      'pt-br': '/calculadora-imc',
      fr: '/calculateur-imc',
      es: '/calculadora-imc',
      it: '/calcolatore-imc',
      hi: '/bmi-calculator',
      ja: '/bmi-calculator',
      ko: '/bmi-calculator',
      ar: '/bmi-calculator'
    }
  }
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
