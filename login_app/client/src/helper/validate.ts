import toast from "react-hot-toast";



interface ErrorType {
    username?: string;
    password?: string;
    email?:string;
    exist?: any;
}




/**  validate user login page  **/

export let usernameValidate = async (values: any) => {
    const error = usernameVerify({}, values);
    return error;
}


/** validate password**/
export let passwordValidation = async (values: any) => {
    const error = passwordVerify({}, values);
    return error;
}


/** validate reset password**/

export let resetPasswordValidatetion = async (values: any) => {
    const error = passwordVerify({}, values);
    if (values.password !== values.confirm_pwd) {
        error.exist = toast.error("Password not match...!")
    }

    return error

}


/** validate register form**/

export async function registorValidation(values:any) {
    const errors=usernameVerify({},values);
    emailVerify(errors,values),
    passwordVerify(errors,values)
    return errors;
}

/**-----------------------------------------------------------------**/

/** validate username **/
function usernameVerify(error: ErrorType = {}, values: any) {
    if (!values.username) {
        error.username = toast.error(
            'Username Required...!'
        )
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username...!')
    }
    return error;
}




/** validate password**/
function passwordVerify(error: ErrorType = {}, values: any) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
        error.password = toast.error("Password Required...!")
    }
    else if (values.password.includes(" ")) {
        error.password = toast.error("Password wrong...!")
    }
    else if (values.password.length < 4) {
        error.password = toast.error("Password must be more then 4 character long")
    } else if (!specialChars.test(values.password)) {
        error.password = toast.error("Password must have special character")
    }
    return error;

}




/** validate email**/
function emailVerify(error:ErrorType={},values:any){

    if(!values.email){
        error.email=toast.error("Email Required...!")
    } 
    else if(values.email.includes(" ")){
        error.email=toast.error("Wrong Email...!")

    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){

        error.email=toast.error("Invalid email address...!")
    }
    return error


}


