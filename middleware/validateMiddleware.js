// Middleware para validar formato de fecha
export const validateDateFormat = (req, res, next) => {
  const { birthdate } = req.body

  if (!birthdate) {
    return res.status(400).json({ message: "La fecha de nacimiento es requerida" })
  }

  // Validar formato de fecha (DD-MM-AAAA)
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/
  if (!dateRegex.test(birthdate)) {
    return res.status(400).json({ message: "Formato de fecha inválido. Use DD-MM-AAAA" })
  }

  // Extraer día, mes y año
  const [day, month, year] = birthdate.split("-").map((num) => Number.parseInt(num, 10))

  // Validar fecha
  const date = new Date(year, month - 1, day)
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return res.status(400).json({ message: "Fecha inválida" })
  }

  next()
}
