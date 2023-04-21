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

  useEffect(() => {
    (async () => await Load())();
  }, []);

  useEffect(() => {
    if (update) {
      (async () => await Load())();
      setUpdate(false);
    }
  }, [update]);

  async function Load() {
    // const res = await fetch("https://kueski-users-db.onrender.com/getUsers", {
    const res = await fetch("http://localhost:5000/getUsers", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setData(result.data);
  }

  return (
    <div className="w-4/5 bg-white rounded-l-3xl p-3">
      {option === "Dashboard" ? (
        <Dashboard data={data} setOption={setOption} setUpdate={setUpdate} />
      ) : option === "Cancelación" ? (
        <Cancelacion />
      ) : option === "Oposición" ? (
        <Oposicion />
      ) : option === "Historial" ? (
        <Historial />
      ) : null}
    </div>
  );
};

export default RightSide;
