"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateProfit, ProfitInputs, ProfitOutputs } from '@/engines/business/ProfitEngine';
import { Share, Copy, RotateCcw, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ProfitMarginCalculator() {
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<ProfitInputs>({
    sellingPrice: 100,
    productCost: 40,
    shippingCost: 10,
    paymentFee: 3,
    advertisingCost: 15,
    otherCosts: 0
  });

  const outputs = useMemo(() => calculateProfit(inputs), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleReset = () => {
    setInputs({
      sellingPrice: 0,
      productCost: 0,
      shippingCost: 0,
      paymentFee: 0,
      advertisingCost: 0,
      otherCosts: 0
    });
  };

  const copyResults = () => {
    if (!outputs) return;
    const text = `Profit Margin: ${outputs.profitMargin.toFixed(2)}%\nNet Profit: ${formatAmount(outputs.netProfit)}`;
    navigator.clipboard.writeText(text);
  };

  if (!outputs) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>Enter your product and cost details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input type="number" id="sellingPrice" name="sellingPrice" value={inputs.sellingPrice || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productCost">Product Cost</Label>
            <Input type="number" id="productCost" name="productCost" value={inputs.productCost || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingCost">Shipping Cost</Label>
            <Input type="number" id="shippingCost" name="shippingCost" value={inputs.shippingCost || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentFee">Payment Fee</Label>
            <Input type="number" id="paymentFee" name="paymentFee" value={inputs.paymentFee || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="advertisingCost">Advertising Cost</Label>
            <Input type="number" id="advertisingCost" name="advertisingCost" value={inputs.advertisingCost || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherCosts">Other Costs</Label>
            <Input type="number" id="otherCosts" name="otherCosts" value={inputs.otherCosts || ''} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-background rounded-lg shadow-sm border">
                <div className="text-sm text-muted-foreground mb-1">Net Profit</div>
                <div className={`text-2xl font-bold ${outputs.netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatAmount(outputs.netProfit)}
                </div>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-sm border">
                <div className="text-sm text-muted-foreground mb-1">Profit Margin</div>
                <div className={`text-2xl font-bold ${outputs.profitMargin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {outputs.profitMargin.toFixed(2)}%
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Revenue</span>
                <span className="font-medium">{formatAmount(outputs.revenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Costs</span>
                <span className="font-medium">{formatAmount(outputs.totalCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross Profit</span>
                <span className="font-medium">{formatAmount(outputs.grossProfit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Markup</span>
                <span className="font-medium">{outputs.markup.toFixed(2)}%</span>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={copyResults} className="flex-1">
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
