function PokemonCard({ pokemon, esFavorito, onToggleFavorito, onBloquear }) {
  return (
    <div className="card">
      <div className="card-actions">
        <button
          className={`fav-btn ${esFavorito ? 'active' : ''}`}
          onClick={() => onToggleFavorito(pokemon.id)}
          aria-label="Marcar favorito"
        >
          {esFavorito ? '★' : '☆'}
        </button>
        <button
          className="block-btn"
          onClick={() => onBloquear(pokemon.id)}
          aria-label="Bloquear"
        >
          🚫
        </button>
      </div>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
          }}
      />
      <p className="card-name">{pokemon.name}</p>
    </div>
  );
}

export default PokemonCard;
