import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Favorites from "./favorites";
import { getFavoritesCharacters } from "@/service/rickAndMortyApi";
import { useAppSelector } from "@/store/hook";

jest.mock("@/service/rickAndMortyApi", () => ({
  __esModule: true,
  getFavoritesCharacters: jest.fn(),
}));

jest.mock("@/store/hook", () => ({
  __esModule: true,
  useAppSelector: jest.fn(),
}));

jest.mock("@/components/favorites/favoritesHeader", () => ({
  __esModule: true,
  default: () => <h1>Favoritos</h1>,
}));

jest.mock("@/components/characters/characterList", () => ({
  __esModule: true,
  default: ({
    data,
    currentPage,
    info,
    setCurrentPage,
  }: {
    data: Array<{ name: string }>;
    currentPage: number;
    info: { count: number; pages: number };
    setCurrentPage: (page: number) => void;
  }) => (
    <div>
      <p>pagina actual: {currentPage}</p>
      <p>cantidad total: {info.count}</p>
      <p>pagina visibles: {data.length}</p>
      <p>primer nombre: {data[0]?.name ?? "vacio"}</p>
      <button onClick={() => setCurrentPage(2)}>ir pagina 2</button>
    </div>
  ),
}));

const getFavoritesCharactersMock =
  getFavoritesCharacters as jest.MockedFunction<typeof getFavoritesCharacters>;
const useAppSelectorMock = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe("Favorites", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Paso a paso:
   * 1) Simula ids de favoritos en store.
   * 2) Simula respuesta del servicio con esos personajes.
   * 3) Renderiza la página.
   * 4) Verifica llamada al servicio y datos renderizados.
   */
  test("debe cargar favoritos desde el store", async () => {
    useAppSelectorMock.mockImplementation(
      (selector) => selector({ favorites: [1, 2] } as never),
    );
    getFavoritesCharactersMock.mockResolvedValue([
      { id: 1, name: "Rick" } as never,
      { id: 2, name: "Morty" } as never,
    ]);

    render(<Favorites />);

    await waitFor(() => {
      expect(getFavoritesCharactersMock).toHaveBeenCalledWith([1, 2]);
      expect(screen.getByText("cantidad total: 2")).toBeInTheDocument();
      expect(screen.getByText("pagina visibles: 2")).toBeInTheDocument();
    });
  });

  /**
   * Paso a paso:
   * 1) Simula 11 favoritos para forzar 2 páginas (10 + 1).
   * 2) Renderiza la pantalla y valida datos de la primera página.
   * 3) Cambia a página 2.
   * 4) Verifica que solo quede 1 elemento visible.
   */
  test("debe paginar favoritos en bloques de 10 elementos", async () => {
    useAppSelectorMock.mockImplementation(
      (selector) =>
        selector({ favorites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] } as never),
    );
    getFavoritesCharactersMock.mockResolvedValue(
      Array.from({ length: 11 }, (_, i) => ({
        id: i + 1,
        name: `Personaje ${i + 1}`,
      })) as never,
    );

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText("pagina visibles: 10")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole("button", { name: "ir pagina 2" }));

    await waitFor(() => {
      expect(screen.getByText("pagina actual: 2")).toBeInTheDocument();
      expect(screen.getByText("pagina visibles: 1")).toBeInTheDocument();
      expect(screen.getByText("primer nombre: Personaje 11")).toBeInTheDocument();
    });
  });
});
