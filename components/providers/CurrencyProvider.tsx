"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'BRL' | 'INR' | 'AED' | 'JPY' | 'CHF' | 'SGD' | 'ZAR';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatAmount: (amount: number, locale?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children, defaultLocale = 'en-US' }: { children: ReactNode, defaultLocale?: string }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('dailycaltor_currency') as CurrencyCode;
    if (savedCurrency) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('dailycaltor_currency', newCurrency);
  };

  const formatAmount = (amount: number, locale: string = defaultLocale) => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(amount);
    } catch (e) {
      // Fallback
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
