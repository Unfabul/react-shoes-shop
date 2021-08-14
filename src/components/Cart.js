import React from 'react';
import axios from 'axios';
import Info from '../components/Info';
import {useCart} from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({onClose, onRemoveFromCard}) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);

    const onClickOrder = async () => {
        try {
            const {data} = await axios.post('https://60d8a92eeec56d0017477421.mockapi.io/orders', {
                items: cartItems
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://60d8a92eeec56d0017477421.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Не удалось оформить заказ');
        }
    }

    return(
        <div className="overlay">
            <div className="overlay-cart">
                <div className="overlay-cart-close" onClick={onClose}>Close</div>
                <span className="overlay-cart-name">Cart</span>
                {cartItems.length > 0 ? (
                    <>
                    <div className="overlay-cart-box">
                        {cartItems.map((obj)=>(
                            <div key={obj.id} className="overlay-cart-item">
                                <div className="overlay-cart-item-img">
                                    <img src={obj.img} alt=""/>
                                </div>
                                <div className="overlay-cart-item-info">
                                    <span className="overlay-cart-item-name">{obj.name}</span>
                                    <div className="overlay-cart-item-price"><span>{obj.price}</span> grn.</div>
                                </div>
                                <span onClick={()=>onRemoveFromCard(obj.id)} className="overlay-cart-item-remove">Remove</span>
                            </div>
                        ))}
                    </div>
                    <div className="overlay-cart-confirm">
                        <ul>
                            <li>Full price: <span><span>{totalPrice}</span> grn.</span></li>
                        </ul>
                        <button onClick={onClickOrder} href="/">Confirm order</button>
                    </div>
                    </>
                ) : (
                    <Info title={isOrderComplete ? `Order ${orderId} complete` : "Empty cart"} description={isOrderComplete ? "Wait manager call" : "No items yet"} />
                )}
                
            </div>
        </div>
    );
}

export default Cart;