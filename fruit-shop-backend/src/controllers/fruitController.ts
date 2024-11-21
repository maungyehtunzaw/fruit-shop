import { Request, Response } from 'express';
import Fruit from '../models/fruit';

export const getAllFruits = async (req: Request, res: Response) => {
  const fruits = await Fruit.findAll();
  res.json(fruits);
};

export const getFruitsWithLimit = async (req: Request, res: Response) => {
  const limit = parseInt(req.params.limit, 10);
  const fruits = await Fruit.findAll({ limit });
  res.json(fruits);
}
export const getFeaturedFruits = async (req: Request, res: Response) => { 
  try {
    const fruits = await Fruit.findAll({
      where: { isFeatured: 1 },
      limit: 8,
    });
    res.json(fruits);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch featured fruits', details: errorMessage });
  }
};

export const getFruitWithPagination = async (req: Request, res: Response) => {
  try {
    // Get limit and offset from query parameters or set default values
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;
    const offset = (page - 1) * limit;

    // Find fruits with limit and offset, and get the total count
    const { rows: fruits, count: totalItems } = await Fruit.findAndCountAll({
      limit,
      offset,
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Send response with pagination metadata
    res.json({
      data: fruits,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch paginated fruits', details:errorMessage });
  }
};
export const getFruitById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const fruit = await Fruit.findByPk(id);

  if (fruit) {
    res.json(fruit);  // No return, just send the response
  } else {
    res.status(404).json({ message: 'Fruit not found' });
  }
};