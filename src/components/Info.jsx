import React from 'react';
import {AppContext} from '../App';

const Info = ({title, description}) => {
    const {setCartOpen} = React.useContext(AppContext);
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => setCartOpen(false)}>Back</button>
        </div>
    )
}

export default Info;