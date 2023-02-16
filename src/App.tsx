import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

interface State {
  users: User[],
  userName: string,
  userPassword: string,
  userEmail: string,
}

interface User {
  id: number,
  name: string,
  password: string,
  email: string,
}

interface UserListResponse {
  users: User[],
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      userName: '',
      userPassword: '',
      userEmail: '',
      users: []
    }
  }

  async loadUsers() {
    let response = await fetch('http://localhost:3000/register');
    let data = await response.json() as User[];
    this.setState({
      users: data,
    })
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleRegister = async () => {
    const { userName, userPassword, userEmail } = this.state;
    if (userName.trim() == '' || userPassword.trim() == '' || userEmail.trim() == '') {
      return;
    }

    const adat = {
      name: userName,
      password: userPassword,
      email: userEmail
    };

    let response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat)
    });

    this.setState({
      userName: '',
      userPassword: '',
      userEmail: '',
    })

    await this.loadUsers();
  }

  render() {
    const { userName, userPassword, userEmail } = this.state;

    return <Container><div id="root">
      <div id="registrationDiv" className="col-sm-12">
      <h2 id="registrationH2">Regisztráció</h2>
      <input type="text" className='registrationInput' placeholder='Felhasználónév' value={ userName } onChange={e => this.setState({ userName: e.currentTarget.value})}/><br />
      <input type="password" className='registrationInput' placeholder='Jelszó' value={ userPassword } onChange={e => this.setState({ userPassword: e.currentTarget.value})}/><br />
      <input type="text" className='registrationInput' placeholder='Email' value={ userEmail } onChange={e => this.setState({ userEmail: e.currentTarget.value})}/><br />
      <button id='registrationButton' onClick={ this.handleRegister }>Regisztráció</button>
      </div>
    </div>
    </Container>
  }
}

export default App;
