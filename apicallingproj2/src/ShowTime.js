import { useState } from "react";
import "./ShowTime.css";
export default function ShowTime() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClick = () => {
    setLoading(true);
    setData(null);
    getDateTime();
  };
  function getDateTime() {
    fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP Error. The Status is ${response.status}`
          );
        }
        return response.json;
      })
      .then((actualData) => {
        let today = new Date(actualData.datetime);
        setData(today);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <h2>Get Current Date And Time In India</h2>
      <button onClick={handleClick}>Get Date And Time</button>
      <br />
      {loading && <span>A momemt Please...</span>}
      {error && <div>{`There is Some Problem fetching ${error}`}</div>}
      <p>
        {data && (
          <h3>{data.toDateString() + " , " + data.toLocaleTimeString()}</h3>
        )}
      </p>
    </>
  );
}
