import type { APIRoute } from 'astro';

const routes = ['/', '/revalidation', '/image-cdn', '/edge', '/edge/australia', '/edge/not-australia', '/blobs'];

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const { origin } = new URL(request.url);
    const urls = routes.map((path) => `<url><loc>${origin}${path}</loc></url>`).join('');

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400'
        }
    });
};
