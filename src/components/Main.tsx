import { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import NewStory from "./NewStory";

export default class Main extends Component {

    

    render() {
        return <div>
            <h1>Oldal Címe</h1>
            <p>Valamilyen szöveg</p>
            <Link to="/newstory" className="btn btn-primary">Új történet</Link>
            <button>Történet szerkesztése</button>
            <button>Saját profil</button>
            <Routes>
                <Route path="newstory" element={<NewStory />} />
            </Routes>
        </div>
    }

}
