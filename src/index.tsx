import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// window.onerror = function (message, source, lineno, colno, error) {
//   console.error("Caught global error:", message); // Log it, but prevent it from showing
//   return true; // Return true to prevent the default error popup
// };

// window.addEventListener('unhandledrejection', function (event) {
//   console.error("Unhandled rejection:", event.promise, event.reason);
//   event.preventDefault(); // Prevent default behavior (popup)
// });

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
