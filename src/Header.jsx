import React from "react";

function Header({ currentUser, onUserChange, onLogout, users = [] }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="brand-avatar"></div>
        <div>
          <div className="brand-name">COMPLIANCE HUB</div>
          <div className="brand-sub">SECURE KYC & AML DASHBOARD</div>
        </div>
      </div>

      <div className="topbar-right">
        {currentUser && (
          <>
            <select
              className="role-switch"
              value={currentUser.id}
              onChange={(e) => onUserChange(e.target.value)}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
