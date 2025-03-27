import { writeFileSync } from 'fs';

const caminhoEnv = '.env';

// Verifica se o arquivo .env já existe
const envContent = `DATABASE_URL="postgres://conectaqr:8tNv5J6A7g5UplF0omFn@localhost:5432/rootDatabase"
JWT_KEY="DASBJK@*!#AJDADOA2313jADBJ!@U$!H@IB$UI!@B$IH!@IASH"
PUBLIC_DOMAIN="http://localhost:4000"
CLIENT_DOMAIN="http://localhost:3000"
PORT="4000"
NODE_ENV="Dev"
ADMIN_KEY="senha123"`;

writeFileSync(caminhoEnv, envContent, 'utf8');
