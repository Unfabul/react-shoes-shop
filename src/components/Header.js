import React from 'react';
import {Link} from 'react-router-dom';
import {useCart} from '../hooks/useCart';

function Header(props) {
    const {totalPrice} = useCart();

    return(
        <header className="wrapper">
            <div>
                <Link to="/">
                    <img src="/img/logo.jpg" alt="" width="62" height="60" />
                </Link>
            </div>
            <ul>
                <li className="cartt" onClick={props.onClickCart}>Price: <span>{totalPrice}</span></li>
                <li><Link to="/favorites"><span>Favorite</span></Link></li>
                <li><a href="/order">Cabs</a></li>
            </ul>
        </header>
    );
}

export default Header;