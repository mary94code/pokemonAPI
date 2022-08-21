import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function CharacterDetailed() {
    const { id } = useParams();

    const favouritesLS = JSON.parse(localStorage.getItem('favourites')) ?? [];
    const [isFavourite, setIsFavourite] = useState(favouritesLS.some(item => item.id === id));

    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState(1);

    const [pokemon, setPokemon] = useState({});
    const [moves, setMoves] = useState({})
    const [about, setAbout] = useState({})

    useEffect(() => {
        setIsLoading(true);
        const getPokemonDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const json = await response.json();
            setPokemon({
                id: json.id,
                name: json.name,
                abilities: json.abilities.map(item => item.ability.name),
                moves: json.moves[0].move.name,
                weight: json.weight,
                height: json.height,
                home: json.sprites.other.home.front_shiny,
                image: json.sprites.front_default,
                hp: json.stats[0].base_stat + ' (effort: ' + json.stats[0].effort + ')',
                attack: json.stats[1].base_stat + ' (effort: ' + json.stats[1].effort + ')',
                defense: json.stats[2].base_stat + ' (effort: ' + json.stats[2].effort + ')',
                speed:  json.stats[5].base_stat + ' (effort: ' + json.stats[5].effort + ')',
                types: json.types.map(item => item.type.name),
            });
            console.log(json);
            setIsLoading(false);

        }
        getPokemonDetails();

        const getPokemonMoves = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/move/${id}/`);
            const json = await response.json();
            setMoves({
                moveName: json.name,
                moveAccuracy: json.accuracy,
                movePower: json.power,
                moveCombos: json.damage_class.name
            });
        }
        getPokemonMoves();

        const getPokemonAbout = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
            const json = await response.json();
            setAbout({
                about: json.flavor_text_entries[0].flavor_text,
                base_happiness: json.base_happiness,
                is_baby: json.is_baby,
                is_mythical: json.is_mythical,
                colour: json.color.name,
                varieties: json.varieties[0].pokemon.name
            });
        }
        getPokemonAbout();

    }, [])

    const heartHandleClick = () => {
        if (isFavourite) {
            const newFavourites = favouritesLS.filter(item => item.id !== id);
            setIsFavourite(false);
            localStorage.setItem('favourites', JSON.stringify(newFavourites));
        } else {
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`
            const newFavourites = [...favouritesLS, { id, name: pokemon.name, image }];
            localStorage.setItem('favourites', JSON.stringify(newFavourites));
            setIsFavourite(true);
        }
    }

    const heartImage = isFavourite ? 'redHeart.svg' : 'blackHeart.svg';

    return (
        <div>
            {!isLoading && (
                <div className='detailedContainer'>
                    <div className='small_info'>
                        <h1>{pokemon.name}</h1>

                        <img onClick={() => heartHandleClick(pokemon.id)} className='heart' src={`./images/${heartImage}`} alt="" />
                        <img className='individualImg' src={pokemon.home} alt={pokemon.name} />
                        <div className='abilitiesContainer'>
                            <h2>Abilities</h2>
                            <div className='abilitiesContainer_small'>
                                {pokemon.abilities.map((item, key) => <p key={key}>{item}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="aboutContainer">
                        <div className="tabs">
                            {['About', 'Stats', 'Moves'].map((tab, key) => (
                                <h2 key={key} style={{ cursor: "pointer" }} className={currentTab === key + 1 ? 'active_tab' : ''} onClick={() => setCurrentTab(key + 1)}>{tab}</h2>
                            ))}
                        </div>
                        <div className="info">
                            {currentTab === 1 && (

                                <div >
                                    <p>About this pokemon:
                                        <br />{about.about}</p>
                                    <p>Base happiness: {about.base_happiness}</p>
                                    <p>Colour: {about.colour}</p>
                                    <p>Weight: {pokemon.weight}</p>
                                    <p>Height: {pokemon.height}</p>

                                </div>
                            )}

                            {currentTab === 2 && (
                                <div>
                                    <p>HP: {pokemon.hp}</p>
                                    <p>Attack: {pokemon.attack}</p>
                                    <p>Defense: {pokemon.defense}</p>
                                    <p>Type: {pokemon.types.join(', ')}</p>
                                </div>
                            )}

                            {currentTab === 3 && (
                                <div>
                                    <p>Move: {moves.moveName}</p>
                                    <p>Move accuracy: {moves.moveAccuracy}</p>
                                    <p>Move power: {moves.movePower}</p>
                                    <p>Move combos: {moves.moveCombos}</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
