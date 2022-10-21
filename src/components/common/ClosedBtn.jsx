import React, { useEffect, useRef, useState } from "react";

function ClosedBtn(props) {
  
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSecounds, setTimerSecounds] = useState("00");
  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(props.date);
    console.log("countdownDate", countdownDate);

    interval = setInterval(() => {
      const now = new Date();
      const distance = countdownDate - now;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secound = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSecounds(secound);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearInterval(interval.current);
    };
  });
  return (
    <>
    {timerSecounds==0?true: false
      
    }</>
  );
}

export default ClosedBtn;
