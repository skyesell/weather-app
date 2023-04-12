import { Modal } from "antd";
import { RootState, useAppDispatch } from "../../../../../app/store/store";
import s from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { changeLocationName } from "../../../../../entities/location/model";
import { setOpenModal } from "../../../../../app/layouts/model";
type FormT = {
  name: string;
};
interface ModalProps {
  isModalOpen: boolean;
}
export const RenameLocationModal = (props: ModalProps) => {
  const { isModalOpen } = props;

  const dispatch = useAppDispatch();

  const { locationsList, locationId } = useSelector((state: RootState) => state.location);

  const currentLocation = locationsList.find((location) => location.id === locationId);
  const handleOk = (data: FormT) => {
    console.log("id", locationId);
    dispatch(changeLocationName({ id: locationId, newName: data.name }));
    dispatch(setOpenModal(false));
  };
  const handleCancel = () => dispatch(setOpenModal(false));

  const { register, handleSubmit } = useForm<FormT>();

  return (
    <Modal
      className={s.modal}
      title="Редактирование локации"
      open={isModalOpen}
      onOk={handleSubmit(handleOk)}
      onCancel={handleCancel}
    >
      <form className={s.form} onSubmit={handleSubmit(handleOk)}>
        <input className={s.input} {...register("name", { required: true })} type="text" placeholder="имя" />
        <input className={s.input} value={currentLocation?.lat} type="number" disabled={true} placeholder="широта" />
        <input value={currentLocation?.lon} className={s.input} disabled={true} type="number" placeholder="долгота" />
      </form>
    </Modal>
  );
};
