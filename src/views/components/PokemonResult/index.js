import React, { useCallback, useEffect, useState } from "react";
import API from "../../../services/API";
import "./styles.css";

export default function PokemonResult(props) {
    const [pokemonData, setPokemonData] = useState();
    const pokemonUrl = props.url;
    const changeData = props.dataChangerFn;

    const fetchPokemonData = useCallback( async () => {
        await API.get(pokemonUrl).then(result => {
            setPokemonData(result.data);
        }).catch(e => console.error(e));
    }, [pokemonUrl]);

    useEffect(() => {
        fetchPokemonData();
    }, [fetchPokemonData]);

    return(
        <>
        {   pokemonData ?
            <li className="listItem" onClick={() => changeData(pokemonData)}>
                <img src={pokemonData.sprites.front_default} alt="Pokémon"/>
                <h2>{pokemonData.name}</h2>
            </li>
            :
            ""
        }
        </>
    );
}