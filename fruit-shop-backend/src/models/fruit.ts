import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

const Fruit = sequelize.define('Fruit', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: '-',
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_featured',
  },
  
},{timestamps: false});

export default Fruit;