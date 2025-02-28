import path from "path";
import fs from "fs";

export function apagarImagemporURL(imagemUrl: string) {
  const uploadIndex = imagemUrl.indexOf("uploads");
  const subUrl = uploadIndex !== -1 ? imagemUrl.substring(uploadIndex) : "";
  if (!subUrl) {
    throw Error;
  }

  const filePath = path.join(path.resolve("generated"), subUrl);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // Remove a imagem
  }
}
/** 
Essa função: 
- Cria a pasta da empresa se não existir
- Retorna um caminho para uma imagem de um novo produto 
- Retorna a Url da imagem para acessa-la
*/
export function FilePath_Url_Maker(empresa: string) {
  const empresaDir = path.join(path.resolve("generated/uploads"), empresa);

  // Criar a pasta da empresa se não existir
  if (!fs.existsSync(empresaDir)) {
    fs.mkdirSync(empresaDir, { recursive: true });
  }

  const fileName = `${empresa + Date.now()}.webp`;
  const filePath = path.join(empresaDir, fileName);
  const newImagemUrl = `${process.env.PUBLIC_DOMAIN}/uploads/${empresa}/${fileName}`;

  return { filePath, newImagemUrl };
}
