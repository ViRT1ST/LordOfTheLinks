import { Suspense } from 'react';

import PageWrapper from '@/components/common/page-wrapper';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
import LinkList from '@/components/list/link-list';

type HomePageProps = {
  searchParams: {
    search?: string | undefined
    show?: string | undefined
    page?: string | undefined
  }
};

export default function HomePage({ searchParams }: HomePageProps) {  
  const searchQuery = searchParams.search || '';
  const show = searchParams.show || '';
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <PageWrapper >
      <Header />
      <MainContent>
        {/* <Suspense fallback={<div />}> */}
          <LinkList searchQuery={searchQuery} show={show} page={page} />
        {/* </Suspense> */}
      </MainContent>
    </PageWrapper>
  );
}

