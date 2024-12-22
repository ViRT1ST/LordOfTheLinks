import BodyContainer from '@/components/[body-children]/body-container';
import MainContent from '@/components/[body-children]/main-content';
import Header from '@/components/header/header';
import LinksView from '@/components/links-view/links-view';
import QueriesView from '@/components/queries-view/queries-view';

type MainPageProps = {
  searchParams: {
    v?: string | undefined;
    q?: string | undefined;
    page?: string | undefined;
  }
};

export default async function MainPage({ searchParams }: MainPageProps) {
  const isQueriesView = searchParams.v !== 'links' && searchParams.q === undefined;

  const query = searchParams.q || null;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <BodyContainer >
      <Header />
      <MainContent>
        {isQueriesView ? (
          <QueriesView />
        ) : (
          <LinksView query={query} page={page} />
        )}
      </MainContent>
    </BodyContainer>
  );
}

