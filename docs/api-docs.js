// Nota: Este archivo es para mostrar cómo se estructuraría la documentación de la API
// Para implementarla, necesitarías instalar swagger-jsdoc y swagger-ui-express

/*
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Horóscopo',
      version: '1.0.0',
      description: 'API para consultar horóscopos según fecha de nacimiento',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const specs = swaggerJsdoc(options)

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
*/
