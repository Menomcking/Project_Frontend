import { Component, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import '../App.css';
/**
 * email: String, felhasználó email címe
 * password: String, felhasználó jelszava
 * loginError: String, hibaüzenet
 */
interface State {
    email: string;
    password: string;
    loginError: string;
}

interface Props {
    /**
    * authToken: A token ami az autentikációhoz szükséges
    */
    authToken: string;
    /**
     * 
     * @param token Token
     * @returns Void, autentikációhoz szükséges
     */
    onAuthTokenChange: (token: string) => void;
}

export default class LoginForm extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginError: '',
        }
    }
    /**
     * 
     * @param e Esemény
     * @returns Egyező email és jelszó páros esetén a bejelentkezés sikeres, különben hibaüzenet
     */
    handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const loginData = {
            'email': this.state.email,
            'password': this.state.password,
        };
        /**
         * Meghívja  abackenden a log-in végpontot, bejelentkezteti a felhasználót, amennyiben az adatait helyesen adta meg
         */
        const response = await fetch('http://localhost:3000/authentication/log-in', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginData),
        });
        if(!response.ok) {
            if(response.status === 401) {
                this.setState({ loginError: 'Hibás email cím vagy jelszó' })
            } else {
                this.setState({ loginError: 'Szerver hiba' });
            }
            return;
        }
        const responseBody = await response.json();
        localStorage.setItem('authToken', responseBody.token);
        this.setState({
            email: '',
            password: '',
            loginError: '',
        })
        this.props.onAuthTokenChange(responseBody.token);
    }
    /**
     * 
     * @returns A bejelentkezési űrlapot jeleníti meg
     */
    render() {
        const { authToken } = this.props;
        const { email, password, loginError } = this.state;
        const loggedIn = authToken != '';
        if (loggedIn) {
            return <Navigate to='/' />;
        }

        
        return <Container><div id="root">
            <div id="loginDiv" className="col-sm-12">
                <h2 id="loginH2">Bejelentkezés</h2>
                <form onSubmit={this.handleLogin}>
                    <label>
                        Email:
                        <input type="text" className="loginInput" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </label>
                    <br />
                    <label>
                        Jelszó:
                        <input type="password" className="loginInput" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </label>
                    <br />
                    <p id="loginErr">{loginError}</p>
                    <input type="submit" id="loginButton" value="Bejelentkezés" />
                </form>
            </div>
        </div>
        </Container>
    }
}
