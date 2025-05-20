const validateString = (field: string, value: unknown, minLength = 1, optional = false): string[] => {
	if (optional && !value) {
		return [];
	}
	if (typeof value !== 'string') {
		return [`O campo '${field}' deve ser um texto.`];
	} else if (value.trim().length < minLength) {
		return [`O campo '${field}' deve ter no mínimo ${minLength} caracteres.`];
	}
	return [];
};

const validateEmail = (field: string, value: unknown, optional = false): string[] => {
	if (optional && !value) {
		return [];
	}
	const errors = validateString(field, value, 1);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (typeof value === 'string' && !emailRegex.test(value.trim())) {
		errors.push(`O campo '${field}' deve ser um e-mail válido.`);
	}
	return errors;
};

const validateNumber = (field: string, value: unknown): string[] => {
	if (typeof value !== 'number' || isNaN(value)) {
		return [`O campo '${field}' deve ser um número válido.`];
	}
	return [];
};

const validateExtraFields = (data: Record<string, unknown>, allowedFields: string[]): string[] => {
	try {
		if (data) {
			const extraFields = Object.keys(data).filter((key) => !allowedFields.includes(key));
			return extraFields.map((key) => `O campo '${key}' não é permitido.`);
		}
		throw Error;
	} catch {
		return ['Nenhum campo encontrado'];
	}
};

export { validateEmail, validateExtraFields, validateNumber, validateString };
