import React, { useState } from "react";


import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import extend from "../styles/Username.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import converToBase64 from "../helper/conver";
import { ProfileValidation } from "../helper/validate";

const Profile = () => {


  const [file,setFile]=useState();


  const formik=useFormik({
    initialValues:{
      firstName:"",
      lastName:"",
      email:'palinya@gamil.com',
      mobile:'',
      address:''
    },
    validate:ProfileValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
      values=await Object.assign(values,{profile:file||""})
      console.log(values)
    }
  })


  const onUpload=async (e:any):Promise<void>=>{
    const base64:any=await converToBase64(e.target.files[0])
    setFile(base64);
  }


  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass} `}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="w-3/4 text-center text-xl py-2 text-gray-500">
              You can update the details.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile">
                <img
                  src={file||avatar}
                  alt="avatar"
                  className={`${styles.prolfile_img} ${extend.profile_img}`}
                />
                <input
                onChange={onUpload}
                  type="file"
                  name="profile"
                  id="profile"
                  className="hidden"
                />
              </label>
            </div>
            <div className="textbox flex flex-col items-center gap-6 mt-4">
              <div className="name flex gap-10 w-3/4">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                 {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>
              <div className="name flex gap-10 w-3/4">
                <input
                 {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                 {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
               {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />

              <button className={styles.btn} type="submit">Update</button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">come bake later<Link className="text-red-500" to="/">Logout</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
