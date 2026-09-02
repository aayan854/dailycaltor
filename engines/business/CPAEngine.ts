export interface CPAInputs {
  adSpend: number;
  conversions: number;
  revenue: number;
  averageOrderValue: number;
  profitMargin: number; // percentage
}

export interface CPAOutputs {
  cpa: number;
  conversionRate: number;
  totalRevenue: number;
  roas: number;
  profitBeforeAds: number;
  profitAfterAds: number;
}

export function calculateCPA(inputs: CPAInputs, clicks?: number): CPAOutputs {
  const { adSpend, conversions, revenue, averageOrderValue, profitMargin } = inputs;

  const cpa = conversions > 0 ? adSpend / conversions : 0;
  const conversionRate = clicks && clicks > 0 ? (conversions / clicks) * 100 : 0;
  
  // If revenue is not provided but AOV and conversions are, calculate it
  const totalRevenue = revenue > 0 ? revenue : (conversions * averageOrderValue);
  
  const roas = adSpend > 0 ? (totalRevenue / adSpend) : 0;
  
  const profitBeforeAds = totalRevenue * (profitMargin / 100);
  const profitAfterAds = profitBeforeAds - adSpend;

  return {
    cpa,
    conversionRate,
    totalRevenue,
    roas,
    profitBeforeAds,
    profitAfterAds
  };
}
