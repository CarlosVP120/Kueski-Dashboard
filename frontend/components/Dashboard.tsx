import React, { useState } from "react";
import { auth } from "../firebase/firebaseClient";
import DashboardTopBar from "./DashboardTopBar";
import DashboardTable from "./DashboardTable";

const Dashboard = ({ data }: { data: any }) => {
  const [search, setSearch] = useState("");

  const name = auth.currentUser?.email
    ?.split("@")[0]
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <div className="w-full flex animate-appear flex-col h-full">
      <DashboardTopBar search={search} setSearch={setSearch} name={name!} />
      <DashboardTable search={search} data={data} />
    </div>
  );
};

export default Dashboard;
