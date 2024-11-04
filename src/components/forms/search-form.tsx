'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/utils/classes';

export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('searchQuery') as string;
    router.push(`/?search=${searchQuery.trim()}`);
  };

  return (
    <form className={twForm} autoComplete="off" onSubmit={handleSubmit}>
      <input
        className={twInput}
        placeholder="Search links by title, url or tags"
        type="text"
        name="searchQuery"
      />
      <button type="submit" className={twSubmitButton}>
        Search
      </button>
    </form>
  );
}

const twForm = cn(
  'w-[800px]',
  'flex flex-row gap-x-3 justify-center items-center self-center',
);

const twInput = cn(
  'w-[600px] h-10 py-2 px-3',
  'text-sm bg-white placeholder:text-neutral-500',
  'rounded-md border-2 border-[#b2b2b2]',
  'outline-none'
);

const twSubmitButton = cn(
  'h-10 px-4 py-2',
  'inline-flex items-center justify-center',
  'bg-black/10 rounded-md border-2 border-[#b2b2b2]',
  'text-black/80 text-sm font-medium'
);