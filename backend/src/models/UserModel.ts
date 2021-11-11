const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';
import { Group } from './GroupModel';

export const User = sequelize.define('users', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
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
  role: {
    type: DataTypes.ENUM(['admin', 'teacher', 'student']),
    defaultValue: 'student',
    allowNull: false,
  },
});

Group.hasMany(User, { foreignKey: 'group_id' });
User.belongsTo(Group, { foreignKey: 'group_id' });

(async () => {
  await sequelize.drop({ cascade: true });
  await sequelize.sync({ force: true });
})();
