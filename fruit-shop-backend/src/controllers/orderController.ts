import { Request, Response } from 'express';
import Order from '../models/order';
import OrderItem from '../models/orderdetail';
import Fruit from '../models/fruit';

// Fetch all orders for a user
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  console.log("Getting orders");

  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  console.log("user id is ", req.user.id);

  try {
    const orders = await Order.findAll({
      where: { users_id: req.user.id },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [{ model: Fruit, as: 'fruit' }],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Fetch a single order by ID for a user
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const order = await Order.findOne({
      where: { id: req.params.id, users_id: req.user.id },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [{ model: Fruit, as: 'fruit' }],
        },
      ],
    });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const { items, total_amount } = req.body;

    // Create the new order entry
    const order = await Order.create({
      users_id: req.user.id,
      qty: items.length,
      total_amount,
    });

    // Map items to include the foreign key for orderId
    if (items && Array.isArray(items)) {
      const orderItems = items.map((item: { fruits_id: number; quantity: number }) => ({
        fruits_id: item.fruits_id,
        qty: item.quantity,
        orders_id: order.id,
      }));
      await OrderItem.bulkCreate(orderItems);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};