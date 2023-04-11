import s from "./styles.module.scss";
import moment from "moment-timezone";

interface TabWeatherInfoProps {
  day: number;
  temp: number;
  icon: string;
  tzinfo: string;
}

export const TabInfoNow = (props: TabWeatherInfoProps) => {
  const { day, temp, icon, tzinfo } = props;
  const date = moment(day * 1000)
    .tz(tzinfo)
    .format();
  const time = date.substr(11, 5);

  return (
    <div className={s.tab}>
      <div className={s.title}>
        <h3>Сейчас</h3>
        <h4>{time}</h4>
        <div className={s.temp}>
          <p>{temp}°</p>
        </div>
      </div>
      <img src={icon} alt={"weather_icon"} />
    </div>
  );
};
