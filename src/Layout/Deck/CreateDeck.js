import React, {useState} from "react";
import {Link, useHistory,} from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck(){
    const history =useHistory();
    const [newDeck, setNewDeck] = useState({name:"", description:""})


    const handleSubmit= async (event) =>{
        event.preventDefault()
        const response = await createDeck(newDeck);
        history.push(`/deck/${response.id}`);
    }

    const handleChange=(event)=>{
        setNewDeck({...newDeck,[event.target.name]:event.target.value})
    }
    return (
   
        <div className="col-9 mx-auto">
            {/*Navigation Bar */}
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        {/*link that redirects back to the home page*/}
                        <Link to="/">Home</Link>
                    </li>
                    {/*let users know that they are on the current page*/}
                    <li className="breadcrumb-item"> Create Deck
                    </li>
                </ol>
            </nav>
            {/*form for creating a new deck*/}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h1>Create Deck</h1>
                    <label htmlFor="name">Name</label>
                    <input type="name" 
                    className="form-control" 
                    id="name" 
                    aria-describedby="nameHelp" 
                    placeholder="Deck Name"
                    onChange={handleChange}
                    value={newDeck.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    className="form-control" 
                    id="description" 
                    rows="3" 
                    placeholder="Brief description of the deck"
                    onChange={handleChange}
                    value={newDeck.description}
                    ></textarea>
                </div>
            </form>
            <Link to="/" className="btn btn-secondary mr-3">Cancel</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    
    )
}

export default CreateDeck;