// AIR visitors dashboard - sign-in relay.
// Forwards ONLY a username/password login attempt to the self-hosted Umami
// instance (upstream is hardcoded). Returns the Umami token to the caller.
// No credentials are stored or logged here; the token is verified per-request
// by the stats function against the upstream itself.

const UPSTREAM = 'https://air-analytics.vercel.app';
const SITE_ORIGIN = 'https://airethought.netlify.app';

export default async (req) => {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
    if (req.method !== 'POST') {
        return Response.json({ error: 'method_not_allowed' }, { status: 405 });
    }
    const origin = req.headers.get('origin');
    if (origin && origin !== SITE_ORIGIN) {
        return Response.json({ error: 'forbidden' }, { status: 403 });
    }

    let body;
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: 'bad_request' }, { status: 400 });
    }
    const { username, password } = body || {};
    if (
        typeof username !== 'string' || typeof password !== 'string' ||
        !username.length || !password.length ||
        username.length > 200 || password.length > 200
    ) {
        return Response.json({ error: 'bad_request' }, { status: 400 });
    }

    let res;
    try {
        res = await fetch(`${UPSTREAM}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ username, password }),
        });
    } catch {
        return Response.json({ error: 'upstream_unreachable' }, { status: 502 });
    }

    if (!res.ok) {
        return Response.json({ error: 'invalid_credentials' }, { status: 401 });
    }
    const data = await res.json().catch(() => null);
    if (!data || typeof data.token !== 'string') {
        return Response.json({ error: 'upstream_bad_response' }, { status: 502 });
    }
    return Response.json({ token: data.token, username: data.user?.username ?? username });
};
