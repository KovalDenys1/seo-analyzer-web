import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/dashboard(.*)"]);

export const proxy = clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

// Public pages stay out: a Clerk dev instance 307s a crawler's first visit to clerk.accounts.dev.
export const config = {
  matcher: ["/dashboard(.*)", "/login(.*)", "/signup(.*)", "/(api|trpc)(.*)"],
};
