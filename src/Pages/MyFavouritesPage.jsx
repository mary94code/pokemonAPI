import React, { useState } from 'react'
import PokemonCard from '../Components/PokemonCard';

export default function MyFavourites() {

  const favouritesLS = JSON.parse(localStorage.getItem('favourites')) ?? [];
  const [allFavorites, setAllFavorites] = useState(favouritesLS);
 


  return (
    <div>
      <h1>Favourite Pokemons</h1>
      <div className='favouritePokemonsContainer'>
        {allFavorites.length === 0 &&
         <div className='noFavourites'>
          <h2>You have no favourite Pokemons</h2>
          <img src="./images/tongueOut.svg" alt="" />
        </div>}
        {allFavorites.map((item, key) => <PokemonCard pokemonId={item.id} item={item} setAllFavoritesState={setAllFavorites} allFavoritesState={allFavorites} key={key} />)}
      </div>
    </div>
  )
}
