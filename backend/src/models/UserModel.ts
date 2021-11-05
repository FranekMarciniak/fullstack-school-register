const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';

export const User = sequelize.define('user', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  school_group_id: {
    type: DataTypes.INTEGER,
  },
});
(async () => {
  sequelize.sync();
})();
