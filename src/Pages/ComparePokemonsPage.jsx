import React, { useEffect, useState } from 'react'


export default function ComparePokemonsPage() {
    const [pokemon1, setPokemon1] = useState('');
    const [pokemon2, setPokemon2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});


    const setToState = (callback, json) => {
        callback({
            name: json.name,
            abilities: json.abilities.map(ability => ability.ability.name),
            height: json.height,
            weight: json.weight,
            image: json.sprites.other.home.front_shiny,
            hp: json.stats[0].base_stat  + ' (effort: ' + json.stats[0].effort + ')',
            attack: json.stats[1].base_stat + ' (effort: ' + json.stats[1].effort + ')',
            defense: json.stats[2].base_stat + ' (effort: ' + json.stats[2].effort + ')',
            speed: json.stats[5].base_stat + ' (effort: ' + json.stats[5].effort + ')',
            types: json.types.map(type => type.type.name)
        });
    }


    const comparingPokemons = async (e) => {
        
        e.preventDefault()
        if (pokemon1 === '' || pokemon2 === '') return;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}`);
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}`);
        console.log(response);

        if (response.status === 200) {
            const json = await response.json();
            setToState(setData1, json);
        } else {
            alert('Pokemon 1 not found');
        }

        if (response2.status === 200) {
            const json2 = await response2.json();
            setToState(setData2, json2);
        } else {
            alert('Pokemon 2 not found');
        }

        setIsLoading(false);
        
    }



    return (
        <div className='compareContainer'>
            <input onChange={(e) => setPokemon1(e.target.value)} type="text" placeholder='pokemon 1' />
            <input onChange={(e) => setPokemon2(e.target.value)} type="text" placeholder='pokemon 2' />
            <button onClick={(e) => comparingPokemons(e)} className='compareBtn'>Compare!</button>
            {isLoading ? <p className='loading'>Loading...</p> :
                <div className='compareResults'>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Pokemon 1</th>
                                <th>Pokemon 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Image</td>
                                <td><img className='individualImg' src={data1.image} alt={data1.name} /></td>
                                <td><img className='individualImg' src={data2.image} alt={data2.name} /></td>
                            </tr>
                                
                            {Object.keys(data1).map(key => {
                                console.log(Array.isArray(data1[key]));
                                return (key !== 'image' && (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{Array.isArray(data1[key]) ? data1[key].join(', ') : data1[key]}</td>
                                    <td>{Array.isArray(data2[key]) ? data2[key].join(', ') : data2[key]}</td>
                                </tr>

                                ))})}
                            </ tbody>

                    </table>
                   
                </div>}
        </div>
    )
}
