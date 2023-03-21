import { Component } from "react";

interface State {
    storyParts: StoryParts[],
    usersId: number|undefined,
    id: number|undefined,
    rating: number,
    title: string,
    description: string,
    picture: string,
}

interface StoryParts {
    textPartId: number,
    textPart: string,
    storyId: number,
}

export default class NewStory extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            storyParts: [ { textPartId: -1, textPart: '', storyId: -1 } ],
            usersId: undefined,
            id: undefined,
            rating: 0,
            title: '',
            description: '',
            picture: ''
        }
    }

    handleNewTextPart = () => {
        const { storyParts } = this.state;
        const newParts = [ ...storyParts, { textPartId: -1, textPart: '', storyId: -1 } ]
        this.setState({ storyParts: newParts })
    }

    handleSave = async () => {
        const { title, storyParts, description, picture } = this.state;
        if (title.trim() == '' || storyParts.length == 0) {
            return;
        }

        const adat = {
            title: title,
            description: description,
            picture: picture,
        };

        let response = await fetch('http://localhost:3000/story/add-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adat)
      });
    }

    render() {
        const { title, storyParts, description, picture } = this.state;

        return <div>
            <button onClick={this.handleSave}>Mentés</button>
            <h3>Cím:</h3>
            <input type="text" placeholder="Cím" value={ title }/>
            <h3>Leírás:</h3>
            <input type="text" placeholder="Leírás" value={ description }/>
            <h3>Index kép:</h3>
            <input type="text" placeholder="Kép URL-je" value={ picture }/>
            <h3>Szöveg hozzáadása: </h3>
            {
                storyParts.map(part => {
                    const { textPart } = part;
                    return <input type="text" placeholder="Szöveg" value={ textPart } />
                })
            }

            <button onClick={this.handleNewTextPart}>Új szöveg</button>
            
        </div>
    }
}
