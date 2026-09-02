"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateEcommerce, EcommerceInputs } from '@/engines/business/EcommerceEngine';

export function EcommerceProfitCalculator() {
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<EcommerceInputs>({
    sellingPrice: 50,
    productCost: 15,
    quantitySold: 100,
    shippingCostPerItem: 5,
    paymentFeePercentage: 2.9,
    paymentFeeFixed: 0.30,
    platformFeePercentage: 0,
    platformFeeFixed: 0,
    advertisingSpend: 500,
    refundRate: 5,
    discountPercentage: 0,
    otherFixedExpenses: 100
  });

  const outputs = useMemo(() => calculateEcommerce(inputs), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Ecommerce Economics</CardTitle>
          <CardDescription>Enter all costs associated with your orders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Selling Price</Label>
              <Input type="number" name="sellingPrice" value={inputs.sellingPrice || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Product Cost (COGS)</Label>
              <Input type="number" name="productCost" value={inputs.productCost || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Quantity Sold</Label>
              <Input type="number" name="quantitySold" value={inputs.quantitySold || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Shipping Cost (per unit)</Label>
              <Input type="number" name="shippingCostPerItem" value={inputs.shippingCostPerItem || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Payment Fee (%)</Label>
              <Input type="number" name="paymentFeePercentage" value={inputs.paymentFeePercentage || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Payment Fee (Fixed)</Label>
              <Input type="number" name="paymentFeeFixed" value={inputs.paymentFeeFixed || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Refund Rate (%)</Label>
              <Input type="number" name="refundRate" value={inputs.refundRate || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Total Ad Spend</Label>
              <Input type="number" name="advertisingSpend" value={inputs.advertisingSpend || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Fixed Expenses</Label>
              <Input type="number" name="otherFixedExpenses" value={inputs.otherFixedExpenses || ''} onChange={handleChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">Net Profit</div>
              <div className={`text-2xl font-bold ${outputs.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatAmount(outputs.netProfit)}
              </div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">Net Margin</div>
              <div className={`text-2xl font-bold ${outputs.netMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {outputs.netMargin.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue (After Refunds)</span>
              <span className="font-medium">{formatAmount(outputs.revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Costs</span>
              <span className="font-medium">{formatAmount(outputs.totalCosts)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gross Profit</span>
              <span className="font-medium">{formatAmount(outputs.grossProfit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profit Per Order</span>
              <span className="font-medium">{formatAmount(outputs.profitPerOrder)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-muted-foreground font-semibold">Break-Even Orders</span>
              <span className="font-semibold text-primary">{outputs.breakEvenOrders.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
