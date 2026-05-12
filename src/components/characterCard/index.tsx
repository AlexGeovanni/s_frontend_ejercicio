import type { Character } from "@/types/character";
import styles from "./characterCard.module.css";
import { StarIcon } from "@/icons";

interface Props {
  character: Character;
  setSelectedId:(id:number)=>void
}

export default function CharacterCard({ character,setSelectedId }: Props) {
  const { id,name, image } = character;
  return (
    <div className={styles.contentCard}>
      <div className={styles.contentImg}
      onClick={()=>setSelectedId(id)}
      >
        <figure>
          <img
            className={styles.imgCard}
            src={image}
            alt="Girl in a jacket"
          />
        </figure>
      </div>
      <div>
        <div className={styles.contentInfo}>
          <h2 className={styles.title} onClick={()=>setSelectedId(id)}>{name}</h2>
          <button className={styles.btnCard}><StarIcon className={styles.icon} /></button>
        </div>
      </div>
    </div>
  );
}
