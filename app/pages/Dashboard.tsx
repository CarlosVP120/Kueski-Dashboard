import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-black">
      <div className="w-1/5 min-h-screen bg-black px-4 py-3 text-white">
        Left
      </div>
      <div className="w-4/5 min-h-screen bg-white rounded-l-2xl px-4 py-3">
        Right
      </div>
    </div>
  );
}
