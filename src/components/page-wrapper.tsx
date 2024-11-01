import Header from './header';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full min-h-screen font-geistsans bg-stone-200 z-50" >
      <Header />
      {children}
    </div>
  );
}
