const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

const { PORT, HOST, ENV_MODE } = process.env;

dotenv.config();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'Starter API',
    description: 'Starter backend API documentation',
  },
  host: `${ENV_MODE === 'dev' ? `http://localhost:${PORT}` : HOST}`,
  basePath: '/api/v1/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'User authentication and authorization',
    },
  ],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    User: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'john@123',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => console.log('docs generated'));
