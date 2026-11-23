// AIR visitors dashboard - data proxy.
// Auth: caller must send a valid Umami bearer token (issued by auth-login).
// The token is verified against the upstream on every request, and access to
// this specific website is confirmed before any data is returned.
// Upstream origin and website ID are hardcoded; only the stats/metrics/active
// read endpoints are ever called, server-side, with server-built parameters.

const UPSTREAM = 'https://air-analytics.vercel.app';
const WEBSITE_ID = '5c6ffda5-a7cb-4607-94df-7568e76b7dd9';
const SITE_ORIGIN = 'https://airethought.netlify.app';

const DAY = 24 * 60 * 60 * 1000;
const RANGES = {
    today: DAY,
    '7d': 7 * DAY,
    '30d': 30 * DAY,
};

async function upstream(path, token) {
    const res = await fetch(`${UPSTREAM}${path}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const err = new Error(`upstream ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return res.json();
}

export default async (req) => {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
    if (req.method !== 'GET') {
        return Response.json({ error: 'method_not_allowed' }, { status: 405 });
    }
    const origin = req.headers.get('origin');
    if (origin && origin !== SITE_ORIGIN) {
        return Response.json({ error: 'forbidden' }, { status: 403 });
    }

    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    if (!token) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    // A token that can read this website is both valid and authorized for it.
    // (Umami v3 removed GET /api/auth/verify - it answers 405 - so the
    // per-website read is the verification step, in a single upstream call.)
    try {
        await upstream(`/api/websites/${WEBSITE_ID}`, token);
    } catch (e) {
        const status = e.status === 404 ? 403 : 401;
        return Response.json({ error: 'unauthorized' }, { status });
    }

    const url = new URL(req.url);
    const range = Object.hasOwn(RANGES, url.searchParams.get('range')) ? url.searchParams.get('range') : '30d';
    const endAt = Date.now();
    const startAt = endAt - RANGES[range];
    const w = `startAt=${startAt}&endAt=${endAt}`;

    try {
        const [stats, pages, referrers, places, devices, active] = await Promise.all([
            upstream(`/api/websites/${WEBSITE_ID}/stats?${w}`, token),
            upstream(`/api/websites/${WEBSITE_ID}/metrics?${w}&type=path&limit=8`, token),
            upstream(`/api/websites/${WEBSITE_ID}/metrics?${w}&type=referrer&limit=8`, token),
            upstream(`/api/websites/${WEBSITE_ID}/metrics?${w}&type=city&limit=8`, token)
                .catch(() => upstream(`/api/websites/${WEBSITE_ID}/metrics?${w}&type=country&limit=8`, token)),
            upstream(`/api/websites/${WEBSITE_ID}/metrics?${w}&type=device&limit=5`, token),
            upstream(`/api/websites/${WEBSITE_ID}/active`, token).catch(() => ({ x: 0 })),
        ]);

        const visits = stats?.visits?.value ?? 0;
        const body = {
            range,
            live: active?.x ?? 0,
            totals: {
                visitors: stats?.visitors?.value ?? 0,
                pageviews: stats?.pageviews?.value ?? 0,
                avgVisitSeconds: visits > 0 ? Math.round((stats?.totaltime?.value ?? 0) / visits) : 0,
                bounceRate: visits > 0 ? (stats?.bounces?.value ?? 0) / visits : 0,
                prevVisitors: stats?.visitors?.prev ?? null,
                prevPageviews: stats?.pageviews?.prev ?? null,
            },
            pages: Array.isArray(pages) ? pages : [],
            referrers: Array.isArray(referrers) ? referrers : [],
            places: Array.isArray(places) ? places : [],
            devices: Array.isArray(devices) ? devices : [],
        };
        return Response.json(body);
    } catch {
        return Response.json({ error: 'upstream_error' }, { status: 502 });
    }
};
