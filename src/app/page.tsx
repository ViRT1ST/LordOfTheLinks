import PageWrapper from '@/components/[common-ui]/page-wrapper';
import Header from '@/components/header/header';
import MainContent from '@/components/[common-ui]/main-content';
import LinksView from '@/components/links-view/links-view';
import QueriesView from '@/components/queries-view/queries-view';
import { type SortingOrderVariants, type DbSettings } from '@/types';
import { getSettings } from '@/server-actions';

type MainPageProps = {
  searchParams: {
    v?: string | undefined;
    q?: string | undefined;
    page?: string | undefined;
    sort?: string | undefined;
  }
};

export default async function MainPage({ searchParams }: MainPageProps) {
  const isQueriesView = searchParams.v !== 'links' && searchParams.q === undefined;

  const query = searchParams.q || null;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const settings = await getSettings();

  let sort: any = searchParams.sort as SortingOrderVariants || null;

  if (!sort) {    
    if (settings) {
      sort = settings.sortLinksBy as SortingOrderVariants || null;
    }
  }

  return (
    <PageWrapper >
      <MainContent>
      <Header settings={settings} />
        {isQueriesView ? (
          <QueriesView />
        ) : (
          <LinksView query={query} page={page} sort={sort} />
        )}
      </MainContent>
    </PageWrapper>
  );
}

