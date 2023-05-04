import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import styles from "../styles/Form.module.css";
import Searchbar from "./Searchbar";
import OposicionTopBar from "./OposicionTopBar";
import CancelacionBody from "./CancelacionBody";

const Cancelacion = ({ loadedUserForRight }: { loadedUserForRight: any }) => {
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
        <CancelacionBody loadedUserForRight={loadedUserForRight} />
      </div>
    </>
  );
};

export default Cancelacion;
