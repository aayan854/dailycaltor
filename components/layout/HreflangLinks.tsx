"use client";

import { usePathname } from '@/i18n/routing';
import { locales, routing } from '@/i18n/routing';

export function HreflangLinks() {
  const pathname = usePathname();
  const baseUrl = 'https://dailycaltor.com';

  const getLocalizedPath = (l: string) => {
    const p = pathname as keyof typeof routing.pathnames;
    if (routing.pathnames[p]) {
      const routeConfig = routing.pathnames[p];
      if (typeof routeConfig === 'string') return routeConfig;
      if (typeof routeConfig === 'object' && l in routeConfig) {
        return (routeConfig as any)[l];
      }
    }
    return pathname === '/' ? '' : pathname;
  };

  return (
    <>
      {locales.map((l) => (
        <link 
          key={l}
          rel="alternate" 
          hreflang={l} 
          href={`${baseUrl}/${l}${getLocalizedPath(l)}`} 
        />
      ))}
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}/en${getLocalizedPath('en')}`} />
    </>
  );
}
