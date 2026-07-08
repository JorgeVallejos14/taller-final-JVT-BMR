import PokemonCard from './PokemonCard';

function PokemonList({ pokemons }) {
  if (pokemons.length === 0) {
    return <p className="empty">No hay resultados.</p>;
  }

  return (
    <div className="grid">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}

export default PokemonList;