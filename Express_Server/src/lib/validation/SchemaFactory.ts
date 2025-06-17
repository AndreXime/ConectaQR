export default class SchemaFactory {
	private validators: ((value: any) => string | null)[] = [];

	private constructor() {}

	// === métodos de instância (públicos) ===
	required() {
		this.validators.push((value) => {
			return value === undefined || value === null ? 'Campo obrigatório' : null;
		});
		return this;
	}

	string() {
		this.validators.push((value) => {
			if (value === undefined || value === null) return null; // Quem cuida é required()
			return typeof value === 'string' ? null : 'Deve ser uma string';
		});
		return this;
	}

	minLength(min: number) {
		this.validators.push((value) => {
			if (value === undefined || value === null) return null; // Quem cuida é required()
			if (typeof value !== 'string') return null; // Quem cuida do tipo é string()
			return value.length < min ? `Deve ter no mínimo ${min} caracteres` : null;
		});
		return this;
	}

	email() {
		this.validators.push((value) => {
			if (typeof value !== 'string') return null; // Quem cuida do tipo é string()
			const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return regex.test(value) ? null : 'Email inválido';
		});
		return this;
	}

	// Executa as validações e retorna array de erros
	validate(value: unknown): string[] {
		const errors: string[] = [];

		for (const validator of this.validators) {
			const result = validator(value);
			if (result) {
				if (result === 'Campo obrigatório') {
					return [result];
				}

				errors.push(result);
			}
		}

		return errors;
	}

	// === métodos de fábrica (estáticos) ===

	/** Inicia um SchemaFactory com string() */
	static string(): SchemaFactory {
		return new SchemaFactory().string();
	}

	/** Inicia um SchemaFactory com minLength(min) */
	static minLength(min: number): SchemaFactory {
		return new SchemaFactory().minLength(min);
	}

	/** Inicia um SchemaFactory com required() */
	static required(): SchemaFactory {
		return new SchemaFactory().required();
	}

	/** Inicia um SchemaFactory com email() */
	static email(): SchemaFactory {
		return new SchemaFactory().email();
	}
}
