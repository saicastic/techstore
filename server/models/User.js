import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
  return sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
};

export default UserModel;
