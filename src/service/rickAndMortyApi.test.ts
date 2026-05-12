import {
  getCharacters,
  getCharactersById,
  getFavoritesCharacters,
  searchCharactersByName,
} from "./rickAndMortyApi";

describe("rickAndMortyApi", () => {
  // Mock de la función fetch.
  const fetchMock = jest.fn();
  // beforeEach es una función que se ejecuta antes de cada test.
  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });


  test("debe consultar personajes por página y devolver la respuesta", async () => {
    // Simula una respuesta exitosa de la API.
    const apiResponse = {
      info: { count: 826, pages: 42, next: "next", prev: null },
      results: [{ id: 1, name: "Rick Sanchez" }],
    };

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => apiResponse,
    });

    //Ejecuta la función con una página concreta.
    const page = 1
    const result = await getCharacters(page);

    //Verifica la URL usada en fetch.
    expect(fetchMock).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character?page=1",
    );

    //Comprueba que el resultado sea el esperado.
    expect(result).toEqual(apiResponse);
  });

  test("debe devolver resultados vacíos cuando la búsqueda responde 404", async () => {
    // Simula un 404 al buscar por nombre.
    fetchMock.mockResolvedValue({
      status: 404,
      ok: false,
      json: async () => ({}),
    });

    //Ejecuta la búsqueda.
    const result = await searchCharactersByName("unknown");

    //Comprueba que la función retorna estructura vacía sin lanzar error.
    expect(result).toEqual({
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    });
  });

 
  test("debe lanzar error cuando la búsqueda no responde OK", async () => {
    // Simula error del servidor (status 500).
    fetchMock.mockResolvedValue({
      status: 500,
      ok: false,
      statusText: "Internal Server Error",
      json: async () => ({}),
    });
    //Ejecuta la búsqueda y verifica que se lance el error de dominio esperado.
    await expect(searchCharactersByName("rick")).rejects.toThrow(
      "Error buscando personajes",
    );
  });

  test("debe codificar el texto de búsqueda y enviar la página", async () => {
    // Simula una respuesta exitosa de la API.
    const apiResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: "Rick Sanchez" }],
    };

    fetchMock.mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => apiResponse,
    });

    //Busca un término con espacio y página específica.
    const page = 3;
    await searchCharactersByName("Rick Sanchez", page);

    // Verifica que la URL incluya el texto codificado y la página.
    expect(fetchMock).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character?name=Rick%20Sanchez&page=3",
    );
  });


  test("debe devolver arreglo vacío cuando no hay favoritos", async () => {
    // Ejecuta favoritos con lista vacía.
    const result = await getFavoritesCharacters([]);

    // Verifica que el retorno sea []
    expect(result).toEqual([]);

    //Verifica que no se haga llamada de red.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("debe devolver un arreglo cuando favoritos retorna un solo personaje", async () => {
    // Simula que la API devuelve un solo personaje.
    const singleCharacter = { id: 2, name: "Morty Smith" };

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => singleCharacter,
    });

    //Ejecuta la función con un id.
    const result = await getFavoritesCharacters([2]);

    // Verifica que se haya llamado a la API con el id correcto.
    expect(fetchMock).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character/2",
    );
    // Verifica que el resultado sea el esperado.
    expect(result).toEqual([singleCharacter]);
  });

  test("debe devolver lista cuando favoritos retorna varios personajes", async () => {
    // Simula que la API devuelve varios personajes.
    const characters = [
      { id: 1, name: "Rick Sanchez" },
      { id: 2, name: "Morty Smith" },
    ];

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => characters,
    });

    // Ejecuta la carga con múltiples ids.
    const result = await getFavoritesCharacters([1, 2]);

    // Verifica URL y retorno de la lista completa.
    expect(fetchMock).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character/1,2",
    );
    expect(result).toEqual(characters);
  });


  test("debe lanzar error cuando el detalle por id no responde 200", async () => {
    // Simula una respuesta distinta a 200.
    fetchMock.mockResolvedValue({
      status: 500,
      json: async () => ({}),
    });
    // Ejecuta la búsqueda de detalle por id y verifica que se lance error.
    await expect(getCharactersById(99)).rejects.toThrow();
  });
});
