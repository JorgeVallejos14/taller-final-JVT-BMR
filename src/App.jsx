import { useMemo, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import FavoritesPanel from './components/FavoritesPanel';
import Stats from './components/Stats';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

function App() {
  const { data, loading, error } = useFetch(API_URL);
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useLocalStorage('pokemon-favoritos', []);
  const [bloqueados, setBloqueados] = useLocalStorage('pokemon-bloqueados', []);
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

  const pokemonsVisibles = useMemo(() => {
    return pokemons
      .filter((p) => !bloqueados.some((b) => b.id === p.id))
      .filter((p) => p.name.toLowerCase().includes(busqueda.toLowerCase()));
  }, [pokemons, busqueda, bloqueados]);

  function toggleFavorito(id) {
    setFavoritos((prev) => {
      const yaEsta = prev.some((f) => f.id === id);
      if (yaEsta) return prev.filter((f) => f.id !== id);
      const pokemon = pokemons.find((p) => p.id === id);
      return pokemon ? [...prev, pokemon] : prev;
    });
  }

  function bloquear(id) {
    setBloqueados((prev) => {
      if (prev.some((b) => b.id === id)) return prev;
      const pokemon = pokemons.find((p) => p.id === id);
      return pokemon ? [...prev, pokemon] : prev;
    });
    // Si estaba en favoritos, se retira automáticamente
    setFavoritos((prev) => prev.filter((f) => f.id !== id));
  }

  function desbloquear(id) {
    setBloqueados((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔴 PokéExplorer</h1>
        <p className="team">Hecho por: [Jorge Vallejos] y [Bastian Madariaga]</p>
      </header>

      <div className="app-body">
        <main className="app-main">
          <SearchBar value={busqueda} onChange={setBusqueda} />
          <Stats
            total={pokemons.length}
            favoritosCount={favoritos.length}
            bloqueadosCount={bloqueados.length}
          />

          {loading && <p className="status">Cargando pokémon...</p>}
          {error && <p className="status error">Ocurrió un error: {error}</p>}
          {!loading && !error && (
            <PokemonList
              pokemons={pokemonsVisibles}
              favoritos={favoritos}
              onToggleFavorito={toggleFavorito}
              onBloquear={bloquear}
            />
          )}

          {bloqueados.length > 0 && (
            <div className="panel blocked-panel">
              <h2>🚫 Bloqueados ({bloqueados.length})</h2>
              <ul className="panel-list">
                {bloqueados.map((p) => (
                  <li key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <span>{p.name}</span>
                    <button onClick={() => desbloquear(p.id)}>Desbloquear</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        <FavoritesPanel favoritos={favoritos} onQuitar={toggleFavorito} />
      </div>
    </div>
  );
}

export default App;