'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

import { cn, cnJoin } from '@/utils/formatting';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchParamsQuery = searchParams.get('q') || '';

  const [ inputText, setInputText ] = useState(searchParamsQuery);

  useEffect(() => {
    if (inputText !== searchParamsQuery) {
      setInputText(searchParamsQuery);
    }
  }, [searchParamsQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    searchInput.blur();
    
    router.push(`/?q=${inputText.trim()}`);
  };

  const handleCrossButton = () => {
    setInputText('');
    router.push(`/?v=queries`);
  };

  return (
    <form className={twForm} autoComplete="off" onSubmit={handleSubmit}>

      <div className={twContainer}>
        <input
          className={twInput}
          id="searchInput"
          name="searchInput"
          type="text"
          placeholder="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {inputText ? (
          <button type="button" className={cn(twClearButton)} onClick={handleCrossButton}>
            <X className={twButtonIcon} />
          </button>
        ) : (
          <button type="submit" className={cn(twSearchButton)} disabled={!inputText}>
            <Search className={twButtonIcon} />
          </button>
        )}
      </div>
    </form>
  );
}

const twForm = cnJoin(
  'w-full px-4 flex flex-row justify-center',
);

const twContainer = cnJoin(
  'relative text-center',
  'w-full lg:w-[450px] xl:w-[600px]'
);

const twInput = cn(
  'w-full h-9 py-2 px-3',
  'text-sm font-medium',
  'bg-white/80 rounded-md ring-black/20',
  'placeholder:font-normal',
  'focus-visible:bg-white ',
  'c-input-ring',
  'c-input-placeholder',
);

const twButton = cnJoin(
  'absolute top-[2px] right-[0px] h-8 w-10 px-1.5 py-2',
  'inline-flex items-center justify-center',
  'bg-transparent rounded-sm',
  'text-sm font-medium',
);

const twButtonIcon = cnJoin(
  'w-4 h-4'
);

const twSearchButton = cn(
  twButton,
  'text-black/30',
);

const twClearButton = cn(
  twButton,
  'text-black/80'
);
