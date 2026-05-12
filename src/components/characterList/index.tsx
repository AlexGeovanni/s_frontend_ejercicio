import CharacterCard from "@/components/characterCard";
import styles from "./characterList.module.css";
import type { Character, InfoPage } from "@/types/character";
import { useEffect, useState } from "react";
import { getCharacters } from "@/service/rickAndMortyApi";
import CharacterModal from "../characterModal";
import Pagination from "../pagination";

export default function CharacterList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Character[]>([]);
  const [info, setInfo] = useState<InfoPage | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  useEffect(() => {
    const getListCharacter = async () => {
      const data = await getCharacters(currentPage);
      setInfo(data.info);
      setData(data.results);
    };
    getListCharacter();
  }, [currentPage]);
  return (
    <>
      <header className={styles.headerList}>
        <h2>
          Personajes
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {info?.count ?? 0} resultados - Página {currentPage} de{" "}
          {info?.pages ?? 0}
        </p>
      </header>
      <div className={styles.contentList}>
        {data.map((character, i) => (
          <CharacterCard
            key={i}
            character={character}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
      <CharacterModal id={selectedId} onClose={() => setSelectedId(null)} />
      <Pagination
        info={info}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
