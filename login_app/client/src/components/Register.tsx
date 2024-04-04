import  { useState } from "react";

import avatar from "../assets/profile.png"
import styles from "../styles/Username.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {registorValidation} from "../helper/validate.ts"
import converToBase64 from "../helper/conver.ts";
import { Toaster } from "react-hot-toast";

const Register = () => {

  const [file,setFile]=useState();
  const formik=useFormik({
    initialValues:{
      email:"palinya@gmail.com",
      username:"palinya",
      password:"palinya!@$"
    },
    validate:registorValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
      values=await Object.assign(values,{proflie:file||""})
      console.log(values)
    }
  })

  const onUpload = async (e: any): Promise<void> => {
    // Get the uploaded file
    const file = e.target.files[0];

    // Convert the file to base64
    const base64:any = await converToBase64(file);

    // Set the base64 string
    setFile(base64);
};


  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex flex-col h-screen items-center justify-center">
        <div className={styles.glass}>
          <div className="flex flex-col items-center">
            <h4 className="text-5xl mx-5">Registor ! </h4>
            <span className="text-grey-500 my-2">Happy to join you!</span>
          </div>
          <form className="pt-1" onSubmit={formik.handleSubmit} >
            <div className="profile flex justify-center py-4  items-center">
              <label htmlFor="profile">
                <img src={file||avatar} alt="avatar"  className={styles.prolfile_img}/>
                <input onChange={onUpload} type="file" name="profile" id="profile" className="hidden" />
              </label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <input {...formik.getFieldProps("email")}type="text" className={styles.textbox} name="" id="email"  placeholder="Email"/>
              <input {...formik.getFieldProps("username")}type="text" className={styles.textbox} name="" id="username"  placeholder="Username"/>
              <input {...formik.getFieldProps("password")}type="Password" className={styles.textbox} name="" id="password"  placeholder="Password"/>
              <button type="submit" className={styles.btn}>Registor</button>

              <span className="text-grey-500"> Already Registor? <Link to="/" className="text-red-500">Login</Link></span>
            </div>



          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
