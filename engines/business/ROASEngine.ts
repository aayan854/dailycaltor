export interface ROASInputs {
  sellingPrice: number;
  productCost: number;
  shipping: number;
  paymentFees: number;
  otherVariableCosts: number;
  targetProfitMargin: number; // percentage
}

export interface ROASOutputs {
  breakEvenROAS: number;
  targetROAS: number;
  maximumAdSpend: number;
  profitPerSaleAtBreakEven: number;
  contributionMargin: number;
}

export function calculateROAS(inputs: ROASInputs): ROASOutputs {
  const { sellingPrice, productCost, shipping, paymentFees, otherVariableCosts, targetProfitMargin } = inputs;

  const variableCosts = productCost + shipping + paymentFees + otherVariableCosts;
  const contributionMargin = sellingPrice - variableCosts; // Maximum allowable ad cost to break even

  // Break-Even ROAS = Revenue / Max Allowable Ad Cost
  const breakEvenROAS = contributionMargin > 0 ? (sellingPrice / contributionMargin) : 0;
  
  // Target ROAS = Revenue / (Contribution Margin - Target Profit)
  const targetProfitAmount = sellingPrice * (targetProfitMargin / 100);
  const allowableAdSpendForTarget = contributionMargin - targetProfitAmount;
  
  const targetROAS = allowableAdSpendForTarget > 0 ? (sellingPrice / allowableAdSpendForTarget) : 0;

  return {
    breakEvenROAS,
    targetROAS,
    maximumAdSpend: contributionMargin,
    profitPerSaleAtBreakEven: 0, // By definition
    contributionMargin
  };
}
