import express from "express"
import {
  getHoroscopeByBirthdate,
  updateHoroscope,
  getAllHoroscopes,
  getHoroscopeBySign,
} from "../controllers/horoscopeController.js"
import { validateDateFormat } from "../middleware/validateMiddleware.js"

const router = express.Router()

// Ruta para obtener horóscopo por fecha de nacimiento
router.post("/get-by-birthdate", validateDateFormat, getHoroscopeByBirthdate)

// Ruta para obtener horóscopo por signo
router.get("/sign/:sign", getHoroscopeBySign)

// Ruta para obtener todos los horóscopos (para administradores)
router.get("/all", getAllHoroscopes)

// Ruta para actualizar horóscopo (para administradores)
router.post("/update", updateHoroscope)

export default router
