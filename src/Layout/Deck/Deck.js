import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { deleteCard, readDeck } from '../../utils/api/index.js'
import { deleteDeck } from '../../utils/api/index.js'


function Deck() {
    const [deck, setDeck] = useState([])
    const {deckId} = useParams()
    const history = useHistory()
    const { url } = useRouteMatch()
    const { id, name, description, cards } = deck

    useEffect(() => {
        const abortController = new AbortController()
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)
        }
        deckInfo()
        return () => abortController.abort()
    }, [deckId])

    // create a handler for the delete button
    const deleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")) {
          await deleteDeck(id)
          history.push('/')
        } else {
            history.go(0)
        } 
    }

    if (!deck || !cards) {
        return (
            <div className="spinner-border text-primary" role="status">
               <span className="sr-only">
                   Loading...
               </span>
            </div>
    )} else {

        return (
            <div className="col-9 mx-auto">

                {/* a navigation bar with the following links */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">

                        {/* a link to the home page */}
                        <li className="breadcrumb-item">
                            <Link to={"/"}>

                                Home
                            </Link>
                        </li>

                        {/* a string containing the deck's name */}
                        <li 
                        className="breadcrumb-item">
                            {name}
                        </li>
                    </ol>

                </nav>
                

                <div className="card border-0 mb-4">
                    <div className="card-body">
                        {/* deck name */}
                        <div className="row px-3">
                            <h5 className="card-title">
                                {name}
                            </h5>
                        </div>

                        {/* deck description */}
                        <p className="card-text">
                            {description}
                        </p>


                        <div className="row px-3">

                            {/* edit button */}
                            <Link 
                                to={`/decks/${id}/edit`} 
                                className="btn btn-secondary">
                                Edit
                            </Link>

                            {/* study button */}
                            <Link 
                                to={`/decks/${id}/study`} 
                                className="btn btn-primary ml-3">
                                    Study
                            </Link>

                            {/* add cards button */}
                            <Link 
                                to={`/decks/${id}/cards/new`} 
                                className="btn btn-primary ml-3">
                                    Add Cards
                            </Link>

                            {/* delete button */}
                            <button 
                                onClick={deleteHandler} 
                                name="delete" value={id} 
                                className="btn btn-danger ml-auto">
                                    Delete
                            </button>
                       
                        </div>

                    </div>
                </div>

                {/* a container containing all cards, including their front, back
                an edit button, and a delete button */}

                <div className="row pl-3 pb-2">
                    <h1>
                        Cards
                    </h1>
                </div>

                {cards.map((card, index) => 
                    <div className="row" key={index}>
                        <div className="col">
                            <div className="card">
                                <div className="row card-body">

                                    {/* front */}
                                    <p className="col-6 card-text">
                                        {card.front}
                                    </p>

                                    {/* back */}
                                    <p className="col-6 card-text">
                                        {card.back}
                                    </p>
                                </div>

                                <div className="d-flex justify-content-end p-4">
                                    {/* edit button */}
                                    <Link 
                                        to={`${url}/cards/${card.id}/edit`} 
                                        className="btn btn-secondary">
                                            <i className="fa fa-edit" 
                                            aria-hidden="true">
                                            </i> 
                                        Edit
                                    </Link>

                                    <button 
                                        onClick={async () => {
                                            if (window.confirm("Are you sure you want to delete this card? You will not be able to recover it.")) {
                                                await deleteCard(card.id)
                                                history.go(0)
                                        } else {
                                            history.go(0)
                                        } 
                                    }} 
                                        name="deleteCard" 
                                        value={card.id} 
                                        className="btn btn-danger ml-3">
                                           Delete
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
}

export default Deck;