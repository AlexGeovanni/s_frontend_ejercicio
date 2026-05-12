import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavoritesHeader from ".";

describe("FavoritesHeader", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <FavoritesHeader/>
      </MemoryRouter>
    );
  };

  test("renderiza correctamente título, link de volver a inicio", () => {
    renderComponent();

    expect(
      screen.getByText(/Favoritos/i)
    ).toBeInTheDocument();

   
    const link = screen.getByRole("link", {
      name: /Volver/i,
    });
    
    expect(link).toHaveAttribute("href", "/");
  });
});