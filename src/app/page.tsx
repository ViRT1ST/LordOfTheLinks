import PageWrapper from '@/components/[common-ui]/page-wrapper';
import Header from '@/components/header/header';
import MainContent from '@/components/[common-ui]/main-content';
import LinksView from '@/components/links-view/links-view';
import QueriesView from '@/components/queries-view/queries-view';

type MainPageProps = {
  searchParams: {
    v?: string | undefined;
    q?: string | undefined;
    page?: string | undefined;
  }
};

export default function MainPage({ searchParams }: MainPageProps) {
  const isQueriesView = searchParams.v !== 'links' && searchParams.q === undefined;

  const query = searchParams.q || '';
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <PageWrapper >
      <MainContent>
      <Header />
        {isQueriesView ? (
          <QueriesView />
        ) : (
          <LinksView query={query} page={page} />
        )}
      </MainContent>
    </PageWrapper>
  );
}

