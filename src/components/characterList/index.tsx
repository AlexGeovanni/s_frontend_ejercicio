import CharacterCard from "@/components/characterCard";
import styles from "./characterList.module.css";
import type { Character } from "@/types/character";
import { useEffect, useState } from "react";
import { getCharacters } from "@/service/rickAndMortyApi";
import CharacterModal from "../characterModal";
import Pagination from "../pagination";

export default function CharacterList() {
  const [data, setData] = useState<Character[]>([]);
  const [selectedId,setSelectedId]=useState<number | null>(null)
  useEffect(() => {
    const getListCharacter = async () => {
      const data = await getCharacters();
      setData(data);
    };
    getListCharacter();
  }, []);
  return (
    <>
    <div className={styles.contentList}>
      {data.map((character, i) => (
        <CharacterCard key={i} character={character} setSelectedId={setSelectedId} />
      ))}
    </div>
    <CharacterModal id={selectedId} onClose={()=>setSelectedId(null)} />
      <Pagination />
    </>
  );
}
