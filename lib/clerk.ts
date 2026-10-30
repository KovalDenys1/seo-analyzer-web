import type { ComponentProps } from "react";
import type { ClerkProvider } from "@clerk/nextjs";
import { SITE_NAME } from "./site";

type Localization = NonNullable<ComponentProps<typeof ClerkProvider>["localization"]>;

// The Clerk application is still named "seo-analyzer"; these override the strings that print it.
export const clerkLocalization: Localization = {
  signIn: {
    start: { title: `Sign in to ${SITE_NAME}`, subtitle: "Welcome back. Sign in to see your API key and usage." },
    emailCode: { subtitle: `to continue to ${SITE_NAME}` },
    emailLink: { subtitle: `to continue to ${SITE_NAME}` },
    password: { subtitle: "Enter the password for your account" },
  },
  signUp: {
    start: { title: `Create your ${SITE_NAME} account`, subtitle: "Free: an API key with 100 audits a day." },
    emailCode: { subtitle: `to continue to ${SITE_NAME}` },
    emailLink: { subtitle: `to continue to ${SITE_NAME}` },
    continue: { subtitle: `to continue to ${SITE_NAME}` },
  },
};
