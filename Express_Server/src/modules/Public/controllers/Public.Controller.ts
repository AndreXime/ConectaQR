import PublicService from '../services/Public.Service.js';
import { HTTPError } from '../../../lib/errors/HTTPError.js';
import { validateParams } from '../dto/paramsDTO.js';

export default class PublicController {
    private PublicService = new PublicService();

    public FindAll = async (req: ExRequest, res: ExResponse) => {
        const data = await this.PublicService.FindAll();

        res.status(200).json({ data });
        return;
    };

    public FindOne = async (req: ExRequest, res: ExResponse) => {
        const { nome } = req.params;

        if (!nome) {
            throw new HTTPError(400, 'É preciso fornecer um nome');
        }

        const data = await this.PublicService.FindPublicEmpresaData(nome);

        res.status(200).json({ ...data });
        return;
    };

    public GetProdutos = async (req: ExRequest, res: ExResponse) => {
        const params = validateParams({
            empresa: req.params.empresa,
            categoria: req.query.categoria as string,
            page: req.query.page as string,
            search: req.query.search as string,
        });

        const data = await this.PublicService.GetProdutos(params);

        console.log(data);

        res.status(200).json(data);
    };
}
