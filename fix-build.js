const fs = require('fs');
const path = require('path');

function removeBOM(filePath) {
  let raw = fs.readFileSync(filePath, 'utf8');
  if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
    fs.writeFileSync(filePath, raw, 'utf8');
    console.log('Removed BOM from ' + filePath);
  }
}

const comps = [
  'cpa/CPACalculator.tsx',
  'break-even-roas/BreakEvenROASCalculator.tsx',
  'ecommerce-profit/EcommerceProfitCalculator.tsx',
  'saas-economics/SaaSEconomicsCalculator.tsx',
  'profit-margin/ProfitMarginCalculator.tsx',
  'smart-meal/SmartMealBuilder.tsx',
  'nutrition-gap/NutritionGapScanner.tsx',
  'time/WorkHoursCalculator.tsx'
];

for (const comp of comps) {
  const p = path.join(__dirname, 'components/calculators', comp);
  if (fs.existsSync(p)) {
    removeBOM(p);
  }
}

// Fix imports
const bePath = path.join(__dirname, 'components/calculators/break-even-roas/BreakEvenROASCalculator.tsx');
if (fs.existsSync(bePath)) {
  let beCode = fs.readFileSync(bePath, 'utf8');
  beCode = beCode.replace(/BreakEvenEngine/g, 'ROASEngine');
  fs.writeFileSync(bePath, beCode, 'utf8');
  console.log('Fixed BreakEvenROASCalculator imports');
}

const pmPath = path.join(__dirname, 'components/calculators/profit-margin/ProfitMarginCalculator.tsx');
if (fs.existsSync(pmPath)) {
  let pmCode = fs.readFileSync(pmPath, 'utf8');
  pmCode = pmCode.replace(/MarginEngine/g, 'ProfitEngine');
  fs.writeFileSync(pmPath, pmCode, 'utf8');
  console.log('Fixed ProfitMarginCalculator imports');
}
