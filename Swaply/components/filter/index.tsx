import { useCloseModal } from "@/hooks/useCloseModal";
import CustomModal from "../modals/CustomModal";

export default function Filter({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: Function;
}) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={342}
      endLimit={100}
    ></CustomModal>
  );
}
