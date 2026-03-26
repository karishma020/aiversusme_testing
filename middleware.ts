import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/rankings(.*)',
  '/api/ai-analysis(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Protect the routes defined above
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  // This matcher ensures the middleware runs on all routes
  // except for static files and Next.js internals.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};