import { Logo, Github } from "@/components/ui/Icons";
import Link from "next/link";
import { APIFY_ACTOR_URL, GITHUB_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Logo size={20} />
          <span style={{ fontWeight: 700, letterSpacing: -0.2 }}>
            SEO Audit <span style={{ color: "var(--teal)" }}>Lab</span>
          </span>
          <span style={{ marginLeft: 6, fontSize: 12.5, color: "var(--ink-500)" }}>© 2026</span>
        </div>

        <nav className="footer-links">
          <Link href="/docs">Docs</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/#pricing">Pricing</Link>
          <a href={APIFY_ACTOR_URL} target="_blank" rel="noopener">
            Apify
          </a>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="Source code on GitHub">
            <Github size={18} color="var(--ink-600)" />
            <span className="sr-only">GitHub</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
