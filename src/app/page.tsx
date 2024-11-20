import { Suspense } from 'react';

import PageWrapper from '@/components/common/page-wrapper';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
import LinkList from '@/components/list/link-list';
import PinnedQueriesList from '@/components/list/pq-list';

type HomePageProps = {
  searchParams: {
    v?: string | undefined
    q?: string | undefined
    page?: string | undefined
  }
};

export default function HomePage({ searchParams }: HomePageProps) {
  const showLinks = searchParams.v === 'links';
  const query = searchParams.q || '';
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <PageWrapper >
      
      <MainContent>
      <Header />
          {showLinks || query ? (
            <LinkList query={query} page={page} />
          ) : (
            <PinnedQueriesList />
          )}
      </MainContent>
    </PageWrapper>
  );
}

