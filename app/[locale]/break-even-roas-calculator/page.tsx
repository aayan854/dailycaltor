import { BreakEvenROASCalculator } from '@/components/calculators/break-even-roas/BreakEvenROASCalculator';
import { toolsSEO } from '@/config/seo.config';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const seo = toolsSEO['break-even-roas'];
  
  return {
    title: seo?.title?.[locale as keyof typeof seo.title] || seo?.title?.['en'] || "Break-Even ROAS Calculator",
    description: seo?.metaDescription?.[locale as keyof typeof seo.metaDescription] || seo?.metaDescription?.['en'],
    alternates: {
      canonical: `/${locale}/${seo?.slug || 'break-even-roas-calculator'}`,
    }
  };
}

export default async function ROASPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Break-Even ROAS Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate the minimum Return on Ad Spend required to avoid losing money.
        </p>
      </div>

      <div className="mb-16">
        <BreakEvenROASCalculator />
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>What is Break-Even ROAS?</h2>
        <p>
          Break-even ROAS is the exact Return on Ad Spend you need to make zero profit but cover all your costs. Anything above this number means you are profitable, anything below means you are losing money.
        </p>
        
        <h3>The Formula</h3>
        <div className="bg-muted p-4 rounded-md font-mono text-sm">
          Break-Even ROAS = Revenue / (Revenue - Variable Costs)
        </div>
      </article>
    </div>
  );
}
