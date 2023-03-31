import React, { useState } from "react";
import ShowInfoModal from "./ShowInfoModal";

const Row = ({
  user,
  setOption,
}: {
  user: any;
  setOption: (option: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <tr
        className="bg-white border-b hover:bg-gray-50"
        onDoubleClick={() => {
          setShowInfo(true);
          setOpen(false);
        }}
      >
        <th
          scope="row"
          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {user["User ID"]}
        </th>
        <td className="px-4 py-4">{user["Email"]}</td>
        <td className="px-4 py-4">{user["Name"]}</td>
        <td className="px-4 py-4">{user["First Last Name"]}</td>
        <td className="px-4 py-4">{user["Second Last Name"]}</td>
        <td className="px-4 py-4">{user["CURP"]}</td>
        <td className="px-4 py-4">{user["RFC"]}</td>
        <td
          className="px-4 py-4 text-center flex flex-col justify-center items-center"
          onClick={() => setOpen(!open)}
        >
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          </a>
          {/* Small modal on top of svg, separate it from the right by 10px */}
          <div
            className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-xl z-10 flex flex-col justify-center text-center items-center  animate-appearShort"
            style={{ display: open ? "flex" : "none" }}
          >
            {/* Close button on top right */}
            <h1 className="font-bold pt-1 text-right flex justify-end px-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </h1>

            <h1
              className="font-bold cursor-pointer py-0.5"
              onClick={() => {
                setShowInfo(true);
              }}
            >
              Abrir
            </h1>
            <h1
              className="font-bold cursor-pointer py-0.5"
              onClick={() => setOption("Historial")}
            >
              Historial
            </h1>
            <h1
              className="font-bold cursor-pointer py-0.5"
              onClick={() => setOption("Editar")}
            >
              Editar
            </h1>
            <h1
              className="font-bold cursor-pointer py-0.5"
              onClick={() => setOption("Oposición")}
            >
              Oposición
            </h1>
            <h1
              className="font-bold cursor-pointer py-0.5 text-red-500"
              onClick={() => setOption("Cancelación")}
            >
              Cancelar
            </h1>
          </div>
        </td>
      </tr>
      {showInfo && <ShowInfoModal setShowInfo={setShowInfo} user={user} />}
    </>
  );
};

export default Row;
