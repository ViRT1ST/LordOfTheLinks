import { Suspense } from 'react';

import PageWrapper from '@/components/common/page-wrapper';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
import LinkList from '@/components/list/link-list';
import PinnedQueriesList from '@/components/list/pq-list';

type HomePageProps = {
  searchParams: {
    show?: string | undefined
    query?: string | undefined
    page?: string | undefined
  }
};

export default function HomePage({ searchParams }: HomePageProps) {
  const all = searchParams.show === 'all';
  const query = searchParams.query || '';
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <PageWrapper >
      
      <MainContent>
      <Header />
          {all || query ? (
            <LinkList all={all} query={query} page={page} />
          ) : (
            <PinnedQueriesList />
          )}
      </MainContent>
    </PageWrapper>
  );
}

