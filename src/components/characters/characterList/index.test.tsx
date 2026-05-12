import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CharacterList from ".";

jest.mock("../characterCard", () => ({
  __esModule: true,
  default: ({
    character,
    setSelectedId,
  }: {
    character: { id: number; name: string };
    setSelectedId: (id: number) => void;
  }) => (
    <button onClick={() => setSelectedId(character.id)}>
      {character.name}
    </button>
  ),
}));

jest.mock("../characterModal", () => ({
  __esModule: true,
  default: ({ id }: { id: number | null }) => (
    <div data-testid="modal-personaje">Modal: {id ?? "sin-seleccion"}</div>
  ),
}));

jest.mock("../pagination", () => ({
  __esModule: true,
  default: ({ onPageChange }: { onPageChange: (page: number) => void }) => (
    <button onClick={() => onPageChange(2)}>Ir a página 2</button>
  ),
}));

jest.mock("@/components/ui/skeleton/characterContentSkeletonCard", () => ({
  __esModule: true,
  CharacterContentCardSkeleton: () => <div>Cargando lista...</div>,
}));


describe("CharacterList", () => {
  const infoBase = { count: 3, pages: 3, next: "next", prev: null };

  test("debe mostrar estado de carga cuando loading es true", () => {
    // Renderiza el listado en estado loading.
    render(
      <MemoryRouter>
        <CharacterList
          loading={true}
          error={null}
          data={[]}
          info={infoBase}
          currentPage={1}
          selectedId={null}
          setSelectedId={jest.fn()}
          setCurrentPage={jest.fn()}
        />
      </MemoryRouter>,
    );
    //Verifica que se vea el skeleton de carga.
    expect(screen.getByText("Cargando lista...")).toBeInTheDocument();
  });

 
  test("debe renderizar personajes y abrir selección al hacer click", async () => {
    const user = userEvent.setup();
    const setSelectedId = jest.fn();
    //Renderiza el listado con datos simulados.
    render(
      <MemoryRouter>
        <CharacterList
          loading={false}
          error={null}
          data={[
            { id: 1, name: "Rick Sanchez" } as never,
            { id: 2, name: "Morty Smith" } as never,
            { id: 3, name: "Summer Smit" } as never,
          ]}
          info={infoBase}
          currentPage={1}
          selectedId={null}
          setSelectedId={setSelectedId}
          setCurrentPage={jest.fn()}
        />
      </MemoryRouter>,
    );
    //Hace click en un personaje.
    await user.click(screen.getByRole("button", { name: "Morty Smith" }));

    //Verifica que setSelectedId reciba el id correcto.
    expect(setSelectedId).toHaveBeenCalledWith(2);

    // Verifica texto de conteo de resultados.
    expect(screen.getByText(/3 resultados/i)).toBeInTheDocument();
  });


  test("debe propagar el cambio de página cuando existe paginación", async () => {
    const user = userEvent.setup();
    const setCurrentPage = jest.fn();
    // Renderiza el listado con paginación activa.
    render(
      <MemoryRouter>
        <CharacterList
          loading={false}
          error={null}
          data={[
            { id: 1, name: "Rick Sanchez" } as never,
            { id: 2, name: "Morty Smith" } as never,
          ]}
          info={infoBase}
          currentPage={1}
          selectedId={null}
          setSelectedId={jest.fn()}
          setCurrentPage={setCurrentPage}
        />
      </MemoryRouter>,
    );
    // Hace click en el botón de cambio de página mockeado.
    await user.click(screen.getByRole("button", { name: "Ir a página 2" }));
    //Verifica que se dispare el callback con la página esperada.
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });
});
