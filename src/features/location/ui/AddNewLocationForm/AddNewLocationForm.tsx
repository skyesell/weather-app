import { useAppDispatch } from "../../../../app/store/store";
import s from "./styles.module.scss";
import { addCurrentWeather, createLocation } from "../../../../shared/actions";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import React from "react";

type FormT = {
  lat: string;
  lon: string;
};

export const AddNewLocationForm = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<FormT>();
  const navigate = useNavigate();
  const onSubmit = (form: FormT) => {
    const { lon, lat } = form;
    dispatch(createLocation({ lat: +lat, lon: +lon }));
    dispatch(addCurrentWeather({ lat: +lat, lon: +lon }));
    navigate("/weather-app");
  };

  return (
    <div className={s.wrapper}>
      <p> Введите координаты:</p>
      <Form className={s.form} onFinish={onSubmit}>
        <Form.Item name="lat" label="Широта" rules={[{ required: true }]}>
          <Input className={s.input} type="number" placeholder="широта" />
        </Form.Item>
        <Form.Item name="lon" label="Долгота" rules={[{ required: true }]}>
          <Input type="number" placeholder="долгота" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Поиск
        </Button>
      </Form>
    </div>
  );
};
