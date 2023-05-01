import { Component } from "react";
/**
 * storyParts: string tömb, a történet szövegeit tartalmazza
 * usersId: szám, a felhasználó azonosítója
 * id: szám, azonosító
 * rating: szám, a történet értékelése
 * title: string, a történet címe
 * description: string, a történet leírása
 * picture: string, a történethez tartozó kép URL-je
 * isSaved: logikai, mentés sikeres-e vagy sem
 */
interface State {
    storyParts: string[],
    usersId: number|undefined,
    id: number|undefined,
    rating: number,
    title: string,
    description: string,
    picture: string,
    isSaved: boolean,
}
/**
 * authToken: A token ami az autentikációhoz szükséges
 * storyId: A történethez tartozó azonosító
 */
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
            picture: '',
            isSaved: false,
        }
    }
    /**
     * A backenden meghívja a get-story végpontot az aktuális történet id-je alapján
     */
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
    /**
     * Felveszi az újonnan hozzáadott szövegrészeket
     */
    handleNewTextPart = () => {
        const { storyParts } = this.state;
        const newParts = [ ...storyParts, '' ]
        this.setState({ storyParts: newParts })
    }
    /**
     * 
     * @returns Üres cím vagy szövegrészek esetén sikertelen mentés
     */
    handleSave = async () => {
        const { title, storyParts, description, picture, isSaved } = this.state;
        if (title.trim() == '' || storyParts.length == 0) {
          return;
        }
      
        const adat = {
          title: title,
          description: description,
          picture: picture,
          textPart: storyParts,
        };
      /**
       * Ha már létezik az adott id-vel türténet, a backenden meghívja az update-story végpontot az aktuális történet id-je alapján
       */
        let response;
        if (this.props.storyId !== undefined) {
          response = await fetch(`http://localhost:3000/story/update-story/${this.props.storyId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.authToken,
            },
            body: JSON.stringify(adat)
          });
          if (response.ok) {
            this.setState({ isSaved: true });
          }
        } else {
          /**
           * Amennyiben még nem létezik az id, a backenden meghívja az add-story végpontot és újat ad hozzá
           */
          response = await fetch('http://localhost:3000/story/add-story', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.authToken,
            },
            body: JSON.stringify(adat)
          });
          if (response.ok) {
            this.setState({ isSaved: true });
          }
        }
      };
      /**
       * 
       * @returns Megjeleníti azokat az input mezőket, ahol a felhasználó szerkesztheti a történetét
       */
    render() {
        const { title, storyParts, description, picture, isSaved } = this.state;

        return <div>
            <button className="mainButtons" onClick={this.handleSave}>Mentés</button>
            {isSaved && <p style={{color: 'green'}}>Sikeres mentés!</p>}
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
                      <div>
                            <input 
                            type="text" 
                            placeholder="Szöveg" 
                            value={String(part)} 
                            onChange={(e) => {
                                const newStoryParts = [...storyParts];
                                newStoryParts[index] = e.target.value;
                                this.setState({ storyParts: newStoryParts });
                            }}
                            /><br />
                      </div> 
                    )
                })
            }

            <button className="mainButtons" onClick={this.handleNewTextPart}>Új szöveg</button>
            
        </div>
    }
}
