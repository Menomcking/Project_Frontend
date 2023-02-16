import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

    return <div>
      <h2>Regisztráció</h2>
      Felhasználónév: <input type="text" value={ userName } onChange={e => this.setState({ userName: e.currentTarget.value})}/><br />
      Jelszó: <input type="password" value={ userPassword } onChange={e => this.setState({ userPassword: e.currentTarget.value})}/><br />
      Email: <input type="text" value={ userEmail } onChange={e => this.setState({ userEmail: e.currentTarget.value})}/><br />
      <button onClick={ this.handleRegister }>Regisztráció</button>
    </div>
  }
}

export default App;
