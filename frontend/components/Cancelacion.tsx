import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import styles from "../styles/Form.module.css";
import Searchbar from "./Searchbar";
import OposicionTopBar from "./OposicionTopBar";
import CancelacionBody from "./CancelacionBody";

const Cancelacion = () => {
  const [isHovered, setIsHovered] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [cancelacion, setCancelacion] = useState("");

  async function Load() {
    // const res = await fetch("https://kueski-users-db.onrender.com/getUsers", {
    const res = await fetch(
      "https://kueski-users-db.onrender.com/api/v1/users",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    // console.log("loaded data", result);
    setData(result);
  }

  useEffect(() => {
    (async () => await Load())();
  }, []);

  const name = auth.currentUser?.email
    ?.split("@")[0]
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <>
      <div className="w-full flex animate-appear flex-col h-full">
        <OposicionTopBar name={name!} cancelacion={true} />
        <CancelacionBody />
      </div>
    </>
  );
};

export default Cancelacion;
