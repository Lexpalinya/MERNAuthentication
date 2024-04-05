import UserModel, { User } from "../model/User.model";
import bcrypt from "bcrypt";
import jwt, { Jwt } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

import RequestUser from "../model/requestUser";
import ENV from "../config";





export const verifyUser = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        const { username } = req.method === "GET" ? req.query : req.body;
        //check the user existUsername

        let exist = await UserModel.findOne({ username })
        if (!exist) return res.status(404).send({ error: "Can't find User!" })
        next();
    } catch (error) {
        // Handle errors if needed...

        return res.status(404).send({ error: "Authenticatin Error" })

        next(error); // Pass the error to the error handling middleware
    }
}





/* post http://localhost:8080/api/registor
@param:{
    "username":"example123"
    "password":"admin123",
    "email":"example@gmail.com",
    "fistName":"alex",
    "lastName":"william",
    "mobile":5056516,
    "address":"Apt. 556,kulas light,gwenborught",
    "profile":""

}

*/


export async function register(req: Request, res: Response) {
    try {
        const { username, password, profile, email } = req.body;

        // Check for existing username
        const existUsername = UserModel.findOne({ username });
        // Check for existing email
        const existEmail = UserModel.findOne({ email });

        Promise.all([existUsername, existEmail])
            .then(([existingUsername, existingEmail]) => {
                if (existingUsername) {
                    throw new Error("Username already exists");
                }
                if (existingEmail) {
                    throw new Error("Email already exists");
                }

                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // Save the user to the database
                            user.save()
                                .then(() => res.status(201).send({ msg: "User Registered Successfully" }))
                                .catch(error => {
                                    throw new Error("Error saving user to the database");
                                });
                        })
                        .catch(error => {
                            throw new Error("Error hashing password");
                        });
                }
            })
            .catch(error => {
                // Handle errors
                return res.status(500).send({ error: error.message || "Internal Server Error" });
            });
    } catch (error) {
        return res.status(500).send({ error: (error as unknown as Error).message || "Internal Server Error" });
    }
}


// post
export async function login(req: Request, res: Response) {
    const { username, password } = req.body


    try {
        UserModel.findOne({ username }).
            then((user: any) => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" })

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "24h" })


                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        })
                    }

                    )

                    .catch(error => {
                        return res.status(400).send({ error: "Password does not match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not found" })
            })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

//get
export async function getUser(req: Request, res: Response) {
    const { username } = req.params;

    try {

        if (!username) return res.status(501).send({ error: "Invalid Username" });

        UserModel.findOne({ username }).then(user => {
            if (!user) return res.status(501).send({ error: "Couldn't Find the User" });
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON())
            return res.status(201).send(rest);

        }).catch(error => {
            return res.status(500).send({ error });
        })


        /** remove password from user */
    } catch (error) {
        return res.status(404).send({ error: (error as unknown as Error).message });
    }


}

//put

export async function updateUser(req: RequestUser, res: Response) {

    try {
        
        const {userId}=req.user as{userId:string}
        if (userId) {
            const body: User = req.body
            UserModel.updateOne({ _id: userId }, body).then(results => {
                return res.status(201).send({ msg: "Record Updated..." })
            }).catch(error => {
                throw error
            }
            )
        } else {
            return res.status(401).send({ error: "User not found...!" })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}

// get
export async function generateOTP(req: Request, res: Response) {
    res.json("registor route");
}

//get
export async function verifyOTP(req: Request, res: Response) {
    res.json("registor route");
}
// get
export async function createResetSession(req: Request, res: Response) {
    res.json("registor route");
}

//update
export async function resetPassword(req: Request, res: Response) {
    res.json("registor route");
}
