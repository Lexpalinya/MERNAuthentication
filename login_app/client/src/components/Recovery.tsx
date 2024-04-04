// import React from "react";


import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
const Recovery = () => {


  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="text-xl py-4 w-3/4 text-center text-gray-500">
              Enter OTP to recovery password
            </span>
          </div>
          <form className="pt-20">
            <div className="textbox flex flex-col items-center gap-3">
              <div className="input text-center ">
                <span className="py-1 text-sl text-left text-gray-500 ">
                  Enter 6 digit OTP sent to your email address
                </span>
                <input
                  type="password"
                  placeholder=""
                  className={styles.textbox}
                  
                  
                />
              </div>
              <button type="submit" className={styles.btn}>
                Sign in
              </button>
            </div>
            <div className="flex justify-center py-4">
              <span className="text-gray-500">
                Can't get OTP <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
