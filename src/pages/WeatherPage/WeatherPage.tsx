import { Button, Form, Input, Spin, Tabs } from "antd";
import { WeatherCardNow } from "../../features/weather/ui/WeatherCardNow/WeatherCardNow";
import { WeatherCard } from "../../features/weather/ui/WeatherCard/WeatherCard";
import { TabInfo } from "../../entities/weather/ui/TabInfo/TabInfo";
import { TabInfoNow } from "../../entities/weather/ui/TabInfoNow/TabInfoNow";
import s from "./styles.module.scss";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { RootState, useAppDispatch } from "../../app/store/store";
import React from "react";
import { LocationLayout } from "../../app/layouts/LocationLayout";
import { addWeatherToList } from "../../shared/actions";

const conditionTranslate: { [key: string]: string } = {
  clear: "Ясно",
  "partly-cloudy": "Малооблачно",
  cloudy: "Облачно с прояснениям",
  overcast: "Пасмурно",
  drizzle: "Морось",
  "light-rain": "Небольшой дождь",
  rain: "Дождь",
  "moderate-rain": "Умеренно сильный дождь",
  "heavy-rain": "Сильный дождь",
  "continuous-heavy-rain": "Длительный сильный дождь",
  showers: "Ливень",
  "wet-snow": "Дождь со снегом",
  "light-snow": "Небольшой снег",
  snow: "Снег",
  "snow-showers": "Снегопад",
  hail: "Град",
  thunderstorm: "Гроза",
  "thunderstorm-with-rain": "Дождь с грозой",
  "thunderstorm-with-hail": "Гроза с градом",
};
type FormT = {
  name: string;
};

export const WeatherPage = () => {
  const dispatch = useAppDispatch();
  const { geoWeather, weatherLoading } = useSelector((state: RootState) => state.weather);
  const { currentLocation, geolocationLoading, accessLocation } = useSelector((state: RootState) => state.location);

  console.log(weatherLoading, "loading");
  const getCurrentDay = (day: string) => {
    const current = day.split("-");

    return current[2] + "." + current[1] + "." + current[0];
  };

  const itemFirst = geoWeather
    ? [
        {
          label: (
            <TabInfoNow
              day={geoWeather.fact.now}
              temp={geoWeather.fact.temp}
              tzinfo={geoWeather.fact.tzinfo}
              icon={"https://yastatic.net/weather/i/icons/funky/dark/" + geoWeather.fact.icon + ".svg "}
            />
          ),
          key: "0",
          children: (
            <WeatherCardNow
              {...geoWeather.fact}
              icon={"https://yastatic.net/weather/i/icons/funky/dark/" + geoWeather.fact.icon + ".svg "}
              condition={conditionTranslate[geoWeather.fact.condition]}
            />
          ),
        },
      ]
    : [];

  const itemsForecats = geoWeather
    ? geoWeather.forecasts.map((forecast, i) => {
        return {
          label: (
            <TabInfo
              temp_min={forecast.temp_min}
              temp_max={forecast.temp_max}
              icon={"https://yastatic.net/weather/i/icons/funky/dark/" + forecast.icon + ".svg "}
              day={getCurrentDay(forecast.date)}
              day_week={forecast.date}
            />
          ),
          key: String(i + 1),
          children: (
            <WeatherCard
              {...forecast}
              icon={"https://yastatic.net/weather/i/icons/funky/dark/" + forecast.icon + ".svg "}
              condition={conditionTranslate[forecast.condition]}
              date={getCurrentDay(forecast.date)}
            />
          ),
        };
      })
    : [];

  const items = itemFirst.concat(itemsForecats);

  const [form] = Form.useForm<FormT>();
  const onSubmit = (form: FormT) => {
    console.log(form.name);
    if (currentLocation) {
      dispatch(
        addWeatherToList({
          name: form.name,
          lat: currentLocation.lat.toString(),
          lon: currentLocation.lon.toString(),
          locationId: nanoid(),
        })
      );
    }
  };

  return (
    <LocationLayout>
      {weatherLoading || geolocationLoading ? (
        <Spin className={s.spin} size="large">
          <div className="content" />
        </Spin>
      ) : items.length ? (
        <>
          <Tabs className={s.tabs} defaultActiveKey="1" type="card" size="middle" items={items} />
          <Form className={s.form} form={form} onFinish={onSubmit}>
            <Form.Item name="name" label="Название" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить локацию
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        !accessLocation && (
          <div className={s.settings_location}>
            <p>Вы запретили доступ к геолокации</p>
            <p> Следуйте инструкциям ниже, чтобы разрешить доступ, а после обновите страницу</p>
            <ol>
              <li>Перейдите в настройки браузера</li>
              <li>Выберите пункт "Конфиденциальность и безопасность" затем "Настройки сайтов</li>
              <li>Нажмите Геоданные. </li>
              <li>
                Выберите настройку, которая будет действовать по умолчанию. Чтобы изменить настройки для отдельного
                сайта, задайте исключения.
              </li>
              <li>Обновите страницу</li>
            </ol>
          </div>
        )
      )}
    </LocationLayout>
  );
};
