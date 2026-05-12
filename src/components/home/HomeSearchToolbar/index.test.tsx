import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import HomeSearchToolbar from ".";

describe("HomeSearchToolbar", () => {
  const renderComponent = (onChange = jest.fn(), value = "") => {
    return render(
      <MemoryRouter>
        <HomeSearchToolbar value={value} onChange={onChange} />
      </MemoryRouter>,
    );
  };

  test("renderiza correctamente título, input y link de favoritos", () => {
    //Renderiza el componente dentro del router.
    renderComponent();

    //Verifica título y campo de búsqueda.
    expect(
      screen.getByText(/Explorador de personajes de Rick y Morty/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: /Mis Favoritos/i,
    });

    // Verifica que el enlace de favoritos apunte a la ruta correcta.
    expect(link).toHaveAttribute("href", "/favorites");
  });

  test("llama onChange cuando el usuario escribe en el input", async () => {
    const onChange = jest.fn();

    //prepara el entorno de interacción
    const user = userEvent.setup();
    
    //Crea un wrapper controlado para reflejar cambios de value.
    function Wrapper() {
      const [value, setValue] = useState("");

      const handleChange = (nextValue: string) => {
        onChange(nextValue);
        setValue(nextValue);
      };

      return (
        <MemoryRouter>
          <HomeSearchToolbar value={value} onChange={handleChange} />
        </MemoryRouter>
      );
    }

    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Buscar...");

    //Simula escritura real con userEvent.type.
    await user.type(input, "rick");

    //Verifica que onChange reciba el último valor completo.
    expect(onChange).toHaveBeenLastCalledWith("rick");
  });
});
