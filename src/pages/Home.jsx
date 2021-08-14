import React from 'react';
import Card from '../components/Card';


function Home({items, cartItems, searchValue, setsearchValue, onChangeSearchInput, onAddToFavorites, onAddCard, isLoading}) {

    const renderItems = () =>{
        return (isLoading ? [...Array(6)] : items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())))
        .map((obj, index) => (
            <Card
                key={index}
                onFavoriteClick={(addedCards)=>onAddToFavorites(addedCards)}
                onAddCard={(addedCards)=>onAddCard(addedCards)}
                loading={isLoading}
                { ... obj}
            />
        ))
    }

    return(
        <div>
            <h1>{searchValue ? `Search for: ${searchValue}` : 'Top shop'}</h1>
            <form action="/">
                <input onChange={onChangeSearchInput} value={searchValue} type="Search" placeholder="Search..."/>
            </form>
            <div className="content-box">
            {renderItems()}
            </div>
        </div>
    );
}

export default Home;