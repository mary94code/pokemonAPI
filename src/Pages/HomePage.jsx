import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import PokemonCard from '../Components/PokemonCard';


export default function HomePage() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonName, setPokemonName] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  const favouritesLS = JSON.parse(localStorage.getItem('favourites')) ?? [];
  const [allFavorites, setAllFavorites] = useState(favouritesLS);

  const limit = 12;

  useEffect(() => {
    if(isFiltering) {
      return 
    }
    setIsLoading(true);
    const getData = async () => {
      const offset = (currentPage - 1) * limit;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const json = await response.json();
      setData(json);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    getData();
  }, [currentPage])

  const searchBtn = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`);
    if (response.status !== 200) {
      alert('Not found')
      return
    }
    setIsFiltering(true);
    const json = await response.json();
    setData({results: [{name: json.name, url: json.location_area_encounters}]});
    setCurrentPage(-1);
  }

  const resetBtn = () => {
    setIsFiltering(false);
    setPokemonName('');
    setCurrentPage(1);
  }

  return (
    <div>
      <div className='searchContainer'>
        <input
          type="search"
          className='search_input'
          placeholder='search for a pokemon!'
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)} />
        <button className='searchBtn' onClick={() => searchBtn()}>Search</button>
        {isFiltering && <button className='searchBtn' onClick={() => resetBtn()}>Show all pokemons</button>}
      </div>

      <h1>Choose your Pokemon</h1>

      {!isLoading && (
        <>
          <div className='individual_cards_container'>
            {data.results.map((item, key) => <PokemonCard item={item} setAllFavoritesState={setAllFavorites} allFavoritesState={allFavorites} key={key} />)}
          </div>
          {!isFiltering && (

            <div className="buttons">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1}>-</button>
              {currentPage}
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={data.count <= currentPage * limit}>+</button>
            </div>
          )}

        </>
      )}
    </div>
  )
}
