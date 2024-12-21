'use client';

import { useRouter, useSearchParams  } from 'next/navigation';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

import { cn, cnJoin } from '@/utils/formatting';

export default function FormSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ inputText, setInputText ] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputElement = e.currentTarget.children[0] as HTMLInputElement;
    inputElement.blur();
    
    router.push(`/?q=${inputText.trim()}`);
  };

  const handleCrossButton = () => {
    setInputText('');
    router.push(`/?v=queries`);
  };

  return (
    <form className={twForm} autoComplete="off" onSubmit={handleSubmit}>
      <input
        className={twInput}
        placeholder="Search"
        type="text"
        name="query"
        // autoFocus={true}
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
    </form>
  );
}

const twForm = cnJoin(
  'relative self-center',
  // 'font-medium'
);

const twInput = cnJoin(
  // 'border-0 border-transparent', //bg-white //border-[#b9b9b9]
  // 'border-[#bebebe] transition-all',
// 'focus:border-neutral-600',

  'w-[600px] h-9 py-2 px-3',
  'rounded-md ', 
  'text-sm   font-inter',
  'placeholder:text-neutral-500',
  'outline outline-1 outline-black/20',

  'bg-[#f9f9f9] ',

  'focus:outline-black/80',
  'focus:outline-2',
  'focus:bg-white'
);

const twSearchButton = cnJoin(
  'absolute top-[2px] right-[0px] h-8 w-10 px-1.5 py-2',
  'inline-flex items-center justify-center',
  'bg-transparent rounded-sm',
  'text-neutral-400 text-sm font-medium',
);

const twClearButton = cn(
  twSearchButton,
  'text-neutral-800'
);

const twButtonIcon = cnJoin(
  'w-4 h-4'
);