import { SmartMealBuilder } from '@/components/calculators/smart-meal/SmartMealBuilder';

export default function SmartMealPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Smart Meal Builder</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate a daily meal plan that hits your specific calorie and protein targets.
        </p>
      </div>
      <SmartMealBuilder />
    </div>
  );
}
