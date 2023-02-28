import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

class App extends React.Component {
  render() {
    return <div>
      <header>
        <nav>
          <ul>
            <li><Link to='/register'>Regisztráció</Link></li>
            <li><Link to='/login'>Bejelentkezés</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </div>
  }
}

export default App;
