function FavoritesPanel({ favoritos, onQuitar }) {
  return (
    <aside className="panel">
      <h2>⭐ Favoritos ({favoritos.length})</h2>
      {favoritos.length === 0 && <p className="empty">Sin favoritos aún.</p>}
      <ul className="panel-list">
        {favoritos.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.name} />
            <span>{p.name}</span>
            <button onClick={() => onQuitar(p.id)}>✕</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default FavoritesPanel;