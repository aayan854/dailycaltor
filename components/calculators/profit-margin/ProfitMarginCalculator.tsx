"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateMargin, MarginInputs } from '@/engines/business/ProfitEngine';
import { useTranslations } from 'next-intl';

export function ProfitMarginCalculator() {
  const t = useTranslations('Calc');
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<MarginInputs>({ cost: 50, revenue: 100 });
  const outputs = useMemo(() => calculateMargin(inputs), [inputs]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle>{t('profitMargin.title')}</CardTitle><CardDescription>{t('profitMargin.desc')}</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>{t('profitMargin.cost')}</Label><Input type="number" name="cost" value={inputs.cost || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>{t('profitMargin.revenue')}</Label><Input type="number" name="revenue" value={inputs.revenue || ''} onChange={handleChange} /></div>
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader><CardTitle>{t('results')}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('profitMargin.gross')}</div><div className="text-3xl font-bold text-primary">{outputs.grossMargin.toFixed(1)}%</div></div>
            <div className="p-4 bg-background rounded-lg shadow-sm border"><div className="text-sm text-muted-foreground mb-1">{t('profitMargin.markup')}</div><div className="text-3xl font-bold text-orange-500">{outputs.markup.toFixed(1)}%</div></div>
          </div>
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-sm text-green-800 dark:text-green-300 mb-1">{t('profitMargin.profit')}</span>
            <span className="text-4xl font-bold text-green-700 dark:text-green-400">{formatAmount(outputs.profit)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
