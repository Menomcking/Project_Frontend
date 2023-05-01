import { Component } from "react";
import { Container } from "react-bootstrap";
import '../App.css';
/**
 * users: User típusú tömb, a felhasználókat tartalmazza
 * userName: string, a felhasználó neve
 * userPassword: string, a felhasználó jelszava
 * userEmail: string, a felhasználó email-je
 * registrationSuccess: logikai, sikeres-e a regisztráció vagy sem
 */
interface State {
    users: User[],
    userName: string,
    userPassword: string,
    userEmail: string,
    registrationSuccess: boolean,
  }
  /**
   * id: szám, azonosító
   * name: string, név
   * password: string, jelszó
   * email: string, email
   */
  interface User {
    id: number,
    name: string,
    password: string,
    email: string,
  }
  /*
  interface UserListResponse {
    users: User[],
  }*/
  
  export default class Register extends Component<{}, State> {
    constructor(props: {}) {
      super(props);
  
      this.state = {
        userName: '',
        userPassword: '',
        userEmail: '',
        users: [],
        registrationSuccess: false,
      }
    }
    /**
     * 
     * @returns Amennyiben van hiányos mező a regisztrációs űrlapban, a regisztráció sikertelen
     */
    handleRegister = async () => {
      const { userName, userPassword, userEmail } = this.state;
      if (userName.trim() == '' || userPassword.trim() == '' || userEmail.trim() == '') {
        return;
      }
  
      const adat = {
        username: userName,
        password: userPassword,
        email: userEmail
      };
      /**
       * A backenden meghívja a register végpontot, ami felveszi az adatbázisba a felhasználót
       */
      let response = await fetch('http://localhost:3000/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adat)
      });
  
      if (response.ok) {
        this.setState({
          userName: '',
          userPassword: '',
          userEmail: '',
          registrationSuccess: true,
        });
      }
    }
    /**
     * 
     * @returns Megjeleníti a regisztrációs űrlapot
     */
    render() {
      const { userName, userPassword, userEmail, registrationSuccess } = this.state;
  
      return <Container><div id="root">
        <div id="registrationDiv" className="col-sm-12">
        <h2 id="registrationH2">Regisztráció</h2>
        { registrationSuccess && <p id="regsuccess">A regisztráció sikeres!</p> }
        <input type="text" className='registrationInput' placeholder='Felhasználónév' value={ userName } onChange={e => this.setState({ userName: e.currentTarget.value})}/><br />
        <input type="password" className='registrationInput' placeholder='Jelszó' value={ userPassword } onChange={e => this.setState({ userPassword: e.currentTarget.value})}/><br />
        <input type="text" className='registrationInput' placeholder='Email' value={ userEmail } onChange={e => this.setState({ userEmail: e.currentTarget.value})}/><br />
        <button id='registrationButton' onClick={ this.handleRegister }>Regisztráció</button>
        </div>
      </div>
      </Container>
    }
  }
  