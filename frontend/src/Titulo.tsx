function Titulo() {
  const name = 'mundo';

  if (name) {
    return <h1>Hola, {name}!</h1>;
  }
  return <h1>Hola, desconocido!</h1>;
}

export default Titulo;
