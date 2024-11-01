import { Suspense } from 'react';

import SearchForm from '@/components/search-form';
import LinkList from '@/components/link-list';
import PageWrapper from '@/components/page-wrapper';
import Modal from '@/components/modal-component';


import { addLink } from '@/lib/prisma/queries';

type HomePageProps = {
  searchParams: {
    search: string | undefined
  }
};

export default function HomePage({ searchParams }: HomePageProps) {  
  const searchQuery = searchParams.search || '';

  return (
    <PageWrapper >

      <div className="mx-auto w-[1280px] pt-20 flex flex-col justify-center">
        <SearchForm />

        <Suspense fallback={<p>Loading...</p>}>
          <LinkList searchQuery={searchQuery} />
        </Suspense>
      </div>
    </PageWrapper>
  );
}

