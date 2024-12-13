'use client';

import { useStore } from '@/store/useStore';
import ModalWindow from '@/components/[common-ui]/modal-window';
import LinkFormDelete from '@/components/links-view/link-form-delete';
import LinkFormEdit from '@/components/links-view/link-form-edit';
import LinkFormCreate from '@/components/links-view/link-form-create';
// import LinksControlsSorting from '@/components/links-view/links-controls-sorting';
import QueryFormCreate from '@/components/queries-view/query-form-create';
import QueryFormEdit from '@/components/queries-view/query-form-edit';
import QueryFormDelete from '@/components/queries-view/query-form-delete';
import QueryItemMenu from '@/components/queries-view/query-item-menu';

export default function ModalContaner() {
  const currentModalWindow = useStore((state) => state.currentModalWindow);
  const currentModalWindowPos = useStore((state) => state.currentModalWindowPos);
  const currentLinkData = useStore((state) => state.currentLinkData);
  const currentQueryData = useStore((state) => state.currentQueryData);

  return (
    <div id="modal-container" tabIndex={-1} className="z-40 absolute top-0 left-0">

      {currentModalWindow === 'link-create' && (
        <ModalWindow
          content={<LinkFormCreate />}
          isOverlayClickDoClose={false}
          isOverlayDarkened={true}
          focusOnFirstElement={true}
        />
      )}

      {(currentModalWindow === 'link-update' && currentLinkData?.id) && (
        <ModalWindow
          content={<LinkFormEdit link={currentLinkData} />}
          isOverlayClickDoClose={false}
          isOverlayDarkened={true}
        />
      )}

      {(currentModalWindow === 'link-delete' && currentLinkData?.id) && (
        <ModalWindow
          content={<LinkFormDelete link={currentLinkData} />}
          isOverlayClickDoClose={true}
          isOverlayDarkened={true}
          focusOnFirstElement={true}
        />
      )}

      {/* {currentModalWindow === 'links-sorting-menu' && (
        <ModalWindow
          content={<LinksControlsSorting />}
          isOverlayClickDoClose={true}
          isOverlayDarkened={false}
          isCloseButtonVisible={false}
          positionStyles={currentModalWindowPos}
        />
      )} */}

      {currentModalWindow === 'query-create' && (
        <ModalWindow
          content={<QueryFormCreate />}
          isOverlayClickDoClose={false}
          isOverlayDarkened={true}
          focusOnFirstElement={true}
        />
      )}

      {(currentModalWindow === 'query-update' && currentQueryData?.id) && (
        <ModalWindow
          content={<QueryFormEdit query={currentQueryData} />}
          isOverlayClickDoClose={false}
          isOverlayDarkened={true}
        />
      )}

      {(currentModalWindow === 'query-delete' && currentQueryData?.id) && (
        <ModalWindow
          content={<QueryFormDelete query={currentQueryData} />}
          isOverlayClickDoClose={true}
          isOverlayDarkened={true}
          focusOnFirstElement={true}
        />
      )}

      {currentModalWindow === 'query-context-menu' && (
        <ModalWindow
          content={<QueryItemMenu />}
          isOverlayClickDoClose={true}
          isOverlayDarkened={false}
          isCloseButtonVisible={false}
          positionStyles={currentModalWindowPos}
        />
      )}

    </div>
  );
}
