import { DataTypes ,Optional,Model} from 'sequelize';
import { sequelize } from '../config/db';
import User from './user';
import OrderItem from './orderdetail';

interface OrderAttributes {
  id: number;
  users_id: number | string;
  qty: number;
  total_amount: number;
  status?: string | number;
}
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

// Extend Model class with attributes and creation attributes
class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public users_id!: number | string;
  public qty!: number;
  public total_amount!: number;

  // Other fields and relationships can be defined here as well
}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'users_id'
    },
    status:{
      type: DataTypes.STRING,
      allowNull: true,
      field: 'status'
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'qty'
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'total_amount'
    },
  },
  {
    sequelize,
    tableName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// export default Order;

// const Order = sequelize.define('Order', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  //   field: 'id'
  // },
  // users_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   field: 'users_id'
  // },
  // status:{
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   field: 'status'
  // },
  // qty: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   field: 'qty'
  // },
  // totalPrice: {
  //   type: DataTypes.FLOAT,
  //   allowNull: false,
  //   field: 'total_amount'
  // },
// },{
//   tableName: 'orders',
//   createdAt:"created_at",
//   updatedAt:"updated_at"
// });

// // Associations
// Order.belongsTo(User, {
//   foreignKey: 'users_id', // assuming 'users_id' is the FK column in 'orders'
//   as: 'user' // Alias for the association
// });

Order.hasMany(OrderItem, {
  foreignKey: 'orders_id', // FK column in 'orderdetails' table linking to 'orders'
  as: 'orderItems' // Alias for the association
});

export default Order;