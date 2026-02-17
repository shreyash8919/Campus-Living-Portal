import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          backgroundColor: '#fff',
          color: '#d32f2f',
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #ccc'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#d32f2f' }}>⚠️ System Error</h1>
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', border: '1px solid #ddd', overflow: 'auto' }}>
            <h3 style={{ color: '#333', marginTop: 0 }}>{this.state.error?.toString()}</h3>
            <pre style={{ color: '#555', marginTop: '10px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {this.state.error?.stack}
            </pre>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#0b3d91',
              color: 'white',
              border: 'none',
              borderRadius: '0',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
