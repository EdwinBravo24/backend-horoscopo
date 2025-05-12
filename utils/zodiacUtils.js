// Función para determinar el signo zodiacal según la fecha
export const getZodiacSign = (day, month) => {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "acuario"
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "piscis"
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "tauro"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "geminis"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "escorpio"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagitario"
  return "capricornio"
}

// Datos predeterminados para horóscopos
export const defaultHoroscopes = {
  acuario: {
    text: "Hoy es un buen día para innovar y conectar con amigos. Tu creatividad está en su punto máximo.",
    emoji: "♒",
  },
  piscis: {
    text: "Tu intuición estará muy aguda hoy. Confía en tus instintos y sigue tu corazón.",
    emoji: "♓",
  },
  aries: {
    text: "Energía a tope hoy. Aprovecha para iniciar nuevos proyectos y tomar la iniciativa.",
    emoji: "♈",
  },
  tauro: {
    text: "Día perfecto para disfrutar de los placeres de la vida. La estabilidad financiera está a tu favor.",
    emoji: "♉",
  },
  geminis: {
    text: "Tu mente estará especialmente ágil. Comunica tus ideas y expande tus contactos sociales.",
    emoji: "♊",
  },
  cancer: {
    text: "Conecta con tus seres queridos hoy. Te sentirás emocionalmente pleno y protector.",
    emoji: "♋",
  },
  leo: {
    text: "Brilla con luz propia hoy. Es tu momento de destacar y mostrar tus talentos al mundo.",
    emoji: "♌",
  },
  virgo: {
    text: "Organiza tu espacio y tus ideas. La claridad mental te favorece para resolver problemas.",
    emoji: "♍",
  },
  libra: {
    text: "Busca el equilibrio en tus relaciones. Día favorable para acuerdos y reconciliaciones.",
    emoji: "♎",
  },
  escorpio: {
    text: "Profundiza en tus pasiones. Día intenso emocionalmente, aprovecha para transformaciones.",
    emoji: "♏",
  },
  sagitario: {
    text: "Expande tus horizontes. Buen momento para aprender algo nuevo o planificar un viaje.",
    emoji: "♐",
  },
  capricornio: {
    text: "Enfócate en tus metas. Tu disciplina dará frutos y serás reconocido por tu esfuerzo.",
    emoji: "♑",
  },
}
