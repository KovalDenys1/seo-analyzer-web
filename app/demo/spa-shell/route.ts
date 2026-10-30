// A copy of what a Vite or Create React App build serves before JavaScript runs, so the hero can demo the shell check on our own page.
const SHELL = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acme – Invoicing for small agencies</title>
    <meta name="description" content="Send invoices, chase late payments and see cash flow in one place." />
    <script type="module" crossorigin src="/demo/assets/index-4f2a9c.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export function GET() {
  return new Response(SHELL, {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
