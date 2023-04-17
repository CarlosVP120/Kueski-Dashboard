import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import DashboardTopBar from "./DashboardTopBar";
import DashboardTable from "./DashboardTable";

const DashboardComponent = ({
  data,
  setOption,
  setUpdate,
}: {
  data: any;
  setOption: (option: string) => void;
  setUpdate: (update: boolean) => void;
}) => {
  const [search, setSearch] = useState("");

  // filter the data to show only the ones that match the search by name
  data = data?.filter((user: any) => {
    return (
      user["Name"].toLowerCase().includes(search.toLowerCase()) ||
      user["First Last Name"].toLowerCase().includes(search.toLowerCase()) ||
      user["Second Last Name"].toLowerCase().includes(search.toLowerCase())
    );
  });

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
      <DashboardTable data={data} setOption={setOption} setUpdate={setUpdate} />
    </div>
  );
};

export default DashboardComponent;
