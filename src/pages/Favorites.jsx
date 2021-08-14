import React from 'react';
import Card from '../components/Card';
import {AppContext} from '../App';

function Favorites({onAddToFavorites, onAddCard}) {
    const {favorites} = React.useContext(AppContext);
    
    return(
        <div>
            <h1>Favorites Crosi</h1>
            <div className="content-box">
            {favorites.map((obj, index) => (
                <Card
                    key={index}
                    onFavoriteClick={(addedCards)=>onAddToFavorites(addedCards)}
                    onAddCard={(addedCards)=>onAddCard(addedCards)}
                    favorited={true}
                    { ... obj}
                />
            ))}
            </div>
        </div>
    );
}

export default Favorites;