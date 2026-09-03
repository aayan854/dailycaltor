const fs = require('fs');
const path = require('path');

// 1. Update i18n/routing.ts
const routingPath = path.join(__dirname, 'i18n', 'routing.ts');
let routing = fs.readFileSync(routingPath, 'utf8');
if (!routing.includes('work-hours-calculator')) {
  routing = routing.replace(
    /('\/bmi-calculator': '\/bmi-calculator',)/g,
    "'/bmi-calculator': '/bmi-calculator',\n    '/work-hours-calculator': '/work-hours-calculator',"
  );
  fs.writeFileSync(routingPath, routing, 'utf8');
  console.log('Updated routing.ts');
}

// 2. Update page.tsx
const pagePath = path.join(__dirname, 'app', '[locale]', 'page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');
if (!page.includes('work-hours-calculator')) {
  const newTool = 
        {
          id: 'work-hours-calculator',
          title: tTools('work-hours-calculator'),
          description: 'Calculate work hours and total gross pay.',
          href: '/work-hours-calculator',
          icon: <Clock className="w-5 h-5 text-purple-500" />
        },;
  page = page.replace(/(const tools = \[)/, $1 + newTool);
  // make sure Clock is imported
  if (!page.includes('Clock')) {
    page = page.replace('import { Calculator, DollarSign, Package, ShoppingCart, Activity, Salad, Scale } from "lucide-react";', 'import { Calculator, DollarSign, Package, ShoppingCart, Activity, Salad, Scale, Clock } from "lucide-react";');
  }
  fs.writeFileSync(pagePath, page, 'utf8');
  console.log('Updated homepage');
}

// 3. Update en.json
const enPath = path.join(__dirname, 'messages', 'en.json');
let enRaw = fs.readFileSync(enPath, 'utf8');
if (enRaw.charCodeAt(0) === 0xFEFF) enRaw = enRaw.slice(1);
let en = JSON.parse(enRaw);
en.Tools['work-hours-calculator'] = "Work Hours Calculator";
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
console.log('Updated en.json');

// 4. Create the wrapper page
const pageTsx = import { WorkHoursCalculator } from '@/components/calculators/time/WorkHoursCalculator';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tools' });
  return {
    title: t('work-hours-calculator') + ' | DailyCaltor',
    description: 'Calculate your work hours and timesheets instantly.',
  };
}

export default function WorkHoursPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Work Hours Calculator</h1>
        <p className="text-muted-foreground text-lg">Calculate your timesheets, total hours, and gross pay instantly.</p>
      </div>
      <WorkHoursCalculator />
    </div>
  );
}
;
fs.writeFileSync(path.join(__dirname, 'app', '[locale]', 'work-hours-calculator', 'page.tsx'), pageTsx, 'utf8');
console.log('Created wrapper page');
