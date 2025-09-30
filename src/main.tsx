import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

const rootElement = document.getElementById("root")!;

const WrappedApp = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <WrappedApp />);
} else {
  createRoot(rootElement).render(<WrappedApp />);
}
