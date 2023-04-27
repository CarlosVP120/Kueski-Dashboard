import React, { useEffect, useState } from "react";
import Row from "./Row";
import styles from "../styles/Form.module.css";

const OposicionBody = ({}: {}) => {
  const [isHovered, setIsHovered] = useState(true);
  const [calls, setCalls] = useState(true);
  const [mails, setMails] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mt-6 ml-6">
        <h1 className="font-bold pb-2 text-gray-600">Selecciona un usuario:</h1>
        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className={`${styles.input_group} self-center !max-w-[380px]`}>
            <input
              placeholder="Search"
              className={styles.input_text}
              // value={search}
              // onChange={(e) => {
              //   setSearch(e.target.value);
              // }}
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
          {/* On hover className="font-normal" show information  */}
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
        {/* Columns */}
        <div className="flex w-full mt-6">
          <div className="flex flex-col w-1/2 pr-6">
            <div className="flex justify-between font-bold pb-2 text-gray-600">
              <h1>Llamadas: </h1>
              <div className="flex items-center gap-2">
                <input
                  checked={calls ? true : false}
                  type="checkbox"
                  className="form-checkbox h-6 w-6 rounded-full text-blue-600"
                  onClick={() => {
                    setCalls(true);
                  }}
                />
                <h1 className="font-normal">Show</h1>
                <input
                  checked={calls ? false : true}
                  type="checkbox"
                  className="form-checkbox h-6 w-6 rounded-full text-blue-600 accent-red-500"
                  onClick={() => {
                    setCalls(false);
                  }}
                />
                <h1 className="font-normal">Hide</h1>
              </div>
            </div>
            <div className="flex justify-between font-bold pb-2 text-gray-600">
              <h1>Correos:</h1>
              <div className="flex items-center gap-2">
                <input
                  checked={mails ? true : false}
                  type="checkbox"
                  className="form-checkbox h-6 w-6 rounded-full text-blue-600"
                  onClick={() => {
                    setMails(true);
                  }}
                />
                <h1 className="font-normal">Show</h1>
                <input
                  checked={mails ? false : true}
                  type="checkbox"
                  className="form-checkbox h-6 w-6 rounded-full text-blue-600 accent-red-500"
                  onClick={() => {
                    setMails(false);
                  }}
                />
                <h1 className="font-normal">Hide</h1>
              </div>
            </div>
            <div className="flex justify-between font-bold pb-2 text-gray-600">
              <h1>Notificaciones:</h1>
              <div className="flex items-center gap-2">
                <input
                  checked={notifications ? true : false}
                  type="checkbox"
                  className="form-checkbox h-6 w-6 rounded-full text-blue-600"
                  onClick={() => {
                    setNotifications(true);
                  }}
                />
                <h1 className="font-normal">Show</h1>
                <input
                  checked={notifications ? false : true}
                  type="checkbox"
                  className="form-checkbox h-6 w-6 rounded-full text-blue-600 accent-red-500"
                  onClick={() => {
                    setNotifications(false);
                  }}
                />
                <h1 className="font-normal">Hide</h1>
              </div>
            </div>
          </div>
          {/* Second column */}
        </div>
      </div>
    </>
  );
};

export default OposicionBody;
