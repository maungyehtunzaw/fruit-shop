import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Fruit from './fruit';

const OrderItem = sequelize.define('OrderItem', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orders_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fruits_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, 
{
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'orderdetails'
});


OrderItem.belongsTo(Fruit, {
  foreignKey: 'fruits_id', // Foreign key in orderdetails table linking to fruits
  as: 'fruit'
});

export default OrderItem;