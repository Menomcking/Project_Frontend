import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Main from './components/Main';
import LoginForm from './components/LoginForm';

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

  componentDidMount(): void {
    const token = localStorage.getItem('authToken')
    if(token !== null) {
      this.setState({authToken: token});
    }
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({authToken: ''});
}

  render() {
    const { authToken } = this.state;
    const loggedIn = authToken != '';

    return <div>
      <header>
        <nav>
          {
              loggedIn ? <button onClick={this.handleLogout}>Kijelentkezés</button>
              : <ul>
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
          /> : <p>Jelentkezz be!</p>}/>
        </Routes>
      </main>
    </div>
  }
}

export default App;
