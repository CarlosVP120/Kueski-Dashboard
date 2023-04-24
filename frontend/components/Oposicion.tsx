import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import TopBar from "./OposicionTopBar";
import OposicionBody from "./OposicionBody";

const DashboardComponent = ({ data }: { data: any }) => {
  const name = auth.currentUser?.email
    ?.split("@")[0]
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <div className="w-full flex animate-appear flex-col h-full">
      <TopBar name={name!} />
      <OposicionBody />
    </div>
  );
};

export default DashboardComponent;
