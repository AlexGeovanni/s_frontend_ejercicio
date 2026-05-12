import CharacterList from '@/components/characterList';
import Header from '@/components/header';

export default function Home() {
  return (
    <>
    <Header />
    <section>
      <CharacterList />
    </section>
    </>
  );
}