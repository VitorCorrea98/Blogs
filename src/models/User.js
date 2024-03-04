const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    displayName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'users'
  })

  // User.associate = (models) => {
  //   User.hasMany(models.)
  // }

  return User;
};

module.exports = UserModel;