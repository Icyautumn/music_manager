import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  const getLesson = async () => {
    const response = await axios({
      method: "GET",
      url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/lesson/{music_school_id} ",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    if (response) {
      const receiver = await response.data;
      console.log(receiver["Items"]);
      // localStorage.setItem("savedEvents", JSON.stringify(receiver["Items"]));
      const events = (receiver["Items"]);
      console.log("hello", events.filter())
      setData(
        events.filter((evt) =>
          labels
            .filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(evt.label)
        )
      );
    }
  };

  // useEffect(() => {
  //   getLesson();
  // }, []);

  useEffect(() => {
    const events = filteredEvents.filter(
      (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((event, i) => (
          <div
            key={i}
            onClick={() => setSelectedEvent(event)}
            className={`bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1`}
          >
            {event.title}<br/>
            Teacher: {event.teacher}<br/>
            student: {event.student}
          </div>
        ))}
      </div>
    </div>
  );
}
