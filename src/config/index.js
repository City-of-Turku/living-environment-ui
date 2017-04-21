const configFile = process.env.NODE_ENV === 'development'
  ? './config.dev.json'
  : './config.prod.json';

export default require(configFile);
