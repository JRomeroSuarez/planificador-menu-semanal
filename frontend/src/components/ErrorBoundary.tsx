import { Component, ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, message: '' };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message };
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 text-center">
                    <span className="material-symbols-outlined text-6xl text-danger">error</span>
                    <h1 className="text-2xl font-bold">Algo ha salido mal</h1>
                    <p className="text-default-500 max-w-md">{this.state.message}</p>
                    <button
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() => window.location.reload()}
                    >
                        Recargar página
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
