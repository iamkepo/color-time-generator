import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property Management Documentation',
      version: '1.0.0',
      description: 'API documentation for your routes',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', 
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: ['./routes/api/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);