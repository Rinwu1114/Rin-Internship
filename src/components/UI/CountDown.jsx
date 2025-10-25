import React, { useEffect, useState } from "react";
import axios from "axios";

const CountDown = ({ timeLeft }) => {
  const [remaining, setRemaining] = useState(timeLeft);

  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      setRemaining((prev) => (prev <= 1000 ? 0 : prev - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (remaining <= 0) {
    return null;
  }

  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <span>
      {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`}
    </span>
  );
};
export default CountDown;
