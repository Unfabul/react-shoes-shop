import React from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setsearchValue] = React.useState('');
    const [cartOpen, setCartOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        // fetch('https://60d8a92eeec56d0017477421.mockapi.io/items').then((res)=>{
        //     return res.json();
        // }).then((json)=>{
        //     setItems(json);
        // });
        // https://60d8a92eeec56d0017477421.mockapi.io/cart
        async function fetchData(){
            // axios.get('https://60d8a92eeec56d0017477421.mockapi.io/items').then(res=>{setItems(res.data)});
            // axios.get('https://60d8a92eeec56d0017477421.mockapi.io/cart').then(res=>{setCartItems(res.data)});
            // axios.get('https://60d8a92eeec56d0017477421.mockapi.io/favorites').then(res=>{setFavorites(res.data)});
            try {
                setIsLoading(true);
                const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
                    axios.get('https://60d8a92eeec56d0017477421.mockapi.io/cart'),
                    axios.get('https://60d8a92eeec56d0017477421.mockapi.io/favorites'),
                    axios.get('https://60d8a92eeec56d0017477421.mockapi.io/items')
                ]);
                // const cartResponse = await axios.get('https://60d8a92eeec56d0017477421.mockapi.io/cart');
                // const favoriteResponse = await axios.get('https://60d8a92eeec56d0017477421.mockapi.io/favorites');
                // const itemsResponse = await axios.get('https://60d8a92eeec56d0017477421.mockapi.io/items');

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setFavorites(favoriteResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Error');
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const onAddCard = async (addedCards) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(addedCards.id));
            if(findItem){
                setCartItems((prev) => prev.filter((item)=>Number(item.parentId) !== Number(addedCards.id)));
                await axios.delete(`https://60d8a92eeec56d0017477421.mockapi.io/cart/${findItem.id}`);
            }else{
                setCartItems(prev => [...prev, addedCards]);
                const {data} = await axios.post('https://60d8a92eeec56d0017477421.mockapi.io/cart', addedCards);
                setCartItems((prev) => prev.map(item =>{
                    if(item.parentId === data.parentId){
                        return {
                            ...item,
                            id: data.id
                        };
                    }
                    return item;
                }));
            }
        } catch (error) {
            alert('Не удалось добавить в корзину');
            console.error(error);
        }
        // axios.post('https://60d8a92eeec56d0017477421.mockapi.io/cart', addedCards);
        // setCartItems(prev => [...prev, addedCards]);
    }

    const onRemoveFromCard = (id) => {
        try {
            axios.delete(`https://60d8a92eeec56d0017477421.mockapi.io/cart/${id}`);
            setCartItems(prev => prev.filter(item=>Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Error');
            console.error(error);
        }
    }

    const onAddToFavorites = async (addedCards) => {
        try{
            if(favorites.find(favAddedCards => Number(favAddedCards.id) === Number(addedCards.id))){
                axios.delete(`https://60d8a92eeec56d0017477421.mockapi.io/favorites/${addedCards.id}`);
                setFavorites((prev) => prev.filter((item)=>Number(item.id) !== Number(addedCards.id)));
            }else{
                const {data} = await axios.post('https://60d8a92eeec56d0017477421.mockapi.io/favorites', addedCards);
                setFavorites(prev => [...prev, data]);
            }
        }catch(error){
            alert('Не удалось добавить в избранные');
            console.error(error);
        }
    }

    const onChangeSearchInput = (event) => {
        setsearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some((item)=>Number(item.parentId) === Number(id))
    }

    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, setCartOpen, setCartItems}}>
            <div className="all-box">
                {cartOpen && <Cart cartItems={cartItems} onClose = {() => setCartOpen(false)} onRemoveFromCard={onRemoveFromCard} />}
                <Header onClickCart = {() => setCartOpen(true)} />
                <main>
                    <div className="content">
                        <div className="wrapper">
                            <Route path="/" exact>
                                <Home
                                    items={items}
                                    cartItems={cartItems}
                                    searchValue={searchValue}
                                    setsearchValue={setsearchValue}
                                    onChangeSearchInput={onChangeSearchInput}
                                    onAddToFavorites={onAddToFavorites}
                                    onAddCard={onAddCard}
                                    isLoading={isLoading}
                                />
                            </Route>
                            <Route path="/favorites" exact>
                                <Favorites onAddToFavorites={onAddToFavorites} onAddCard={onAddCard} />
                            </Route>
                            <Route path="/order" exact>
                                <Orders onAddToFavorites={onAddToFavorites} onAddCard={onAddCard} />
                            </Route>
                        </div>
                    </div>
                </main>
            </div>
        </AppContext.Provider>
    );
}

export default App;
