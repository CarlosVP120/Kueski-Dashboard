import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./styles/Form.module.css";
import { HiFingerPrint, HiAtSymbol } from "react-icons/hi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-screen flex bg-white">
      <div className="w-full flex">
        <img
          src="https://www.theforage.com/blog/wp-content/uploads/2022/07/finance-careers.jpg"
          alt="Background"
          className="w-full h-full object-cover shadow-2xl"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-3 ">
        <img src="/loginLogo.svg" alt="Logo" className="w-1/2" />
        <h1 className="text-3xl font-bold text-slate-500 mb-12">Login</h1>
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input_text}
          />
          <span className="icon flex items-center px-4">
            <HiAtSymbol size={25} />
          </span>
        </div>
        <div className={styles.input_group}>
          <input
            className={styles.input_text}
            type="password"
            name="password"
            placeholder="Password"
          />
          <span className="icon flex items-center px-4">
            <HiFingerPrint size={25} />
          </span>
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
}
