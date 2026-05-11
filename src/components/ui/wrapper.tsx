

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="wrapper">
      {children}
    </main>
  );
}