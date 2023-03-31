import React, { useState } from "react";
import ShowInfoModal from "./ShowInfoModal";

const Row = ({
  id,
  email,
  name,
  firstLastName,
  secondLastName,
  curp,
  rfc,
  setOption,
}: {
  id: string;
  email: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  curp: string;
  rfc: string;
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
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {id}
        </th>
        <td className="px-6 py-4">{email}</td>
        <td className="px-6 py-4">{name}</td>
        <td className="px-6 py-4">{firstLastName}</td>
        <td className="px-6 py-4">{secondLastName}</td>
        <td className="px-6 py-4">{curp}</td>
        <td className="px-6 py-4">{rfc}</td>
        <td
          className="px-6 py-4 text-center flex flex-col justify-center items-center"
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
            className="absolute mt-2 w-24 bg-white rounded-lg shadow-xl z-10 flex flex-col justify-center text-center items-center -right-48 animate-appearShort"
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
            <h1 className="font-bold cursor-pointer py-0.5">Editar</h1>
            <h1 className="font-bold cursor-pointer py-0.5">Oposición</h1>
            <h1
              className="font-bold cursor-pointer py-0.5 text-red-500"
              onClick={() => setOption("Cancelación")}
            >
              Cancelar
            </h1>
          </div>
        </td>
      </tr>
      {showInfo && (
        <ShowInfoModal
          setShowInfo={setShowInfo}
          id={id}
          email={email}
          name={name}
          firstLastName={firstLastName}
          secondLastName={secondLastName}
          curp={curp}
          rfc={rfc}
        />
      )}
    </>
  );
};

export default Row;
