import { useLayoutEffect, useState } from "react";
import { Card } from "./Card";
import { checkingExchange, handleCardclick } from "./utils"

export const Board = () => {
  const [pokemonCard, setCard] = useState<Array<any>>();

  const fetchPokemon = () => {
    const promiseData = new Promise((res) => {
      const pokemons = [];
      for (let i = 1; i <= 16; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        pokemons.push(fetch(url).then((res) => res.json()));
      }
      res(pokemons);
    });

    promiseData.then((data: any) => {
      Promise.all(data).then((results) => {
        const pokemon = results.map((result) => ({
          name: result.name,
          id: result.id,
          base_experience: result.base_experience,
          image: result.sprites["front_default"],
        }));
        setCard(pokemon);
      });
    });
  };

  const handleLoad = async () => {
    await fetchPokemon();
  };

  useLayoutEffect(() => {
    window.addEventListener("load", handleLoad);
  });

  return (
    <div className="m-auto grid grid-rows-2 h-full space-y-8 pb-16">
      <div className="border border-slate-200 p-10">
        <p className="text-xl">Board One</p>
        <p className="p-3">Escolha uma ou mais cartas para trocar</p>
        <div className="grid grid-cols-8 gap-8">
          {pokemonCard?.map((pokeman: any) => (
            <div key={pokeman.id}>
            <Card name={pokeman.name} base_experience={pokeman.base_experience} image={pokeman.image}/>
            <div
              className="bg-slate-200 cursor-pointer text-center py-5"
              onClick={(e) =>
                handleCardclick(e, pokeman.id, pokeman.base_experience)
              }
              id="boardOne"
            >
              Selecionar
            </div>
          </div>          
          ))}
        </div>
      </div>
      <div className="border border-slate-200 p-10">
        <p className="text-xl">Board Two</p>
        <p className="p-3">Escolha uma ou mais cartas para trocar</p>
        <div className="grid grid-cols-8 gap-8">
          {pokemonCard?.map((pokeman: any) => (
            <div key={pokeman.id}>
              <Card name={pokeman.name} base_experience={pokeman.base_experience} image={pokeman.image}/>
              <div
                className="bg-slate-200 cursor-pointer text-center py-5"
                onClick={(e) =>
                  handleCardclick(e, pokeman.id, pokeman.base_experience)
                }
                id="boardTwo"
              >
                Selecionar
              </div>
            </div>          
          ))}
        </div>
      </div>
      <button className="bg-slate-600 py-3 text-white font-bold shadow" onClick={checkingExchange}>
        Calcular Troca
      </button>
    </div>
  );
};
