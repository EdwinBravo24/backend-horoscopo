import mongoose from "mongoose"

const horoscopeSchema = new mongoose.Schema({
  sign: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "acuario",
      "piscis",
      "aries",
      "tauro",
      "geminis",
      "cancer",
      "leo",
      "virgo",
      "libra",
      "escorpio",
      "sagitario",
      "capricornio",
    ],
    lowercase: true,
  },
  dailyHoroscope: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
})

const Horoscope = mongoose.model("Horoscope", horoscopeSchema)

export default Horoscope
