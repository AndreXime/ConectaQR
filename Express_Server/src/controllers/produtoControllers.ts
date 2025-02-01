import { Request, Response } from "express";

const getAllProduto = (req: Request, res: Response): void => {
  res.status(200).json();
};

const getProdutoByCategoria = (req: Request, res: Response): void => {
  res.status(200).json();
};

const createProduto = (req: Request, res: Response): void => {
  res.status(200).json();
};

const updateProduto = (req: Request, res: Response): void => {
  res.status(200).json();
};

const deleteProduto = (req: Request, res: Response): void => {
  res.status(200).send();
};

export default { getAllProduto, getProdutoByCategoria, createProduto, updateProduto, deleteProduto };
