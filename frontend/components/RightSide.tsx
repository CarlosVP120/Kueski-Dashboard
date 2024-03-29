import React, { useEffect, useState } from "react";
import Cancelacion from "./Cancelacion";
import Dashboard from "./Dashboard";
import Oposicion from "./Oposicion";
import Historial from "./Historial";

const RightSide = ({
  option,
  setOption,
}: {
  option: string;
  setOption: (option: string) => void;
}) => {
  const [data, setData] = useState();
  const [update, setUpdate] = useState(false);
  const [loadedUserForRight, setLoadedUserForRight] = useState({});

  useEffect(() => {
    (async () => await Load())();
  }, []);

  useEffect(() => {
    if (update) {
      // Wait 2 seconds before updating the data
      setTimeout(async () => {
        await Load();
      }, 2000);
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    if (option === "Dashboard") {
      (async () => await Load())();
    }
  }, [option]);

  async function Load() {
    // const res = await fetch("https://kueski-users-db.onrender.com/getUsers", {
    console.log("fetching data");
    const res = await fetch(
      "https://kueski-users-db.onrender.com/api/v1/users",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setData(result);
  }

  return (
    <div className="w-4/5 bg-white rounded-l-3xl p-3">
      {option === "Dashboard" ? (
        <Dashboard
          data={data}
          setOption={setOption}
          setUpdate={setUpdate}
          setLoadedUserForRight={setLoadedUserForRight}
        />
      ) : option === "Cancelación" ? (
        <Cancelacion loadedUserForRight={loadedUserForRight} />
      ) : option === "Oposición" ? (
        <Oposicion loadedUserForRight={loadedUserForRight} />
      ) : option === "Historial" ? (
        <Historial />
      ) : null}
    </div>
  );
};

export default RightSide;
