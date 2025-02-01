import { Request, Response } from "express";

const getAllEmpresas = (req: Request, res: Response): void => {
  res.status(200).json();
};

const getEmpresasByName = (req: Request, res: Response): void => {
  res.status(200).json();
};

const createEmpresas = (req: Request, res: Response): void => {
  res.status(200).json();
};

const updateEmpresa = (req: Request, res: Response): void => {
  res.status(200).json();
};

const deleteEmpresa = (req: Request, res: Response): void => {
  res.status(200).send();
};

export default { getAllEmpresas, getEmpresasByName, createEmpresas, updateEmpresa, deleteEmpresa };
