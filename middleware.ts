import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en|pt-br|fr|es|it|hi|ja|ar|ko)/:path*',
    // Enable redirects that add a locale (e.g. /cpa-calculator -> /en/cpa-calculator)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
