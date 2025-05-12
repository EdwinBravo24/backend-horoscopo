import Horoscope from "../models/Horoscope.js"
import { getZodiacSign, defaultHoroscopes } from "../utils/zodiacUtils.js"
import asyncHandler from "express-async-handler"

// Obtener horóscopo por fecha de nacimiento
export const getHoroscopeByBirthdate = asyncHandler(async (req, res) => {
  const { birthdate } = req.body

  // Extraer día, mes y año
  const [day, month, year] = birthdate.split("-").map((num) => Number.parseInt(num, 10))

  // Obtener signo zodiacal
  const sign = getZodiacSign(day, month)

  // Buscar horóscopo en la base de datos
  let horoscope = await Horoscope.findOne({ sign })

  // Si no existe, crear uno predeterminado
  if (!horoscope) {
    const defaultData = defaultHoroscopes[sign]
    horoscope = new Horoscope({
      sign,
      dailyHoroscope: defaultData.text,
      emoji: defaultData.emoji,
    })

    await horoscope.save()
  }

  // Verificar si el horóscopo es de hoy, si no, actualizarlo
  const today = new Date().toDateString()
  const horoscopeDate = new Date(horoscope.dateUpdated).toDateString()

  if (horoscopeDate !== today) {
    // Simulamos una actualización diaria con una pequeña variación
    const defaultData = defaultHoroscopes[sign]
    const variations = [
      "Los astros están alineados a tu favor hoy. ",
      "Las energías cósmicas te favorecen. ",
      "La luna influye positivamente en tu día. ",
      "Venus trae amor y armonía a tu vida. ",
      "Marte te da energía extra para tus proyectos. ",
    ]

    const randomVariation = variations[Math.floor(Math.random() * variations.length)]
    horoscope.dailyHoroscope = randomVariation + defaultData.text
    horoscope.dateUpdated = new Date()

    await horoscope.save()
  }

  // Devolver horóscopo
  return res.status(200).json({
    sign,
    horoscope: horoscope.dailyHoroscope,
    emoji: horoscope.emoji,
  })
})

// Actualizar horóscopo (para administradores)
export const updateHoroscope = asyncHandler(async (req, res) => {
  const { sign, dailyHoroscope, emoji } = req.body

  // Validar datos
  if (!sign || !dailyHoroscope) {
    res.status(400)
    throw new Error("Todos los campos son requeridos")
  }

  // Verificar si el signo es válido
  const validSigns = Object.keys(defaultHoroscopes)
  if (!validSigns.includes(sign.toLowerCase())) {
    res.status(400)
    throw new Error("Signo zodiacal inválido")
  }

  const updatedHoroscope = await Horoscope.findOneAndUpdate(
    { sign: sign.toLowerCase() },
    {
      dailyHoroscope,
      emoji: emoji || defaultHoroscopes[sign.toLowerCase()].emoji,
      dateUpdated: Date.now(),
    },
    { new: true, upsert: true },
  )

  return res.status(200).json(updatedHoroscope)
})

// Obtener todos los horóscopos (para administradores)
export const getAllHoroscopes = asyncHandler(async (req, res) => {
  const horoscopes = await Horoscope.find({}).sort({ sign: 1 })

  return res.status(200).json(horoscopes)
})

// Obtener horóscopo por signo
export const getHoroscopeBySign = asyncHandler(async (req, res) => {
  const { sign } = req.params

  // Verificar si el signo es válido
  const validSigns = Object.keys(defaultHoroscopes)
  if (!validSigns.includes(sign.toLowerCase())) {
    res.status(400)
    throw new Error("Signo zodiacal inválido")
  }

  // Buscar horóscopo en la base de datos
  let horoscope = await Horoscope.findOne({ sign: sign.toLowerCase() })

  // Si no existe, crear uno predeterminado
  if (!horoscope) {
    const defaultData = defaultHoroscopes[sign.toLowerCase()]
    horoscope = new Horoscope({
      sign: sign.toLowerCase(),
      dailyHoroscope: defaultData.text,
      emoji: defaultData.emoji,
    })

    await horoscope.save()
  }

  return res.status(200).json({
    sign: horoscope.sign,
    horoscope: horoscope.dailyHoroscope,
    emoji: horoscope.emoji,
  })
})
