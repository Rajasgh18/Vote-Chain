import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.PGDATABASE!, process.env.PGUSER!, process.env.PGPASSWORD!, {
  host: process.env.PGHOST,
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection with PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDB };
