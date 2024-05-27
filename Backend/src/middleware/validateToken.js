import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../config.js"

export const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "No hay token, no hay acceso"})
    jwt.verify(token, TOKEN_SECRET, (err, usuario) => {
        // user o decoded
        if (err) return res.status(402).json({message: "Token Invalido"})
        req.usuario = usuario
        next()
    })
    
}