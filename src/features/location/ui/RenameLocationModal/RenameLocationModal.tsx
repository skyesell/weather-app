import {Form, Input, Modal} from "antd";
import { RootState, useAppDispatch } from "../../../../app/store/store";
import s from "./styles.module.scss";
import { useSelector } from "react-redux";
import { changeLocationName } from "../../../../entities/location/model";
import { setOpenModal } from "../../../../app/layouts/model";

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

  const [form] = Form.useForm<FormT>();

  const handleOk = (data: FormT) => {
    dispatch(changeLocationName({ id: locationId, newName: data.name }));
    dispatch(setOpenModal(false));
    form.resetFields()
  };

  const handleCancel = () => {
    dispatch(setOpenModal(false));
    form.resetFields()
  }

  return (
    <Modal
      className={s.modal}
      title="Редактирование локации"
      open={isModalOpen}
      onOk={form.submit}
      cancelText={"Закрыть"}
      okText={"Подтвердить"}
      okButtonProps={{target: "хуй"}}
      onCancel={handleCancel}
    >
      <Form form={form} className={s.form} onFinish={handleOk}>
        <Form.Item name="name" label="Название" rules={[{ required: true, message: "Заполните поле" }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input className={s.input} value={currentLocation?.lat} type="number" disabled={true} placeholder="широта" /></Form.Item>
        <Form.Item>
          <Input value={currentLocation?.lon} className={s.input} disabled={true} type="number" placeholder="долгота" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
