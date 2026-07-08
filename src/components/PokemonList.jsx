import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, favoritos, onToggleFavorito }) {
  if (pokemons.length === 0) {
    return <p className="empty">No hay resultados.</p>;
  }

  return (
    <div className="grid">
      {pokemons.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          esFavorito={favoritos.some((f) => f.id === p.id)}
          onToggleFavorito={onToggleFavorito}
        />
      ))}
    </div>
  );
}

export default PokemonList;