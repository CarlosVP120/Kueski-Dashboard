import React, { useEffect, useState } from "react";
import Row from "./Row";
import styles from "../styles/Form.module.css";

const OposicionBody = ({}: {}) => {
  const [isHovered, setIsHovered] = useState(false);

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
          {/* On hover show information  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={`w-6 h-6 cursor-pointer ${
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
    </>
  );
};

export default OposicionBody;
