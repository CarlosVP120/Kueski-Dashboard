import Head from "next/head";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import LeftSidebar from "../components/LeftSidebar";
import RightSide from "../components/RightSide";

const dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    if (auth.currentUser === null) {
      router.replace("/login");
      return;
    }
  }, []);

  const [option, setOption] = useState("Dashboard");

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      {auth.currentUser !== null ? (
        <div className="flex h-screen w-full animate-appear bg-black">
          <LeftSidebar setOption={setOption} />
          <RightSide option={option} setOption={setOption} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default dashboard;
