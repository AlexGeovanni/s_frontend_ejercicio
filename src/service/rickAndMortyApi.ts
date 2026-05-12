import type { Character, InfoPage } from "@/types/character";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export interface CharactersResponse {
  info: InfoPage;
  results: Character[];
}

//Error personalizado
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

// Fetch centralizado
async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      `API Error: ${res.status} - ${res.statusText}`,
    );
  }

  return res.json();
}

// Characters paginados
export const getCharacters = (page = 1) =>
  apiFetch<CharactersResponse>(`${BASE_URL}?page=${page}`);

// Character por ID
export const getCharactersById = (id: number) =>
  apiFetch<Character>(`${BASE_URL}/${id}`);

// Search by name
const EMPTY_RESPONSE: CharactersResponse = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

export const searchCharactersByName = async (
  name: string,
  page = 1,
): Promise<CharactersResponse> => {
  const query = encodeURIComponent(name.trim());

  try {
    return await apiFetch<CharactersResponse>(
      `${BASE_URL}?name=${query}&page=${page}`,
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return EMPTY_RESPONSE;
    }

    throw error;
  }
};

// Favorites por IDs
export const getFavoritesCharacters = (ids: number[]) => {
  if (!ids.length) return Promise.resolve([]);

  return apiFetch<Character | Character[]>(`${BASE_URL}/${ids.join(",")}`).then(
    (data) => (Array.isArray(data) ? data : [data]),
  );
};
