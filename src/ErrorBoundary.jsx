import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to render fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.error("Error captured by Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI instead of error
            return <h1>Something went wrong. Please try again later.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
