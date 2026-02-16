import React from 'react';
import { ShieldAlert } from 'lucide-react';

/**
 * Error Boundary component to catch and display React errors gracefully
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-red-500 flex items-center justify-center p-6">
                    <div className="max-w-md w-full border-2 border-red-500 bg-red-900/20 p-8 text-center">
                        <ShieldAlert size={64} className="mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-4 font-mono">SYSTEM FAILURE</h1>
                        <p className="text-sm mb-4 font-mono">
                            A critical error occurred. Please refresh the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 border border-red-500 hover:bg-red-500 hover:text-black transition-all font-mono"
                        >
                            REBOOT SYSTEM
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
