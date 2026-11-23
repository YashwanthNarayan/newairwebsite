import React, { useCallback, useEffect, useRef, useState } from 'react';
import './admin.css';
import airMark from '../photos/air-mark.png';

// Sign-in goes to a same-origin serverless relay that forwards the attempt to
// the self-hosted Umami instance; the returned token lives only in
// sessionStorage (tab-scoped) and is verified server-side on every data call.
const LOGIN_ENDPOINT = '/.netlify/functions/auth-login';
const STATS_ENDPOINT = '/.netlify/functions/stats';
const TOKEN_KEY = 'air_umami_token';
const USER_KEY = 'air_umami_user';

// sessionStorage can throw (e.g. cookies fully blocked, some in-app browsers).
// Never let storage access take the whole page down.
const store = {
    get(key: string): string | null {
        try { return sessionStorage.getItem(key); } catch { return null; }
    },
    set(key: string, value: string): void {
        try { sessionStorage.setItem(key, value); } catch { /* session-only token; page still works */ }
    },
    remove(key: string): void {
        try { sessionStorage.removeItem(key); } catch { /* ignore */ }
    },
};

type RangeKey = 'today' | '7d' | '30d';
const RANGES: { key: RangeKey; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: '7d', label: '7 days' },
    { key: '30d', label: '30 days' },
];

interface Metric { x: string; y: number; }
interface StatsData {
    range: RangeKey;
    live: number;
    totals: {
        visitors: number; pageviews: number; avgVisitSeconds: number; bounceRate: number;
        prevVisitors: number | null; prevPageviews: number | null;
    };
    pages: Metric[]; referrers: Metric[]; places: Metric[]; devices: Metric[];
}

function fmtDuration(s: number): string {
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    return r ? `${m}m ${r}s` : `${m}m`;
}

function delta(now: number, prev: number | null, suffix: string): string | null {
    if (prev === null || prev <= 0) return null;
    const pct = Math.round(((now - prev) / prev) * 100);
    if (!isFinite(pct)) return null;
    return `${pct >= 0 ? '+' : ''}${pct}% vs prior ${suffix}`;
}

function BarList({ items, empty }: { items: Metric[]; empty: string }) {
    if (!items.length) return <p className="ad-empty">{empty}</p>;
    const max = Math.max(...items.map(i => i.y), 1);
    return <ul className="ad-bars">
        {items.map((i) => (
            <li key={i.x}>
                <span className="ad-bar-name">{i.x || 'Direct / links'}</span>
                <span className="ad-bar-track"><span className="ad-bar-fill" style={{ width: `${Math.max(4, (i.y / max) * 100)}%` }} /></span>
                <span className="ad-bar-val">{i.y.toLocaleString()}</span>
            </li>
        ))}
    </ul>;
}

function Donut({ devices }: { devices: Metric[] }) {
    const total = devices.reduce((a, d) => a + d.y, 0);
    if (!total) return <p className="ad-empty">No device data yet.</p>;
    const colors = ['#d9962e', '#8fb5a8', '#6d6d72', '#c2b280', '#9c6d3a'];
    let acc = 0;
    const segs = devices.map((d, i) => {
        const from = (acc / total) * 360;
        acc += d.y;
        const to = (acc / total) * 360;
        return `${colors[i % colors.length]} ${from}deg ${to}deg`;
    });
    const top = devices[0];
    return (
        <div className="ad-donut-row">
            <div className="ad-donut" style={{ background: `conic-gradient(${segs.join(',')})` }}>
                <span>{Math.round((top.y / total) * 100)}%</span>
            </div>
            <ul className="ad-legend">
                {devices.map((d, i) => (
                    <li key={d.x}><i style={{ background: colors[i % colors.length] }} />{d.x} - {Math.round((d.y / total) * 100)}%</li>
                ))}
            </ul>
        </div>
    );
}

export function Admin() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState('');
    const [ready, setReady] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signing, setSigning] = useState(false);
    const [signinError, setSigninError] = useState('');
    const [range, setRange] = useState<RangeKey>('30d');
    const [data, setData] = useState<StatsData | null>(null);
    const [state, setState] = useState<'idle' | 'loading' | 'error' | 'unconfigured'>('idle');
    const tokenRef = useRef<string | null>(null);
    tokenRef.current = token;

    useEffect(() => {
        const t = store.get(TOKEN_KEY);
        if (t) {
            setToken(t);
            setUser(store.get(USER_KEY) || '');
        }
        setReady(true);
    }, []);

    const signOut = useCallback(() => {
        store.remove(TOKEN_KEY);
        store.remove(USER_KEY);
        setToken(null);
        setUser('');
        setData(null);
    }, []);

    const signIn = async () => {
        setSigning(true);
        setSigninError('');
        try {
            const res = await fetch(LOGIN_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), password }),
            });
            if (!res.ok) {
                setSigninError(res.status === 401
                    ? 'Wrong username or password.'
                    : 'Sign-in is unavailable right now. Try again in a moment.');
                setSigning(false);
                return;
            }
            const data = await res.json();
            store.set(TOKEN_KEY, data.token);
            store.set(USER_KEY, data.username || username.trim());
            setUser(data.username || username.trim());
            setToken(data.token);
            setPassword('');
        } catch {
            setSigninError('Sign-in is unavailable right now. Try again in a moment.');
        }
        setSigning(false);
    };

    const load = useCallback(async (r: RangeKey) => {
        const t = tokenRef.current;
        if (!t) return;
        setState('loading');
        try {
            const res = await fetch(`${STATS_ENDPOINT}?range=${r}`, {
                headers: { Authorization: `Bearer ${t}` },
            });
            if (res.status === 401 || res.status === 403) { signOut(); return; }
            if (res.status === 503) { setState('unconfigured'); return; }
            if (!res.ok) throw new Error(String(res.status));
            setData(await res.json());
            setState('idle');
        } catch {
            setState('error');
        }
    }, [signOut]);

    useEffect(() => { if (token) load(range); }, [token, range, load]);

    if (!ready) return <div className="ad ad-center"><p className="ad-muted">Loading...</p></div>;

    if (!token) {
        return (
            <div className="ad ad-center">
                <div className="ad-signin">
                    <img src={airMark} alt="AIR" className="ad-signin-mark" />
                    <h1>AIR <span>Visitors</span></h1>
                    <p className="ad-kicker">Admin - team only</p>
                    <p className="ad-muted">Visitor numbers for the AIR website. Sign in with the admin account.</p>
                    <form className="ad-form" onSubmit={(e) => { e.preventDefault(); if (username.trim() && password) signIn(); }}>
                        <input
                            type="text" required value={username} placeholder="Username"
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)} className="ad-input"
                        />
                        <input
                            type="password" required value={password} placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} className="ad-input"
                        />
                        <button className="ad-btn" type="submit" disabled={signing}>{signing ? 'Signing in...' : 'Sign in'}</button>
                    </form>
                    {signinError && <p className="ad-fine">{signinError}</p>}
                    <p className="ad-fine">Access is restricted to the site admin.</p>
                </div>
            </div>
        );
    }

    const t = data?.totals;
    return (
        <div className="ad">
            <header className="ad-top">
                <div className="ad-brand"><img src={airMark} alt="AIR" /> AIR <span>Visitors</span></div>
                <div className="ad-top-right">
                    <span className="ad-user">{user}</span>
                    <button className="ad-linkbtn" onClick={signOut}>Sign out</button>
                </div>
            </header>

            <div className="ad-pills">
                {RANGES.map(r => (
                    <button key={r.key} className={range === r.key ? 'on' : ''} onClick={() => setRange(r.key)}>{r.label}</button>
                ))}
            </div>

            {state === 'unconfigured' && (
                <p className="ad-note">Analytics is not connected yet - the tracking account and site settings are still being set up. Check back soon.</p>
            )}
            {state === 'error' && (
                <p className="ad-note">Could not load the numbers right now. <button className="ad-linkbtn" onClick={() => load(range)}>Try again</button></p>
            )}

            <p className="ad-live"><i /> {data ? data.live : 0} on the site now <span>- approximate, refreshes when you do</span></p>

            <section className="ad-stats">
                <div className="ad-stat"><label>Visitors</label><b>{t ? t.visitors.toLocaleString() : '-'}</b>
                    {t && delta(t.visitors, t.prevVisitors, 'period') && <small>{delta(t.visitors, t.prevVisitors, 'period')}</small>}</div>
                <div className="ad-stat"><label>Page views</label><b>{t ? t.pageviews.toLocaleString() : '-'}</b>
                    {t && delta(t.pageviews, t.prevPageviews, 'period') && <small>{delta(t.pageviews, t.prevPageviews, 'period')}</small>}</div>
                <div className="ad-stat"><label>Avg visit</label><b>{t ? fmtDuration(t.avgVisitSeconds) : '-'}</b></div>
                <div className="ad-stat"><label>Bounce</label><b>{t ? `${Math.round(t.bounceRate * 100)}%` : '-'}</b></div>
            </section>

            <div className="ad-grid">
                <section className="ad-panel">
                    <h2>Most-read pages</h2>
                    <BarList items={data?.pages || []} empty="No page data yet - counting starts when tracking goes live." />
                </section>
                <section className="ad-panel">
                    <h2>Where they came from</h2>
                    <BarList items={data?.referrers || []} empty="No source data yet." />
                    <p className="ad-fine">Some apps hide where a click came from - those visits land in "Direct / links", so shares are approximate.</p>
                </section>
                <section className="ad-panel">
                    <h2>Where they are - approximate</h2>
                    <BarList items={data?.places || []} empty="No location data yet." />
                    <p className="ad-fine">City-level guesses from network location - good for trends, not exact for any single visit.</p>
                </section>
                <section className="ad-panel">
                    <h2>Phones vs computers</h2>
                    <Donut devices={data?.devices || []} />
                </section>
            </div>

            <footer className="ad-foot">
                <p>Counts are aggregates - no names or identities - and run slightly low because some visitors block scripts.</p>
            </footer>
        </div>
    );
}
