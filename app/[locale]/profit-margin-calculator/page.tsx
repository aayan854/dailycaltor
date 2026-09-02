import { getTranslations } from 'next-intl/server';
import { ProfitMarginCalculator } from '@/components/calculators/profit-margin/ProfitMarginCalculator';
import { toolsSEO } from '@/config/seo.config';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const seo = toolsSEO['profit-margin'];
  
  return {
    title: seo.title[locale as keyof typeof seo.title] || seo.title['en'],
    description: seo.metaDescription[locale as keyof typeof seo.metaDescription] || seo.metaDescription['en'],
    alternates: {
      canonical: `/${locale}/${seo.slug}`,
      // In a real app, generate hreflang links here
    }
  };
}

export default async function ProfitMarginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Note: we'd fetch translated page content here
  // const t = await getTranslations('ProfitMargin');
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Profit Margin Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate your gross profit, net profit, margin percentage, and markup instantly.
        </p>
      </div>

      <div className="mb-16">
        <ProfitMarginCalculator />
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Calculate Profit Margin</h2>
        <p>
          Profit margin is a measure of profitability. It's calculated by finding the net profit as a percentage of the revenue.
        </p>
        
        <h3>The Formula</h3>
        <div className="bg-muted p-4 rounded-md font-mono text-sm">
          Profit Margin = (Net Profit / Revenue) × 100
        </div>
        
        <h3>Example</h3>
        <p>
          If you sell a product for $100 and it costs you $40 to make, with $10 in shipping and $5 in fees, your total cost is $55. 
          Your net profit is $45.
          Your profit margin is ($45 / $100) × 100 = 45%.
        </p>
      </article>
    </div>
  );
}
