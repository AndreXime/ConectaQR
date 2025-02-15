import { Request, Response } from "express";
import { Empresa } from "../../database/models.js";

const getAllDataFromOwnEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Empresa.findUnique({
      where: { id: req.userId },
      include: {
        produtos: {
          select: {
            id: true,
            nome: true,
            preco: true,
            imagemUrl: true,
            categoria: { select: { nome: true } }
          }
        },
        categorias: { select: { id: true, nome: true } }
      }
    });

    if (!data) {
      throw Error;
    }

    res.status(200).json({ message: "Sucesso", data });
  } catch {
    res.status(400).json({ message: "Esse token não pertence a nenhuma empresa" });
  }
};

const updateEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const camposPermitidos = [
      "nome",
      "senha",
      "email",
      "descricao",
      "descricaoCurta",
      "tema",
      "maps",
      "instagram",
      "telefone",
      "emailContato"
    ];

    const dadosAtualizados = Object.fromEntries(
      Object.entries(req.body).filter(
        ([key, value]) => camposPermitidos.includes(key) && value && typeof value === "string"
      )
    );

    if (dadosAtualizados.maps && typeof dadosAtualizados.maps == "string") {
      const match = dadosAtualizados.maps.match(/src="(https:\/\/www\.google\.com\/maps\/embed\?[^"]+)"/);
      if (match && match[1]) {
        dadosAtualizados.maps = match[1]; // Usa o grupo 1 (conteúdo do src)
      } else {
        delete dadosAtualizados.maps;
      }
    }

    if (Object.keys(dadosAtualizados).length === 0) {
      res.status(400).json({ message: "Nenhum campo para atualizar" });
      return;
    }

    const EmpresaAtualizada = await Empresa.update({
      where: { id: req.userId },
      data: dadosAtualizados
    });

    res.status(200).json({ message: "Atualizado com sucesso", data: EmpresaAtualizada });
  } catch {
    res.status(400).json({ message: "Erro ao atualizar" });
  }
};

const deleteEmpresa = async (req: Request, res: Response): Promise<void> => {
  try {
    await Empresa.delete({
      where: { id: req.userId }
    });
    res.status(200).json({ message: "Sucesso" });
  } catch {
    res.status(400).json({ message: "Erro ao remover" });
  }
};

export default {
  getAllDataFromOwnEmpresa,
  updateEmpresa,
  deleteEmpresa
};
