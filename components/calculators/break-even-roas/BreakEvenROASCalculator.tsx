"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateBreakEvenROAS, BreakEvenInputs } from '@/engines/business/ROASEngine';
import { useTranslations } from 'next-intl';

export function BreakEvenROASCalculator() {
  const t = useTranslations('Calc');
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<BreakEvenInputs>({
    productPrice: 100, costOfGoodsSold: 30, shippingCost: 10, miscellaneousFees: 5
  });
  const outputs = useMemo(() => calculateBreakEvenROAS(inputs), [inputs]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('roas.title')}</CardTitle>
          <CardDescription>{t('roas.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>{t('roas.price')}</Label><Input type="number" name="productPrice" value={inputs.productPrice || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('roas.cogs')}</Label><Input type="number" name="costOfGoodsSold" value={inputs.costOfGoodsSold || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('roas.shipping')}</Label><Input type="number" name="shippingCost" value={inputs.shippingCost || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('roas.fees')} {t('optional')}</Label><Input type="number" name="miscellaneousFees" value={inputs.miscellaneousFees || ''} onChange={handleChange} /></div>
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader><CardTitle>{t('results')}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('roas.breakevenRoas')}</div><div className="text-3xl font-bold text-primary">{outputs.breakEvenROAS.toFixed(2)}x</div></div>
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('roas.breakevenCpa')}</div><div className="text-3xl font-bold text-orange-500">{formatAmount(outputs.breakEvenCPA)}</div></div>
          </div>
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-sm text-green-800 dark:text-green-300 mb-1">{t('roas.profitPerSale')} (Before Ads)</span>
            <span className="text-3xl font-bold text-green-700 dark:text-green-400">{formatAmount(outputs.profitMargin)}</span>
            <span className="text-sm text-green-800/80 dark:text-green-300/80 mt-1">({outputs.profitMarginPercentage.toFixed(1)}% Margin)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
