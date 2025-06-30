const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT Authentication API',
      version: '1.0.0',
      description: 'A secure RESTful API for user authentication and management using JWT',
      contact: {
        name: 'API Support',
        url: 'https://example.com/support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              required: true,
              example: 'johndoe',
            },
            email: {
              type: 'string',
              format: 'email',
              required: true,
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              required: true,
              format: 'password',
              example: 'password123',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  // Swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

  // Docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

module.exports = swaggerDocs;
