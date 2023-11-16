const config = {
  production: {
    backendURL: 'https://asdf-api.devbstaging.com/',
  },
  development: {
    backendURL: 'http://localhost:9090/',
  },
};

const environment = process.env.NODE_ENV || 'development'; // If environment is undefined, it defaults to development
const backendURL = config[environment] || config['development']; // If environment is not development or production (undefined), it defaults to development

export default backendURL;
