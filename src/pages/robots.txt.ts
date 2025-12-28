import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const { origin } = new URL(request.url);
    const body = `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`;

    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400'
        }
    });
};
