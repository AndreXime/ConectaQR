export class HTTPValidationError extends Error {
	public HTTPCode: number;
	public Errors: string[];

	constructor(HTTPCode: number, message: string, Errors: string[]) {
		super(message);
		this.HTTPCode = HTTPCode;
		this.name = 'HTTPError';
		this.Errors = Errors;
	}
}
