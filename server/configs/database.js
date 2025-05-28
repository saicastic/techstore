import { Sequelize } from "sequelize";
import UserModel from "../models/User.js";
import CachedImageModel from "../models/CachedImage.js";
import ScrapeHistoryModal from "../models/ScrapeHistory.js";

let User = null;
let CachedImage = null;
let ScrapeHistory = null;

const connection = async () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    User = UserModel(sequelize);
    CachedImage = CachedImageModel(sequelize);
    ScrapeHistory = ScrapeHistoryModal(sequelize);
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
export { User, CachedImage, ScrapeHistory };
