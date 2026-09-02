import { EcommerceProfitCalculator } from '@/components/calculators/ecommerce-profit/EcommerceProfitCalculator';

export default function EcommercePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Ecommerce Profit Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate your true ecommerce profit after COGS, shipping, payment fees, platform fees, and ads.
        </p>
      </div>
      <EcommerceProfitCalculator />
    </div>
  );
}
