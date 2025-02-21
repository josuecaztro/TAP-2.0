import React, { useState, useEffect } from "react";
import "../styles/Clock.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [bgClass, setBgClass] = useState("default-bg");

  useEffect(() => {
    const interval = setInterval(() => {
    const currentTime = new Date();
    
    setTime(currentTime);


      const day = currentTime.getDay(); // 0 = Sunday
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      // Default background
      let newBgClass = "default-bg";

      if (day === 0) { // 🟢 Sunday
        if (hours === 15 && minutes >= 30 || (hours >= 16 && hours < 17)) newBgClass = "green-bg"; // Green from 3:30 PM - 5 PM
        if (hours === 17 && minutes >= 0 && minutes < 30) newBgClass = "yellow-flash"; // Yellow from 5 PM - 5:30 PM
        if ((hours === 17 && minutes >= 30) || (hours === 18 && minutes < 30)) newBgClass = "red-flash"; // Red from 5:30 PM - 6:30 PM
      }
      
      else if (day === 3) { // 🟢 Wednesday
        if (hours === 20) newBgClass = "green-bg"; // Green from 8 PM - 9 PM
        if (hours === 21 && minutes < 15) newBgClass = "yellow-flash"; // Yellow from 9 PM - 9:15 PM
        if ((hours === 21 && minutes >= 15) || (hours === 22 && minutes < 15)) newBgClass = "red-flash"; // Red from 9:15 PM - 10:15 PM
      }
      
      else if (day === 6) { // 🟢 Saturday
        if ((hours === 19 && minutes >= 30) || hours === 20) newBgClass = "green-bg"; // Green from 7:30 PM - 9 PM
        if (hours === 21 && minutes < 15) newBgClass = "yellow-flash"; // Yellow from 9 PM - 9:15 PM
        if ((hours === 21 && minutes >= 15) || (hours === 22 && minutes < 15)) newBgClass = "red-flash"; // Red from 9:15 PM - 10:15 PM
      }
      

      setBgClass(newBgClass);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedTime = time.toLocaleTimeString("en-US", options);
  const [mainTime, period] = formattedTime.split(" "); // Splitting time & AM/PM words

  return (
    <div className={`clock-container ${bgClass}`}>
      <div className="clock">
        {mainTime} <span className="am-pm">{period}</span>
      </div>
    </div>
  );
};

export default Clock;
