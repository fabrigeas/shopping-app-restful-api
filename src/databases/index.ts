const DB_HOST = process.env.NODE_ENV === 'production' ? 'mongo' : '127.0.0.1';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:27018/shop`,
  options: {},
};
