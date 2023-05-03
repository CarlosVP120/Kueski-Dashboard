import React, { useEffect, useState } from "react";
import Row from "./Row";
import styles from "../styles/Form.module.css";
import Searchbar from "./Searchbar";

const OposicionBody = ({}: {}) => {
  const [isHovered, setIsHovered] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [cancelacion, setCancelacion] = useState("");
  const [tempUser, setTempUser] = useState();

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

  const handleSubmit = () => {
    fetch(
      "http://localhost:3001/api/v1/users/" + (currentUser as any)["user_id"],
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        alert("Cancelación registrada");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al registrar la oposición");
      });

    fetch("http://localhost:3001/api/v1/logs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: (currentUser as any)["user_id"],
        right_type: "C",
        message: cancelacion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al registrar la oposición");
      });
    setSearch("");
    setCurrentUser(undefined);
  };

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mt-6 ml-6">
        <h1 className="font-bold pb-2 text-gray-600">Selecciona un usuario:</h1>
        {/* Search Bar */}
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
          setTempUser={setTempUser}
          tempUser={tempUser}
        />

        {/* Divider */}
        <div className="w-full border-b border-gray-300 mt-3"></div>
        {currentUser !== undefined && currentUser["is_client"] == "0" ? (
          <>
            <div className="animate-appearShort">
              <p className="text-gray-600 text-sm w-9/12 mt-6">
                Por medio del presente y atendiendo a los derechos ARCO con los
                que cuenta el usuario &quot;NombreUsuario&quot; está solicitando
                la cancelación en el uso de su personal datos.
              </p>

              <p className="text-gray-600 text-sm mt-2 font-bold">
                Motivo por el que el usuario solicita la cancelación:
              </p>
            </div>

            <div className="w-full flex flex-col pt-4 ml-2 mb-6 animate-appearShort">
              <textarea
                className="w-[97%] h-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-100 resize-none"
                placeholder="Escribe aquí..."
                value={cancelacion}
                onChange={(e) => {
                  setCancelacion(e.target.value);
                }}
              ></textarea>

              <button
                className="w-1/4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4 animate-appearShort"
                onClick={() => handleSubmit()}
              >
                Enviar
              </button>
            </div>
          </>
        ) : currentUser !== undefined && currentUser["is_client"] == "1" ? (
          <>
            <div className="flex justify-center items-center animate-appearShort">
              <h1 className="font-bold text-lg pb-2 text-red-600 mt-20">
                El usuario seleccionado es un cliente, por lo que no se puede
                realizar la cancelación.
              </h1>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center animate-appearShort">
            <h1 className="font-bold text-xl pb-2 text-gray-600 mt-20">
              Seleccione un usuario para poder realizar la cancelación.
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default OposicionBody;
