import React, { useState, useEffect } from 'react';
import WebApp from '../apps/web/src/App';
import AdminApp from '../apps/admin/src/App';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath.startsWith('/admin')) {
    return <AdminApp />;
  }

  return <WebApp />;
}
