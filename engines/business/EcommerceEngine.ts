export interface EcommerceInputs {
  sellingPrice: number;
  productCost: number;
  quantitySold: number;
  shippingCostPerItem: number;
  paymentFeePercentage: number;
  paymentFeeFixed: number;
  platformFeePercentage: number;
  platformFeeFixed: number;
  advertisingSpend: number;
  refundRate: number; // percentage of quantity sold
  discountPercentage: number;
  otherFixedExpenses: number;
}

export interface EcommerceOutputs {
  revenue: number;
  totalCosts: number;
  grossProfit: number; // Revenue - COGS
  netProfit: number;
  profitMargin: number; // percentage
  profitPerOrder: number;
  breakEvenOrders: number;
  roas: number;
  cpa: number;
  netMargin: number; // percentage
}

export function calculateEcommerce(inputs: EcommerceInputs): EcommerceOutputs {
  const { 
    sellingPrice, productCost, quantitySold, shippingCostPerItem, 
    paymentFeePercentage, paymentFeeFixed, platformFeePercentage, platformFeeFixed,
    advertisingSpend, refundRate, discountPercentage, otherFixedExpenses 
  } = inputs;

  const effectiveQuantity = quantitySold * (1 - refundRate / 100);
  const effectivePrice = sellingPrice * (1 - discountPercentage / 100);
  
  const revenue = effectiveQuantity * effectivePrice;
  
  // Cost of Goods Sold (including shipping)
  const cogs = effectiveQuantity * (productCost + shippingCostPerItem);
  const grossProfit = revenue - cogs;

  const paymentFees = effectiveQuantity * (effectivePrice * (paymentFeePercentage / 100) + paymentFeeFixed);
  const platformFees = effectiveQuantity * (effectivePrice * (platformFeePercentage / 100) + platformFeeFixed);
  
  const totalVariableCosts = cogs + paymentFees + platformFees;
  const totalCosts = totalVariableCosts + advertisingSpend + otherFixedExpenses;
  
  const netProfit = revenue - totalCosts;
  
  const profitMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  
  const profitPerOrder = effectiveQuantity > 0 ? netProfit / effectiveQuantity : 0;
  
  // Break-even orders
  const contributionMarginPerUnit = effectivePrice - (productCost + shippingCostPerItem + effectivePrice * (paymentFeePercentage/100) + effectivePrice * (platformFeePercentage/100) + paymentFeeFixed + platformFeeFixed);
  const breakEvenOrders = contributionMarginPerUnit > 0 ? (advertisingSpend + otherFixedExpenses) / contributionMarginPerUnit : 0;
  
  const roas = advertisingSpend > 0 ? revenue / advertisingSpend : 0;
  const cpa = (advertisingSpend > 0 && effectiveQuantity > 0) ? advertisingSpend / effectiveQuantity : 0;

  return {
    revenue,
    totalCosts,
    grossProfit,
    netProfit,
    profitMargin,
    profitPerOrder,
    breakEvenOrders,
    roas,
    cpa,
    netMargin
  };
}
