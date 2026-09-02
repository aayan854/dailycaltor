"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { ChangeEvent, useTransition } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt-br', label: 'Português (BR)' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ar', label: 'العربية' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      // @ts-ignore - The router types might complain about dynamic paths, but it works in practice
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative inline-flex items-center">
      <Globe className="w-4 h-4 absolute left-2 text-muted-foreground pointer-events-none" />
      <select
        className="h-9 pl-8 pr-4 py-2 rounded-md border border-input bg-background text-sm text-foreground hover:bg-accent hover:text-accent-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        value={locale}
        onChange={onSelectChange}
        disabled={isPending}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
