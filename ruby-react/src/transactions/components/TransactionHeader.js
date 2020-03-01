import * as React from "react";

import './TransactionHeader.css';

export default function Header() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          Homebank
        </div>
      </div>
    </nav>
  );
}
