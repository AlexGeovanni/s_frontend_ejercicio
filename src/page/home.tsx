import { useEffect, useState } from "react";
import CharacterList from "@/components/characters/characterList";
import HomeSearchToolbar from "@/components/home/HomeSearchToolbar";
import type { Character, InfoPage } from "@/types/character";
import {
  getCharacters,
  searchCharactersByName,
} from "@/service/rickAndMortyApi";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Character[]>([]);
  const [info, setInfo] = useState<InfoPage | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setCurrentPage(1)
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharaters = async () => {
      setLoading(true)
      try {
        const response = searchQuery
          ? await searchCharactersByName(searchQuery, currentPage)
          : await getCharacters(currentPage);
          setInfo(response.info);
          setData(response.results);
        
      } catch {
          setInfo(null);
          setData([]);
        
      } finally{
        setLoading(false)
      }
    };

    fetchCharaters();
    return () => controller.abort();
  }, [currentPage, searchQuery]);

  return (
    <>
      <HomeSearchToolbar value={searchInput} onChange={setSearchInput} />
      <section>
        <CharacterList
          key={searchQuery}
          loading={loading}
          data={data}
          info={info}
          currentPage={currentPage}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  );
}