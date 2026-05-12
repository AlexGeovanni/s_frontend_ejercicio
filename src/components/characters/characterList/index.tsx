import styles from "./characterList.module.css";
import type { Character, InfoPage } from "@/types/character";
import CharacterModal from "../characterModal";
import Pagination from "../pagination";
import CharacterCard from "../characterCard";
import { CharacterContentCardSkeleton } from "@/components/ui/skeleton/characterContentSkeletonCard";
interface Props {
  loading: boolean;
  data: Character[];
  info: InfoPage | null;
  currentPage: number;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  setCurrentPage: (page: number) => void;
}

export default function CharacterList({
  loading,
  data,
  info,
  currentPage,
  selectedId,
  setSelectedId,
  setCurrentPage,
}: Props) {
  return (
    <>
      <div className={styles.headerList}>
        <h2>Personajes</h2>
        {info && (
          <p>
            {info?.count ?? 0} resultado{(info?.count ?? 0) !== 1 ? "s" : ""} —
            Página {currentPage} de {info?.pages ?? 0}
          </p>
        )}
      </div>
      {loading && <CharacterContentCardSkeleton />}
      
      {data.length > 0 && !loading && (
        <div className={styles.contentList}>
          {data.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      )}
      <CharacterModal id={selectedId} onClose={() => setSelectedId(null)} />
      {info && <Pagination
        info={info}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />}
    </>
  );
}
