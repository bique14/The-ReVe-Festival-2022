import type { IDateFormat } from "../../useCountdown";

type CountdownProps = IDateFormat;

const Countdown = (props: CountdownProps) => {
  const { days, hours, minutes, seconds } = props;

  const DateText = (props: { text: string }) => {
    const { text } = props;
    return (
      <span className="text-4xl font-bold text-white sm:text-5xl">
        {text ?? "00"}
      </span>
    );
  };
  const DateLabel = (props: { text: string }) => {
    const { text } = props;
    return <span className="mt-1 text-xs text-white sm:text-base">{text}</span>;
  };

  return Boolean(days) ? (
    <div
      className="absolute  top-1/2 left-1/2 w-full text-center sm:w-1/2"
      style={{
        transform: "translate(-50%,-50%)",
      }}
    >
      <h1 className="font-bold text-2xl text-[#b2fa00] mb-6 sm:text-3xl">
        The ReVe Festival 2022 in
      </h1>
      <div className="w-full grid grid-cols-4 text-center">
        <DateText text={days} />
        <DateText text={hours} />
        <DateText text={minutes} />
        <DateText text={seconds} />
        <DateLabel text="day" />
        <DateLabel text="hour" />
        <DateLabel text="minute" />
        <DateLabel text="second" />
      </div>
    </div>
  ) : null;
};

export default Countdown;
