import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { useAppDispatch } from "../../../../app/store/store";
import { addCurrentWeather, createLocation } from "../../../../shared/actions";
import s from "./styles.module.scss";

type FormT = {
  lat: string;
  lon: string;
};

export const AddNewLocationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [forms] = Form.useForm<FormT>();

  const onSubmit = (form: FormT) => {
    const { lon, lat } = form;
    dispatch(createLocation({ lat: Number(lat), lon: Number(lon) }));
    dispatch(addCurrentWeather({ lat: Number(lat), lon: Number(lon) }));
    forms.resetFields();
    navigate("/weather-app");
  };

  return (
    <div className={s.wrapper}>
      <p> Введите координаты:</p>
      <Form className={s.form} form={forms} onFinish={onSubmit}>
        <Form.Item name="lat" label="Широта" rules={[{ required: true, message: "Заполните поле" }]}>
          <Input className={s.input} type="number" placeholder="широта" />
        </Form.Item>
        <Form.Item name="lon" label="Долгота" rules={[{ required: true, message: "Заполните поле" }]}>
          <Input type="number" placeholder="долгота" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Поиск
        </Button>
      </Form>
    </div>
  );
};
