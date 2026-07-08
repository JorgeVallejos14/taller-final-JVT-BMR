import { useMemo, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

function App() {
  const { data, loading, error } = useFetch(API_URL);
  const [busqueda, setBusqueda] = useState('');

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

  const pokemonsFiltrados = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [pokemons, busqueda]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔴 PokéExplorer</h1>
        <p className="team">Hecho por: Jorge Vallejos y Bastian Maradiaga</p>
      </header>

      <main className="app-main">
        <SearchBar value={busqueda} onChange={setBusqueda} />

        {loading && <p className="status">Cargando pokémon...</p>}
        {error && <p className="status error">Ocurrió un error: {error}</p>}
        {!loading && !error && <PokemonList pokemons={pokemonsFiltrados} />}
      </main>
    </div>
  );
}

export default App;