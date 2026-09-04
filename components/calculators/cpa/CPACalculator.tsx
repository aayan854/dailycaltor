"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateCPA, CPAInputs } from '@/engines/business/CPAEngine';
import { useTranslations } from 'next-intl';

export function CPACalculator() {
  const t = useTranslations('Calc');
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<CPAInputs & { clicks: number }>({
    adSpend: 1000, conversions: 50, revenue: 0, averageOrderValue: 100, profitMargin: 40, clicks: 1000
  });
  const outputs = useMemo(() => calculateCPA(inputs, inputs.clicks), [inputs]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('cpa.title')}</CardTitle>
          <CardDescription>{t('cpa.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>{t('cpa.adSpend')}</Label><Input type="number" name="adSpend" value={inputs.adSpend || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('cpa.clicks')} {t('optional')}</Label><Input type="number" name="clicks" value={inputs.clicks || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('cpa.conversions')}</Label><Input type="number" name="conversions" value={inputs.conversions || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('cpa.aov')}</Label><Input type="number" name="averageOrderValue" value={inputs.averageOrderValue || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('cpa.margin')}</Label><Input type="number" name="profitMargin" value={inputs.profitMargin || ''} onChange={handleChange} /></div>
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader><CardTitle>{t('results')}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('cpa.cpa')}</div><div className="text-2xl font-bold text-primary">{formatAmount(outputs.cpa)}</div></div>
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('cpa.roas')}</div><div className="text-2xl font-bold text-green-600">{outputs.roas.toFixed(2)}x</div></div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t">
            <div className="flex justify-between"><span className="text-muted-foreground">{t('cpa.convRate')}</span><span className="font-medium">{outputs.conversionRate.toFixed(2)}%</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('cpa.revenue')}</span><span className="font-medium">{formatAmount(outputs.totalRevenue)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('cpa.profit')}</span><span className={ont-medium }>{formatAmount(outputs.profitAfterAds)}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
