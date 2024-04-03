import toast from "react-hot-toast";


//validate login page username

interface ErrorType{
    username?:string;
}

export async function usernameValidate(values:any){
    const error =usernameVerify({},values);
    return error;
}




// validate username
function usernameVerify(error:ErrorType = {}, values:any) {
    if (!values.username) {
        error.username = toast.error(
            'Username Required...!'
        )
    }else if(values.username.includes(" ")){
        error.username=toast.error('Invalid Username...!')
    }
        return error;
}

