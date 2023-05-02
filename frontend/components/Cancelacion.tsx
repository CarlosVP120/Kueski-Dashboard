import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import styles from "../styles/Form.module.css";

const Cancelacion = () => {
  const [search, setSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [cancelacion, setCancelacion] = useState("");

  const name = auth.currentUser?.email
    ?.split("@")[0]
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  const handleSubmit = () => {
    setCancelacion(cancelacion);

    console.log(cancelacion);
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
          <div className="flex flex-row items-center pd-2 gap-2">
            <div className={`${styles.input_group} !max-w-[400px]`}>
              <input
                placeholder="Search"
                className={styles.input_text}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <span className="icon flex items-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 !cursor-default"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={`w-6 h-6 ${
                isHovered ? "text-blue-600" : "text-gray-600"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <div className="flex">
              <h1
                className={`${
                  isHovered ? "block" : "hidden"
                } bg-gray-200 px-3 py-1 rounded-xl animate-appearShort`}
              >
                Enter name, email, CURP or RFC
              </h1>
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm w-9/12 mt-6">
            Por medio del presente y atendiendo a los derechos ARCO con los que
            cuenta el usuario "NombreUsuario" está solicitando la cancelación en
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
