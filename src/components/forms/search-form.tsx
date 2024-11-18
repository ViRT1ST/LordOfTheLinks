'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

import { cn, cnJoin } from '@/utils/classes';

export default function SearchForm() {
  const router = useRouter();

  const [ searchText, setSearchText ] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('searchQuery') as string;
    // setSearchText('');
    
    const inputElement = e.currentTarget.children[0] as HTMLInputElement;
    inputElement.blur();
    
    router.push(`/?query=${searchQuery.trim()}`);
  };

  //Search links by title, url or tags
  return (
    <form className={twForm} autoComplete="off" onSubmit={handleSubmit}>
      <input
        className={twInput}
        placeholder="Search"
        type="text"
        name="searchQuery"
        // autoFocus={true}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {searchText ? (
        <button type="button" className={cn(twClearButton)} onClick={() => setSearchText('')}>
          <X className={twButtonIcon} />
        </button>
      ) : (
        <button type="submit" className={cn(twSearchButton)} disabled={!searchText}>
          <Search className={twButtonIcon} />
        </button>
      )}
    </form>
  );
}

const twForm = cnJoin(
  'relative self-center',
  // 'font-medium'
);

const twInput = cnJoin(
  'w-[600px] h-10 py-2 px-3',
  ' rounded-md border-2 border-[#b2b2b2]', //bg-white
  'text-sm outline-0 transition-all',
  'placeholder:text-neutral-500',
  'focus:border-neutral-500',
       'bg-[#f3f2f2]'
);

const twSearchButton = cnJoin(
  'absolute top-1 right-1 h-8 w-10 px-2 py-2',
  'inline-flex items-center justify-center',
  'bg-transparent rounded-sm',
  'text-neutral-400 text-sm font-medium',
);

const twClearButton = cn(
  twSearchButton,
  'text-neutral-500'
);

const twButtonIcon = cnJoin(
  'w-4 h-4'
);