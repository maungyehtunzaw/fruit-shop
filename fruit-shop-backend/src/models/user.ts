import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email?: string;
 
}

// Define the creation attributes (since id is auto-incremented, it's optional when creating a new user)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend Sequelize's Model class with User attributes and creation attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the User model with Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    }
    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: 'customer',
    // },
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: 'users', // Define the table name
    modelName: 'User', // Define the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default User;