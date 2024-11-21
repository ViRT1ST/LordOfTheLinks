import { useState } from 'react';

import ModalWindow from '@/components/[common-ui]/modal-window';
import QueryFormDelete from './query-form-delete';
import { DbPinnedQuery } from '@/types';

type QueryFormDeleteProps = {
  query: DbPinnedQuery
};

export default function QueryModals({ query }: QueryFormDeleteProps) {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

  return (
    <div>
      {/* <ModalWindow
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        content={<LinkFormEdit link={link} />}
        isOverlayClickDoClose={false}
        isOverlayDarkened={true}
      /> */}

      <ModalWindow
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        content={<QueryFormDelete query={query} />}
        isOverlayClickDoClose={true}
        isOverlayDarkened={true}
      />
    </div>
  );
}
