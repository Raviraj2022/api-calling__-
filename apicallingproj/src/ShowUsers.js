import { useState, useEffect } from "react";
import "./Showusers.css";
export default function ShowUsers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          let errorObj = new Error("HTTP Error Occured" + response.status);
          throw errorObj;
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return (
    <div className="Users">
      <h1>List of Users</h1>
      {loading && <div>Loading .Please wait...</div>}
      {error && <div>{`There is  a problem in loading :${error}`}</div>}
      <ul>
        {data &&
          data.map((user) => (
            <li key={user.id}>
              <h2>{user.name}</h2>
              <h2>{user.email}</h2>
              <h2>{user.phone}</h2>
            </li>
          ))}
      </ul>
    </div>
  );
}
