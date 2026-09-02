import { CPACalculator } from '@/components/calculators/cpa/CPACalculator';

export default function CPAPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">CPA & ROAS Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate your Cost Per Acquisition, Conversion Rate, and total Return on Ad Spend.
        </p>
      </div>
      <CPACalculator />
    </div>
  );
}
