export interface ToolSEOConfig {
  slug: string;
  primaryKeyword: Record<string, string>;
  title: Record<string, string>;
  metaDescription: Record<string, string>;
}

export const toolsSEO: Record<string, ToolSEOConfig> = {
  "profit-margin": {
    slug: "profit-margin-calculator",
    primaryKeyword: {
      en: "profit margin calculator",
      "pt-br": "calculadora de margem de lucro",
      de: "Gewinnmargenrechner"
    },
    title: {
      en: "Profit Margin Calculator | Calculate Markup & Net Profit",
      "pt-br": "Calculadora de Margem de Lucro | Calcule Mark-up e Lucro Líquido",
      de: "Gewinnmargenrechner | Marge & Nettogewinn berechnen"
    },
    metaDescription: {
      en: "Free profit margin calculator. Calculate gross profit, net profit, margin percentage, and markup for your products instantly.",
      "pt-br": "Calculadora de margem de lucro gratuita. Calcule lucro bruto, lucro líquido, porcentagem de margem e markup para seus produtos.",
      de: "Kostenloser Gewinnmargenrechner. Berechnen Sie Bruttogewinn, Nettogewinn, Margenprozentsatz und Aufschlag für Ihre Produkte."
    }
  },
  "break-even-roas": {
    slug: "break-even-roas-calculator",
    primaryKeyword: {
      en: "break even roas calculator"
    },
    title: {
      en: "Break-Even ROAS Calculator | Maximize Ad Profit"
    },
    metaDescription: {
      en: "Calculate your break-even ROAS and maximum allowable ad spend to ensure your advertising campaigns remain profitable."
    }
  },
  "cpa": {
    slug: "cpa-calculator",
    primaryKeyword: { en: "cpa calculator" },
    title: { en: "CPA Calculator | Cost Per Acquisition" },
    metaDescription: { en: "Calculate your Cost Per Acquisition, Conversion Rate, and Return on Ad Spend (ROAS)." }
  },
  "ecommerce-profit": {
    slug: "ecommerce-profit-calculator",
    primaryKeyword: { en: "ecommerce profit calculator" },
    title: { en: "Ecommerce Profit Calculator | Shopify, Amazon & DTC" },
    metaDescription: { en: "Calculate true ecommerce profit after shipping, payment fees, platform fees, and ads." }
  },
  "saas-economics": {
    slug: "saas-unit-economics-calculator",
    primaryKeyword: { en: "saas unit economics calculator" },
    title: { en: "SaaS Unit Economics Calculator | LTV:CAC & Churn" },
    metaDescription: { en: "Calculate MRR, ARR, LTV:CAC Ratio, and Payback Period for your SaaS." }
  },
  "nutrition-gap": {
    slug: "nutrition-gap-scanner",
    primaryKeyword: { en: "nutrition calculator" },
    title: { en: "Nutrition Gap Scanner | Estimate Nutrient Intake" },
    metaDescription: { en: "Track calories, protein, and micronutrients against general reference targets." }
  },
  "smart-meal": {
    slug: "smart-meal-builder",
    primaryKeyword: { en: "meal planner" },
    title: { en: "Smart Meal Builder | Automated Meal Planning" },
    metaDescription: { en: "Generate personalized daily meal plans to hit your calorie and protein targets." }
  }
};
