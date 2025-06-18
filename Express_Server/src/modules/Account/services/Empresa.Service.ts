import { HTTPError } from '../../../lib/errors/HTTPError.js';
import ImageManager from '../../../lib/utils/ImageManager.js';
import { UpdateEmpresaDTO } from '../dto/EmpresaDTO.js';
import EmpresaRepository from '../repositories/Empresa.Repository.js';
import fs from 'fs/promises';

export default class CategoriaService {
    private repository: EmpresaRepository;

    constructor() {
        this.repository = new EmpresaRepository();
    }

    async getEmpresa(empresaId: string) {
        const empresa = await this.repository.findByIdWithRelations(empresaId);
        if (!empresa) {
            throw new Error('Empresa não encontrada');
        }
        return empresa;
    }

    async updateEmpresa(empresaId: string, body: UpdateEmpresaDTO, file?: Express.Multer.File) {
        const {
            nome,
            senha,
            email,
            descricao = '',
            tema = '',
            maps = '',
            instagram = '',
            telefone = '',
            emailContato = '',
            cidade = '',
            foto = '',
        } = body;

        if (!nome || !email) {
            throw new HTTPError(400, 'Você não pode deletar campos obrigatórios!');
        }

        const dataToUpdate: UpdateEmpresaDTO = {
            nome: nome.toLowerCase().replace(/\s+/g, '-'),
            senha,
            email,
            descricao,
            tema,
            maps,
            instagram,
            telefone,
            emailContato,
            cidade,
        };

        if (!senha) {
            delete dataToUpdate.senha;
        }

        if (maps) {
            const match = maps.match(/src="(https:\/\/www\.google\.com\/maps\/embed\?[^"]+)"/);
            if (match && match[1]) {
                dataToUpdate.maps = match[1];
            } else {
                delete dataToUpdate.maps;
            }
        }

        if (file) {
            const empresa = await this.repository.findById(empresaId);
            if (!empresa) throw new HTTPError(400, 'Empresa não encontrada');

            if (empresa.foto) {
                ImageManager.apagarImagemporURL(empresa.foto);
            }

            const newImagemUrl = await ImageManager.GenerateImageFileAndUrl(empresa.nome, file.buffer);

            dataToUpdate.foto = newImagemUrl;
        }

        if (foto === '') {
            delete dataToUpdate.foto;
        }

        const empresaAtualizada = await this.repository.update(empresaId, dataToUpdate);

        return empresaAtualizada;
    }

    async deleteEmpresa(empresaId: string) {
        await this.repository.deleteCategorias(empresaId);
        await this.repository.deleteProdutos(empresaId);
        const empresa = await this.repository.delete(empresaId);
        await fs.rm('./generated/uploads/' + empresa.nome, { recursive: true, force: true });
        return { message: 'Sucesso' };
    }
}
