import { DataTypes } from "sequelize";

const CachedImageModel = (sequelize) => {
  return sequelize.define(
    "CachedImage",
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      image_data: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      indexes: [
        {
          fields: ["expires_at"],
          using: "BTREE",
        },
      ],
    }
  );
};

export default CachedImageModel;
