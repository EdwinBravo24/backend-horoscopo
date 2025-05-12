import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import horoscopeRoutes from "./routes/horoscopeRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"

// Configuración
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// Conectar a la base de datos
connectDB()

// Middleware de seguridad
app.use(helmet()) // Ayuda a proteger la app configurando varios headers HTTP
app.use(cors()) // Habilita CORS
app.use(express.json()) // Parsea JSON

// Limitar peticiones para prevenir ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 peticiones por ventana
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Logging en desarrollo
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Rutas
app.use("/api/horoscope", horoscopeRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de Horóscopo funcionando correctamente")
})

// Middleware para manejar rutas no encontradas
app.use(notFound)

// Middleware para manejar errores
app.use(errorHandler)

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT} en modo ${process.env.NODE_ENV || "development"}`)
})

// Manejar errores no capturados
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  // Cerrar servidor y salir del proceso
  server.close(() => process.exit(1))
})
