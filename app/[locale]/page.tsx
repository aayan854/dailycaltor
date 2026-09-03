import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight, TrendingUp, PieChart, Utensils, Apple, DollarSign, Activity } from 'lucide-react';

export default async function Home() {
  const t = await getTranslations('HomePage');
  const tTools = await getTranslations('Tools');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-foreground">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="w-full max-w-md mt-8 relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                className="w-full h-14 pl-12 pr-4 rounded-full border-2 border-primary/20 bg-background/50 backdrop-blur-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Business Tools Section */}
      <section id="business" className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t('categories.business')} Tools</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <Link href="/profit-margin-calculator" className="group h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-background">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tTools('profit-margin-calculator')}</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/break-even-roas-calculator" className="group h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-background">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tTools('break-even-roas-calculator')}</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/cpa-calculator" className="group h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-background">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tTools('cpa-calculator')}</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/ecommerce-profit-calculator" className="group h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-background">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tTools('ecommerce-profit-calculator')}</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/saas-unit-economics-calculator" className="group h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-background">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tTools('saas-unit-economics-calculator')}</CardTitle>
                </CardHeader>
              </Card>
            </Link>

          </div>
        </div>
      </section>

      {/* Nutrition Tools Section */}
      <section id="nutrition" className="py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Apple className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t('categories.nutrition')} Tools</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <Link href="/nutrition-gap-scanner" className="group h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-orange-500/50 bg-background">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-orange-500 transition-colors">{tTools('nutrition-gap-scanner')}</CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/smart-meal-builder" className="group h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-orange-500/50 bg-background">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-orange-500 transition-colors">{tTools('smart-meal-builder')}</CardTitle>
                </CardHeader>
              </Card>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
