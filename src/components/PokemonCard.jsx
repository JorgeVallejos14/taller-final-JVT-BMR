function PokemonCard({ pokemon, esFavorito, onToggleFavorito }) {
  return (
    <div className="card">
      <button
        className={`fav-btn ${esFavorito ? 'active' : ''}`}
        onClick={() => onToggleFavorito(pokemon.id)}
        aria-label="Marcar favorito"
      >
        {esFavorito ? '★' : '☆'}
      </button>
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <p className="card-name">{pokemon.name}</p>
    </div>
  );
}

export default PokemonCard;