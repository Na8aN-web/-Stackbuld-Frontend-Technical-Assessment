import { NextResponse } from "next/server";

export async function GET() {
  const sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${process.env.NEXT_PUBLIC_SITE_URL}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <!-- Add more URLs as needed -->
  </urlset>
  `;
  return NextResponse.json(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
