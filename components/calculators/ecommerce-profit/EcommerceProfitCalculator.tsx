"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateEcommerce, EcommerceInputs } from '@/engines/business/EcommerceEngine';
import { useTranslations } from 'next-intl';

export function EcommerceProfitCalculator() {
  const t = useTranslations('Calc');
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<EcommerceInputs>({
    sellingPrice: 100, productCost: 30, quantitySold: 100, shippingCostPerItem: 10, paymentFeePercentage: 2.9, paymentFeeFixed: 0.30, platformFeePercentage: 0, platformFeeFixed: 0, advertisingSpend: 1500, refundRate: 5, discountPercentage: 0, otherFixedExpenses: 500
  });
  const outputs = useMemo(() => calculateEcommerce(inputs), [inputs]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle>{t('ecommerce.title')}</CardTitle><CardDescription>{t('ecommerce.desc')}</CardDescription></CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <div className="space-y-2"><Label>{t('ecommerce.price')}</Label><Input type="number" name="sellingPrice" value={inputs.sellingPrice || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('ecommerce.cogs')}</Label><Input type="number" name="productCost" value={inputs.productCost || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('ecommerce.qty')}</Label><Input type="number" name="quantitySold" value={inputs.quantitySold || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('ecommerce.shipping')}</Label><Input type="number" name="shippingCostPerItem" value={inputs.shippingCostPerItem || ''} onChange={handleChange} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>{t('ecommerce.paymentFeePct')}</Label><Input type="number" name="paymentFeePercentage" value={inputs.paymentFeePercentage || ''} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>{t('ecommerce.paymentFeeFix')}</Label><Input type="number" name="paymentFeeFixed" value={inputs.paymentFeeFixed || ''} onChange={handleChange} step="0.1" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>{t('ecommerce.platformFeePct')}</Label><Input type="number" name="platformFeePercentage" value={inputs.platformFeePercentage || ''} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>{t('ecommerce.platformFeeFix')}</Label><Input type="number" name="platformFeeFixed" value={inputs.platformFeeFixed || ''} onChange={handleChange} /></div>
          </div>
          <div className="space-y-2"><Label>{t('ecommerce.adSpend')}</Label><Input type="number" name="advertisingSpend" value={inputs.advertisingSpend || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('ecommerce.refunds')}</Label><Input type="number" name="refundRate" value={inputs.refundRate || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('ecommerce.discount')}</Label><Input type="number" name="discountPercentage" value={inputs.discountPercentage || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('ecommerce.fixedCosts')}</Label><Input type="number" name="otherFixedExpenses" value={inputs.otherFixedExpenses || ''} onChange={handleChange} /></div>
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader><CardTitle>{t('results')}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('ecommerce.netProfit')}</div><div className={	ext-2xl font-bold }>{formatAmount(outputs.netProfit)}</div></div>
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('ecommerce.margin')}</div><div className="text-2xl font-bold">{outputs.netMargin.toFixed(2)}%</div></div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t">
            <div className="flex justify-between"><span className="text-muted-foreground">{t('cpa.revenue')}</span><span className="font-medium">{formatAmount(outputs.revenue)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('ecommerce.grossProfit')}</span><span className="font-medium">{formatAmount(outputs.grossProfit)} ({outputs.profitMargin.toFixed(1)}%)</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('ecommerce.profitPerOrder')}</span><span className="font-medium">{formatAmount(outputs.profitPerOrder)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('cpa.roas')}</span><span className="font-medium">{outputs.roas.toFixed(2)}x</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('cpa.cpa')}</span><span className="font-medium">{formatAmount(outputs.cpa)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('ecommerce.breakEven')}</span><span className="font-medium">{Math.ceil(outputs.breakEvenOrders)}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
