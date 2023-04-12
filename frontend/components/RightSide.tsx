import React, { useEffect, useState } from "react";
import Cancelacion from "./Cancelacion";
import Dashboard from "./Dashboard";
import Oposicion from "./Oposicion";

const RightSide = ({
  option,
  setOption,
}: {
  option: string;
  setOption: (option: string) => void;
}) => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const res = await fetch("https://kueski-users-db.onrender.com/getUsers", {
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
        <Dashboard data={data} setOption={setOption} />
      ) : option === "Cancelación" ? (
        <Cancelacion />
      ) : option === "Oposición" ? (
        <Oposicion />
      ) : null}
    </div>
  );
};

export default RightSide;
