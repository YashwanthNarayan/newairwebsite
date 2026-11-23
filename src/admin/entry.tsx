import React from 'react';
import { createRoot } from 'react-dom/client';
import { Admin } from './Admin';

// If anything inside the app throws, show a readable message instead of the
// page going blank (the page background is near-black, so a crash reads as a
// "black screen").
class ErrorBoundary extends React.Component<{}, { error: string | null }> {
    state = { error: null as string | null };
    static getDerivedStateFromError(err: unknown) {
        return { error: err instanceof Error ? err.message : String(err) };
    }
    componentDidCatch(err: unknown) {
        console.error('Admin dashboard crashed:', err);
    }
    render() {
        if (this.state.error) {
            return (
                <div className="ad ad-center">
                    <div className="ad-signin">
                        <h1>AIR <span>Visitors</span></h1>
                        <p className="ad-muted">The dashboard hit an error on this browser. Try a full reload.</p>
                        <p className="ad-fine">{this.state.error}</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const el = document.getElementById('root')!;
createRoot(el).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Admin />
        </ErrorBoundary>
    </React.StrictMode>
);
el.setAttribute('data-ad-rendered', '1');
