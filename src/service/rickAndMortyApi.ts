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