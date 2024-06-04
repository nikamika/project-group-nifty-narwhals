import React, { useState, useEffect } from "react";
import CountDownTimer from "./CountDownTimer";
import { formatData } from "./dataUtil";
import Form from "react-bootstrap/Form";

function Clock() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [time, setTime] = useState("");//default is empty
  const THREE_DAYS_IN_MS = 0 * 0 * 60 * 60 * 1000;  //Three-day time algorithm
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;//calculate three days time

  const [targetDate, setTargetDate] = useState(
    new Date(dateTimeAfterThreeDays)
  );

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setTargetDate(new Date(event.target.value));
    } else {//time judgement
      setTargetDate(new Date(dateTimeAfterThreeDays));
    }
  };

  useEffect(() => {
    getTime();
  }, [time]);

  const getTime = () => {
    const timeID = setInterval(() => {
      setCurrentTime(Date.now());
      const result = formatData(currentTime);//geting System time
      setTime(result);
      clearInterval(timeID);
    }, 1000);//update gap time
  };

  return (//main return function, it return all the stuff in this component
    <fieldset align="center" style={{ backgroundColor: 'transparent', opacity: 0.8 }} className="toolTheme" >
      <legend style={{ fontSize: '40px' }}>(ง •_•)ง</legend>
      <h1 className="Clock">{time}</h1>
      <div className="countdown-container">
        <Form>
          <Form.Label htmlFor="countdown-date-time">Select your target date & time</Form.Label>
          <Form.Control
            type="datetime-local"
            id="countdown-date-time"
            name="countdown-date-time"
            onChange={handleChange}
          />
        </Form>
        <CountDownTimer style={{ texttransform: 'uppercase', fontsize: '0.75rem', lineheight: '1rem' }} targetDate={targetDate} />
      </div>
    </fieldset>
  )
}

export default Clock;
