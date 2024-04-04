// import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { passwordValidation } from "../helper/validate";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
const Password = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate:passwordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value)
    },
  })





  return (
    <div className="container mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="text-xl py-4 w-3/4 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="pt-1" onSubmit={formik.handleSubmit}>
            <div className="prolfile flex justify-center  py-4">
              <img src={avatar} alt="avatar" className={styles.prolfile_img} />
            </div>
            <div className="textbox flex flex-col items-center gap-3">
              <input
                {...formik.getFieldProps("password")}
                type="password" placeholder="Password " className={styles.textbox} />
              <button type="submit" className={styles.btn}>Sign in</button>
            </div>
            <div className="flex justify-center py-4" >
              <span className="text-gray-500">Forgot Password? <Link to="/recovery" className="text-red-500">Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
