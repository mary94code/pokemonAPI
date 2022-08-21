import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function PokemonCard({ item, setAllFavoritesState, allFavoritesState, pokemonId }) {
    const id = pokemonId || item.url.split('/')[6];
    const [isFavourite, setIsFavourite] = useState(allFavoritesState.some(item => item.id === id));

    const heartHandleClick = () => {
        if (isFavourite) {
            const newFavourites = allFavoritesState.filter(item => item.id !== id);
            if(!pokemonId) {
                setIsFavourite(false);
            }
            localStorage.setItem('favourites', JSON.stringify(newFavourites));
            setAllFavoritesState(newFavourites)
        } else {
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`
            const newFavourites = [...allFavoritesState, { id, name: item.name, image }];
            localStorage.setItem('favourites', JSON.stringify(newFavourites));
            setIsFavourite(true);
            setAllFavoritesState(newFavourites);
        }
    }
    const heartImage = isFavourite ? 'redHeart.svg' : 'blackHeart.svg';

    return (
        <div className='card_container'>

            <h3>{item.name}</h3>
            <img className='like_heart' src={`./images/${heartImage}`} onClick={() => heartHandleClick()} alt="" />
            <img className='main_img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`} alt="" />
            <NavLink className='about_link' to={`/pokemon/${id}`}>About</NavLink>
        </div>

    )
}
