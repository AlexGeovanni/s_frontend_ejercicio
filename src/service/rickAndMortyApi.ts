import type { Character, InfoPage } from "@/types/character";

export interface CharactersResponse {
  info: InfoPage
  results: Character[];
}

export const getCharacters = async (page:number=1): Promise<CharactersResponse> => {
  const response = await fetch(
     `https://rickandmortyapi.com/api/character?page=${page}`
  );

  const data: CharactersResponse = await response.json();

  return data;
};

export const getCharactersById = async (id:number): Promise<Character> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  if(response.status !=200) throw new Error()
  const data = await response.json();

  return data;
};

export const searchCharactersByName = async (name: string) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}`
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error buscando personajes");
  }

  const data = await response.json();

  return data.results;
};