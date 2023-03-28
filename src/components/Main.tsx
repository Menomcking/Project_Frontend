import { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import EditStory from "./EditStory";
import NewStory from "./NewStory";

export default class Main extends Component {

    

    render() {
        return <div>
            <h1>Oldal Címe</h1>
            <p>Valamilyen szöveg</p>
            <Link to="/newstory" className="btn btn-primary">Új történet</Link>
            <Link to="/editstory" className="btn btn-primary">Történet szerkesztése</Link>
            <button>Saját profil</button>
            <Routes>
                <Route path="newstory" element={<NewStory />} />
                <Route path="editstory" element={<EditStory />} />
            </Routes>
        </div>
    }

}
