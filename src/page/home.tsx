import CharacterList from '@/components/characterList';
import { getCharacters } from '@/service/rickAndMortyApi';
import { useEffect } from 'react';

export default function Home() {
    useEffect(()=>{
       const getListCharacter = async ()=>{
        const data = await getCharacters();
        console.log(data)
       }
       getListCharacter()
    },[])
  return (
    <section>
      <CharacterList />
    </section>
  );
}