import { SaaSEconomicsCalculator } from '@/components/calculators/saas-economics/SaaSEconomicsCalculator';

export default function SaaSPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">SaaS Unit Economics</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate your MRR, ARR, LTV:CAC Ratio, and Payback Period.
        </p>
      </div>
      <SaaSEconomicsCalculator />
    </div>
  );
}
