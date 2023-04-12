import { Card } from "antd";
import { WeatherForecastStoreT } from "../../../../shared/api/weather";
import s from "./styles.module.scss";

export const WeatherCard = (props: WeatherForecastStoreT) => {
  const { temp_min, temp_max, temp_avg, feels_like, icon, condition, wind_speed, pressure_mm, humidity, date } = props;

  return (
    <Card className={s.card}>
      <div className={s.block_info_main}>
        <div className={s.info}>
          <div className={s.date}>
            <img src={"/weather-app/icons/day.svg"} alt={"day_icon"} />
            <h2>{date}</h2>
          </div>
          <div className={s.temp_min_max}>
            <div className={s.temp_min}>
              <img src={"/weather-app/icons/temperature-low.svg"} alt={"temp_icon"} />
              <p>
                Минимальная <br />
                температура: <b>{temp_min} °C</b>
              </p>
            </div>
            <div className={s.temp_max}>
              <img src={"/weather-app/icons/temperature-high.svg"} alt={"temp_icon"} />
              <p>
                Максимальная <br />
                температура: <b>{temp_max} °C</b>
              </p>
            </div>
          </div>
          <div className={s.middle_temp}>
            <img src={"/weather-app/icons/temperature-lines.svg"} alt={"temp_icon"} />
            <p>
              Средняя температура за день: <b>{temp_avg} °C</b>
            </p>
          </div>
          <div className={s.feels_temp}>
            <img src={"/weather-app/icons/tabler_temperature.svg"} alt={"temp_icon"} />
            <p>
              Ощущается: <b>{feels_like} °C</b>
            </p>
          </div>
        </div>
        <div className={s.image}>
          <img src={icon} alt={"weather_icon"} />
          <p>{condition}</p>
        </div>
      </div>
      <div className={s.block_info_extra}>
        <div className={s.block}>
          <div className={s.header}>
            <h4>Скорость Ветра</h4>
            <img src={"/weather-app/icons/wind.svg"} alt={"wind_icon"} />
          </div>
          <h3>{wind_speed} м/с</h3>
        </div>
        <div className={s.block}>
          <div className={s.header}>
            <h4>Давление</h4>
            <img src={"/weather-app/icons/pressure.svg"} alt={"pressure"} />
          </div>
          <h3>{pressure_mm} мм рт. ст.</h3>
        </div>
        <div className={s.block}>
          <div className={s.header}>
            <h4>Влажность</h4>
            <img src={"/weather-app/icons/humidity.svg"} alt={"humidity"} />
          </div>
          <h3>{humidity} %</h3>
        </div>
      </div>
    </Card>
  );
};
