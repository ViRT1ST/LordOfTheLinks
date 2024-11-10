type MainContentProps = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="w-[1200px] mx-auto px-8 pt-16 pb-5 flex flex-col justify-center">
      {children}
    </main>
  );
}