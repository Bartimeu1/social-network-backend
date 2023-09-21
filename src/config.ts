import dotenv from 'dotenv';

dotenv.config();

const options = {
  port: process.env.PORT ?? '',
  dbUrl: process.env.DB_URL ?? '',
  jwtAccessKey: process.env.JWT_ACCESS_KEY ?? '',
  jwtRefreshKey: process.env.JWT_REFRESH_KEY ?? '',
};

export default options;
