import type { Metadata } from "next";
import TextPage from "@/components/landing/TextPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What SEO Audit Lab collects when you run an audit or create an account, and why.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <TextPage title="Privacy" updated="29 October 2026">
      <h2>Free audit on this site</h2>
      <p>
        When you audit a page, we fetch the public address you enter and analyse the HTML it
        returns. We store the host name, the score and the response time to run the service and
        count how it is used. Your IP address is held in memory for up to an hour to enforce the
        free limit and is not stored. Page views are counted with Vercel Web Analytics, which sets no
        cookies and does not identify you. We do not use advertising cookies.
      </p>
      <h2>Accounts and API keys</h2>
      <p>
        If you create an account, our sign-in provider Clerk processes your email address and name.
        We store your user ID, email address, a one-way hash of each API key and a log of your
        requests (the URL audited, the score, the status and the time) to enforce plan limits and
        show your usage.
      </p>
      <h2>Runs on Apify</h2>
      <p>
        Audits you run through the SEO Audit Lab actor on Apify are processed under Apify&rsquo;s own
        terms and privacy policy.
      </p>
      <h2>Service providers</h2>
      <p>
        The site is hosted on Vercel, the analyzer on Render and account data on Supabase. Each
        keeps standard request logs. We do not sell or share your data with anyone else.
      </p>
      <h2>Your choices</h2>
      <p>
        You can delete your API keys from the dashboard at any time. To have your account and usage
        log deleted, ask through the contact page and we will remove them within 30 days.
      </p>
    </TextPage>
  );
}
