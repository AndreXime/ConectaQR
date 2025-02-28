export default async function montarQueryURL(
	page: string | undefined,
	categoria: string | undefined,
	search: string | undefined
) {
	const params: string[] = [];

	if (page) params.push(`page=${page}`);
	if (categoria) params.push(`categoria=${categoria}`);
	if (search) params.push(`search=${search}`);

	if (params.length > 0) {
		return `?${params.join('&')}`;
	}

	return '';
}
