import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', 'fr', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Hide the default locale from the URL (so English is just / instead of /en)
  localePrefix: 'as-needed'
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
