import React from 'react';
import './App.css';
import Router from './router';
import NotificationProvider from './components/NotificationProvider';

function App() {
  return (
    <NotificationProvider>
      <Router />
    </NotificationProvider>
  );
}

export default App;
