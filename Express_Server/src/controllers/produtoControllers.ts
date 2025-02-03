import { Request, Response } from "express";

const createProduto = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json();
};

const updateProduto = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json();
};

const deleteProduto = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send();
};

export default { createProduto, updateProduto, deleteProduto };
