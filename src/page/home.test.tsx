import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./home";
import {
  getCharacters,
  searchCharactersByName,
} from "@/service/rickAndMortyApi";

//Reemplaza las funciones reales por funciones falsas
jest.mock("@/service/rickAndMortyApi", () => ({
  __esModule: true,
  getCharacters: jest.fn(),
  searchCharactersByName: jest.fn(),
}));

jest.mock("@/components/home/HomeSearchToolbar", () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <input
      aria-label="buscar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("@/components/characters/characterList", () => ({
  __esModule: true,
  default: ({
    data,
    loading,
    currentPage,
    setCurrentPage,
  }: {
    data: Array<{ name: string }>;
    loading: boolean;
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }) => (
    <div>
      <p>cantidad: {data.length}</p>
      <p>cargando: {loading ? "si" : "no"}</p>
      <p>pagina: {currentPage}</p>
      <button onClick={() => setCurrentPage(2)}>cambiar pagina</button>
    </div>
  ),
}));

const getCharactersMock = getCharacters as jest.MockedFunction<
  typeof getCharacters
>;
const searchCharactersByNameMock =
  searchCharactersByName as jest.MockedFunction<typeof searchCharactersByName>;

describe("Home", () => {
  // limpia mocks y llamadas anteriores
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe cargar personajes iniciales al montar", async () => {

    //llama a la API y simula respuesta inicial de personajes.
    getCharactersMock.mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: "Rick" } as never],
    });

    //Renderiza la página Home.
    render(<Home />);

    // waitForm espera a la llamada API o cambio de estado
    await waitFor(() => {
      //Verifica que se haga la consulta de la página 1.
      expect(getCharactersMock).toHaveBeenCalledWith(1);

      //Verifica que el listado reciba los datos.
      expect(screen.getByText("cantidad: 1")).toBeInTheDocument();
    });
  });

  
  test("debe buscar por nombre después del debounce", async () => {
    //prepara el entorno de interacción
    const user = userEvent.setup();

    //Simula carga inicial y resultado de búsqueda.
    getCharactersMock.mockResolvedValue({
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    });
    searchCharactersByNameMock.mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 2, name: "Morty" } as never],
    });

    render(<Home />);

    const input = screen.getByLabelText("buscar");

    //Simula escritura real con userEvent.type.
    await user.type(input, "morty");

    await waitFor(
      () => {
        //Verifica que se invoque la búsqueda con texto y página 1.
        expect(searchCharactersByNameMock).toHaveBeenCalledWith("morty", 1);
      },
      //el tiempo de debounce (500ms).
      { timeout: 1500 },
    );
  });

  test("debe volver a consultar cuando cambia de página", async () => {
    const user = userEvent.setup();

    //Simula carga inicial.
    getCharactersMock.mockResolvedValue({
      info: { count: 3, pages: 3, next: "next", prev: null },
      results: [{ id: 1, name: "Rick" } as never],
    });

    //Renderiza Home
    render(<Home />);

    await waitFor(() => {
      expect(getCharactersMock).toHaveBeenCalledWith(1);
    });

    //pulsa el botón de cambio de página del listado mock
    await user.click(screen.getByRole("button", { name: "cambiar pagina" }));

    await waitFor(() => {
      //Verifica que se vuelva a consultar personajes con la nueva página
      expect(getCharactersMock).toHaveBeenCalledWith(2);
    });
  });
});
