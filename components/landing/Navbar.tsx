import { Logo, ArrowR } from "@/components/ui/Icons";
import Link from "next/link";
import { APIFY_ACTOR_URL, SITE_NAME } from "@/lib/site";

const links = [
  { label: "Checks", href: "/#checks" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  return (
    <header className="glass navbar">
      <Link href="/" className="brand" aria-label={`${SITE_NAME} home`}>
        <Logo size={24} />
        <span style={{ fontWeight: 700, letterSpacing: -0.2, fontSize: 16 }}>
          SEO Audit <span style={{ color: "var(--teal)" }}>Lab</span>
        </span>
      </Link>

      <nav className="navbar-links">
        {links.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <a href={APIFY_ACTOR_URL} target="_blank" rel="noopener" className="btn-teal btn-sm navbar-cta">
        Run on Apify <ArrowR size={14} />
      </a>
    </header>
  );
}
