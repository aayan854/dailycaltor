"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateSaaSEconomics, SaaSInputs } from '@/engines/business/SaaSEngine';
import { useTranslations } from 'next-intl';

export function SaaSEconomicsCalculator() {
  const t = useTranslations('Calc');
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<SaaSInputs>({
    arpu: 50, cac: 150, churnRate: 5, grossMargin: 85, totalCustomers: 1000, fixedMonthlyCosts: 10000
  });
  const outputs = useMemo(() => calculateSaaSEconomics(inputs), [inputs]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle>{t('saas.title')}</CardTitle><CardDescription>{t('saas.desc')}</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>{t('saas.arpu')}</Label><Input type="number" name="arpu" value={inputs.arpu || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('saas.cac')}</Label><Input type="number" name="cac" value={inputs.cac || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('saas.churn')}</Label><Input type="number" name="churnRate" value={inputs.churnRate || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('saas.grossMargin')}</Label><Input type="number" name="grossMargin" value={inputs.grossMargin || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('saas.customers')}</Label><Input type="number" name="totalCustomers" value={inputs.totalCustomers || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('saas.fixedCosts')}</Label><Input type="number" name="fixedMonthlyCosts" value={inputs.fixedMonthlyCosts || ''} onChange={handleChange} /></div>
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader><CardTitle>{t('results')}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('saas.ltv')}</div ><div className="text-2xl font-bold text-primary">{formatAmount(outputs.ltv)}</div></div>
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('saas.ltvCac')}</div><div className={	ext-2xl font-bold }>{outputs.ltvToCacRatio.toFixed(1)}:1</div></div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t">
            <div className="flex justify-between"><span className="text-muted-foreground">{t('saas.mrr')}</span><span className="font-medium">{formatAmount(outputs.mrr)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('saas.runway')}</span><span className="font-medium">{outputs.monthsToRecoverCAC.toFixed(1)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('ecommerce.netProfit')}</span><span className={ont-medium }>{formatAmount(outputs.netProfit)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('ecommerce.margin')}</span><span className="font-medium">{outputs.netMargin.toFixed(1)}%</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
