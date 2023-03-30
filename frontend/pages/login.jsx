import React, { useEffect, useState } from "react";
import { HiFingerPrint, HiAtSymbol } from "react-icons/hi";
import styles from "../styles/Form.module.css";
import login_validate from "../lib/validate";
import { useFormik } from "formik";
import Loading from "../components/Loading";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  GithubAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebaseClient";

const Login = () => {
  const router = useRouter();
  const [loadingLogin, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit: onSubmit,
  });
  const [submitted, setSubmitted] = useState(false);

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        router.replace("/dashboard");
      } else {
        auth.currentUser = null;
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  async function onSubmit(values) {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("Invalid email");
        } else if (error.code === "auth/user-not-found") {
          alert("User not found");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong password");
        }
        return;
      })
      .then((userCredential) => {
        // If the user is logged in
        if (userCredential) {
          formik.resetForm();
          router.push("/dashboard");
        }
      });
  }

  return (
    <>
      {loadingLogin ? (
        <Loading />
      ) : (
        <div className="h-screen flex bg-white animate-appear">
          <div className="w-full flex">
            <img
              src="https://www.theforage.com/blog/wp-content/uploads/2022/07/finance-careers.jpg"
              alt="Background"
              className="w-full h-full object-cover shadow-2xl"
            />
          </div>

          <form
            className="w-full flex flex-col justify-center items-center gap-3 "
            onSubmit={formik.handleSubmit}
          >
            <img src="/loginLogo.svg" alt="Logo" className="w-1/2" />
            <h1 className="text-3xl font-bold text-slate-500 mb-12">Login</h1>
            <div className={styles.input_group}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className={styles.input_text}
                {...formik.getFieldProps("email")}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            {formik.touched.email && formik.errors.email && submitted ? (
              <span className="text-red-500 text-xs font-medium">
                {formik.errors.email}
              </span>
            ) : null}
            <div className={styles.input_group}>
              <input
                name="password"
                className={styles.input_text}
                type="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <span className="icon flex items-center px-4">
                <HiFingerPrint size={25} />
              </span>
            </div>
            {formik.touched.password && formik.errors.password && submitted ? (
              <span className="text-red-500 text-xs font-medium">
                {formik.errors.password}
              </span>
            ) : null}

            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
