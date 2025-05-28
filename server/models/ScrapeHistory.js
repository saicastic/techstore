import { DataTypes } from "sequelize";

const ScrapeHistoryModal = (sequelize) => {
  return sequelize.define(
    "ScrapeHistory",
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
};

export default ScrapeHistoryModal;
