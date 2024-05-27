import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../config.js"

export const CreateToken = (carga) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            carga,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        )
    })
}
