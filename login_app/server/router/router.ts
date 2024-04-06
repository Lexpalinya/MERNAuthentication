import { Express, Request, Response, Router } from "express";
import * as controller from "../controller/appController"
import Auth,{localVaribles} from "../middleware/auth";
import { registerMail } from "../controller/mailer";




const router = Router();


/** Post methods**/
router.route('/register').post(controller.register)//register user
router.route('/registerMail').post( registerMail);//send the mail
router.route('/authentication').post((req, res) => {
    res.end()
});// authentication user
router.route('/login').post(controller.verifyUser,controller.login);//login in app


/** Get methods**/

router.route('/user/:username').get(controller.getUser)//user with username
router.route('/generateOTP').get(controller.verifyUser,localVaribles,controller.generateOTP)//generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables

/**Put methods**/

router.route('/updateuser').put(Auth,controller.updateUser) //is use to update teh user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword)// use to reset password



export default router