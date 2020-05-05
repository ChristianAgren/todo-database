// @ts-nocheck
import React from 'react';
import './App.css';
import Layout from '../Layout/Layout';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserContextProvider from '../Contexts/UserContext';

function App() {
  return (
    <UserContextProvider>

      <CssBaseline />
      <Layout />
    </UserContextProvider>
  );
}

export default App;
