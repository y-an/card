import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

declare global {
    export interface Number {
        toReadableDecimal(): number;
    }
}

/** Returns number with upto two decimals points */
Number.prototype.toReadableDecimal = function (this: number) {
    return Number((this).toFixed(2));
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
