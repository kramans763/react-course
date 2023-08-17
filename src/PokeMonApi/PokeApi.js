import React, { useEffect, useState } from 'react'
import './PokeApi.css';

function PokeApi() {
    const[selectedPokemon ,setSelectedPokemon]=useState();
    const[pokeMonChoice,setPokeMonChoice]=useState("");
    console.log(selectedPokemon,"debugg");

    function convertJsonToRelaventData(data){
         const{id,name,weight,height,abilities}=data;

         const abilitiesString=abilities.map(ability=>{
            return ability.ability.name;
         }).join(", ")

         return{
            id,
            name,
            weight,
            height,
            abilitiesString,
         };

    }
    function pokeMonSelection(event){
        const value=event.target.value;
        setPokeMonChoice(value);
    }
    const url=`https://pokeapi.co/api/v2/pokemon/${pokeMonChoice}`;
    useEffect(()=>{
        fetch(url)
        .then((response) => response.json())
        .then((data)=>{
            if(!pokeMonChoice){

            }else{
            const selectedData=convertJsonToRelaventData(data);
            setSelectedPokemon(selectedData);
            }
        })
    },[pokeMonChoice])

  return (
    <>
        <h1>Select option</h1>
        <select onChange={(event)=>pokeMonSelection(event)}>
            <option>Select any option</option>
            <option value='ditto'>Ditto</option>
            <option value='bulbasaur'>Bulbasaur</option>
            <option value='pikachu'>Pikachu</option>
        </select>

     <div className='card'>
        <div>Name: {selectedPokemon? selectedPokemon.name : ""}</div>
        <div>Weight: {selectedPokemon? selectedPokemon.weight :""}</div>
        <div>Height: {selectedPokemon? selectedPokemon.height: ""}</div>
        <div>Ability: {selectedPokemon? selectedPokemon.abilitiesString :""}</div>
        
     </div>
    </>
  )
}

export default PokeApi