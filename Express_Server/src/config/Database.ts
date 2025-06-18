import { PrismaClient } from '../../prisma/client/client.js';
import { exec } from 'child_process';
import { promisify } from 'util';

class Database {
    private static instance: PrismaClient;
    private static execAsync = promisify(exec);

    private static async runMigrations() {
        try {
            const { stderr } = await this.execAsync('npx prisma migrate deploy');
            if (stderr) console.log(stderr);
        } catch (error) {
            console.error('Erro ao rodar migrations:', error);
            throw error;
        }
    }

    private static async connectDB(maxRetries = 5, delay = 2500) {
        while (maxRetries > 0) {
            try {
                await this.instance.$connect(); // Tenta conectar ao banco de dados
                await this.runMigrations();
                console.log('Conexão com o banco de dados estabelecida com sucesso!\n');
                console.log('Migrações do banco de dados foram aplicadas com sucesso.\n');
                return;
            } catch (error) {
                maxRetries--;

                console.error(`Falha ao conectar ao banco de dados: \n${error}\n`);
                console.log(`Tentando novamente em ${delay / 1000} segundos...`);

                await new Promise((resolve) => setTimeout(resolve, delay)); // Aguarda antes de tentar novamente
            }
        }
        throw new Error('Não foi possível conectar ao banco de dados após várias tentativas.');
    }

    static async getInstance() {
        try {
            if (!this.instance) {
                this.instance = new PrismaClient();
                await this.connectDB();
            }
            return this.instance;
        } catch (error) {
            console.error('Erro fatal ao conectar ao banco:', error);
            process.exit(1);
        }
    }
}

const prisma = await Database.getInstance();
export default prisma;
