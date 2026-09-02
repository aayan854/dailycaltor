export interface SaaSInputs {
  mrr: number; // Monthly Recurring Revenue
  customers: number;
  newCustomers: number;
  churnRate: number; // percentage
  cac: number; // Customer Acquisition Cost
  grossMargin: number; // percentage
  monthlyOperatingCost: number;
  marketingCost: number;
}

export interface SaaSOutputs {
  mrr: number;
  arr: number;
  arpu: number;
  cac: number;
  ltv: number;
  ltvCacRatio: number;
  churnRate: number;
  grossMargin: number;
  paybackPeriod: number; // in months
  monthlyBurn: number;
  breakEvenCustomers: number;
}

export function calculateSaaS(inputs: SaaSInputs): SaaSOutputs {
  const { 
    mrr, customers, newCustomers, churnRate, 
    cac, grossMargin, monthlyOperatingCost, marketingCost 
  } = inputs;

  const arr = mrr * 12;
  const arpu = customers > 0 ? mrr / customers : 0;
  
  // LTV = (ARPU * Gross Margin) / Churn Rate
  const churnDecimal = churnRate / 100;
  const marginDecimal = grossMargin / 100;
  
  const ltv = churnDecimal > 0 ? (arpu * marginDecimal) / churnDecimal : 0;
  
  // Calculate CAC if not provided directly but marketing cost and new customers are
  const effectiveCac = cac > 0 ? cac : (newCustomers > 0 ? marketingCost / newCustomers : 0);
  
  const ltvCacRatio = effectiveCac > 0 ? ltv / effectiveCac : 0;
  
  // Payback Period (Months) = CAC / (ARPU * Gross Margin)
  const paybackPeriod = (arpu * marginDecimal) > 0 ? effectiveCac / (arpu * marginDecimal) : 0;
  
  const totalExpenses = monthlyOperatingCost + marketingCost;
  const netIncome = (mrr * marginDecimal) - totalExpenses;
  const monthlyBurn = netIncome < 0 ? Math.abs(netIncome) : 0;
  
  // Break-Even Customers = Fixed Costs / (ARPU * Gross Margin)
  const breakEvenCustomers = (arpu * marginDecimal) > 0 ? totalExpenses / (arpu * marginDecimal) : 0;

  return {
    mrr,
    arr,
    arpu,
    cac: effectiveCac,
    ltv,
    ltvCacRatio,
    churnRate,
    grossMargin,
    paybackPeriod,
    monthlyBurn,
    breakEvenCustomers
  };
}
