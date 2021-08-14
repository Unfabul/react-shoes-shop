import React from 'react';
import ContentLoader from "react-content-loader";
import './card.scss';
import {AppContext} from '../../App';

function Card({id, onFavoriteClick, img, name, price, onAddCard, favorited = false, added = false, loading = false}){
    const {isItemAdded} = React.useContext(AppContext);
    
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    console.log(name, isItemAdded(id));

    const itemObj = {id, parentId: id, img, name, price};

    const handlePlus = () => {
        onAddCard(itemObj);
    }

    const handleLike = () => {
        onFavoriteClick(itemObj);
        setIsFavorite(!isFavorite);
    }

    return(
        <div className="content-item">
            {
            loading ? (
            <ContentLoader 
                speed={2}
                width={374}
                height={303}
                viewBox="0 0 374 303"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="5" ry="5" width="374" height="343" />
            </ContentLoader>
            ) : (
            <>
                {onFavoriteClick && (<div className={isFavorite ? 'content-item-favorite added' : 'content-item-favorite'} onClick={handleLike}></div>)}
                <div className="content-item-img">
                    <img src={img} alt=""/>
                </div>
                <span className="content-item-name">{name}</span>
                <div className="content-item-bottom">
                    <span className="content-item-price"><span>{price}</span> grn.</span>
                    {onAddCard && (<button onClick={handlePlus} className={isItemAdded(id) ? 'content-item-btn added' : 'content-item-btn'}>Add</button>)}
                </div>
            </>
            )
        }
            
        </div>
    );
}

export default Card;

