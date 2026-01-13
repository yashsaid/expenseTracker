import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

console.log("main.jsx loaded");
console.log("Root element:", document.getElementById('root'));

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found!");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    console.log("React app rendered");
  } catch (error) {
    console.error("Error rendering app:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;"><h2>Fatal Error</h2><pre>${error.toString()}</pre></div>`;
  }
}
