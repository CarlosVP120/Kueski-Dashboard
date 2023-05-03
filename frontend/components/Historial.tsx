import React, { useState } from "react";

const Historial = () => {
  const [data, setData] = useState({});

  async function Load() {
    // const res = await fetch("https://kueski-users-db.onrender.com/getUsers", {
    const res = await fetch("http://localhost:3001/api/v1/logs", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    // console.log("loaded data", result);
    setData(result);
  }

  return <div>Historial</div>;
};

export default Historial;
