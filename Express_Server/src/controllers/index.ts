import Empresa from './private/Empresa.js';
import Categoria from './private/Categoria.js';
import Produto from './private/Produto.js';
import getEmpresaByName from './public/getEmpresaByName.js';
import getAllEmpresas from './public/getAllEmpresas.js';
import getProdutos from './public/getProdutos.js';

import loginEmpresa from './auth/loginEmpresa.js';
import registerEmpresa from './auth/registerEmpresa.js';
import postFeedback from './feedback/postFeedback.js';
import getFeedback from './feedback/getFeedback.js';

export const Feedback = { postFeedback, getFeedback };
export const Auth = { loginEmpresa, registerEmpresa };
export const Public = { getEmpresaByName, getAllEmpresas, getProdutos };
export const Private = { Empresa, Categoria, Produto };
