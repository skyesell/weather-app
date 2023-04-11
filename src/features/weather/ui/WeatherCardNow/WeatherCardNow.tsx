import { Card } from "antd";
import moment from "moment-timezone";
import { WeatherFactT } from "../../../../shared/api/weather";
import s from "./styles.module.scss";

export const WeatherCardNow = (props: WeatherFactT) => {
  const {
    now,
    now_dt,
    tzinfo,
    temp,
    lon,
    lat,
    location,
    feels_like,
    icon,
    condition,
    wind_speed,
    pressure_mm,
    humidity,
  } = props;
  const date = moment(now * 1000)
    .tz(tzinfo)
    .format();
  const time = date.substr(11, 5);

  return (
    <Card className={s.card}>
      <div className={s.block_info_main}>
        <div className={s.info}>
          <div className={s.date}>
            <img src={"public/icons/time.svg"} alt={"time_icon"} />
            <h2>{time}</h2>
          </div>
          <div className={s.location}>
            <div className={s.location_map}>
              <img src={"public/icons/world.svg"} alt={"world_icon"} />
              <h3>
                {!(location.country || location.district || location.province || location.locality)
                  ? "Нет данных о местоположении"
                  : location.country.name}
                {location.province
                  ? ", " + location.province.name
                  : location.locality
                  ? ", " + location.locality.name
                  : location.district
                  ? ", " + location.district.name
                  : ""}
              </h3>
            </div>
            <div className={s.latlon}>
              <img src={"public/icons/map.svg"} alt={"map_icon"} />
              <div>
                <h4>Широта: {lat}</h4>
                <h4>Долгота: {lon}</h4>
              </div>
            </div>
          </div>
          <div className={s.middle_temp}>
            <img src={"public/icons/temperature-lines.svg"} alt={"temp_icon"} />
            <p>
              Температура: <b>{temp} °C</b>
            </p>
          </div>
          <div className={s.feels_temp}>
            <img src={"public/icons/tabler_temperature.svg"} alt={"temp_icon"} />
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
            <img src={"/public/icons/wind.svg"} alt={"wind_icon"} />
          </div>
          <h3>{wind_speed} м/с</h3>
        </div>
        <div className={s.block}>
          <div className={s.header}>
            <h4>Давление</h4>
            <img src={"/public/icons/pressure.svg"} alt={"pressure"} />
          </div>
          <h3>{pressure_mm} мм рт. ст.</h3>
        </div>
        <div className={s.block}>
          <div className={s.header}>
            <h4>Влажность</h4>
            <img src={"/public/icons/humidity.svg"} alt={"humidity"} />
          </div>
          <h3>{humidity} %</h3>
        </div>
      </div>
    </Card>
  );
};
