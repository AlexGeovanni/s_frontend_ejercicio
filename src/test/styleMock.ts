// Mock de estilos para Jest.
// Evita errores al importar CSS Modules dentro de componentes.
export default {};
const styles = new Proxy(
  {},
  {
    get: (_, property) => String(property),
  },
);

export default styles as Record<string, string>;
