import React from "react";
import styles from "../styles/Form.module.css";

const Searchbar = ({
  search,
  setSearch,
  setShowSuggestions,
  isHovered,
  setIsHovered,
  showSuggestions,
  data,
  setCurrentUser,
  currentUser,
  tempUser,
  setTempUser,
}: {
  search: string;
  setSearch: (search: string) => void;
  setShowSuggestions: (showSuggestions: boolean) => void;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  showSuggestions: boolean;
  data: any;
  setCurrentUser: (currentUser: any) => void;
  currentUser: any;
  tempUser: any;
  setTempUser: (tempUser: any) => void;
}) => {
  async function getUser(id: any) {
    // const res = await fetch("https://kueski-users-db.onrender.com/getUser", {
    const res = await fetch(
      "https://kueski-users-db.onrender.com/api/v1/users/" + id,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();

    if (
      typeof result[0]["oposition_rules"] !== "object" &&
      result[0]["oposition_rules"] !== null
    ) {
      const userData = JSON.parse(result[0]["oposition_rules"]);
      result[0]["oposition_rules"] = userData;
    } else if (result[0]["oposition_rules"] === null) {
      result[0]["oposition_rules"] = {};
    }

    setCurrentUser(result[0]);
    setTempUser(result[0]);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className={`${styles.input_group} self-center !max-w-[380px]`}>
          <input
            placeholder="Search"
            className={styles.input_text}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
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
          className={`w-6 h-6 ${isHovered ? "text-blue-600" : "text-gray-600"}`}
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
      <div className="flex flex-col mt-1 fixed bg-slate-100 rounded-md w-1/3 ">
        {showSuggestions &&
          Object.keys(data)
            .filter((key) => {
              let completeName = `${(data as any)[key]["user_name"]} ${
                (data as any)[key]["first_last_name"]
              } ${(data as any)[key]["second_last_name"]}`;

              return (
                // The value cant contain null or undefined
                (data as any)[key]["user_name"]
                  ?.toLowerCase()
                  .includes(search.toLowerCase()) ||
                (data as any)[key]["email"]
                  ?.toLowerCase()
                  .includes(search.toLowerCase()) ||
                (data as any)[key]["curp"]
                  ?.toLowerCase()
                  .includes(search.toLowerCase()) ||
                (data as any)[key]["rfc"]
                  ?.toLowerCase()
                  .includes(search.toLowerCase()) ||
                // If the complete name includes the search excluding spaces and empty strings
                completeName
                  .split(" ")
                  .filter((val) => val !== "")
                  .join(" ")
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
            })
            .map((val, key) => {
              return (
                <>
                  {search.length > 0 && (
                    <button
                      className="flex items-center justify-between rounded-xl px-4 py-2 mx-2 mt-2 cursor-pointer hover:bg-slate-200"
                      key={key}
                      onClick={() => {
                        setCurrentUser((data as any)[val]);
                        getUser((data as any)[val]["user_id"]);
                        setSearch("");
                        setShowSuggestions(false);
                      }}
                    >
                      <h1>
                        {(data as any)[val]["user_name"]}{" "}
                        {(data as any)[val]["first_last_name"]}{" "}
                        {(data as any)[val]["second_last_name"]}{" "}
                      </h1>
                    </button>
                  )}
                </>
              );
            })}
      </div>
      {currentUser && (
        <h1 className="font-bold text-2xl pb-2 text-blue-600 mt-4">
          {(currentUser as any).user_name}{" "}
          {(currentUser as any).first_last_name}{" "}
          {(currentUser as any).second_last_name}
        </h1>
      )}
    </>
  );
};

export default Searchbar;
