import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin.jsx';
import AdminPanel from './AdminPanel.jsx';

function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('admin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <AdminPanel user={user} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Admin;