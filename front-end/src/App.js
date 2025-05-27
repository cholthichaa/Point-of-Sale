import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './view/Login.tsx';
import AppRoutes from './routes/index.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <AppRoutes role={role} />
    </Router>
  );
}

export default App;
