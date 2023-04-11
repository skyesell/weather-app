import cn from "classnames";
import s from "./styles.module.scss";

interface TabWeatherInfoProps {
  day: string;
  temp_min: number;
  temp_max: number;
  icon: string;
  day_week: string;
}
const dayWeekObj: { [key: string]: string } = {
  0: "Вс",
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
};

export const TabInfo = (props: TabWeatherInfoProps) => {
  const { day, temp_max, temp_min, icon, day_week } = props;
  const current = day.split(".");

  const week_day = dayWeekObj[new Date(day_week).getDay()];

  return (
    <div className={s.tab}>
      <div>
        <h4
          className={cn(s.title, {
            [s.weekend]: week_day === "Вс" || week_day === "Сб",
          })}
        >
          {day}, {week_day}
        </h4>
        <div className={s.temp}>
          <p>
            {temp_min}°...{temp_max} °
          </p>
        </div>
      </div>
      <img src={icon} alt={"weather_icon"} />
    </div>
  );
};
