import { DB_HOST, DB_PORT } from '@/config';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/shop`,
  options: {},
};
