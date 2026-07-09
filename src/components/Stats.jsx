function Stats({ total, favoritosCount, bloqueadosCount }) {
  return (
    <div className="stats">
      <span>Total: <strong>{total}</strong></span>
      <span>Favoritos: <strong>{favoritosCount}</strong></span>
      <span>Bloqueados: <strong>{bloqueadosCount}</strong></span>
    </div>
  );
}

export default Stats;