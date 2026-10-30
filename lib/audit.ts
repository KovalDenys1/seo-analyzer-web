// Accepts "example.com" as well as full URLs; returns null for anything that is not a public http(s) address.
export function normalizeUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  if (!value || value.length > 2048) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (!parsed.hostname.includes(".")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

const PLAIN_MESSAGES: Record<string, string> = {
  invalid_url: "That does not look like a web address. Try something like example.com.",
  unsupported_scheme: "Only http and https addresses can be audited.",
  missing_host: "That does not look like a web address. Try something like example.com.",
  credentials_not_allowed: "Remove the user name and password from the address and try again.",
  port_not_allowed: "Only the standard web ports (80 and 443) can be audited.",
  dns_resolution_failed: "That domain does not exist or has no DNS record. Check the spelling.",
  private_network_blocked: "That address points to a private network, so it cannot be audited.",
  too_many_redirects: "The page redirects too many times to reach a final address.",
  fetch_failed: "The page could not be loaded. Check that it opens in a browser.",
  upstream_unreachable:
    "The site did not answer. It may be down, or it may refuse connections from our server.",
  response_too_large: "The page is larger than 3 MB, which is more than the audit reads.",
  blocked_by_bot_protection:
    "The site answered with a bot check (such as Cloudflare's \"Just a moment\") instead of the page, so there was nothing real to audit. If it is your site, allow the SaaSSEOAnalyzer user agent, or try a page that is not behind the check.",
  unsupported_content_type:
    "That address is not an HTML page (it may be a PDF, an image or a file). Audit a web page instead.",
};

export function plainMessage(code: string | undefined, fallback: string): string {
  return (code && PLAIN_MESSAGES[code]) || fallback;
}

export const SERVICE_UNAVAILABLE = {
  code: "service_unavailable",
  message: "The audit service is unavailable right now. Try again in a few minutes.",
};
