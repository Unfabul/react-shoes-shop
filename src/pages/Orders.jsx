import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
// import {AppContext} from '../App';

function Orders({onAddToFavorites, onAddCard}) {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async()=>{
            try {
                const {data} = await axios.get('https://60d8a92eeec56d0017477421.mockapi.io/orders');
                // console.log(data.map((obj) => obj.items).flat());
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Error');
                console.error(error);
            }
        })();
    }, []);

    return(
        <div>
            <h1>Cart</h1>
            <div className="content-box">
            {(isLoading ? [...Array(6)] : orders).map((obj, index) => (
                <Card
                    key={index}
                    loading={isLoading}
                    { ... obj}
                />
            ))}
            </div>
        </div>
    );
}

export default Orders;