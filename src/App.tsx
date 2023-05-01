import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Main from './components/Main';
import LoginForm from './components/LoginForm';
/**
 * authToken: A token ami az autentikációhoz szükséges
 */
interface State {
  authToken: string;
}

interface Props {}

class App extends React.Component <Props, State>{

  constructor(props: Props) {
    super(props);

    this.state = {
      authToken: '',
    }
  }
  /**
   * Az autentikációhoz szükséges tokent kezeli, ha null, akkor beállítja
   */
  componentDidMount(): void {
    const token = localStorage.getItem('authToken')
    if(token !== null) {
      this.setState({authToken: token});
    }
  }
  /**
   * Kijelentkezés, a tokent üresre állítja
   */
  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({authToken: ''});
}
  /**
   * 
   * @returns Megjeleníti a regisztráció és a bejelentkezés gombját
   */
  render() {
    const { authToken } = this.state;
    const loggedIn = authToken != '';

    return <div>
      <header>
        <nav>
          {
              loggedIn ? <button id='logoutButton' onClick={this.handleLogout}>Kijelentkezés</button>
              : <ul className="center">
                  <li><Link to='/register'>Regisztráció</Link></li>
                  <li><Link to='/login'>Bejelentkezés</Link></li>
                </ul>
          }
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LoginForm
            authToken={authToken}
            onAuthTokenChange={(token) => this.setState({ authToken: token })}
            />} />
          <Route path='/*' element={loggedIn ? <Main 
          authToken={authToken}
          /> : <p id='ushouldlogin'>Regisztrálj vagy jelentkezz be!</p>}/>
        </Routes>
      </main>
    </div>
  }
}

export default App;
