import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import TopBar from "./OposicionTopBar";
import OposicionBody from "./OposicionBody";

const DashboardComponent = ({
  loadedUserForRight,
}: {
  loadedUserForRight: any;
}) => {
  const name = auth.currentUser?.email
    ?.split("@")[0]
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <div className="w-full flex animate-appear flex-col h-full">
      <TopBar name={name!} cancelacion={false} />
      <OposicionBody loadedUserForRight={loadedUserForRight} />
    </div>
  );
};

export default DashboardComponent;
