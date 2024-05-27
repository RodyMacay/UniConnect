import express from "express";
import comunidadRoutes from './routes/comunidadRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import { authRequired } from "./middleware/validateToken.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from "morgan";
import { validateDate } from "./middleware/validateData.js";
import { comunidadValidation, publicacionValidation } from "./schemas/authValidate.js";
import Perfil from "./routes/perfil.routes.js";
import Publicaciones from "./routes/publicacionGeneral.routes.js";


const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:5173' ,credentials:true}))


app.get("/", (req, res) => {
    res.json({message: "Pagina oficial del proyecto Unniconet"})
})

app.use("/api", authRoutes)
app.use("/api", usuariosRoutes)
app.use("/comunidad", authRequired, comunidadRoutes)
app.use('/perfil',Perfil);
app.use('/publicaciones',Publicaciones);

 


export default app