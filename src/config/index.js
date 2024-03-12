import devConfig from './config.dev';
import prodConfig from './config.prod';

const configFile = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default configFile;
