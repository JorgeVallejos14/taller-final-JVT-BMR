import { useMemo } from 'react';
import { useFetch } from './hooks/useFetch';
import PokemonList from './components/PokemonList';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

function App() {
  const { data, loading, error } = useFetch(API_URL);

  // Transformamos la respuesta de la API en algo simple de usar,
  // agregando el id y la imagen (sprite oficial) de cada pokemon.
  const pokemons = useMemo(() => {
    if (!data) return [];
    return data.results.map((p) => {
      const partes = p.url.split('/').filter(Boolean);
      const id = partes[partes.length - 1];
      return {
        id,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    });
  }, [data]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔴 PokéExplorer</h1>
        <p className="team">Hecho por: Jorge Vallejos y Bastian Maradiaga</p>
      </header>

      <main className="app-main">
        {loading && <p className="status">Cargando pokémon...</p>}
        {error && <p className="status error">Ocurrió un error: {error}</p>}
        {!loading && !error && <PokemonList pokemons={pokemons} />}
      </main>
    </div>
  );
}

export default App;