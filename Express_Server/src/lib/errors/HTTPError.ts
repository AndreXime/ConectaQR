export class HTTPError extends Error {
	public HTTPCode: number;

	constructor(HTTPCode: number, message: string) {
		super(message);
		this.HTTPCode = HTTPCode;
		this.name = 'HTTPError';
	}
}
