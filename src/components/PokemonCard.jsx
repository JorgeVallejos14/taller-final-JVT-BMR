function PokemonCard({ pokemon }) {
  return (
    <div className="card">
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <p className="card-name">{pokemon.name}</p>
    </div>
  );
}

export default PokemonCard;