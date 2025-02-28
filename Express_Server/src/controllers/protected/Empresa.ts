import { Request, Response } from "express";
import { Empresa } from "../../database/models.js";
import fs from "fs/promises";

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
    const dadosAtualizados = {
      nome: req.body?.nome,
      senha: req.body?.senha,
      email: req.body?.email,
      descricao: req.body?.descricao || "",
      tema: req.body?.tema || "",
      maps: req.body?.maps || "",
      instagram: req.body?.instagram || "",
      telefone: req.body?.telefone || "",
      emailContato: req.body?.emailContato || ""
    };

    if (!dadosAtualizados.nome || !dadosAtualizados.email) {
      res.status(400).json({ message: "Voce não pode deletar campos obrigatorios!" });
      return;
    } else {
      dadosAtualizados.nome = (dadosAtualizados.nome as string).toLowerCase().replace(/\s+/g, "-");
    }
    /* Usuario não quis alterar senha deve-se tirar do objeto */
    if (!dadosAtualizados.senha) {
      delete dadosAtualizados.senha;
    }

    /** Extraindo a url do iframe do google maps, senão estiver dos parametros é deletado */
    if (dadosAtualizados.maps && typeof dadosAtualizados.maps == "string") {
      const match = dadosAtualizados.maps.match(/src="(https:\/\/www\.google\.com\/maps\/embed\?[^"]+)"/);
      if (match && match[1]) {
        dadosAtualizados.maps = match[1];
      } else {
        delete dadosAtualizados.maps;
      }
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
    const empresa = await Empresa.delete({
      where: { id: req.userId },
      select: { nome: true, produtos: { select: { imagemUrl: true } } }
    });
    await fs.rm("./generated/uploads/" + empresa.nome, { recursive: true, force: true });
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
