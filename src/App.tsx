import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import airLogo from './photos/air-logo.png';
import airMark from './photos/air-mark.png';
import classroom from './photos/classroom.jpg';
import summit from './photos/summit.jpg';
import teamPhoto from './photos/team-doughnut.jpg';
import cutYash from './photos/yashwanth-besta-cutout.png';
import cutHenry from './photos/henry-xu-cutout.png';
import cutShiva from './photos/shiva-enaguthi-cutout.png';
import cutBryan from './photos/bryan-zhang-cutout.png';
import cutAditya from './photos/aditya-chandrashekaren-cutout.png';
import cutJathin from './photos/jathin-divakar-cutout.png';
import cutArpan from './photos/arpan-bhattacharjee-cutout.png';
import newsKgw from './photos/news-kgw.jpg';
import newsKptv from './photos/news-kptv.png';
import newsBsd from './photos/news-bsd.png';
import { deckPages, deckThumbs, modPages, modThumbs } from './docPages';
import { MAP_DOTS } from './mapDots';
import cutShashank from './photos/shashank-cutout.png';
import cutDavid from './photos/david-lee-cutout.png';
import cutParth from './photos/parth-nimbalkar-cutout.png';
import cutKaushik from './photos/kaushik-poreddy-cutout.png';
import cutHari from './photos/hari-shankar-plakada-cutout.png';
import cutVaibhav from './photos/vaibhav-cutout.png';
import cutKeerthana from './photos/keerthana-cutout.png';
import illYash from './photos/ill-yashwanth.png';
import illHenry from './photos/ill-henry.png';
import illShiva from './photos/ill-shiva.png';
import illBryan from './photos/ill-bryan.png';
import illAditya from './photos/ill-aditya.png';
import illJathin from './photos/ill-jathin.png';
import illArpan from './photos/ill-arpan.png';
import illShashank from './photos/ill-shashank.png';
import illDavid from './photos/ill-david.png';
import illParth from './photos/ill-parth.png';
import illKaushik from './photos/ill-kaushik.png';
import illHari from './photos/ill-hari.png';
import illVaibhav from './photos/ill-vaibhav.png';
import illKeerthana from './photos/ill-keerthana.png';

/* ---------------- data ---------------- */

const TEAM: { src: string | null; name: string; role: string; duty: string }[] = [
    { src: illYash, name: 'Yashwanth Besta', role: 'Co-CEO + Founder', duty: 'Co-founder and co-CEO of AIR.' },
    { src: illHenry, name: 'Henry Xu', role: 'Co-CEO + Founder', duty: 'Co-founder and co-CEO of AIR.' },
    { src: illShiva, name: 'Shiva Enaguthi', role: 'Co-CEO + Founder', duty: 'Co-founder and co-CEO of AIR.' },
    { src: illBryan, name: 'Bryan Zhang', role: 'CTO', duty: "AIR's chief technology officer." },
    { src: illAditya, name: 'Aditya Chandrashekaren', role: 'Founding Engineer', duty: "AIR's founding engineer." },
    { src: illJathin, name: 'Jathin Divakar', role: 'Portland Student Ambassador', duty: "AIR's student ambassador in Portland." },
    { src: illArpan, name: 'Arpan Bhattacharjee', role: 'Front Developer + NC Lead Ambassador', duty: "Front developer, and AIR's lead ambassador for North Carolina." },
    { src: illShashank, name: 'Shashank', role: 'Boston Lead Ambassador', duty: "AIR's lead ambassador for Boston." },
    { src: illDavid, name: 'David Lee', role: 'Langley (Canada) Lead Ambassador', duty: "AIR's lead ambassador for Langley, Canada." },
    { src: illParth, name: 'Parth Nimbalkar', role: 'Vancouver Lead Ambassador', duty: "AIR's lead ambassador for Vancouver." },
    { src: illKaushik, name: 'Kaushik Poreddy', role: 'Vancouver Lead Ambassador', duty: "AIR's lead ambassador for Vancouver." },
    { src: illHari, name: 'Hari Shankar Plakada', role: 'Seattle Lead Ambassador', duty: "AIR's lead ambassador for Seattle." },
    { src: illVaibhav, name: 'Vaibhav', role: 'Lead for India Initiatives', duty: "Leads AIR's India initiatives." },
    { src: illKeerthana, name: 'Keerthana', role: 'Learning Experience Designer', duty: "Helps design AIR's course rework, lessons and presentations." },
    { src: null, name: 'Vinay Soundharajan', role: '', duty: 'Portrait stays blank by design.' },
];

const TIMELINE: [string, string, string][] = [
    ['JUN 2023', 'The Seed', 'Three ambitious freshmen try to start an AI club at their high school.'],
    ['OCT 2023', 'Beginnings of AIR', 'Other students beat them to the AI club. Undeterred, they pivot - moving above students to work with teachers.'],
    ['NOV 2023', 'First Teacher Coached', 'A local 4th-grade teacher becomes the first educator AIR collaborates with - the first real AI-in-education experience.'],
    ['APR 2024', 'Five Oaks AI Summit', 'AIR is invited as the only student presenters at the Five Oaks AI Summit, reshaping into a larger, unified organization.'],
    ['JUN 2024', 'Certification with AI Advantage Agency', 'A deal with AJ Green, CEO of AI Advantage Agency: AIR creates courses and certifies teachers with the company\u2019s support. 68 teachers earn full certification after the 8-week AI in Education course.'],
    ['AUG 2024', 'New Members, New Visions', 'The team grows to 8 members as AIR starts serious software development through Project-K.'],
    ['SEP 2024', 'New Schools, More Teachers', 'Now 12 members, working with entire schools on professional development days. Word spreads.'],
    ['JAN 2025', 'District Policy Work', 'AIR is invited onto the district GenAI committee and, through one-on-one meetings, helps add student-centered ideas to the AI policy.'],
    ['JUL 2025', 'New Chapters', 'AIR packages every slide, email, course, and project into a model other students can launch - the chapter era begins.'],
    ['SEP 2026', 'Stanford Neurodiversity Summit', 'Research poster presented: "From Cognitive Outsourcing to Cognitive Augmentation" - a presentation, not a partnership. 7,192 records screened.'],
    ['NOV 2026', 'Judging + Mentoring', 'AIR judges and mentors at student hackathons - including UnlockedHacks and the Aixelerate Challenge - while developing its own flagship high-school hackathon circuit.'],
];

const QUOTES: { q: string; who: string; role: string }[] = [
    { q: 'The believes and values behind AIRethought\u2019s teachings have been directly implemented within the Beaverton School District\u2019s new AI Responsible Usage Guidelines.', who: 'Stafford Boyd', role: 'Head of Curriculum, Beaverton School District' },
    { q: 'The work these boys at AIR has been invaluable to the district, helping teachers prepare for the future of education.', who: 'Steven Langford', role: 'CIO, Beaverton School District' },
    { q: 'The certification course provided to me by AIRethought has been essential in my professional development. In my position, I pass the knowledge I recived to teachers I work with, spreading the importance of AI literacy.', who: 'Hibaq Adan', role: 'Instructional Coach, NWRED' },
    { q: 'AIR has been doing amazing work in the district, providing valuable insights at the BSD AI summit meeting.', who: 'Colette Cassanelli', role: 'LITT, MHS + SHS' },
    { q: 'Project-K has been an amazing AI tool for our teachers. It improved our students learning, and is the only AI tool teachers aren\u2019t scared to use.', who: 'Ella Zhang', role: 'Vice Principal, CEC' },
];

const MENU: { group: string; links: [string, string][] }[] = [
    { group: 'Organization', links: [['home', 'Home'], ['about', 'About Us'], ['mission', 'Mission'], ['story', 'Story'], ['team', 'Team + Locations']] },
    { group: 'Work', links: [['impact', 'Our Impact'], ['projects', 'Projects'], ['research', 'Research'], ['testimonials', 'Testimonials']] },
    { group: 'Programs', links: [['programs', 'Programs'], ['partners', 'Partners'], ['project-k', 'AIR Project K'], ['certification', 'AI Certification'], ['policy', 'AI Policy Development'], ['air-x-osu', 'AIR x OSU']] },
    { group: 'Join', links: [['get-involved', 'Get Involved'], ['students', 'For Students'], ['teachers', 'For Teachers'], ['schools', 'For Districts + Admins'], ['others', 'For Others'], ['contact', 'Contact']] },
];

/* ---------------- shared bits ---------------- */

const go = (id: string) => { window.dispatchEvent(new CustomEvent('air-nav', { detail: id })); };

/* ---------------- scroll dynamics engine ---------------- */

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useRootScroll(cb: (root: HTMLElement) => void, deps: unknown[] = []) {
    useEffect(() => {
        const root = document.querySelector('.site2') as HTMLElement | null;
        if (!root) return;
        let raf = 0;
        const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => cb(root)); };
        onScroll();
        root.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => { cancelAnimationFrame(raf); root.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

/* Pinned horizontal scroll: downward scroll moves the track sideways, then vertical flow resumes. */
function HScroll({ kicker, title, dark, children }: { kicker: string; title: string; dark?: boolean; children: React.ReactNode }) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const barRef = useRef<HTMLDivElement | null>(null);
    const [on, setOn] = useState(false);
    useEffect(() => { setOn(!reduceMotion()); }, []);
    useEffect(() => {
        const wrap = wrapRef.current, track = trackRef.current;
        const root = document.querySelector('.site2') as HTMLElement | null;
        if (!wrap || !track || !root || !on) return;
        const set = () => {
            track.style.transform = 'translate3d(0,0,0)';
            const max = Math.max(0, track.scrollWidth - root.clientWidth + 40);
            wrap.style.height = `${root.clientHeight + max * 2.6}px`; // longer scroll: pin distance stretched 2.6x for slower traversal
        };
        set();
        const t = setTimeout(set, 350);
        window.addEventListener('resize', set);
        return () => { clearTimeout(t); window.removeEventListener('resize', set); };
    }, [on, children]);
    const skewRef = useRef({ lastP: 0, skew: 0, reset: 0 as unknown as ReturnType<typeof setTimeout> });
    useRootScroll((root) => {
        const wrap = wrapRef.current, track = trackRef.current;
        if (!wrap || !track || !on) return;
        const rr = root.getBoundingClientRect();
        const r = wrap.getBoundingClientRect();
        const total = Math.max(1, wrap.offsetHeight - root.clientHeight);
        const p = Math.min(1, Math.max(0, (rr.top - r.top) / total));
        const max = Math.max(0, track.scrollWidth - root.clientWidth + 40);
        const st = skewRef.current;
        const dp = p - st.lastP;
        st.lastP = p;
        st.skew = Math.max(-2.2, Math.min(2.2, st.skew * 0.8 + dp * 46));
        track.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0) skewX(${(-st.skew).toFixed(2)}deg)`;
        clearTimeout(st.reset);
        st.reset = setTimeout(() => { st.skew = 0; track.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0)`; }, 140);
        const cards = track.children;
        for (let i = 0; i < cards.length; i++) {
            const depth = ((i % 3) - 1) * 26;
            (cards[i] as HTMLElement).style.translate = `0 ${((0.5 - p) * depth).toFixed(1)}px`;
        }
        if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    }, [on]);
    return (
        <div className={`hs-wrap${dark ? ' hs-dark' : ''}${on ? '' : ' static'}`} ref={wrapRef}>
            <div className="hs-stick">
                <div className="hs-head">
                    <Kicker light={dark}>{kicker}</Kicker>
                    <h2 className="sec-title">{title}</h2>
                </div>
                <div className="hs-track" ref={trackRef}>{children}</div>
                <div className="hs-progress" aria-hidden><i ref={barRef} /></div>
                <div className="hs-hint" aria-hidden>SCROLL &darr; MOVES &rarr;</div>
            </div>
        </div>
    );
}

/* Recurring AIR signal: a glowing point with a flowing trail that guides you through
   the page. It sweeps toward content on curved paths, runs sideways along pinned
   horizontal sections, orbits when
   you pause, and pulses each section ring you reach. Document-anchored: waypoints sit
   at their real sections and the label names the section you are actually reading. */
function SignalTrail({ route }: { route: string }) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const trailRef = useRef<SVGPathElement | null>(null);
    const dotRef = useRef<SVGCircleElement | null>(null);
    const haloRef = useRef<SVGCircleElement | null>(null);
    const ringsRef = useRef<SVGGElement | null>(null);
    const labelRef = useRef<SVGTextElement | null>(null);
    const [hide, setHide] = useState(true);
    useEffect(() => { setHide(reduceMotion()); }, []);
    useEffect(() => {
        if (hide) return;
        const root = document.querySelector('.site2') as HTMLElement | null;
        const main = document.querySelector('.site2 main') as HTMLElement | null;
        const svg = svgRef.current;
        if (!root || !main || !svg || !pathRef.current) return;
        let raf = 0, disposed = false;
        let lastMainH = 0, roTimer = 0;
        let cur = -1, target = 0, prevTarget = 0, smoothSpeedPx = 0;
        let vh = 1, w = 1000;
        let orbitW = 0, phase = 0, lastTick = 0;
        let lastInPin = false, pinFade = 0, trailFresh = false;
        let pulseStart = -1, lastIdx = -1;
        let labels: string[] = [], starts: number[] = [];
        let ringPts: { x: number; y: number }[] = [];
        let dense: { x: number; y: number; sc: number }[] = [];
        let pinRanges: { a: number; b: number; el: HTMLElement }[] = [];

        const setup = () => {
            if (disposed) return;
            const secs = Array.from(main.children).filter((el) =>
                el.tagName === 'SECTION' || el.classList.contains('hs-wrap') || el.classList.contains('team-scroll')) as HTMLElement[];
            // always reset before measuring: this svg's own previous height inflates
            // scrollHeight, and short pages must not keep a taller page's canvas
            svg.style.height = '0px';
            if (secs.length < 2) {
                dense = []; labels = []; starts = [];
                pathRef.current?.setAttribute('d', 'M 0 -50');
                trailRef.current?.setAttribute('d', 'M 0 -50');
                lastMainH = main.scrollHeight;
                return;
            }
            const scrollH = root.scrollHeight;
            lastMainH = main.scrollHeight;
            vh = root.clientHeight;
            w = root.clientWidth;
            svg.setAttribute('viewBox', `0 0 ${w} ${scrollH}`);
            svg.style.width = w + 'px';
            svg.style.height = scrollH + 'px';
            const railX = w < 720 ? 20 : 34;
            const arcBase = w < 720 ? Math.min(34, w * 0.09) : Math.min(90, Math.max(46, w * 0.05));
            const vy = [0.3, 0.64];
            const n = Math.min(secs.length, 14);
            type Key = { sc: number; x: number; y: number; ring?: number; pin?: boolean };
            const keys: Key[] = [];
            labels = []; starts = []; ringPts = [];
            const rr = root.getBoundingClientRect();
            for (let i = 0; i < n; i++) {
                const el = secs[i];
                const r = el.getBoundingClientRect();
                const s0 = root.scrollTop + (r.top - rr.top);
                starts.push(s0);
                const li = labels.length;
                let lab = el.getAttribute('data-signal') || '';
                if (!lab) { const k = el.querySelector('.k2'); lab = k && k.textContent ? k.textContent : ''; }
                if (!lab) { const h = el.querySelector('.sec-title, .cta-title, h1, h2'); lab = h && h.textContent ? h.textContent : ''; }
                lab = lab.split('\u00b7')[0].replace(/\s+/g, ' ').trim().toUpperCase();
                if (lab.length > 22) lab = lab.slice(0, 21) + '\u2026';
                if (!lab) lab = 'SECTION ' + String(i + 1).padStart(2, '0');
                labels.push(lab);
                const isHs = el.classList.contains('hs-wrap');
                                const pd = isHs ? Math.max(0, el.getBoundingClientRect().height - vh) : 0;
                if (isHs && pd > vh * 0.4) {
                    // pinned horizontal section: drop straight down the rail (clear of cards),
                    // then run sideways on a lane locked below the card band for the whole pin
                    pinRanges.push({ a: s0, b: s0 + pd, el });
                    keys.push({ sc: s0, x: railX, y: s0 + vh * 0.16, ring: li });
                    const runV = vh * 0.9;
                    const x0 = railX + (w < 720 ? 40 : 70);
                    const hrun = Math.min(w * 0.5, w < 720 ? 220 : 640);
                    keys.push({ sc: s0 + pd * 0.04, x: railX, y: s0 + pd * 0.04 + runV, pin: true });
                    keys.push({ sc: s0 + pd * 0.12, x: x0, y: s0 + pd * 0.12 + runV, pin: true });
                    keys.push({ sc: s0 + pd * 0.55, x: x0 + hrun * 0.55, y: s0 + pd * 0.55 + runV, pin: true });
                    keys.push({ sc: s0 + pd * 0.97, x: x0 + hrun, y: s0 + pd * 0.97 + runV, pin: true });
                    keys.push({ sc: s0 + pd, x: x0 + hrun, y: s0 + pd + runV, pin: true });
                } else {
                    keys.push({ sc: s0, x: railX + (i % 2) * 10, y: s0 + vh * vy[i % 2], ring: li });
                }
            }
            keys.unshift({ sc: 0, x: railX, y: Math.max(-80, keys[0].y - 160) });
            keys.push({ sc: Math.max(1, scrollH - vh), x: railX, y: scrollH + 80 });
            for (const k of keys) if (k.ring !== undefined) ringPts.push({ x: k.x, y: k.y });

            // dense samples: bezier per key segment, gentle rightward bulge outside pin runs
            dense = [];
            for (let i = 0; i < keys.length - 1; i++) {
                const a = keys[i], b = keys[i + 1];
                const dy = b.y - a.y;
                const bulge = (a.pin || b.pin) ? 0 : arcBase * (i % 2 ? 1 : 0.55);
                const c1x = a.x + bulge, c1y = a.y + dy * 0.32;
                const c2x = b.x + bulge, c2y = b.y - dy * 0.32;
                const STEPS = 16;
                for (let s2 = 0; s2 < STEPS; s2++) {
                    const t = s2 / STEPS, mt = 1 - t;
                    const sm = t * t * (3 - 2 * t);
                    dense.push({
                        x: mt * mt * mt * a.x + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * b.x,
                        // pin runs keep the lane locked to scroll so line and dot can never enter the card band
                        y: (a.pin && b.pin) ? a.y + (b.y - a.y) * sm
                            : mt * mt * mt * a.y + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * b.y,
                        sc: a.sc + (b.sc - a.sc) * sm,
                    });
                }
            }
            const lastK = keys[keys.length - 1];
            dense.push({ x: lastK.x, y: lastK.y, sc: lastK.sc });
            const d = dense.map((p, i) => (i === 0 ? 'M' : 'L') + ' ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ');
            pathRef.current?.setAttribute('d', d);
            const g = ringsRef.current;
            if (g) {
                g.innerHTML = '';
                for (const rp of ringPts) {
                    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    c.setAttribute('cx', String(rp.x));
                    c.setAttribute('cy', String(rp.y));
                    c.setAttribute('r', '5');
                    c.setAttribute('class', 'signal-ring');
                    g.appendChild(c);
                }
            }
            cur = -1; lastIdx = -1; pulseStart = -1;
            update();
        };

        const posAt = (sc: number): { x: number; y: number } => {
            if (dense.length < 2) return { x: 0, y: -100 };
            let lo = 0, hi = dense.length - 1;
            while (lo < hi) { const mid = (lo + hi) >> 1; if (dense[mid].sc < sc) lo = mid + 1; else hi = mid; }
            const i2 = Math.max(1, lo);
            const p0 = dense[i2 - 1], p1 = dense[i2];
            const t = p1.sc > p0.sc ? Math.min(1, Math.max(0, (sc - p0.sc) / (p1.sc - p0.sc))) : 0;
            return { x: p0.x + (p1.x - p0.x) * t, y: p0.y + (p1.y - p0.y) * t };
        };

        const currentIdx = (st: number): number => {
            const max = Math.max(1, root.scrollHeight - root.clientHeight);
            if (st >= max - 5) return starts.length - 1;
            let idx = 0;
            for (let i = 0; i < starts.length; i++) if (starts[i] <= st + vh * 0.25) idx = i;
            return idx;
        };

        const update = () => { target = root.scrollTop; trailFresh = false; };

        const tick = (now: number) => {
            if (disposed) return;
            const dt = lastTick ? Math.min(80, now - lastTick) : 16;
            lastTick = now;
            if (dense.length) {
                if (cur < 0) cur = target;
                cur += (target - cur) * 0.08;
                if (Math.abs(target - cur) < 2) cur = target;
                const dv = Math.abs(target - prevTarget); prevTarget = target;
                smoothSpeedPx += (dv - smoothSpeedPx) * 0.12;
                const base = posAt(cur);

                const idle = Math.abs(target - cur) < 2 && smoothSpeedPx < 1.5;
                orbitW += ((idle ? 1 : 0) - orbitW) * 0.045;
                phase += dt * 0.0026;
                const x = base.x + Math.cos(phase) * 14 * orbitW;
                const y = base.y + Math.sin(phase) * 8.5 * orbitW;

                // pinned card strips: the document-anchored path cannot hold a fixed
                // viewport lane, so the dot rides the strip's progress bar instead and
                // the line hides - nothing may cross the moving cards
                const stNow = root.scrollTop;
                let pinR = pinRanges.find((r) => stNow >= r.a - 8 && stNow <= r.b + 8);
                if (!pinR) {
                    // the pin releases before the strip scrolls out of view; keep the
                    // line hidden and the dot on the bar until the cards leave the
                    // viewport (approach and exit both), not only inside [a, b]
                    pinR = pinRanges.find((r) => {
                        const track = r.el.querySelector('.hs-track');
                        if (!track) return false;
                        const tr = (track as HTMLElement).getBoundingClientRect();
                        return tr.bottom > 0 && tr.top < vh;
                    });
                }
                const inPin = !!pinR;
                if (inPin !== lastInPin) { pinFade = now; if (lastInPin) trailFresh = true; lastInPin = inPin; }
                if (pathRef.current) pathRef.current.style.opacity = inPin ? '0' : '1';
                if (trailRef.current) trailRef.current.style.opacity = inPin ? '0' : '1';
                let rx = x, ry = y, dotHidden = false;
                if (inPin && pinR) {
                    const p = Math.min(1, Math.max(0, (stNow - pinR.a) / Math.max(1, pinR.b - pinR.a)));
                    let laneY = vh - 32; // the strip's progress bar
                    let barVisible = false;
                    const barEl = pinR.el.querySelector('.hs-progress');
                    if (barEl) {
                        const br = (barEl as HTMLElement).getBoundingClientRect();
                        laneY = br.top + br.height / 2; // live: correct pinned and released
                        barVisible = br.bottom > 0 && br.top < vh;
                    }
                    let bandBot = 0;
                    const track = pinR.el.querySelector('.hs-track');
                    if (track) for (const c of Array.from(track.children)) {
                        const r = (c as HTMLElement).getBoundingClientRect();
                        if (r.right > 0 && r.left < w) bandBot = Math.max(bandBot, r.bottom);
                    }
                    if (bandBot && bandBot + 12 > laneY) laneY = bandBot + 12;
                    if (!barVisible || laneY > vh - 8 || bandBot > vh - 16) dotHidden = true;
                    rx = w * 0.06 + p * w * 0.88;
                    ry = stNow + laneY;
                }
                const dotOp = (dotHidden || now - pinFade < 180) ? '0' : '1';
                const halo = haloRef.current;
                if (halo) {
                    halo.setAttribute('cx', rx.toFixed(1));
                    halo.setAttribute('cy', ry.toFixed(1));
                    halo.setAttribute('r', (12 + Math.min(14, smoothSpeedPx * 0.02)).toFixed(1));
                    halo.style.opacity = dotOp;
                }
                if (dotRef.current) {
                    dotRef.current.setAttribute('cx', rx.toFixed(1));
                    dotRef.current.setAttribute('cy', ry.toFixed(1));
                    dotRef.current.style.opacity = dotOp;
                }

                const t = trailRef.current;
                if (t && inPin) { t.setAttribute('d', 'M ' + rx.toFixed(1) + ' ' + ry.toFixed(1)); }
                else if (t && trailFresh) { t.setAttribute('d', 'M ' + rx.toFixed(1) + ' ' + ry.toFixed(1)); }
                else if (t) {
                    const upto: number[][] = [];
                    for (let j = 0; j < dense.length && dense[j].sc <= cur; j++) upto.push([dense[j].x, dense[j].y]);
                    upto.push([base.x, base.y]);
                    let acc = 0;
                    const segLens: number[] = [];
                    for (let i = 1; i < upto.length; i++) {
                        const L = Math.hypot(upto[i][0] - upto[i - 1][0], upto[i][1] - upto[i - 1][1]);
                        segLens.push(L); acc += L;
                    }
                    const trailLen = 160 + Math.min(700, smoothSpeedPx * 0.45);
                    const from = Math.max(0, acc - trailLen);
                    let run = 0, started = false, d2 = '';
                    for (let i = 1; i < upto.length; i++) {
                        const a = upto[i - 1], b = upto[i];
                        const L = segLens[i - 1];
                        const segStart = run, segEnd = run + L;
                        run = segEnd;
                        if (segEnd < from) continue;
                        if (!started) {
                            const cut = L > 0 ? Math.min(1, Math.max(0, (from - segStart) / L)) : 0;
                            d2 = 'M ' + (a[0] + (b[0] - a[0]) * cut).toFixed(1) + ' ' + (a[1] + (b[1] - a[1]) * cut).toFixed(1);
                            started = true;
                        }
                        d2 += ' L ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
                    }
                    t.setAttribute('d', d2 || 'M ' + base.x.toFixed(1) + ' ' + base.y.toFixed(1));
                }

                const idx = currentIdx(root.scrollTop);
                if (idx !== lastIdx) { pulseStart = now; lastIdx = idx; }
                const lb = labelRef.current;
                if (lb) {
                    lb.style.opacity = inPin ? '0' : '1';
                    lb.textContent = labels[idx] || '';
                    lb.setAttribute('text-anchor', 'middle');
                    lb.setAttribute('x', '15');
                    lb.setAttribute('y', base.y.toFixed(1));
                    lb.setAttribute('transform', `rotate(-90 15 ${base.y.toFixed(1)})`);
                }
                const g = ringsRef.current;
                if (g) Array.from(g.children).forEach((c, i) => {
                    c.setAttribute('class', i <= idx ? 'signal-ring on' : 'signal-ring');
                    if (i === idx && pulseStart > 0) {
                        const age = now - pulseStart;
                        const pr = age < 900 ? 5 + 5 * Math.sin(Math.PI * age / 900) : 5;
                        c.setAttribute('r', pr.toFixed(1));
                    } else c.setAttribute('r', '5');
                });
            }
            raf = requestAnimationFrame(tick);
        };

        const timer = setTimeout(setup, 400);
        const onScroll = () => update();
        root.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', setup);
        window.addEventListener('load', setup);
        // late-loading images (photos, map tiles, portraits) grow the page after the
        // first measure; re-measure so the signal canvas tracks real content height
        const ro = new ResizeObserver(() => {
            if (disposed) return;
            const h = main.scrollHeight;
            if (Math.abs(h - lastMainH) > 4) {
                clearTimeout(roTimer);
                roTimer = window.setTimeout(setup, 250);
            }
        });
        ro.observe(main);
        raf = requestAnimationFrame(tick);
        return () => {
            disposed = true;
            clearTimeout(timer);
            clearTimeout(roTimer);
            ro.disconnect();
            cancelAnimationFrame(raf);
            root.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', setup);
            window.removeEventListener('load', setup);
        };
    }, [hide, route]);
    if (hide) return null;
    return (
        <svg ref={svgRef} className="signal" aria-hidden>
            <path ref={pathRef} d="M 0 -50" className="signal-guide" />
            <g ref={ringsRef} />
            <path ref={trailRef} d="M 0 -50" className="signal-trail" />
            <circle ref={haloRef} r="12" className="signal-halo" />
            <circle ref={dotRef} r="4.5" className="signal-dot" />
            <text ref={labelRef} className="signal-label" />
        </svg>
    );
}

/* Reveal-on-scroll for content blocks (skipped inside horizontal tracks). */
function usePageReveals(route: string) {
    useEffect(() => {
        const root = document.querySelector('.site2') as HTMLElement | null;
        const main = document.querySelector('.site2 main');
        if (!root || !main) return;
        if (reduceMotion()) return;
        const els = Array.from(main.querySelectorAll('.blk, .cert-unit, .qc, .loc, .idx-row, .photo-band, .page-head, .stat, .osu-banner, .link-cards .tilt-card, .cform'))
            .filter((el) => !el.closest('.hs-track'));
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
            }
        }, { root, threshold: 0.1 });
        els.forEach((el, i) => {
            el.classList.add('rv');
            (el as HTMLElement).style.transitionDelay = `${(i % 5) * 55}ms`;
            io.observe(el);
        });
        const sweep = () => {
            const rr = root.getBoundingClientRect();
            for (const el of els) {
                if (!el.classList.contains('rv-in') && el.getBoundingClientRect().top < rr.bottom - 30) el.classList.add('rv-in');
            }
        };
        sweep();
        const late = setTimeout(sweep, 600);
        root.addEventListener('scroll', sweep, { passive: true });
        return () => {
            clearTimeout(late);
            io.disconnect();
            root.removeEventListener('scroll', sweep);
            els.forEach((el) => { el.classList.remove('rv', 'rv-in'); (el as HTMLElement).style.transitionDelay = ''; });
        };
    }, [route]);
}


function Kicker({ children, light }: { children: React.ReactNode; light?: boolean }) {
    return <div className={`k2${light ? ' light' : ''}`}>{children}</div>;
}

function Ghost({ word }: { word: string }) {
    const ref = useRef<HTMLDivElement | null>(null);
    useRootScroll((root) => {
        const el = ref.current;
        if (!el || reduceMotion() || !el.parentElement) return;
        const rr = root.getBoundingClientRect();
        const r = el.parentElement.getBoundingClientRect();
        const p = (r.top + r.height / 2 - rr.top) / Math.max(1, rr.height);
        el.style.transform = `translate3d(${((p - 0.5) * -16).toFixed(2)}vw,0,0) rotateX(${((p - 0.5) * 18).toFixed(1)}deg)`;
    });
    return <div className="ghost" ref={ref} aria-hidden>{word} {word} {word}</div>;
}

function Head({ kicker, title, intro, dark }: { kicker: string; title: string; intro?: string; dark?: boolean }) {
    return (
        <div className={`page-head${dark ? ' dark' : ''}`}>
            <Kicker light={dark}>{kicker}</Kicker>
            <h1 className="page-title">{title}</h1>
            {intro && <p className="page-intro">{intro}</p>}
        </div>
    );
}

function Block({ n, head, children }: { n?: string; head: string; children: React.ReactNode }) {
    return (
        <div className="blk">
            <div className="blk-head">{n && <span className="blk-n">{n}</span>}{head}</div>
            <div className="blk-body">{children}</div>
        </div>
    );
}

function LI({ items }: { items: string[] }) {
    return <ul className="lst">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}

function TiltCard({ kicker, title, body, meta, to, rot }: { kicker: string; title: string; body: string; meta?: string; to?: string; rot: number }) {
    return (
        <a className="tilt-card" style={{ transform: `rotate(${rot}deg)` }} href={to ? `#/${to}` : undefined}
            onClick={to ? (e) => { e.preventDefault(); go(to); } : undefined}>
            <div className="tc-kicker">{kicker}</div>
            <div className="tc-title">{title}</div>
            <p className="tc-body">{body}</p>
            {meta && <div className="tc-meta">{meta}</div>}
            {to && <div className="tc-go">OPEN &rarr;</div>}
        </a>
    );
}

function QuoteCard({ q, who, role }: { q: string; who: string; role: string }) {
    return (
        <blockquote className="qc">
            <p>&ldquo;{q}&rdquo;</p>
            <footer><span className="qc-who">{who}</span><span className="qc-role">{role}</span></footer>
        </blockquote>
    );
}

function FL({ to, children }: { to: string; children: React.ReactNode }) {
    return <a href={`#`} onClick={(e) => { e.preventDefault(); go(to); }}>{children}</a>;
}

function Footer() {
    return (
        <footer className="footer">
            <div className="foot-brand">
                <img src={airMark} alt="AIR logo" />
                <div>
                    <div className="foot-name">AIR<span>ethought</span></div>
                    <p>Empowering educators with AI literacy and support for the classroom of tomorrow.</p>
                </div>
            </div>
            <div className="foot-cols">
                <div>
                    <div className="foot-h">Explore</div>
                    <FL to="about">About</FL><FL to="mission">Mission</FL><FL to="team">Team + Locations</FL><FL to="impact">Our Impact</FL><FL to="research">Research</FL><FL to="story">Story</FL>
                </div>
                <div>
                    <div className="foot-h">Programs</div>
                    <FL to="project-k">Project K</FL><FL to="certification">AI Certification</FL><FL to="policy">Policy Development</FL><FL to="air-x-osu">AIR x OSU</FL><FL to="partners">Partners</FL>
                </div>
                <div>
                    <div className="foot-h">Get Involved</div>
                    <FL to="students">For Students</FL><FL to="teachers">For Teachers</FL><FL to="schools">For Districts + Admins</FL><FL to="others">For Others</FL><FL to="contact">Contact</FL>
                </div>
            </div>
            <div className="foot-contact">
                <div className="foot-h">Contact</div>
                <a href="mailto:Airethought@gmail.com">Airethought@gmail.com</a>
                <div className="foot-soc">
                    <a href="https://www.instagram.com/airethought_/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.linkedin.com/company/airethought" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
            <div className="foot-base">AIRethought - a student-led organization. Private working preview; not the live site.</div>
        </footer>
    );
}

function Marquee({ text }: { text: string }) {
    const row = (text + ' ').repeat(6);
    return <div className="marquee" aria-hidden><div className="marquee-in">{row}{row}</div></div>;
}

/* Photo expands into place as it scrolls into view (3D zoom-from-depth). */
function ZoomPhoto({ src, alt, cap, tilt }: { src: string; alt: string; cap: string; tilt?: boolean }) {
    const ref = useRef<HTMLDivElement | null>(null);
    useRootScroll((root) => {
        const el = ref.current;
        if (!el || reduceMotion()) return;
        const rr = root.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (rr.bottom - r.top - rr.height * 0.1) / (rr.height * 0.8)));
        const sc = 1.22 - 0.22 * p;
        const rx = (1 - p) * 9;
        el.style.setProperty('--zp', sc.toFixed(3));
        el.style.setProperty('--zrx', rx.toFixed(2) + 'deg');
        el.style.setProperty('--zo', (0.35 + 0.65 * p).toFixed(3));
    });
    return (
        <div className={`photo-band zoom-photo${tilt ? ' tilt-left' : ''}`} ref={ref}>
            <img src={src} alt={alt} /><span className="photo-cap">{cap}</span>
        </div>
    );
}

/* 3D stage: content floats on a perspective plane that levels out as you scroll to it. */
function TiltStage({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement | null>(null);
    useRootScroll((root) => {
        const el = ref.current;
        if (!el || reduceMotion()) return;
        const rr = root.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (rr.bottom - r.top) / (rr.height + r.height)));
        el.style.transform = `rotateX(${(12 - p * 12).toFixed(2)}deg) translateY(${((1 - p) * 26).toFixed(1)}px)`;
    });
    return <div className="stage3d" ref={ref}>{children}</div>;
}

/* Ambient depth field: slow drifting particles with cursor + scroll parallax.
   Mounted only inside dark hero/cta sections; skipped under reduced-motion and small screens. */
function DepthField({ tone }: { tone?: 'gold' | 'paper' }) {
    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.innerWidth < 720) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const host = canvas.parentElement as HTMLElement;
        let w = 0, h = 0, raf = 0, running = true;
        const pts = Array.from({ length: 64 }, () => ({ x: Math.random(), y: Math.random(), z: 0.25 + Math.random() * 0.75, p: Math.random() * Math.PI * 2 }));
        let mx = 0.5, my = 0.5, vel = 0, lastScroll = 0;
        const root = document.querySelector('.site2');
        const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth; my = e.clientY / window.innerHeight; };
        const onScroll = () => { const st = root ? root.scrollTop : 0; vel = Math.min(60, vel + Math.abs(st - lastScroll) / 30); lastScroll = st; };
        const resize = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            w = host.clientWidth; h = host.clientHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onMove, { passive: true });
        root?.addEventListener('scroll', onScroll, { passive: true });
        const col = tone === 'gold' ? '196, 112, 43' : '242, 239, 232';
        let t = 0;
        const draw = () => {
            if (!running) return;
            t += 0.016; vel *= 0.93;
            ctx.clearRect(0, 0, w, h);
            for (const q of pts) {
                const x = (((q.x + t * 0.008 * q.z + mx * 0.05 * q.z) % 1) + 1) % 1 * w;
                let y = (((q.y + Math.sin(t * 0.25 + q.p) * 0.012 + my * 0.05 * q.z - vel * 0.0012 * q.z) % 1) + 1) % 1 * h;
                ctx.globalAlpha = 0.06 + q.z * 0.16;
                ctx.fillStyle = 'rgb(' + col + ')';
                ctx.beginPath(); ctx.arc(x, y, 0.9 + q.z * 2.4, 0, 7); ctx.fill();
            }
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        const onVis = () => { running = !document.hidden; if (running && !raf) raf = requestAnimationFrame(draw); };
        document.addEventListener('visibilitychange', onVis);
        return () => {
            running = false; cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            root?.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', onVis);
        };
    }, []);
    return <canvas ref={ref} className="depth-field" aria-hidden="true" />;
}

/* Global network map: techy dot-matrix world (Natural Earth 110m land, public domain),
   gold chapter markers + animated links from the Portland hub. Fully bundled, no external requests. */
const MAP_CITIES: [string, number, number][] = [
    ['Portland, OR', 45.5152, -122.6784], ['Los Angeles, CA', 34.0522, -118.2437], ['San Diego, CA', 32.7157, -117.1611],
    ['Bellevue, WA', 47.6101, -122.2015], ['Seattle, WA', 47.6062, -122.3321], ['Charlotte, NC', 35.2271, -80.8431],
    ['Austin, TX', 30.2672, -97.7431], ['Dallas, TX', 32.7767, -96.7970], ['Boston, MA', 42.3601, -71.0589],
    ['Philadelphia, PA', 39.9526, -75.1652], ['Tucson, AZ', 32.2226, -110.9747], ['Las Vegas, NV', 36.1699, -115.1398],
    ['Tokyo, Japan', 35.6762, 139.6503], ['Singapore', 1.3521, 103.8198], ['New Delhi, India', 28.6139, 77.2090],
    ['Vancouver, Canada', 49.2827, -123.1207],
];
const mercXY = (lat: number, lng: number): [number, number] => {
    const rad = (lat * Math.PI) / 180;
    const x = ((lng + 180) / 360) * 1000;
    const y = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 1000;
    return [x, y];
};
function WorldMap() {
    const [hx, hy] = mercXY(MAP_CITIES[0][1], MAP_CITIES[0][2]);
    const arc = (x2: number, y2: number) => {
        const mx = (hx + x2) / 2, my = (hy + y2) / 2;
        const d = Math.hypot(x2 - hx, y2 - hy);
        return `M ${hx.toFixed(1)} ${hy.toFixed(1)} Q ${mx.toFixed(1)} ${(my - d * 0.22).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    };
    return (
        <div className="worldmap">
            <div className="wm-view wm-dark">
                <svg className="wm-svg" viewBox="0 140 1000 640" role="img" aria-label="Map of AIR chapter cities">
                    {[200, 300, 400, 500, 600, 700].map((y) => <line key={y} x1="0" y1={y} x2="1000" y2={y} className="wm-grat" />)}
                    {[125, 250, 375, 500, 625, 750, 875].map((x) => <line key={x} x1={x} y1="140" x2={x} y2="780" className="wm-grat" />)}
                    {MAP_DOTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.1" className="wm-land" />)}
                    {MAP_CITIES.slice(1).map(([name, lat, lng]) => {
                        const [x, y] = mercXY(lat, lng);
                        return <path key={name} d={arc(x, y)} className="wm-arc" />;
                    })}
                    {MAP_CITIES.map(([name, lat, lng], i) => {
                        const [x, y] = mercXY(lat, lng);
                        return (
                            <g key={name} className={`wm-city${i === 0 ? ' hub' : ''}`}>
                                <circle cx={x} cy={y} r="9" className="wm-pulse" style={{ animationDelay: `${(i * 0.37) % 2.6}s` }} />
                                <circle cx={x} cy={y} r={i === 0 ? 6 : 4.2} className="wm-core" />
                                <text x={x + 10} y={y + 3.5} className="wm-label">{i === 0 ? 'Portland - HQ' : name}</text>
                            </g>
                        );
                    })}
                </svg>
                <div className="wm-sweep" aria-hidden />
            </div>
            <div className="wm-cities">{MAP_CITIES.map(([name]) => name).join(' \u00b7 ')}</div>
            <div className="wm-credit">AIR chapter network - student-run chapters and city leads, from AIR&rsquo;s chapter list.</div>
        </div>
    );
}

/* ---------------- pages ---------------- */

/* Click-to-load document reader: original pages as images, nothing loads until opened.
   (Blob-URL PDF iframes are blocked inside the sandboxed preview frame.) */
function DocReader({ title, sub, pages, thumbs }: { title: string; sub: string; pages: string[]; thumbs: string[] }) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const total = pages.length;
    return (
        <div className="doc-card">
            <div className="doc-meta">
                <span className="doc-title">{title}</span>
                <span className="doc-sub">{sub}</span>
            </div>
            <button type="button" className="btn ghost-btn doc-btn" onClick={() => { setOpen(!open); }}>{open ? 'Close reader' : 'Open reader'}</button>
            {open && (
                <div className="reader">
                    <div className="reader-bar">
                        <button type="button" className="reader-nav" disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
                        <span className="reader-count">Page {page + 1} of {total}</span>
                        <button type="button" className="reader-nav" disabled={page === total - 1} onClick={() => setPage(page + 1)}>Next</button>
                    </div>
                    <img className="reader-page" src={pages[page]} alt={title + ' - page ' + (page + 1)} />
                    <div className="reader-strip">
                        {thumbs.map((t, i) => (
                            <button key={i} type="button" className={i === page ? 'reader-thumb on' : 'reader-thumb'} onClick={() => setPage(i)} aria-label={'Page ' + (i + 1)}>
                                <img src={t} loading="lazy" alt="" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* Live external resource card: third-party iframes are blocked in this preview frame,
   so the functioning form opens in a new tab instead of a broken embed. */
function DocLink({ title, sub, cta, href }: { title: string; sub: string; cta: string; href: string }) {
    return (
        <div className="doc-card">
            <div className="doc-meta">
                <span className="doc-title">{title}</span>
                <span className="doc-sub">{sub}</span>
            </div>
            <a className="btn ghost-btn doc-btn" href={href} target="_blank" rel="noopener noreferrer">{cta}</a>
        </div>
    );
}

const PRESS = [
    { img: newsKgw, src: 'KGW', cap: 'Sunset High School students develop new program teaching how to teach AI.', cta: 'Read the KGW article', url: 'https://www.kgw.com/article/news/education/sunset-high-school-student-ai-rethought-air-teacher-learning-tool/283-5db52cc8-323a-4119-940d-a2ff7a642096' },
    { img: newsKptv, src: 'FOX 12 / KPTV', cap: 'Oregon schools prepare for rapidly changing AI landscape.', cta: 'Read the KPTV article', url: 'https://www.kptv.com/2025/09/02/oregon-schools-prepare-rapidly-changing-ai-landscape/' },
    { img: newsBsd, src: 'BEAVERTON SD', cap: 'Beaverton School District AI Responsible Use Guidelines - policy work AIR contributed student perspectives to.', cta: 'View the district guidelines', url: 'https://www.beaverton.k12.or.us/departments/teaching-learning/curriculum-instruction-assessment/generative-ai-responsible-use-guidelines' },
];

function HomePage() {
    return (
        <>
            <section className="hero2 dark-sec" data-signal="Welcome">
                <DepthField tone="gold" />
                <Ghost word="AIR" />
                <div className="hero2-in">
                    <Kicker light>Student-led AI literacy &middot; Portland, Oregon &middot; Est. June 2023</Kicker>
                    <h1 className="hero2-title">Rethinking<br />AI Education</h1>
                    <p className="hero2-sub">AIRethought (AIR for short) is a student-led organization dedicated to providing AI literacy support to teachers - an ecosystem connecting students, educators, schools, universities, and industry through responsible AI learning.</p>
                    <TiltStage><div className="fan">
                        <TiltCard rot={-5} kicker="Audience 01" title="For Students" body="AIR clubs, AI literacy groups, hackathons, and the student side of Project-K." meta="Start a chapter" to="students" />
                        <TiltCard rot={0} kicker="Audience 02" title="For Teachers" body="The free 8-week AI certification, integration guides, and classroom-ready support." meta="68 certified" to="teachers" />
                        <TiltCard rot={5} kicker="Audience 03" title="For Districts + Admins" body="Student-centered AI policy, PD days, and the full Project-K system." meta="Beaverton SD" to="schools" />
                    </div></TiltStage>
                </div>
            </section>
            <Marquee text="AI LITERACY &middot; TEACHER-FIRST &middot; STUDENT-LED &middot;" />
            <section className="sec light-sec dots">
                <Kicker>Why AIR exists</Kicker>
                <h2 className="sec-title">The classroom changed overnight.</h2>
                <div className="rows">
                    <Block n="01" head="Students are already using AI">ChatGPT, AI homework tools, and more - often without understanding the limits or the ethics. Teachers need to understand these tools to guide students effectively.</Block>
                    <Block n="02" head="Schools lack clear policies">Districts struggle with academic integrity, data privacy, and appropriate use of AI tools. Without clear guidelines: inconsistent enforcement and confusion among staff, students, and parents.</Block>
                    <Block n="03" head="No standardized training exists">Teachers are left to navigate AI alone. The vast majority of K-12 teachers have received zero formal training on AI.</Block>
                    <Block n="04" head="The opportunity">Properly trained teachers can use AI to enhance learning and personalize education - differentiating instruction and handling administrative tasks, freeing teachers to focus on what matters most.</Block>
                </div>
            </section>
            <section className="sec dark-sec">
                <Ghost word="WHO" />
                <Kicker light>Who AIR serves</Kicker>
                <h2 className="sec-title">Three audiences. Three streams.</h2>
                <p className="body-p on-dark" style={{ maxWidth: 640 }}>AIR works with the three key stakeholders of education - students, teachers, and district administrators - through three distinct streams that run in parallel and connect into one ecosystem.</p>
                <TiltStage><div className="fan fan-flat">
                    <TiltCard rot={-2} kicker="Stream 01 - Students" title="AI Platform + Exposure" body="Places to experience AI hands-on - clubs, AI literacy groups, and hackathons - plus Project-K, the AI tool AIR is building for how students actually study." to="students" />
                    <TiltCard rot={1} kicker="Stream 02 - Teachers" title="AI Literacy" body="The free 8-week certification, efficiency and integration guides, and student-trained presenters who bring AI literacy into staff rooms." to="teachers" />
                    <TiltCard rot={-1} kicker="Stream 03 - Districts + Admins" title="Policy Development" body="Student-centered AI policy shaped inside a 40,000-student district, plus data, guides, and professional development days." to="schools" />
                </div></TiltStage>
            </section>
            <HScroll kicker="The ecosystem" title="Six modules, one ecosystem.">
                {[['AIR Community', 'High-school clubs: workshops, hackathon prep, and student leadership.'],
                  ['AIR Educate', 'AI literacy: students trained to present AI - to peers and to teachers.'],
                  ['AIR Build', 'Hackathons: judging and mentoring today, a flagship high-school circuit on the way.'],
                  ['AIR Learn', 'Research: conferences, curriculum, and guides - the seed of AIR Research Labs.'],
                  ['AIR Connect', 'Partnerships that bind the ecosystem: industry, universities, collaborators.'],
                  ['AIR Campus', 'College campuses: higher-ed AI literacy, opening through university conversations.']].map(([h, b], i) => (
                    <TiltCard key={h} rot={i % 2 ? 1.4 : -1.4} kicker={`Module ${String(i + 1).padStart(2, '0')}`} title={h} body={b} to="programs" />
                ))}
            </HScroll>
            <section className="sec light-sec lab-line">
                <Ghost word="LABS" />
                <Kicker>Looking ahead</Kicker>
                <h2 className="sec-title">AIR Research Labs.</h2>
                <p className="body-p">AIR Learn is the seed of AIR Research Labs - the long-term vision for student-led AI research: conferences, curriculum, and guides today, a research institution tomorrow.</p>
                <button className="btn solid dark-btn" onClick={() => go('research')}>Visit the Research page &rarr;</button>
            </section>
            <section className="sec dark-sec stats-sec" data-signal="Proven Results">
                <Ghost word="PROOF" />
                <Kicker light>Proven results</Kicker>
                <h2 className="sec-title">Receipts, not promises.</h2>
                <div className="stats">
                    <div className="stat"><span className="stat-n">46</span><span className="stat-l">Active members</span></div>
                    <div className="stat"><span className="stat-n">15</span><span className="stat-l">Chapters</span></div>
                    <div className="stat"><span className="stat-n">68</span><span className="stat-l">Educators certified</span></div>
                    <div className="stat"><span className="stat-n">2,000+</span><span className="stat-l">Educators reached</span></div>
                </div>
                <div className="stat-sub">
                    <div><b>10</b><span>States</span></div>
                    <div><b>5</b><span>Countries</span></div>
                    <div><b>16</b><span>Chapter cities</span></div>
                    <div><b>9</b><span>Partners</span></div>
                    <div><b>2023</b><span>Founded</span></div>
                </div>
                <div className="proof-grid">
                    <div className="proof"><span className="proof-k">District policy</span>Student-informed AI guidance with Beaverton School District - a 40,000-student district.</div>
                    <div className="proof"><span className="proof-k">Educator course</span>A free 8-week AI certification for educators, built with AI Advantage Agency.</div>
                    <div className="proof"><span className="proof-k">Summit stage</span>The only student presenters at the Five Oaks AI Summit.</div>
                    <div className="proof"><span className="proof-k">Student well-being</span>~300 students through Tara workshops, with 150+ challenge participants.</div>
                    <div className="proof"><span className="proof-k">Press</span>Featured by KGW and FOX 12 for student-led AI literacy work.</div>
                    <div className="proof"><span className="proof-k">Global reach</span>Chapter cities from Portland to Tokyo, Singapore, New Delhi, and Vancouver.</div>
                </div>
                <div className="city-marquee" aria-hidden>
                    <div className="city-run">
                        {[0, 1].map((k) => (
                            <span key={k} className="city-seq">
                                {MAP_CITIES.map(([n], i) => <span key={i} className="city-bit">{n}<i>&middot;</i></span>)}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
            <section className="sec light-sec">
                <Kicker>From the district</Kicker>
                <QuoteCard {...QUOTES[1]} />
                <a className="more-link" href="#/testimonials" onClick={(e) => { e.preventDefault(); go('testimonials'); }}>More testimonials &rarr;</a>
            </section>
            <section className="sec light-sec dots" data-signal="In the News">
                <Kicker>In the news</Kicker>
                <h2 className="sec-title">AIR, featured.</h2>
                <div className="press-grid">
                    {PRESS.map((p) => (
                        <a key={p.src} className="press-card" href={p.url} target="_blank" rel="noopener noreferrer">
                            <span className="press-imgwrap"><img src={p.img} alt={p.src + ' coverage of AIR'} className="press-img" /></span>
                            <span className="press-src">{p.src}</span>
                            <span className="press-cap">{p.cap}</span>
                            <span className="press-cta">{p.cta} &rarr;</span>
                        </a>
                    ))}
                </div>
                <div className="mentions">
                    <div className="mentions-h">Talked about, tagged, posted.</div>
                    {[['Dan Goldman - Beaverton School Board', 'On AIR\u2019s founders presenting to the district board', 'https://www.linkedin.com/posts/dan-goldman-939a5335a_this-evening-our-board-had-the-opportunity-activity-7470688119156051968-dxNd'],
                      ['Henry Xu - AIR co-founder', 'Announcing the AIR x OSU Broadband (OBEC) partnership', 'https://www.linkedin.com/posts/henry-xu-profile565_im-extremely-proud-and-excited-to-announce-activity-7429970000913858561-E4jx'],
                      ['Marcus Estes - Vibes DIY', 'The sponsorship behind AIR\u2019s hackathon crew', 'https://www.linkedin.com/posts/marcusestes_vibes-diy-just-helped-fulfill-a-promise-to-activity-7500944017501655041-Clg2'],
                      ['Vibes DIY blog', 'Everyone went home with an app', 'https://good.vibes.diy/blog/everyone-went-home-with-an-app'],
                      ['Lord Amdal - HackUP organizer', 'HackUP at University of Portland, where the AmberAI team took the win', 'https://www.linkedin.com/posts/lordamdal_hackup-universityofportland-ai-activity-7449537597342904320-H1Qh'],
                      ['Aditya Chandrashekaran - AmberAI', 'The wildfire-prediction pitch that took first place', 'https://www.linkedin.com/posts/aditya-chandrashekaran_what-if-ai-could-predict-where-a-wildfire-activity-7449704181872893952-Uqw1'],
                      ['Aditya Chandrashekaran - Startup Grind Portland', 'Fireside chat with Yashwanth and Shiva', 'https://www.linkedin.com/posts/aditya-chandrashekaran_last-week-i-joined-my-teammates-and-business-activity-7473559930965250048-QeIM'],
                      ['Henry Xu - AIR co-founder', 'Sharing the KGW story on Sunset students teaching AI', 'https://www.linkedin.com/posts/henry-xu-1bb0a4293_sunset-high-school-students-develop-new-program-activity-7354616181732855808-5WvZ']].map(([who, what, url]) => (
                        <a key={url} className="mention" href={url} target="_blank" rel="noopener noreferrer">
                            <span className="mention-who">{who}</span>
                            <span className="mention-what">{what}</span>
                            <span className="mention-go">&rarr;</span>
                        </a>
                    ))}
                </div>
                <a className="more-link" href="https://www.linkedin.com/company/airethought" target="_blank" rel="noopener noreferrer">Follow AIR on LinkedIn &rarr;</a>
            </section>
            <section className="sec dark-sec cta-sec" data-signal="Get Involved">
                <DepthField tone="paper" />
                <h2 className="cta-title">There is a seat<br />for you.</h2>
                <p>Students, educators, schools, partners - AIR answers them all.</p>
                <div className="cta-row">
                    <button className="btn solid" onClick={() => go('get-involved')}>Get involved</button>
                    <button className="btn ghost-btn" onClick={() => go('contact')}>Contact</button>
                </div>
            </section>
        </>
    );
}

function AboutPage() {
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="About us" title="The future of education is AI." intro="AIRethought is a student-led organization based out of Portland, Oregon. First started in June 2023, AIRethought has dedicated its time and effort to advancing AI literacy in classrooms." />
                <p className="body-p">The AIRethought team believes that the future of education is one where teachers are assisted by AI tools. That&rsquo;s what AIRethought does: teach teachers about AI.</p>
                <ZoomPhoto src={teamPhoto} alt="The AIR team together" cap="THE AIR TEAM" />
                <div className="link-cards">
                    <TiltCard rot={-2} kicker="Why we exist" title="Our Mission" body="What drives us forward, and the three principles we were founded on." to="mission" />
                    <TiltCard rot={1} kicker="How we started" title="Our Story" body="From three freshmen with an idea to a global organization." to="story" />
                    <TiltCard rot={-1} kicker="Who we are" title="Our Team" body="The students behind AIRethought." to="team" />
                    <TiltCard rot={2} kicker="Where we are" title="Team + Locations" body="The people behind AIRethought, and the cities they carry it to." to="team" />
                </div>
            </section>
            <section className="sec dark-sec cta-sec">
                <h2 className="cta-title">Ready to get involved?</h2>
                <p>Whether you&rsquo;re a teacher, student, or school administrator, there&rsquo;s a place for you in our mission.</p>
                <div className="cta-row"><button className="btn solid" onClick={() => go('get-involved')}>Get involved</button><button className="btn ghost-btn" onClick={() => go('contact')}>Contact us</button></div>
            </section>
        </>
    );
}

function MissionPage() {
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="Our mission" title="AI that strengthens teachers, never replaces them." intro="To transform the way AI is understood and used in education by empowering both teachers and students with the knowledge, tools, and confidence to integrate AI meaningfully into the learning process." />
                <p className="body-p">As a student-led organization, we are committed to reshaping the negative perceptions surrounding AI by presenting it as an accessible, reliable, and engaging resource - not a shortcut or a threat. Through transparency, collaboration, and a genuine passion for innovation, we aim to help educators incorporate AI into their lesson plans and inspire students to explore its potential responsibly.</p>
                <p className="body-p">Ultimately, our goal is to create a future where AI enhances learning, enriches creativity, and supports every classroom in becoming more dynamic and forward-thinking.</p>
            </section>
            <section className="sec dark-sec">
                <Ghost word="WHY" />
                <Kicker light>Founding principles</Kicker>
                <div className="rows">
                    <Block n="1" head="AI will not replace teachers">AI chatbots are fundamentally incomplete. It is impossible for AI to be a better teacher than a real teacher. It cannot do everything.</Block>
                    <Block n="2" head="AI is a powerful tool">Used properly, it can 10x a student&rsquo;s learning; used wrongly, it can damage it. It creates opportunities for anyone to excel.</Block>
                    <Block n="3" head="AI is the future">No matter what students plan to do, AI will be part of it. It has revolutionized the world - AI needs to be in education.</Block>
                </div>
            </section>
            <section className="sec light-sec">
                <Kicker>Looking ahead</Kicker>
                <h2 className="sec-title">What we think about the future of AI.</h2>
                <p className="body-p wide">The future of AI will demand high levels of AI literacy, making it essential for every student to understand how these technologies work and how to use them responsibly. Just as learning to type or navigate the internet became fundamental skills for modern education, understanding AI will soon be just as important. As AI continues to shape careers, communication, and daily life, students who lack this knowledge will be left at a significant disadvantage. By introducing AI concepts early and integrating them naturally into the classroom, we can ensure that the next generation is prepared not only to use AI, but to think critically about it, collaborate with it, and innovate with it.</p>
            </section>
        </>
    );
}

function StoryPage() {
    return (
        <>
            <section className="sec light-sec first">
                <Head kicker="Our story" title="The journey of AIR." intro="From a simple idea to a globally recognized impact - the milestones that define the organization&rsquo;s roadmap." />
                <ZoomPhoto src={summit} alt="AIR presenting at an AI summit" cap="FIVE OAKS AI SUMMIT, 2024" />
            </section>
            <HScroll kicker="The timeline" title="Milestones, in order.">
                {TIMELINE.map(([when, head, body]) => (
                    <div className="tl-hcard" key={when}>
                        <div className="tl-when">{when}</div>
                        <div className="tl-head">{head}</div>
                        <p>{body}</p>
                    </div>
                ))}
            </HScroll>
        </>
    );
}

/* Team runway: the roster as a pinned sideways strip of portrait cards. Each card
   settles in as it enters (scale/rotate), the name type overlaps the portrait edge
   and drifts at its own rate against the photo, and a ghost index number trails
   behind. Same pin + progress-bar machinery as the Projects strip, so the guide dot
   rides the bar here too. Reduced-motion and narrow screens get the static wrap. */
function TeamRunway() {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const barRef = useRef<HTMLDivElement | null>(null);
    const countRef = useRef<HTMLDivElement | null>(null);
    const [on, setOn] = useState(false);
    useEffect(() => { setOn(!reduceMotion()); }, []);
    useEffect(() => {
        const wrap = wrapRef.current, track = trackRef.current;
        const root = document.querySelector('.site2') as HTMLElement | null;
        if (!wrap || !track || !root || !on) return;
        const set = () => {
            track.style.transform = 'translate3d(0,0,0)';
            const max = Math.max(0, track.scrollWidth - root.clientWidth + 40);
            wrap.style.height = `${root.clientHeight + max * 2.6}px`; // same stretched traversal as the other strips
        };
        set();
        const t = setTimeout(set, 350);
        window.addEventListener('resize', set);
        return () => { clearTimeout(t); window.removeEventListener('resize', set); };
    }, [on]);
    const skewRef = useRef({ lastP: 0, skew: 0, reset: 0 as unknown as ReturnType<typeof setTimeout> });
    useRootScroll((root) => {
        const wrap = wrapRef.current, track = trackRef.current;
        if (!wrap || !track || !on) return;
        const rr = root.getBoundingClientRect();
        const r = wrap.getBoundingClientRect();
        const total = Math.max(1, wrap.offsetHeight - root.clientHeight);
        const p = Math.min(1, Math.max(0, (rr.top - r.top) / total));
        const max = Math.max(0, track.scrollWidth - root.clientWidth + 40);
        const st = skewRef.current;
        const dp = p - st.lastP;
        st.lastP = p;
        st.skew = Math.max(-2.2, Math.min(2.2, st.skew * 0.8 + dp * 46));
        track.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0) skewX(${(-st.skew).toFixed(2)}deg)`;
        clearTimeout(st.reset);
        st.reset = setTimeout(() => { st.skew = 0; track.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0)`; }, 140);
        const vw = root.clientWidth;
        const cards = track.children;
        let bestAbs = 99, bestIdx = 0;
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i] as HTMLElement;
            const screenX = card.offsetLeft - p * max;
            const enter = Math.min(1, Math.max(0, (vw - screenX) / (vw * 0.55)));
            const ease = 1 - Math.pow(1 - enter, 3);
            const center = screenX + card.offsetWidth / 2;
            const par = Math.max(-1, Math.min(1, (center - vw / 2) / (vw / 2)));
            const port = card.querySelector('.tm-port') as HTMLElement | null;
            const meta = card.querySelector('.tm-meta') as HTMLElement | null;
            const ghost = card.querySelector('.tm-ghost') as HTMLElement | null;
            const inner = card.querySelector('.tm-closer-in') as HTMLElement | null;
            const absPar = Math.abs(par);
            const pop = 1 + (1 - Math.min(1, absPar)) * 0.025; // centered card carries a subtle scale pop
            if (port) port.style.transform = `translate3d(${((1 - ease) * 70 - par * 12).toFixed(1)}px, ${((1 - ease) * 26).toFixed(1)}px, 0) rotate(${((1 - ease) * 3).toFixed(2)}deg) scale(${((0.94 + ease * 0.06) * pop).toFixed(3)})`;
            if (meta) meta.style.transform = `translate3d(${((1 - ease) * 130 - par * 26).toFixed(1)}px, 0, 0)`;
            if (ghost) ghost.style.transform = `translate3d(${(par * 18).toFixed(1)}px, ${((1 - ease) * 20).toFixed(1)}px, 0)`;
            if (inner) inner.style.transform = `translate3d(${((1 - ease) * 60).toFixed(1)}px, 0, 0)`;
            card.classList.toggle('on', absPar < 0.3);
            card.classList.toggle('dim', absPar >= 0.3 && enter >= 1);
            if (i < TEAM.length && absPar < bestAbs) { bestAbs = absPar; bestIdx = i; }
        }
        if (countRef.current) countRef.current.textContent = `${String(bestIdx + 1).padStart(2, '0')} / ${TEAM.length}`;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    }, [on]);
    return (
        <div className={`hs-wrap hs-dark tm-runway${on ? '' : ' static'}`} ref={wrapRef}>
            <div className="hs-stick">
                <div className="hs-head tm-head">
                    <Kicker light>The roster</Kicker>
                    <h2 className="sec-title">Fifteen students, side by side.</h2>
                    <div className="tm-headmeta" aria-hidden><span>01 &mdash; 15</span><i /><span>The people behind AIR</span></div>
                </div>
                <div className="hs-track tm-track" ref={trackRef}>
                    {TEAM.map((m, i) => (
                        <div className="tm-card" key={m.name}>
                            <div className="tm-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
                            <div className="tm-port">
                                {m.src ? <img src={m.src} alt={m.name} /> : <div className="team-blank" aria-label={`${m.name} - portrait intentionally blank`}><span>BLANK<br />BY DESIGN</span></div>}
                            </div>
                            <div className="tm-meta">
                                <h3 className="tm-name">{m.name}</h3>
                                {m.role && <div className="tm-role">{m.role}</div>}
                                <p className="tm-duty">{m.duty}</p>
                            </div>
                        </div>
                    ))}
                    <div className="tm-card tm-closer">
                        <div className="tm-closer-in">
                            <div className="tm-closer-big">And that&rsquo;s<br />the team.</div>
                            <p>Fifteen students building AI literacy, city by city.</p>
                            <button className="btn solid" onClick={() => go('get-involved')}>Get involved &rarr;</button>
                        </div>
                    </div>
                </div>
                <div className="hs-progress tm-progress" aria-hidden>{TEAM.map((m, i) => <span key={m.name} className="tm-tick" style={{ left: `${(((i + 0.5) / TEAM.length) * 100).toFixed(2)}%` }} />)}<i ref={barRef} /></div>
                <div className="tm-count" ref={countRef} aria-hidden>01 / {TEAM.length}</div>
                <div className="hs-hint" aria-hidden>SCROLL &darr; MOVES &rarr;</div>
            </div>
        </div>
    );
}

function TeamPage() {
    return (
        <>
            <section className="sec light-sec first">
                <Head kicker="Our team" title="Meet the core team." intro="The passionate students behind AIR who make everything possible." />
            </section>
            <TeamRunway />
            <section className="sec light-sec">
                <p className="body-p">Fourteen portraits, plus Vinay Soundharajan, whose photo stays blank by design. Seven more members have no usable photo yet - no stock stand-ins. Beyond the core team, chapter ambassadors carry AIR into their own cities.</p>
            </section>
            <section className="sec light-sec dots">
                <Kicker>Where AIR shows up</Kicker>
                <h2 className="sec-title">Members and ambassadors, city by city.</h2>
                <WorldMap />
            </section>
            <section className="sec dark-sec">
                <Ghost word="WHERE" />
                <Kicker light>Who to reach out to</Kicker>
                <div className="loc-grid">
                    {[['Portland, Oregon', 'Home base - the founding team, plus Jathin Divakar, Portland Student Ambassador'],
                      ['North Carolina', 'Arpan Bhattacharjee - NC Lead Ambassador'],
                      ['Boston', 'Shashank - Boston Lead Ambassador'],
                      ['Seattle', 'Hari Shankar Plakada - Seattle Lead Ambassador'],
                      ['Vancouver, Canada', 'Parth Nimbalkar + Kaushik Poreddy - Vancouver Lead Ambassadors'],
                      ['Langley, Canada', 'David Lee - Langley (Canada) Lead Ambassador'],
                      ['India', 'Vaibhav - Lead for India Initiatives']].map(([c, s]) => (
                        <div className="loc" key={c}><div className="loc-c">{c}</div><div className="loc-s">{s}</div></div>
                    ))}
                </div>
                <p className="body-p on-dark">The chapter model: a student who wants to bring AI literacy to their city gets AIR&rsquo;s slides, curricula, and software to launch with. 15 chapters across 10 states and 5 countries.</p>
                <button className="btn solid" onClick={() => go('students')}>Start a chapter &rarr;</button>
            </section>
        </>
    );
}


function ImpactPage() {
    return (
        <>
            <section className="sec light-sec first">
                <Head kicker="Our impact" title="Three years of hard work." intro="What a student team can do when a district actually listens." />
                <div className="stats light-stats big">
                    <div className="stat"><span className="stat-n">15</span><span className="stat-l">Chapters</span></div>
                    <div className="stat"><span className="stat-n">46</span><span className="stat-l">Active members</span></div>
                    <div className="stat"><span className="stat-n">2,000+</span><span className="stat-l">Educators reached</span></div>
                    <div className="stat"><span className="stat-n">5</span><span className="stat-l">Countries</span></div>
                </div>
            </section>
            <section className="sec dark-sec">
                <Ghost word="WORK" />
                <Kicker light>Where we work</Kicker>
                <div className="rows">
                    <Block head="Beaverton School District &middot; Partner">Partnered with a 40,000-student Oregon district - participation in its GenAI Committee, student perspectives contributed to policy and guidance discussions (Jan 2025), and teacher professional development across Aloha, Sunset, and Westview High Schools. AIR drafted and informed district-level guidance; the provisions formally adopted by the district are distinct from AIR&rsquo;s drafts.</Block>
                    <Block head="AI Advantage Agency &middot; Collaborator">Collaborated with a local startup to build AI teacher training programs - including the 8-week certification course (68 educators certified).</Block>
                    <Block head="OSU&rsquo;s Oregon Broadband Equity Coalition + N50 &middot; Partners">A free rural-district AI literacy program with OSU&rsquo;s Oregon Broadband Equity Coalition, and curriculum digitization with the N50 Project for international reach.</Block>
                    <Block head="Project-K">The AI tool built for teacher-student transparency - piloted internationally. Full details on the Project-K page.</Block>
                </div>
            </section>
            <section className="sec light-sec">
                <Kicker>The record</Kicker>
                <h2 className="sec-title">Milestones, presentations, and press.</h2>
                <div className="rows">
                    <Block head="Delivered">Educator certification with AI Advantage Agency (68 certified) &middot; Tara well-being initiative (~300 students in workshops, 150+ challenge participants, one-month follow-ups indicating retained coping strategies) &middot; Five Oaks AI Summit 2024 as the only student presenters &middot; Project-K international pilots, first completed fall 2024 &middot; school-wide student surveys on AI usage and sentiment.</Block>
                    <Block head="Underway">Beaverton SD multi-year engagement &middot; OSU + N50 rural educator training and curriculum digitization &middot; judging and mentoring at student hackathons, including UnlockedHacks and the Aixelerate Challenge &middot; research synthesis on neurodiversity-centered AI learning.</Block>
                    <Block head="Presentations + press">BSD AI Summits (2023-2026) &middot; BSD Teacher Development Conference (2026) &middot; NWRESD CAfE Summit (2025-26) &middot; AI Empowered EDU, University of Portland (2026) &middot; Stanford Neurodiversity Summit research poster (Sept 19, 2026) &middot; KGW feature (Jul 24, 2025) &middot; FOX 12 / KPTV founder feature (Sep 2, 2025).</Block>
                </div>
                <div className="doc-grid">
                    <DocReader title="NWRESD CAfE Summit deck" sub="&ldquo;Every Student Supported - AI to Bridge the Gap&rdquo; - the slides AIR presented, Oct 31, 2025. 16 slides." pages={deckPages} thumbs={deckThumbs} />
                    <DocLink title="School-wide student survey" sub="&ldquo;Student Perspectives on AI in Education&rdquo; - the live Google Form AIR uses to collect student feedback on AI in their schools. Opens in a new tab." cta="Open the live form ↗" href="https://forms.gle/45eggmHmEsfT3hYy5" />
                </div>
            </section>
        </>
    );
}

function ProjectsPage() {
    return (
        <>
        <section className="sec light-sec dots first">
            <Head kicker="Our projects" title="What we&rsquo;ve been building." intro="Programs, platforms, and events - grouped by the people each effort serves. Research has its own page." />
        </section>
        <HScroll kicker="Impact on students" title="For students.">
                <TiltCard rot={-2} kicker="Well-being" title="Tara Initiative" body="Educational psychology made practical: workshops for ~300 students, 150+ in structured stress-management challenges, one-month follow-ups indicating retained strategies." />
                <TiltCard rot={1} kicker="Hackathons" title="Judging + Mentoring" body="AIR judges and mentors at student hackathons - including UnlockedHacks and the Aixelerate Challenge - while developing its own flagship high-school hackathon circuit." to="programs" />
                <TiltCard rot={-1} kicker="Platform" title="Project-K, Student Side" body="A supportive AI tutor with step-by-step explanations and adaptive pacing - built for how students actually study. Pilots completed at selected international schools in India, fall 2024." to="project-k" />
        </HScroll>
        <HScroll kicker="Teachers, admins + districts" title="For schools.">
                <TiltCard rot={-2} kicker="Course" title="AI Certification Course" body="Built with AI Advantage Agency and rooted in direct classroom experience. Free for educators - 68 certified." to="certification" />
                <TiltCard rot={1} kicker="Summit" title="NWRESD CAfE Summit" body="AIR shared insights on classroom AI integration with a focus on equity - practical use cases, AI tools, and curriculum development." />
                <TiltCard rot={-1} kicker="Prof. development" title="District PD + AI Summits" body="Teacher professional development across Aloha, Sunset, and Westview High Schools, plus presentations at BSD AI Summits (2023-2026) and the BSD Teacher Development Conference (2026)." />
                <TiltCard rot={2} kicker="Keynote" title="AI Empowered EDU" body="AIR presented at AI Empowered EDU, University of Portland (2026) - practical classroom AI for working educators." />
                <TiltCard rot={-2} kicker="Policy" title="Beaverton SD GenAI Committee" body="Student perspectives contributed to AI policy and guidance discussions (Jan 2025) in a 40,000-student district. AIR drafted and informed guidance; formally adopted provisions are the district&rsquo;s own." to="policy" />
                <TiltCard rot={1} kicker="Platform" title="Project-K for Schools" body="Transparent classroom AI - teachers see every student-AI interaction. Implementation support from strategy through technical setup." to="project-k" />
        </HScroll>
        <HScroll kicker="Partners + community" title="For others.">
                <TiltCard rot={-2} kicker="Partner" title="AI Advantage Agency" body="A local startup AIR collaborates with to build AI teacher training - including the free 8-week certification course (68 educators certified)." to="certification" />
                <TiltCard rot={1} kicker="Partner" title="AIR x OSU + N50" body="A free 8-week rural-district AI program with OSU&rsquo;s Oregon Broadband Equity Coalition, and curriculum digitization with the N50 Project for international reach." to="air-x-osu" />
                <TiltCard rot={-1} kicker="New module" title="AIR Campus" body="Higher-ed AI literacy: bringing AIR to college campuses through active university conversations." to="programs" />
        </HScroll>
        </>
    );
}

function TestimonialsPage() {
    return (
        <>
            <section className="sec light-sec first">
                <Head kicker="Testimonials" title="What educators say about AIR." intro="From AIR&rsquo;s current website - educators and partners who have worked with the team, in their own words." />
            </section>
            <HScroll kicker="In their words" title="Five voices.">
                {QUOTES.map((q) => <QuoteCard key={q.who} {...q} />)}
            </HScroll>
        </>
    );
}

/* Programs orbit: six module nodes ride a slow elliptical track around the hub.
   Hover or focus a node to slow the orbit and read the module; click to open it.
   Falls back to the plain grid on touch / small screens and for reduced motion. */
const MODULES: [string, string, string, string][] = [
    ['AIR Community', 'High-school clubs: workshops, hackathon prep, and student leadership. Chapters carry AIR into their own cities.', 'students', 'Start a club'],
    ['AIR Educate', 'AI literacy: students trained to give AI presentations - to peers and to teachers. Home of the 8-week educator certification.', 'certification', 'Get certified'],
    ['AIR Build', 'Hackathons: AIR judges and mentors at student hackathons today, with a flagship high-school circuit on the way.', 'students', 'Hack with AIR'],
    ['AIR Learn', 'Research: conferences, curriculum, and guides - and a future student research mentorship in learning science and AI.', 'research', 'See the research'],
    ['AIR Connect', 'Partnerships: the glue between industry, universities, and classrooms - mentors, sponsored workshops, resources.', 'partners', 'Partner up'],
    ['AIR Campus', 'College campuses: higher-ed AI literacy, opening through university conversations.', 'air-x-osu', 'AIR x OSU'],
];
function ModuleOrbit() {
    const stageRef = useRef<HTMLDivElement | null>(null);
    const [act, setAct] = useState(-1);
    const actRef = useRef(-1);
    actRef.current = act;
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage || reduceMotion()) return;
        const nodes = Array.from(stage.querySelectorAll<HTMLElement>('.o-node'));
        let raf = 0, last = performance.now(), t = 0, speed = 1;
        const loop = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000); last = now;
            const target = actRef.current >= 0 ? 0.12 : 1;
            speed += (target - speed) * Math.min(1, dt * 4);
            t += dt * speed * 0.10;
            nodes.forEach((n, i) => {
                const a = t + (i * Math.PI * 2) / nodes.length;
                const depth = (Math.sin(a) + 1) / 2;
                n.style.left = `${50 + 38 * Math.cos(a)}%`;
                n.style.top = `${50 + 33 * Math.sin(a)}%`;
                n.style.zIndex = String(10 + Math.round(depth * 10));
                n.style.opacity = actRef.current >= 0 && actRef.current !== i ? '0.35' : String(0.6 + 0.4 * depth);
                n.style.transform = `translate(-50%,-50%) scale(${(0.86 + 0.22 * depth).toFixed(3)})`;
            });
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);
    const onMove = (e: React.PointerEvent) => {
        const stage = stageRef.current;
        if (!stage || reduceMotion()) return;
        const r = stage.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
        stage.style.setProperty('--tiltx', `${(-dy * 5).toFixed(2)}deg`);
        stage.style.setProperty('--tilty', `${(dx * 7).toFixed(2)}deg`);
    };
    const a0 = (i: number) => (i * Math.PI * 2) / MODULES.length;
    const cur = act >= 0 ? MODULES[act] : null;
    return (
        <div className="orbit-stage" ref={stageRef} onPointerMove={onMove}
            onPointerLeave={() => { stageRef.current?.style.setProperty('--tiltx', '0deg'); stageRef.current?.style.setProperty('--tilty', '0deg'); }}>
            <div className="orbit-tilt">
                <svg className="orbit-svg" viewBox="0 0 1000 620" aria-hidden>
                    <ellipse cx="500" cy="310" rx="380" ry="205" className="orbit-ellipse" />
                    <ellipse cx="500" cy="310" rx="380" ry="205" className="orbit-ellipse dashes" />
                </svg>
                <div className="orbit-hub" aria-hidden>
                    <span className="oh-k">AIR</span>
                    <span className="oh-t">SIX MODULES</span>
                </div>
                {MODULES.map(([h, , to], i) => (
                    <a key={h} href={`#/${to}`} className={`o-node${act === i ? ' on' : ''}`}
                        style={reduceMotion() ? { left: `${50 + 38 * Math.cos(a0(i))}%`, top: `${50 + 33 * Math.sin(a0(i))}%` } : undefined}
                        onMouseEnter={() => setAct(i)} onMouseLeave={() => setAct(-1)}
                        onFocus={() => setAct(i)} onBlur={() => setAct(-1)}
                        onClick={(e) => { e.preventDefault(); go(to); }}>
                        <span className="o-n">{String(i + 1).padStart(2, '0')}</span>
                        <span className="o-h">{h.replace('AIR ', '')}</span>
                    </a>
                ))}
            </div>
            <div className={`orbit-detail${cur ? ' on' : ''}`} aria-live="polite">
                {cur ? (<>
                    <span className="od-h">{cur[0]}</span>
                    <span className="od-b">{cur[1]}</span>
                    <a className="od-cta" href={`#/${cur[2]}`} onClick={(e) => { e.preventDefault(); go(cur[2]); }}>{cur[3]} &rarr;</a>
                </>) : (<span className="od-hint">Hover a node - every module opens.</span>)}
            </div>
        </div>
    );
}

function ProgramsPage() {
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="Programs" title="One ecosystem. Six modules." intro="AIR is not three products - it is an ecosystem, and every module stands on equal footing. Open any of them for info, guides, sign-ups, and events." />
                <ModuleOrbit />
                <div className="mod-grid">
                    {[['AIR Community', 'High-school clubs: workshops, hackathon prep, and student leadership. Chapters carry AIR into their own cities.', 'students', 'Start a club'],
                      ['AIR Educate', 'AI literacy: students trained to give AI presentations - to peers and to teachers. Home of the 8-week educator certification.', 'certification', 'Get certified'],
                      ['AIR Build', 'Hackathons: AIR judges and mentors at student hackathons today, with a flagship high-school circuit on the way.', 'students', 'Hack with AIR'],
                      ['AIR Learn', 'Research: conferences, curriculum, and guides - and a future student research mentorship in learning science and AI.', 'research', 'See the research'],
                      ['AIR Connect', 'Partnerships: the glue between industry, universities, and classrooms - mentors, sponsored workshops, resources.', 'partners', 'Meet the partners'],
                      ['AIR Campus', 'College campuses: higher-ed AI literacy, opening through university conversations.', 'air-x-osu', 'AIR x OSU']].map(([h, b, to, cta], i) => (
                        <a key={h} className="mod-card" href={`#/${to}`} onClick={(e) => { e.preventDefault(); go(to); }}>
                            <span className="mod-n">{String(i + 1).padStart(2, '0')}</span>
                            <span className="mod-h">{h}</span>
                            <span className="mod-b">{b}</span>
                            <span className="mod-cta">{cta} &rarr;</span>
                        </a>
                    ))}
                </div>
            </section>
            <section className="sec dark-sec">
                <Kicker light>Events + ways in</Kicker>
                <h2 className="sec-title">Where the ecosystem shows up.</h2>
                <div className="idx on-dark-idx">
                    {[['Events', 'AIR judges and mentors at student hackathons - including UnlockedHacks and the Aixelerate Challenge - and presents at district AI summits and NWRESD CAfE.', 'contact', 'Ask about events'],
                      ['Sign-ups', 'The 8-week educator certification is free - sign up to join the next cohort.', 'contact', 'Sign up'],
                      ['Guides', 'Club starter guides, AI literacy presentation kits, and integration guides come through AIR’s chapters and programs.', 'students', 'Get guides'],
                      ['Requests', 'Chapters, workshops, hackathon guidance, policy support - tell AIR what your school needs.', 'contact', 'Make a request']].map(([h, b, to, cta], i) => (
                        <a key={h} className="idx-row" href={`#/${to}`} onClick={(e) => { e.preventDefault(); go(to); }}>
                            <span className="idx-n">{String(i + 1).padStart(2, '0')}</span><span className="idx-h">{h}</span><span className="idx-b">{b}</span><span className="idx-a">{cta} &rarr;</span>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}

function ResearchPage() {
    return (
        <>
            <section className="sec dark-sec first">
                <Ghost word="LAB" />
                <Head dark kicker="AIR Learn - Research" title="Research, for the long term." intro="AIR&rsquo;s research stream: conferences, curriculum, and guides today - and a long-term vision of AIR Research Labs, publishing original work and mentoring student researchers in learning science and AI." />
            </section>
            <section className="sec light-sec dots">
                <Kicker>Completed + presented</Kicker>
                <div className="rows">
                    <Block n="01" head="Stanford Neurodiversity Summit poster">&ldquo;From Cognitive Outsourcing to Cognitive Augmentation&rdquo; - presented at the Stanford Neurodiversity Summit, Sept 19, 2026. A presentation, not a partnership. 7,192 records screened.</Block>
                    <Block n="02" head="School-wide student surveys">&ldquo;Student Perspectives on AI in Education&rdquo; - AIR runs school-wide surveys on AI tools&rsquo; impact on student learning and engagement, informing programs and policy work. Data available on request.</Block>
                    <Block n="03" head="Neurodiversity-centered AI learning">A research synthesis on how AI learning tools can support neurodivergent students - in motion.</Block>
                </div>
            </section>
            <section className="sec light-sec">
                <Kicker>The vision</Kicker>
                <h2 className="sec-title">AIR Research Labs.</h2>
                <p className="body-p wide">Long term, AIR aims to run its own research labs - publishing articles, presenting at conferences, and developing curriculum and guides out of original work. A planned program would mentor students through literature reviews in learning science and AI, connecting them with professors and research pathways.</p>
                <button className="btn solid dark-btn" onClick={() => go('contact')}>Ask about the research &rarr;</button>
            </section>
        </>
    );
}

function ProjectKPage() {
    return (
        <>
            <section className="sec dark-sec first">
                <Ghost word="K" />
                <Head dark kicker="AIR Project-K" title="Transparent AI for the classroom." intro="An educational AI system designed to support students, empower teachers, and maintain complete transparency in how AI is used. Instead of replacing traditional learning, it enhances it - giving students guided help while teachers always stay in control. Every interaction is visible, supervised, and grounded in the belief that AI should be a tool for learning, not a shortcut." />
            </section>
            <section className="sec light-sec">
                <Kicker>Design principles</Kicker>
                <div className="rows">
                    <Block n="1" head="Transparency first">Students can see how the AI works, what it&rsquo;s doing, and which parts of their activity are shared with their teacher. Nothing is hidden or automated behind closed doors.</Block>
                    <Block n="2" head="Teacher oversight and guidance">Teachers assign each student a specific AI tutor and can view all messages the student sends - ensuring academic integrity, building trust, and letting teachers intervene, support, or redirect learning at any time.</Block>
                    <Block n="3" head="Academic integrity without punishment">A secondary monitoring system analyzes activity for potential cheating - not to penalize students, but to maintain fairness and guide them toward honest learning. It flags patterns for teachers transparently.</Block>
                    <Block n="4" head="Well-being and emotional awareness">Through simple check-ins and responsive dialogue, the AI can adjust difficulty, explanation style, or pacing if a student seems overwhelmed - making learning feel safe, approachable, and achievable.</Block>
                </div>
            </section>
            <section className="sec dark-sec">
                <Kicker light>What students experience</Kicker>
                <p className="body-p on-dark">A clean, calming workspace built to make hard topics feel approachable and progress feel visible: a supportive AI tutor available any time, step-by-step explanations matched to their level with story or analogy mode when stuck, and adaptive pacing that softens difficulty.</p>
                <div className="stats">
                    <div className="stat"><span className="stat-n">30,000+</span><span className="stat-l">Lines of code</span></div>
                    <div className="stat"><span className="stat-n">1,000+</span><span className="stat-l">Hours coding the platform</span></div>
                    <div className="stat"><span className="stat-n">2</span><span className="stat-l">Schools piloted</span></div>
                </div>
                <p className="reported">Project-K pilots completed at selected international schools, fall 2024.</p>
                <button className="btn solid" onClick={() => go('contact')}>Bring Project-K to your school &rarr;</button>
            </section>
        </>
    );
}

function CertificationPage() {
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="AIR AI Certification" title="The ultimate AI course for educators." intro="Free for educators, built with AI Advantage Agency, and rooted in AIR&rsquo;s work in real classrooms. 68 educators certified." />
                <div className="cert-grid">
                    {['Intro - the fundamentals of GenAI and how they work',
                      'AI Usage - using AI tools effectively in the classroom and for personal learning',
                      'Combating AI misuse - identifying and preventing misuse in educational settings',
                      'Integration of AI - weaving AI tools into curriculum and teaching practices',
                      'Prompt Engineering - crafting effective prompts for AI tools',
                      'AI Ethics - the ethical considerations of AI in education',
                      'AI Policy - the policies and frameworks that govern AI use in schools',
                      'Creation - creating AI systems and chatbots customized to your needs'].map((u, i) => (
                        <div className="cert-unit" key={u}><span className="cu-n">{String(i + 1).padStart(2, '0')}</span><span>{u}</span></div>
                    ))}
                </div>
                <div className="doc-grid">
                    <DocReader title="Module 1: Intro to Gen AI" sub="The opening module of AIR&rsquo;s certification course - 13 pages, free to read." pages={modPages} thumbs={modThumbs} />
                </div>
            </section>
            <section className="sec dark-sec">
                <Ghost word="LEARN" />
                <Kicker light>The AIRethought difference</Kicker>
                <h2 className="sec-title">Rooted in real classrooms.</h2>
                <p className="body-p on-dark">AIR has been hands-on inside schools since the beginning of AI in classrooms, so the course is rooted in that direct experience. Our team worked with educators to understand their challenges and shaped the course around them. It has been tested with teachers already, with positive feedback.</p>
                <p className="body-p on-dark">Workshops have included Aloha High School and teachers across Beaverton School District, including Westview and Sunset.</p>
                <button className="btn solid" onClick={() => go('contact')}>Become AI certified &rarr;</button>
            </section>
        </>
    );
}

function PolicyPage() {
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="AI Policy Development" title="Student-centered AI policy." intro="AIR is uniquely positioned to partner with your administration in navigating the complexities of AI in the classroom - balancing innovation with academic integrity." />
                <p className="body-p">AIR contributed to the comprehensive AI policy work of the Beaverton School District, an Oregon district of about 40,000 students - participating in its GenAI Committee alongside administrative leadership and bringing student perspectives into policy and guidance discussions (January 2025). AIR drafted and informed district-level guidance; the provisions formally adopted by the district are distinct from AIR&rsquo;s drafts.</p>
                <p className="body-p">AIR students have also presented at district AI summits and conducted district-wide student surveys on AI usage and sentiment.</p>
            </section>
            <section className="sec dark-sec cta-sec">
                <h2 className="cta-title">Ready to build<br />your AI policy?</h2>
                <p>To learn more about how AIR can help write your AI policy, contact us.</p>
                <div className="cta-row"><button className="btn solid" onClick={() => go('contact')}>Contact us &rarr;</button></div>
            </section>
        </>
    );
}

function AirOsuPage() {
    return (
        <>
            <section className="sec dark-sec first">
                <Ghost word="OSU" />
                <Head dark kicker="New collaboration" title="AIRethought &times; OSU&rsquo;s Oregon Broadband Equity Coalition." intro="Bridging the digital divide through AI education - working to ensure every student and educator across Oregon has access to the AI literacy resources they need to thrive in a digital future." />
            </section>
            <section className="sec light-sec dots">
                <Kicker>Why it matters</Kicker>
                <h2 className="sec-title">Bringing AI to every district in Oregon.</h2>
                <p className="body-p wide">Oregon&rsquo;s rural and underserved communities face a compounding challenge - limited broadband access and a lack of AI literacy resources. Through this collaboration, AIRethought and OSU&rsquo;s Oregon Broadband Equity Coalition are combining expertise to address both. The joint program deploys student-led AI literacy workshops into districts that have historically been left behind, giving teachers the tools and confidence to guide students through a rapidly evolving AI landscape. From the coast to eastern Oregon, no district will be left behind.</p>
                <div className="rows">
                    <Block head="With OSU + N50">A free eight-week AI literacy and development program for rural districts with the Oregon Broadband Equity Coalition &middot; digitizing AIR&rsquo;s eight-week curriculum with the N50 Project for wider international distribution &middot; an introduction to OSU&rsquo;s AI Literacy Center.</Block>
                </div>
                <button className="btn solid" onClick={() => go('contact')}>Sign up to learn more &rarr;</button>
            </section>
        </>
    );
}

function GetInvolvedPage() {
    return (
        <section className="sec light-sec dots first">
            <Head kicker="Get involved" title="Want to work with AIR?" intro="Learn about what we can do for you - pick your path." />
            <div className="fan fan-flat">
                <TiltCard rot={-3} kicker="Path 01" title="Students" body="Start a chapter in your city, run AI literacy presentations, hack with AIR, and find opportunity inside an established organization." to="students" />
                <TiltCard rot={-1} kicker="Path 02" title="Teachers" body="Free AI certification, integration guides, classroom resources, and ongoing support and guidance." to="teachers" />
                <TiltCard rot={1} kicker="Path 03" title="Districts + Admins" body="AI policy support, professional development days, and transparent school-wide AI software with implementation consultation." to="schools" />
                <TiltCard rot={3} kicker="Path 04" title="Others" body="Partnership opportunities, community engagement programs, volunteer opportunities, sponsorship options." to="others" />
            </div>
            <div className="rows" style={{ marginTop: 34 }}>
                <Block head="Mentors + hackathon organizers">Mentor students at workshops and hackathons, offer technical guidance, or strengthen your event&rsquo;s educational experience with AIR&rsquo;s workshops and judges.</Block>
                <Block head="Universities">Joint programs, student engagement, and campus initiatives through AIR Campus.</Block>
            </div>
        </section>
    );
}

function TeachersPage() {
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="For teachers" title="Teach with AI - confidently." intro="Free training, classroom-ready resources, and a student team behind you. Here is everything AIR offers educators." />
                <ZoomPhoto src={classroom} alt="AIR working with teachers in a classroom" cap="AIR IN THE CLASSROOM" tilt />
            </section>
            <section className="sec dark-sec">
                <Ghost word="CERT" />
                <Kicker light>The centerpiece</Kicker>
                <h2 className="sec-title">Get certified - free.</h2>
                <p className="body-p on-dark">Become a certified AI educator through AIR&rsquo;s comprehensive 8-week program, built with AI Advantage Agency: AI fundamentals, ethical considerations, practical classroom applications, and effective teaching strategies for AI literacy. 68 educators certified.</p>
                <div className="rows-wide">
                    <Block n="01" head="Eight units, zero cost">GenAI fundamentals, AI usage, combating misuse, integration, prompt engineering, ethics, policy, and creation - free for educators, with real certification.</Block>
                    <Block n="02" head="Rooted in real classrooms">Shaped with teachers across Beaverton School District - including Aloha, Westview, and Sunset - and tested with working educators, with positive feedback.</Block>
                </div>
                <div className="cta-row left">
                    <button className="btn solid" onClick={() => go('certification')}>Explore the certification &rarr;</button>
                    <button className="btn ghost-btn" onClick={() => go('contact')}>Sign up for a course &rarr;</button>
                </div>
            </section>
            <HScroll kicker="Guides + support" title="Integrate AI, your way.">
                <div className="tcard"><span className="tc-h">Professional development</span><LI items={['Hands-on AI training workshops', 'Curriculum integration strategies', 'Best practices for classroom AI use', 'Ongoing learning resources']} /></div>
                <div className="tcard"><span className="tc-h">Efficiency + integration guides</span><LI items={['Ready-to-use AI lesson plans', 'AI prompting techniques', 'Custom AI tools for efficiency', 'AI ethics discussion guides']} /></div>
                <div className="tcard"><span className="tc-h">Support and community</span><LI items={['Direct access to AI experts', 'A global AI teacher peer network', 'Technical troubleshooting help', 'Monthly Q&A sessions']} /></div>
                <div className="tcard"><span className="tc-h">Project-K, teacher side</span><p className="gc-b">Assign each student a specific AI tutor, view every student-AI interaction, and keep academic integrity transparent - AI that strengthens teachers, never replaces them. <FL to="project-k">See Project-K &rarr;</FL></p></div>
            </HScroll>
        </>
    );
}

function StudentsPage() {
    return (
        <>
            <section className="sec dark-sec first">
                <Ghost word="START" />
                <Head dark kicker="For students" title="Your club. Your city. Your voice." intro="Start an AIR Rethought Club, join the AI literacy movement, or hack with us - here is how to get started." />
            </section>
            <section className="sec light-sec dots">
                <Kicker>The AIR Rethought Club</Kicker>
                <h2 className="sec-title">How to get started.</h2>
                <div className="rows">
                    <Block n="01" head="Host workshops + training sessions">Clubs run hands-on AI workshops and training sessions at their schools - launching with AIR&rsquo;s slides, curricula, and software.</Block>
                    <Block n="02" head="Run an AI literacy group">Join the literacy group: give presentations, bring student voices into the AI conversation, and get trained to present AI to peers - and to teachers.</Block>
                    <Block n="03" head="Hack with AIR">AIR judges and mentors at student hackathons - including UnlockedHacks and the Aixelerate Challenge - and is developing its own flagship high-school hackathon circuit. Clubs get prep and guidance.</Block>
                    <Block n="04" head="Project-K, student side">AIR&rsquo;s vision for student-AI interaction: a transparent tutor that explains step by step, adapts pacing, and keeps teachers in the loop - the future of how students study with AI. <FL to="project-k">See the vision &rarr;</FL></Block>
                </div>
            </section>
            <HScroll kicker="Guides + requests" title="What do you want to start?">
                {[['Start an AIR club', 'The chapter starter path: slides, curricula, and software, plus mentorship from experienced chapter leaders.'],
                  ['Run an AI literacy presentation', 'Get the presentation kit and training to bring AI literacy to your school - students presenting to students, and to teachers.'],
                  ['Start a hackathon', 'Guidance on organizing a school hackathon, with AIR’s judges and mentors behind you.'],
                  ['Sign up your chapter', 'Already running a club? Register it as an official AIR chapter.'],
                  ['Request info', 'Questions about clubs, hackathons, literacy groups, or any AIR initiative - ask us.']].map(([h, b]) => (
                    <button key={h} className="guide-card" onClick={() => go('contact')}>
                        <span className="gc-h">{h}</span><span className="gc-b">{b}</span><span className="gc-cta">Start here &rarr;</span>
                    </button>
                ))}
            </HScroll>
            <section className="sec light-sec dots">
                <Kicker>Why join</Kicker>
                <div className="cert-grid">
                    {['Leadership experience in a growing organization',
                      'Make a real impact in your local community',
                      'Develop valuable skills in AI education and outreach',
                      'Network with like-minded student leaders',
                      'Access to resources and training materials',
                      'Mentorship from experienced chapter leaders',
                      'Recognition and certification opportunities',
                      'Build your resume with meaningful volunteer work'].map((b, i) => (
                        <div className="cert-unit" key={b}><span className="cu-n">{String(i + 1).padStart(2, '0')}</span><span>{b}</span></div>
                    ))}
                </div>
                <p className="body-p">Have questions about the process, or want to start your own chapter? Take the first step towards making a difference.</p>
                <button className="btn solid dark-btn" onClick={() => go('contact')}>Contact us &rarr;</button>
            </section>
        </>
    );
}

function SchoolsPage() {
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="The literacy + helping side" title="AIR + your district." intro="Policy work, data, professional development, and courses - the literacy side. The tools side - Project-K - is below." />
                <div className="rows-wide">
                    <Block n="01" head="District AI policy">AIR contributed student perspectives to the AI policy work of Beaverton School District (~40,000 students) - GenAI Committee participation and guidance discussions (Jan 2025). AIR drafted and informed district-level guidance; formally adopted provisions are the district&rsquo;s own.</Block>
                    <Block n="02" head="Data + ideas">District-wide student surveys on AI usage and sentiment, presentations at district AI summits, and guides shaped by what students actually report.</Block>
                    <Block n="03" head="AI professional development days">AIR runs PD days with school staff - hands-on training shaped around your teachers, from tech-savvy educators to those new to AI.</Block>
                    <Block n="04" head="Courses for your staff">The free 8-week AI certification - GenAI fundamentals through policy and creation - available to district educators. <FL to="certification">See the course &rarr;</FL></Block>
                </div>
            </section>
            <section className="sec dark-sec">
                <Kicker light>The tools side</Kicker>
                <h2 className="sec-title">Project-K, district-wide.</h2>
                <p className="body-p on-dark">One of the most comprehensive and transparent AI platforms available for schools: implementation strategy, integration with existing systems, data security compliance, and ongoing technical support - working closely with your IT department, from pilot to district-wide rollout.</p>
                <div className="rows-wide on-dark-rows">
                    <Block head="Implementation">A guided process: strategy, setup, compliance, and support - tailored to your environment.</Block>
                    <Block head="AI literacy implementation">Structured curriculum frameworks, teacher training, and student modules across grade levels - critical thinking, ethical use, practical application.</Block>
                    <Block head="Policy framework support">Assistance developing ethical AI use policies for your school or district.</Block>
                </div>
                <button className="btn solid" onClick={() => go('contact')}>Bring AIR to your district &rarr;</button>
            </section>
        </>
    );
}

function OthersPage() {
    return (
        <section className="sec light-sec dots first">
            <Head kicker="For others" title="Partner with us." intro="AIR Connect is the ecosystem&rsquo;s glue - partnerships with industry, universities, and community organizations advancing AI literacy." />
            <div className="rows-wide">
                <Block n="01" head="Partnership opportunities">Collaborate with AIR to develop innovative AI education programs and expand our reach to more communities.</Block>
                <Block n="02" head="Community engagement">Join our community programs, attend events, and help create meaningful connections in AI education.</Block>
                <Block n="03" head="Volunteer opportunities">Contribute your time and expertise to support our mission of making AI education accessible to all.</Block>
                <Block n="04" head="Sponsorship options">Support our programs financially and help us provide free AI literacy resources to students and educators.</Block>
            </div>
            <h2 className="sec-title">Ready to make an impact?</h2>
            <p className="body-p">Let&rsquo;s work together to shape the future of AI education.</p>
            <button className="btn solid dark-btn" onClick={() => go('contact')}>Get in touch &rarr;</button>
        </section>
    );
}

function ContactPage() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('Student');
    const [email, setEmail] = useState('');
    const [org, setOrg] = useState('');
    const [msg, setMsg] = useState('');
    const [opened, setOpened] = useState(false);
    const send = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`AIR inquiry - ${role}${org ? ' - ' + org : ''}`);
        const body = encodeURIComponent(`Name: ${name}\nRole: ${role}\nEmail: ${email}\nSchool/Organization: ${org}\n\n${msg}`);
        window.location.href = `mailto:Airethought@gmail.com?subject=${subject}&body=${body}`;
        setOpened(true);
    };
    return (
        <section className="sec light-sec dots first">
            <Head kicker="Contact" title="Get in touch." intro="Students, teachers, administrators, parents, partners - AIR answers them all." />
            <form className="cform" onSubmit={send}>
                <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
                <label>I am a
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        {['Student', 'Teacher', 'Administrator', 'Parent', 'Other'].map((r) => <option key={r}>{r}</option>)}
                    </select>
                </label>
                <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
                <label>School / organization (optional)<input value={org} onChange={(e) => setOrg(e.target.value)} /></label>
                <label className="full">Message<textarea value={msg} onChange={(e) => setMsg(e.target.value)} required rows={5} /></label>
                <button className="btn solid dark-btn" type="submit">Send message →</button>
                {opened && <p className="form-note">Your email app should be open with the message addressed to Airethought@gmail.com - press send there.</p>}
                <p className="cform-note">The form opens your email app with everything filled in, addressed to Airethought@gmail.com.</p>
            </form>
        </section>
    );
}

/* Partners: an interactive constellation field. Nine partner nodes drift around the AIR hub,
   pulses travel the links, the pointer bends the field, hover/click reads the partner.
   The chip row below is the keyboard + touch path to the same detail. */
const PARTNERS: { n: string; t: string; d: string; l?: [string, string] }[] = [
    { n: 'AI Advantage Agency', t: 'Course partner', d: 'Built the free 8-week AI educator certification with AIR - 68 educators certified and counting.', l: ['AI Advantage Agency on LinkedIn', 'https://www.linkedin.com/company/teamnebula/'] },
    { n: 'Beaverton School District', t: 'District partner', d: 'A 40,000-student Oregon district: GenAI Committee, student-informed AI guidance, PD days, and AI summits across Aloha, Sunset, and Westview.', l: ['Dan Goldman, BSD board, on AIR at the board', 'https://www.linkedin.com/posts/dan-goldman-939a5335a_this-evening-our-board-had-the-opportunity-activity-7470688119156051968-dxNd'] },
    { n: 'OSU Broadband (OBEC)', t: 'University', d: 'With Oregon State\u2019s Oregon Broadband Equity Coalition: free AI literacy programming for rural districts.', l: ['Henry\u2019s partnership announcement', 'https://www.linkedin.com/posts/henry-xu-profile565_im-extremely-proud-and-excited-to-announce-activity-7429970000913858561-E4jx'] },
    { n: 'N50 Project', t: 'Global reach', d: 'Digitizing AIR\u2019s 8-week curriculum for international distribution.' },
    { n: 'NWRESD', t: 'Regional ESD', d: 'Northwest Regional ESD - AIR presented practical classroom AI integration at the CAfE Summit.' },
    { n: 'UnlockedHacks', t: 'Hackathon', d: 'AIR judges and mentors at the student hackathon.' },
    { n: 'Aixelerate', t: 'Hackathon', d: 'AIR judges and mentors at the Aixelerate Challenge.' },
    { n: 'VibesDIY', t: 'Dev platform', d: 'Hackathon sponsorships and free developer credits for AIR events.', l: ['Vibes DIY on the hackathon sponsorship', 'https://good.vibes.diy/blog/everyone-went-home-with-an-app'] },
    { n: 'AI Collective', t: 'Community', d: 'Community partner in AIR\u2019s AI literacy work.' },
];
function PartnerField({ sel, setSel }: { sel: number; setSel: (i: number) => void }) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const cvRef = useRef<HTMLCanvasElement | null>(null);
    const selRef = useRef(sel);
    selRef.current = sel;
    useEffect(() => {
        const box = boxRef.current, cv = cvRef.current;
        if (!box || !cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;
        const still = reduceMotion();
        const st = { w: 0, h: 0, dpr: 1, mx: -9999, my: -9999, t: 0, hot: -1 };
        const pts = PARTNERS.map((_, i) => {
            const a = (i / PARTNERS.length) * Math.PI * 2 - Math.PI / 2;
            return { a, x: 0, y: 0, vx: 0, vy: 0, ph: i * 1.7 };
        });
        const resize = () => {
            const r = box.getBoundingClientRect();
            st.dpr = Math.min(2, window.devicePixelRatio || 1);
            st.w = r.width; st.h = r.height;
            cv.width = Math.round(st.w * st.dpr); cv.height = Math.round(st.h * st.dpr);
            cv.style.width = `${st.w}px`; cv.style.height = `${st.h}px`;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(box);
        const anchor = (p: { a: number }, i: number) => {
            const cx = st.w / 2, cy = st.h / 2;
            const rx = st.w * 0.36, ry = st.h * 0.34;
            const wob = still ? 0 : Math.sin(st.t * 0.5 + pts[i].ph) * 6;
            return [cx + Math.cos(p.a) * (rx + wob), cy + Math.sin(p.a) * (ry + wob)] as const;
        };
        const draw = () => {
            ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
            ctx.clearRect(0, 0, st.w, st.h);
            const cx = st.w / 2, cy = st.h / 2;
            // links
            pts.forEach((p, i) => {
                const on = selRef.current === i || st.hot === i;
                ctx.strokeStyle = on ? 'rgba(200,112,43,.85)' : 'rgba(200,112,43,.22)';
                ctx.lineWidth = on ? 1.6 : 1;
                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.stroke();
                // traveling pulse
                const tp = (st.t * 0.22 + i * 0.13) % 1;
                const px = cx + (p.x - cx) * tp, py = cy + (p.y - cy) * tp;
                ctx.fillStyle = on ? 'rgba(230,150,80,.95)' : 'rgba(200,112,43,.5)';
                ctx.beginPath(); ctx.arc(px, py, on ? 2.6 : 1.8, 0, Math.PI * 2); ctx.fill();
            });
            // hub
            ctx.fillStyle = '#c8702b';
            ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = 'rgba(200,112,43,.4)'; ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.arc(cx, cy, 12 + Math.sin(st.t * 2) * 2, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = 'rgba(242,239,232,.9)';
            ctx.font = '600 11px "Space Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('AIR', cx, cy - 18);
            // nodes
            pts.forEach((p, i) => {
                const on = selRef.current === i || st.hot === i;
                const dim = (selRef.current >= 0 || st.hot >= 0) && !on;
                const r = on ? 6.5 : 4.5;
                ctx.globalAlpha = dim ? 0.3 : 1;
                ctx.fillStyle = on ? '#e0a05c' : '#f2efe8';
                ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = on ? 'rgba(224,160,92,.8)' : 'rgba(242,239,232,.35)';
                ctx.lineWidth = 1.2;
                ctx.beginPath(); ctx.arc(p.x, p.y, r + 4.5, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = on ? 'rgba(230,170,110,.98)' : 'rgba(242,239,232,.72)';
                ctx.font = `${on ? 600 : 500} 10.5px "Space Mono", monospace`;
                ctx.fillText(PARTNERS[i].n.toUpperCase(), p.x, p.y + r + 14);
                ctx.globalAlpha = 1;
            });
        };
        const step = () => {
            st.t += 0.016;
            pts.forEach((p, i) => {
                const [ax, ay] = anchor(p, i);
                // spring to anchor
                p.vx += (ax - p.x) * 0.02; p.vy += (ay - p.y) * 0.02;
                // pointer repulsion
                const dx = p.x - st.mx, dy = p.y - st.my;
                const d2 = dx * dx + dy * dy;
                if (d2 < 120 * 120 && d2 > 0.01) {
                    const d = Math.sqrt(d2);
                    const f = ((120 - d) / 120) * 2.4;
                    p.vx += (dx / d) * f; p.vy += (dy / d) * f;
                }
                p.vx *= 0.9; p.vy *= 0.9;
                p.x += p.vx; p.y += p.vy;
            });
            draw();
        };
        pts.forEach((p, i) => { const [ax, ay] = anchor(p, i); p.x = ax; p.y = ay; });
        let raf = 0;
        if (still) { step(); }
        else { const loop = () => { step(); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); }
        const hit = (ex: number, ey: number) => {
            const r = cv.getBoundingClientRect();
            const mx = ex - r.left, my = ey - r.top;
            let best = -1, bd = 30 * 30;
            pts.forEach((p, i) => { const d2 = (p.x - mx) ** 2 + (p.y - my) ** 2; if (d2 < bd) { bd = d2; best = i; } });
            return best;
        };
        const onMove = (e: PointerEvent) => {
            const r = cv.getBoundingClientRect();
            st.mx = e.clientX - r.left; st.my = e.clientY - r.top;
            st.hot = hit(e.clientX, e.clientY);
            cv.style.cursor = st.hot >= 0 ? 'pointer' : 'default';
        };
        const onLeave = () => { st.mx = -9999; st.my = -9999; st.hot = -1; };
        const onClick = (e: PointerEvent) => { const i = hit(e.clientX, e.clientY); if (i >= 0) setSel(i); };
        cv.addEventListener('pointermove', onMove);
        cv.addEventListener('pointerleave', onLeave);
        cv.addEventListener('pointerdown', onClick);
        return () => {
            cancelAnimationFrame(raf); ro.disconnect();
            cv.removeEventListener('pointermove', onMove);
            cv.removeEventListener('pointerleave', onLeave);
            cv.removeEventListener('pointerdown', onClick);
        };
    }, [setSel]);
    // redraw once when selection changes in reduced-motion mode
    useEffect(() => {
        if (!reduceMotion()) return;
        const cv = cvRef.current;
        if (!cv) return;
        cv.dispatchEvent(new Event('pointerleave'));
    }, [sel]);
    return (
        <div className="pf-box" ref={boxRef}>
            <canvas ref={cvRef} className="pf-canvas" aria-hidden="true" />
        </div>
    );
}
function PartnersPage() {
    const [sel, setSel] = useState(0);
    const p = PARTNERS[sel];
    return (
        <>
            <section className="sec light-sec dots first">
                <Head kicker="Partners" title="Industry, campuses, districts - one network." intro="Nine organizations carry AIR further than any student team could alone. Play with the field - every node is a real partner." />
            </section>
            <section className="sec dark-sec partner-sec" data-signal="Partners">
                <Kicker light>The network</Kicker>
                <PartnerField sel={sel} setSel={setSel} />
                <div className="pf-chips">
                    {PARTNERS.map((q, i) => (
                        <button key={q.n} type="button" className={`pf-chip${sel === i ? ' on' : ''}`} onClick={() => setSel(i)}>{q.n}</button>
                    ))}
                </div>
                <div className="pf-detail" key={sel}>
                    <span className="pf-t">{p.t}</span>
                    <span className="pf-n">{p.n}</span>
                    <span className="pf-d">{p.d}</span>
                    {p.l && <a className="pf-link" href={p.l[1]} target="_blank" rel="noopener noreferrer">{p.l[0]} &rarr;</a>}
                </div>
            </section>
            <section className="sec dark-sec cta-sec">
                <h2 className="cta-title">Build with AIR.</h2>
                <p>Districts, universities, companies, hackathons - if AI literacy belongs in your world, it belongs here.</p>
                <div className="cta-row"><button className="btn solid" onClick={() => go('contact')}>Become a partner &rarr;</button></div>
            </section>
        </>
    );
}

/* ---------------- shell ---------------- */

const PAGES: Record<string, React.ComponentType> = {
    home: HomePage, about: AboutPage, mission: MissionPage, story: StoryPage, team: TeamPage,
    locations: TeamPage, impact: ImpactPage, projects: ProjectsPage, research: ResearchPage, testimonials: TestimonialsPage,
    programs: ProgramsPage, 'project-k': ProjectKPage, certification: CertificationPage, policy: PolicyPage,
    'air-x-osu': AirOsuPage, 'get-involved': GetInvolvedPage, teachers: TeachersPage, students: StudentsPage,
    schools: SchoolsPage, others: OthersPage, partners: PartnersPage, contact: ContactPage,
};

function currentRoute(): string {
    const h = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    return PAGES[h] ? h : 'home';
}

export function App() {
    const [route, setRoute] = useState(currentRoute());
    const [menuOpen, setMenuOpen] = useState(false);
    const [veil, setVeil] = useState<'' | 'in' | 'out'>('');
    const rootRef = useRef<HTMLDivElement | null>(null);
    const routeRef = useRef(route);
    routeRef.current = route;
    useEffect(() => {
        if (window.self !== window.top) document.documentElement.classList.add('embedded');
    }, []);
    useEffect(() => {
        const onNav = (e: Event) => {
            const id = (e as CustomEvent<string>).detail;
            if (!PAGES[id]) return;
            setMenuOpen(false);
            if (id === routeRef.current) { rootRef.current?.scrollTo({ top: 0, behavior: 'auto' }); return; }
            // keep keyboard operable after a route swap: move focus to the new page's main
            const focusMain = () => window.setTimeout(() => {
                const m = document.querySelector('.site2 main') as HTMLElement | null;
                if (!m) return;
                if (!m.hasAttribute('tabindex')) m.setAttribute('tabindex', '-1');
                m.focus({ preventScroll: true });
            }, 120);
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduce) { setRoute(id); rootRef.current?.scrollTo({ top: 0, behavior: 'auto' }); focusMain(); return; }
            setVeil('in');
            window.setTimeout(() => {
                setRoute(id);
                rootRef.current?.scrollTo({ top: 0, behavior: 'auto' });
                setVeil('out');
                focusMain();
                window.setTimeout(() => setVeil(''), 600);
            }, 430);
        };
        window.addEventListener('air-nav', onNav);
        return () => window.removeEventListener('air-nav', onNav);
    }, []);
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        root.style.overflowY = menuOpen ? 'hidden' : 'auto';
        return () => { root.style.overflowY = 'auto'; };
    }, [menuOpen]);
    const Page = PAGES[route];
    usePageReveals(route);
    return (
        <div className="site2" ref={rootRef}>
            <SignalTrail route={route} />
            <header className="topbar">
                <a className="brand" href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>
                    <img src={airMark} alt="AIR logo" /><span className="brand-t">AIR<span className="brand-thin">ethought</span></span>
                </a>
                <nav className="topnav">
                    <a href="#/projects" className={route === 'projects' ? 'on' : ''} onClick={(e) => { e.preventDefault(); go('projects'); }}>Work</a>
                    <a href="#/programs" className={route === 'programs' ? 'on' : ''} onClick={(e) => { e.preventDefault(); go('programs'); }}>Programs</a>
                    <a href="#/partners" className={route === 'partners' ? 'on' : ''} onClick={(e) => { e.preventDefault(); go('partners'); }}>Partners</a>
                    <a href="#/team" className={route === 'team' ? 'on' : ''} onClick={(e) => { e.preventDefault(); go('team'); }}>Team</a>
                    <a href="#/get-involved" className={route === 'get-involved' ? 'on' : ''} onClick={(e) => { e.preventDefault(); go('get-involved'); }}>Get Involved</a>
                    <a href="#/contact" className={route === 'contact' ? 'on' : ''} onClick={(e) => { e.preventDefault(); go('contact'); }}>Contact</a>
                </nav>
                <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
                    {menuOpen ? 'CLOSE' : 'MENU'}<span className={`menu-ico${menuOpen ? ' x' : ''}`}><i /><i /></span>
                </button>
            </header>
            {menuOpen && (
                <div className="menu-overlay">
                    <div className="menu-grid">
                        {MENU.map((g) => (
                            <div className="menu-col" key={g.group}>
                                <div className="menu-group">{g.group}</div>
                                {g.links.map(([id, label]) => (
                                    <a key={id} href={`#/${id}`} className={`menu-link${route === id ? ' on' : ''}`}
                                        onClick={(e) => { e.preventDefault(); setMenuOpen(false); go(id); }}>{label}</a>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="menu-foot">AIRETHOUGHT &middot; STUDENT-LED AI LITERACY &middot; PORTLAND, OR</div>
                </div>
            )}
            {veil && (
                <div className={`veil ${veil}`} aria-hidden="true">
                    <span className="veil-mark">AIR<span>ethought</span></span>
                </div>
            )}
            <main key={route}>
                <Page />
            </main>
            <Footer />
        </div>
    );
}
