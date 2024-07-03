import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
// Aumentar el límite de tamaño de carga
app.use(express.json({ limit: '100mb' })); // Puedes ajustar el límite según tus necesidades
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser())
app.use("/api",authRoutes)
export default app;