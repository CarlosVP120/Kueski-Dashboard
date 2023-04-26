import React, { useState } from "react";
import ShowInfoModal from "./ShowInfoModal";
import { type } from "os";

const Row = ({
  user,
  setOption,
  setUpdate,
}: {
  user: any;
  setOption: (option: string) => void;
  setUpdate: (update: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [edit, setEdit] = useState(false);

  const [user_information, setUserInfo] = useState();

  const query_user_data = async (user_id: string) => {
    const res = await fetch(
      "https://kueski-users-db.onrender.com/users/" + user_id,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setUserInfo(result);
  };

  return (
    <>
      <tr
        className="bg-white border-b hover:bg-gray-50"
        onDoubleClick={() => {
          query_user_data(user["user_id"]).then(() => {
            setShowInfo(true);
            setOpen(false);
          });
        }}
      >
        <th
          scope="row"
          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {user["user_id"]}
        </th>
        <td className="px-4 py-4">{user["email"]}</td>
        <td className="px-4 py-4">{user["user_name"]}</td>
        <td className="px-4 py-4">{user["first_last_name"]}</td>
        <td className="px-4 py-4">{user["second_last_name"]}</td>
        <td className="px-4 py-4">{user["curp"]}</td>
        <td className="px-4 py-4">{user["rfc"]}</td>
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
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </h1>

            <h1
              className="font-bold cursor-pointer py-0.5"
              onClick={() => {
                query_user_data(user["user_id"]).then(() => {
                  setShowInfo(true);
                });
              }}
            >
              Abrir
            </h1>
            {/* <h1
              className="font-bold cursor-pointer py-0.5"
              // On click show the history modal
            >
              Historial
            </h1> */}
            <h1
              className="font-bold cursor-pointer py-0.5"
              onClick={() => {
                query_user_data(user["user_id"]).then(() => {
                  setShowInfo(true);
                  setEdit(true);
                });
              }}
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
      {showInfo && (
        <ShowInfoModal
          setShowInfo={setShowInfo}
          user={user_information}
          edit={edit}
          setEdit={setEdit}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
};

export default Row;
