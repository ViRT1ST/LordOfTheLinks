type MainContentProps = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="w-[1280px] mx-auto px-8 py-6 flex flex-col justify-center">
      {children}
    </main>
  );
}