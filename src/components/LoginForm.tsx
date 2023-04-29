import { Component, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import '../App.css';

interface State {
    email: string;
    password: string;
    loginError: string;
}

interface Props {
    authToken: string;
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

    handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const loginData = {
            'email': this.state.email,
            'password': this.state.password,
        };

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
