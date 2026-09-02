export interface ProfitInputs {
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  paymentFee: number;
  advertisingCost: number;
  otherCosts: number;
}

export interface ProfitOutputs {
  grossProfit: number;
  netProfit: number;
  profitMargin: number; // percentage
  markup: number; // percentage
  totalCost: number;
  revenue: number;
  profitPerSale: number;
}

export function calculateProfit(inputs: ProfitInputs): ProfitOutputs {
  const { sellingPrice, productCost, shippingCost, paymentFee, advertisingCost, otherCosts } = inputs;

  const totalCost = productCost + shippingCost + paymentFee + advertisingCost + otherCosts;
  const revenue = sellingPrice;
  const netProfit = revenue - totalCost;
  const grossProfit = revenue - productCost; // Simplified gross profit definition for ecommerce
  
  const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const markup = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return {
    grossProfit,
    netProfit,
    profitMargin,
    markup,
    totalCost,
    revenue,
    profitPerSale: netProfit
  };
}

export function reverseCalculateProfitFromMargin(targetMarginPercentage: number, totalCost: number): number {
  if (targetMarginPercentage >= 100) {
    throw new Error("Margin cannot be 100% or greater");
  }
  // Margin = (Price - Cost) / Price
  // Price = Cost / (1 - Margin/100)
  return totalCost / (1 - (targetMarginPercentage / 100));
}
