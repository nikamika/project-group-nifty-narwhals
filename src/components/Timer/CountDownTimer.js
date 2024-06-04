import "./datetime.css";
import DateTimeDisplay from "./DateTimeDisplay";
import useCountDown from "./useCountDown";


const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (//a is for style in counting format css file
    <div className="show-counter">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={days <= 3 } />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={days <= 3 } />
      </a>
    </div>
  );
};

const CountDownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);
  //start countdown
  if (days + hours + minutes + seconds <= 0) {//if countdown finish
    return (<ShowCounter
      days={0}//zero is better than warning
      hours={0}
      minutes={0}
      seconds={0}
    />);
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountDownTimer;
