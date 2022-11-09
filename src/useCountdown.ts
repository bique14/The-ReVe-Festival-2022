import { useState, useEffect, useRef } from "react";
import moment from "moment";

export interface IDateFormat {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const RELEASE_DATE: string = "2022/11/28 18:00:000";

/**
 * Countdown for release a new album
 */
const useCountdown = () => {
  const date = new Date(Date.parse(RELEASE_DATE));
  const _moment = moment(date);

  const [dateFormat, setDateFormat] = useState<IDateFormat>();
  const idx = useRef<any>();
  const [isShowCountdown, setIsShowCountdown] = useState<boolean>(true);

  useEffect(() => {
    initialize();

    idx.current = setInterval(() => {
      const now = moment(new Date());
      const remaining = moment.duration(_moment.diff(now));

      setDateFormat({
        days: remaining.days().toString().padStart(2, "0"),
        hours: remaining.hours().toString().padStart(2, "0"),
        minutes: remaining.minutes().toString().padStart(2, "0"),
        seconds: remaining.seconds().toString().padStart(2, "0"),
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isShowCountdown) clearInterval(idx.current);
  }, [isShowCountdown]);

  const initialize = () => {
    const now = moment(new Date());
    const remaining = moment.duration(_moment.diff(now));

    setDateFormat({
      days: remaining.days().toString().padStart(2, "0"),
      hours: remaining.hours().toString().padStart(2, "0"),
      minutes: remaining.minutes().toString().padStart(2, "0"),
      seconds: remaining.seconds().toString().padStart(2, "0"),
    });
  };

  return { dateFormat, setIsShowCountdown };
};

export default useCountdown;
