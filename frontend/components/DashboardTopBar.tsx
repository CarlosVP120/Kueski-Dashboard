import React from "react";
import styles from "../styles/Form.module.css";

const DashboardTopBar = ({
  name,
  search,
  setSearch,
}: {
  name: string;
  search: string;
  setSearch: (search: string) => void;
}) => {
  return (
    <div className="w-full flex justify-between p-6">
      <h1 className="text-3xl font-bold ">
        Bienvenid@ <span className="text-blue-600">{name}</span>
      </h1>
      {/* SearchBar */}
      <div className={`${styles.input_group} self-center !max-w-[200px]`}>
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
    </div>
  );
};

export default DashboardTopBar;
