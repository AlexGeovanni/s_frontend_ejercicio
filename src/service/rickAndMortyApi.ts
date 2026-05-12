import type { Character } from "@/types/character";



interface ApiResponse {
  results: Character[];
}

export const getCharacters = async (): Promise<Character[]> => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character"
  );

  const data: ApiResponse = await response.json();

  return data.results;
};

export const getCharactersById = async (id:number): Promise<Character> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  if(response.status !=200) throw new Error()
  const data = await response.json();

  return data;
};