import { Link } from '@/i18n/routing';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 bg-muted/40">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for real-world decisions. © {new Date().getFullYear()} DailyCaltor.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
