import type { Character, InfoPage } from "@/types/character";

const BASE_URL="https://rickandmortyapi.com/api/character"

export interface CharactersResponse {
  info: InfoPage
  results: Character[];
}

export const getCharacters = async (page:number=1): Promise<CharactersResponse> => {
  const response = await fetch(
     `${BASE_URL}?page=${page}`
  );

  const data: CharactersResponse = await response.json();

  return data;
};

export const getCharactersById = async (id:number): Promise<Character> => {
  const response = await fetch(
    `${BASE_URL}/${id}`
  );
  if(response.status !=200) throw new Error()
  const data = await response.json();

  return data;
};

export const searchCharactersByName = async (
  name: string,
  page: number = 1,
): Promise<CharactersResponse> => {
  const q = encodeURIComponent(name.trim());
  const response = await fetch(
    `${BASE_URL}/?name=${q}&page=${page}`,
  );

  if (response.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }

  if (!response.ok) {
    throw new Error("Error buscando personajes");
  }

  const data: CharactersResponse = await response.json();

  return data;
};


export const getFavoritesCharacters = async (ids: number[]): Promise<Character[]> => {
  if (ids.length === 0) return [];

  const res = await fetch(
    `${BASE_URL}/${ids.join(",")}`
  );
  
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
};