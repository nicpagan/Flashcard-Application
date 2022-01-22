import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home/Home";
import CreateDeck from "./Deck/CreateDeck";
import Deck from "./Deck/Deck";
import Study from "./Study/Study";
import EditDeck from "./Deck/EditDeck";
import AddCard from "./Deck/AddCard";
import EditCard from "./Deck/EditCard";
import NotFound from "./NotFound";



function Layout() {
  return (
    <div className="Layout">
      <Header />
      {/* TODO: Implement the screen starting here */}
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route path="/decks/:deckId" exact>
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
              <AddCard/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </div>
  );
}

export default Layout;
