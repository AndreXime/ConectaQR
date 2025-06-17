import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export default class ImageManager {
	private constructor() {}
	static apagarImagemporURL(imagemUrl: string) {
		const uploadIndex = imagemUrl.indexOf('uploads');
		const subUrl = uploadIndex !== -1 ? imagemUrl.substring(uploadIndex) : '';
		if (!subUrl) {
			throw Error;
		}

		const filePath = path.join(path.resolve('generated'), subUrl);
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath); // Remove a imagem
		}
	}

	static async GenerateImageFileAndUrl(empresa: string, buffer: Buffer<ArrayBufferLike>) {
		const empresaDir = path.join(path.resolve('generated/uploads'), empresa);

		// Criar a pasta da empresa se não existir
		if (!fs.existsSync(empresaDir)) {
			fs.mkdirSync(empresaDir, { recursive: true });
		}

		const fileName = `${empresa + Date.now()}.webp`;
		const filePath = path.join(empresaDir, fileName);
		const newImagemUrl = `${process.env.PUBLIC_DOMAIN}/uploads/${empresa}/${fileName}`;

		await sharp(buffer).resize({ width: 800 }).toFormat('webp', { quality: 70 }).toFile(filePath);
		return newImagemUrl;
	}
}
