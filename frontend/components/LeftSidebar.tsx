import React, { useState } from "react";
import { auth } from "../firebase/firebaseClient";
import { useRouter } from "next/router";

const LeftSidebar = ({
  setOption,
  option,
}: {
  setOption: (option: string) => void;
  option: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col bg-black h-full w-1/5 max-w-xs p-3 gap-10">
      {/** Logo */}
      <div className="flex justify-center w-full h-20 mt-4">
        <img
          onLoad={() => setImageLoaded(true)}
          className="animate-appear h-12"
          style={{ display: imageLoaded ? "block" : "none" }}
          src="/whiteLogo.svg"
          alt="Kueski Logo"
        />
      </div>
      {/** Options */}
      <div className="w-full pl-6 pb-4 h-full flex flex-col justify-between animate-appear">
        <div>
          <h1
            className={`${
              option == "Dashboard" ? "text-blue-400" : "text-white"
            } text-2xl font-bold mt-4 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out`}
            onClick={() => setOption("Dashboard")}
          >
            Dashboard
          </h1>
          <h1
            className={`${
              option == "Cancelación" ? "text-blue-400" : "text-white"
            } text-2xl font-bold mt-4 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out`}
            onClick={() => setOption("Cancelación")}
          >
            Cancelación
          </h1>
          <h1
            className={`${
              option == "Oposición" ? "text-blue-400" : "text-white"
            } text-2xl font-bold mt-4 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out`}
            onClick={() => setOption("Oposición")}
          >
            Oposición
          </h1>
        </div>
        <div className="">
          <h1
            className={`${
              option == "Historial" ? "text-blue-400" : "text-white"
            } text-2xl font-bold mt-4 cursor-pointer hover:text-blue-400 transition duration-300 ease-in-out`}
            onClick={() => setOption("Historial")}
          >
            Historial
          </h1>
          <h1
            className="text-white text-2xl font-bold mt-4 cursor-pointer hover:text-blue-400 transition duration-300 ease-in-out"
            onClick={() => {
              auth.signOut();
              router.replace("/login");
            }}
          >
            Cerrar Sesión
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
