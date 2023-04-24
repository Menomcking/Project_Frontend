import { Component } from "react";

interface State {
    storyParts: string[],
    usersId: number|undefined,
    id: number|undefined,
    rating: number,
    title: string,
    description: string,
    picture: string,
}

interface Props {
    authToken: string;
    storyId?: number;
}


export default class NewStory extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            storyParts: [ '' ],
            usersId: undefined,
            id: undefined,
            rating: 0,
            title: '',
            description: '',
            picture: ''
        }
    }

    async componentDidMount() {
        if (this.props.storyId !== undefined) {
            const response = await fetch(`http://localhost:3000/story/get-story/${this.props.storyId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.authToken,
                },
            });

            const data = await response.json();

            const { title, description, picture, storyparts } = data;

            const formattedStoryParts = storyparts.map((part: { textPart: string }) => part.textPart);

             this.setState({
                title: title,
                description: description,
                picture: picture,
                storyParts: formattedStoryParts,
            });
             
            
        }
    }

    handleNewTextPart = () => {
        const { storyParts } = this.state;
        const newParts = [ ...storyParts, '' ]
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
            textPart: storyParts,
        };

        let response = await fetch('http://localhost:3000/story/add-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.authToken,
        },
        body: JSON.stringify(adat)
        });
    }

    render() {
        const { title, storyParts, description, picture } = this.state;

        return <div>
            <button onClick={this.handleSave}>Mentés</button>
            <h3>Cím:</h3>
            <input type="text" placeholder="Cím" value={ title } onChange={(e) => this.setState({ title: e.target.value })}/>
            <h3>Leírás:</h3>
            <input type="text" placeholder="Leírás" value={ description } onChange={(e) => this.setState({ description: e.target.value })}/>
            <h3>Index kép:</h3>
            <input type="text" placeholder="Kép URL-je" value={ picture } onChange={(e) => this.setState({ picture: e.target.value })}/>
            <h3>Szöveg hozzáadása: </h3>
            {
                storyParts?.map((part, index) => {
                    const value = typeof part === 'string' ? part : '';
                    return (
                            <input 
                            type="text" 
                            placeholder="Szöveg" 
                            value={String(part)} 
                            onChange={(e) => {
                                const newStoryParts = [...storyParts];
                                newStoryParts[index] = e.target.value;
                                this.setState({ storyParts: newStoryParts });
                            }}
                        />
                    )
                })
            }

            <button onClick={this.handleNewTextPart}>Új szöveg</button>
            
        </div>
    }
}
