import LinkFormNew from './link-form-new';
import Modal from './modal-component';
import { addLink } from '@/lib/prisma/queries';

export default function ModalServeContainer({ isModalOpen }: { isModalOpen: boolean }) {

  const submitData = async(linkData: any) => {
    // 'use server'

    console.log(linkData);
  };

  return (
    <Modal show={isModalOpen}>
      <LinkFormNew submitData={submitData} />
    </Modal>
  );
}
