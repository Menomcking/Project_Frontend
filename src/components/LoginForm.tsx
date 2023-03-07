import { Component, FormEvent } from "react";

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

    handleLogout = () => {
        localStorage.removeItem('authToken');
        this.props.onAuthTokenChange('');
    }

    componentDidMount(): void {
        const token = localStorage.getItem('authToken')
        if(token !== null) {
            this.props.onAuthTokenChange(token)
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
            return <button onClick={this.handleLogout}>Kijelentkezés</button>
        }
        return <form onSubmit={this.handleLogin}>
            <label>
                Email:<br />
                <input type="text" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
            </label>
            <br />
            <label>
                Jelszó:<br />
                <input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
            </label>
            <br />
            <p>{loginError}</p>
            <input type="submit" value="Bejelentkezés" />
        </form>
    }
}
