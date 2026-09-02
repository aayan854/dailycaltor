import { Link } from '@/i18n/routing';
import { Search, Calculator, Heart, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations('HomePage.categories');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6" />
            <span className="font-bold sm:inline-block">
              DailyCaltor
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/calculators/business" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
              {t('business')}
            </Link>
            <Link href="/calculators/nutrition" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
              {t('nutrition')}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-between gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors w-64 text-muted-foreground">
            <span>Search...</span>
            <Search className="w-4 h-4" />
          </button>
          
          <LanguageSwitcher />

          <Link href="/favorites" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
          </Link>
          
          <button className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
