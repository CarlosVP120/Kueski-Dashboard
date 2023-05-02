import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import styles from "../styles/Form.module.css";
import Searchbar from "./Searchbar";

const Cancelacion = () => {
  const [isHovered, setIsHovered] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [cancelacion, setCancelacion] = useState("");

  async function Load() {
    // const res = await fetch("https://kueski-users-db.onrender.com/getUsers", {
    const res = await fetch("http://localhost:3001/api/v1/users", {
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

  useEffect(() => {
    (async () => await Load())();
  }, []);

  const name = auth.currentUser?.email
    ?.split("@")[0]
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  const handleSubmit = () => {
    setCancelacion(cancelacion);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between p-6 gap-2 animate-appear">
        <h1 className="text-3xl font-bold ">
          Bienvenid@ <span className="text-blue-600">{name}</span>
        </h1>
        <h2 className="text-2xl font-bold">Cancelación</h2>
        <div className="w-full flex flex-col pt-4">
          <h1 className="font-bold pb-2 text-gray-600">
            Selecciona un usuario:
          </h1>
        </div>
        <div>
          <Searchbar
            data={data}
            search={search}
            setSearch={setSearch}
            setShowSuggestions={setShowSuggestions}
            setCurrentUser={setCurrentUser}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            showSuggestions={showSuggestions}
            currentUser={currentUser}
          />
        </div>

        <div>
          <p className="text-gray-600 text-sm w-9/12 mt-6">
            Por medio del presente y atendiendo a los derechos ARCO con los que
            cuenta el usuario NombreUsuario está solicitando la cancelación en
            el uso de su personal datos.
          </p>

          <p className="text-gray-600 text-sm mt-2 font-bold">
            Motivo por el que el usuario solicita la cancelación:
          </p>
        </div>

        <div className="w-full flex flex-col pt-4">
          <textarea
            className="w-9/12 h-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-100 resize-none"
            placeholder="Escribe aquí..."
            value={cancelacion}
            onChange={(e) => {
              setCancelacion(e.target.value);
            }}
          ></textarea>

          <button
            className="w-1/4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
            onClick={() => handleSubmit()}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default Cancelacion;
