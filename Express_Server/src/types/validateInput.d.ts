type SchemaNomes = 'RegistrarEmpresa' | 'Produtos' | 'LoginEmpresa' | 'UpdateEmpresa' | 'Categoria';

type SchemaType = Record<string, (data: Record<string, unknown>) => string[]>;

export { SchemaNomes, SchemaType };
