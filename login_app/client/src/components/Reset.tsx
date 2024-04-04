// import React from "react";

import { useFormik } from "formik";

import { resetPasswordValidatetion } from "../helper/validate";

import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidatetion,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="text-xl py-4 w-3/4 text-center text-gray-500">
              Enter new password
            </span>
          </div>
          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-3">
              <input
                {...formik.getFieldProps("password")}
                type="password"
                placeholder="New Password "
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                type="password"
                placeholder="Repeat Password "
                className={styles.textbox}
              />
              <button type="submit" className={styles.btn}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
