import * as devConfig from './config.dev.json';
import * as prodConfig from './config.prod.json';

const configFile = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default configFile;
