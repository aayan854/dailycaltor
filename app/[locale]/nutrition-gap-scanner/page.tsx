import { NutritionGapScanner } from '@/components/calculators/nutrition-gap/NutritionGapScanner';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nutrition Gap Scanner | Estimate Your Daily Nutrient Intake",
    description: "Enter the foods you've eaten today to estimate your nutritional intake compared to general reference targets.",
  };
}

export default function NutritionGapPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Nutrition Gap Scanner</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Allow users to enter foods eaten during the day and estimate their nutritional intake compared with general reference targets.
        </p>
      </div>

      <div className="mb-16">
        <NutritionGapScanner />
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Understanding Your Results</h2>
        <p>
          This tool is designed to provide a high-level estimate of your nutrient intake based on standard reference databases. It is not a diagnostic tool and cannot tell you if you are deficient in a nutrient.
        </p>
        
        <h3>Why General References?</h3>
        <p>
          Nutritional needs vary wildly based on genetics, exact activity level, medical conditions, and other factors. The targets used here are generalized averages.
        </p>
      </article>
    </div>
  );
}
