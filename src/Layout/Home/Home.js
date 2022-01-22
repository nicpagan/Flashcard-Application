import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";
import { listDecks } from "../../utils/api/index";

function Home () {
    const [decks, setDeck] = useState([]);

    useEffect (() => {
        async function getDeck (){
            const getDeckFromAPI = await listDecks();
            setDeck(getDeckFromAPI)
        }
        getDeck();
    }, []);


    return (
        <div>
        <div className="row mx-auto w-75">
        
         <Link to="/decks/new" className="btn btn-secondary w-25 mb-3">
            Create Deck
            </Link> 
    </div>
    <div className="row w-100 mx-auto flex-column align-items-center">
        {decks.map((deck)=>
         <DeckList
         key ={deck.id}
         deck={deck}
         /> 
        )}
    </div>
    </div>
    );
}

export default Home;