import { DB_PORT, DB_DATABASE } from '@config';
const DB_HOST = process.env.NODE_ENV === 'local' ? 'mongo' : '127.0.0.1';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {},
};
