
import { serve, setup } from 'swagger-ui-express';
import { swaggerSpec } from '../helpers/swagger.js';

import index from './pages/index.js';
import colors from './api/colors.js';

export default (app) => {
  app.use('/', index);

  app.use('/api/docs', serve, setup(swaggerSpec));

  app.use('/api', colors);
};