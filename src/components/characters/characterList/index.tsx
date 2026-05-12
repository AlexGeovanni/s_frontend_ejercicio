import styles from "./characterList.module.css";
import type { Character, InfoPage } from "@/types/character";
import CharacterModal from "../characterModal";
import Pagination from "../pagination";
import CharacterCard from "../characterCard";
import { CharacterContentCardSkeleton } from "@/components/ui/skeleton/characterContentSkeletonCard";
import StatusMessage from "@/components/ui/statusMessage";
import { useLocation } from "react-router-dom";

interface Props {
  loading: boolean;
  error: string | null;
  data: Character[];
  info: InfoPage | null;
  currentPage: number;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  setCurrentPage: (page: number) => void;
}

export default function CharacterList({
  loading,
  error,
  data,
  info,
  currentPage,
  selectedId,
  setSelectedId,
  setCurrentPage,
}: Props) {
  const location = useLocation();
  const isFavorites = location.pathname === "/favorites";
  return (
    <>
      <div className={styles.headerList}>
        <h2>Personajes</h2>
        {info && !loading && data.length > 0 && (
          <p>
            {info?.count ?? 0} resultado{(info?.count ?? 0) !== 1 ? "s" : ""} —
            Página {currentPage} de {info?.pages ?? 0}
          </p>
        )}
      </div>
      {loading && <CharacterContentCardSkeleton />}
      {!loading && !data.length && !error && (
        <StatusMessage
          variant="empty"
          title={`No se encontraron personajes ${isFavorites ? "favoritos" : ""}`}
        />
      )}
      {!loading && error && (
        <StatusMessage
          variant="error"
          title="No se pudo cargar la lista"
          description="Hubo un problema al conectar con la API. Revisa tu conexión e inténtalo de nuevo más tarde."
        />
      )}
      {!loading && !error && data.length > 0 && (
        <>
          <div className={styles.contentList}>
            {data.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                setSelectedId={setSelectedId}
              />
            ))}
          </div>
          <Pagination
            info={info}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      <CharacterModal id={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
}
