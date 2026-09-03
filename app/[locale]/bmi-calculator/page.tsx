import { BMICalculator } from '@/components/calculators/bmi/BMICalculator';

export default function BMIPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">BMI Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Quickly check your Body Mass Index and category.
        </p>
      </div>
      <BMICalculator />
    </div>
  );
}
