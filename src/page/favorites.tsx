import CharacterList from "@/components/characters/characterList";
import FavoritesHeader from "@/components/favorites/favoritesHeader";
import { getFavoritesCharacters } from "@/service/rickAndMortyApi";
import { useAppSelector } from "@/store/hook";
import type { Character } from "@/types/character";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 10;

export default function Favorites() {
  const favorites = useAppSelector((state) => state.favorites);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Character[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritesCharaters = async () => {
      setLoading(true);
      try {
        const response = await getFavoritesCharacters(favorites);
        setData(response);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesCharaters();
  }, [favorites]);

  // paginación
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const charactersData = useMemo(() => {
    return data.slice(start, end);
  }, [data, start, end]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <FavoritesHeader />

      <section>
        <CharacterList
          key={"favorite-list"}
          loading={loading}
          data={charactersData}
          info={{
            count: data.length,
            pages: totalPages,
            next: currentPage < totalPages ? "next" : null,
            prev: currentPage > 1 ? "prev" : null,
          }}
          currentPage={currentPage}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setCurrentPage={handlePageChange}
        />
      </section>
    </>
  );
}
