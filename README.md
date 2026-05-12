# SNGULAR - Test Front-End

Aplicación Front-End en React para explorar personajes de Rick and Morty, buscar por nombre y gestionar una lista de favoritos.

## Stack

- React + TypeScript
- Vite
- Redux Toolkit
- React Router
- Jest + Testing Library

## Requisitos

- Node.js 18+ (recomendado 20+)
- pnpm

## Instalación

```bash
pnpm install
```

## Scripts disponibles

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Previsualizar build
pnpm preview

# Lint
pnpm lint

# Tests
pnpm test
```

## Funcionalidades principales

- Listado de personajes con paginación.
- Búsqueda por nombre.
- Vista de favoritos.
- Modal de detalle del personaje.

## Estructura básica

```text
src/
  components/   # Componentes reutilizables
  page/         # Vistas principales (Home y Favorites)
  service/      # Lógica de llamadas a API
  store/        # Estado global con Redux Toolkit
  test/         # Setup y utilidades de tests
```

## Testing

El proyecto incluye pruebas unitarias e integración de componentes/páginas con Jest y Testing Library.

Para ejecutar tests:

```bash
pnpm test -- --runInBand 
o
pnpm test 
```
