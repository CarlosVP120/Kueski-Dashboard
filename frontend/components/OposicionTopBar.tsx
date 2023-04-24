import React from "react";
import styles from "../styles/Form.module.css";

const DashboardTopBar = ({ name }: { name: string }) => {
  return (
    <div className="w-full flex flex-col justify-between p-6 pb-0 gap-2">
      <h1 className="text-3xl font-bold">
        Bienvenid@ <span className="text-blue-600">{name}</span>
      </h1>
      <h2 className="text-2xl font-bold">Oposición</h2>
    </div>
  );
};

export default DashboardTopBar;
