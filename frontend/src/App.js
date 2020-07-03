import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';
import Container from './components/Container';
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
        <Container />
        <AppRoutes />
    </Router>
  );
}

export default App;
