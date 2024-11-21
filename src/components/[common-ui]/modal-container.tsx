'use client'

import { useStore } from '@/store/useStore';
import ModalWindow from '@/components/[common-ui]/modal-window';
import LinkFormDelete from '@/components/links-view/link-form-delete';
import LinkFormEdit from '../links-view/link-form-edit';
import LinkFormCreate from '../links-view/link-form-create';
import LinksControlsSorting from '../links-view/links-controls-sorting';
import QueryFormCreate from '../queries-view/query-form-create';
import QueryItemMenu from '../queries-view/query-item-menu';

export default function ModalContaner() {
  const currentModalWindow = useStore((state) => state.currentModalWindow);
  const currentModalWindowPos = useStore((state) => state.currentModalWindowPos);
  const currentLinkData = useStore((state) => state.currentLinkData);
  const currentQueryData = useStore((state) => state.currentQueryData);

  return (
    <div id="modal-container" className="z-40 absolute top-0 left-0">

      {currentModalWindow === 'link-create' && (
        <ModalWindow
          content={<LinkFormCreate />}
          isOverlayClickDoClose={false}
          isOverlayDarkened={true}
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
        />
      )}

      {currentModalWindow === 'links-sorting-menu' && (
        <ModalWindow
          content={<LinksControlsSorting />}
          isOverlayClickDoClose={true}
          isOverlayDarkened={false}
          isCloseButtonVisible={false}
          positionStyles={currentModalWindowPos}
        />
      )}

      {currentModalWindow === 'query-create' && (
        <ModalWindow
          content={<QueryFormCreate />}
          isOverlayClickDoClose={true}
          isOverlayDarkened={true}
        />
      )}

      {(currentModalWindow === 'query-context-menu') && (
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
