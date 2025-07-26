import { NextQueryType } from '../../../types/global';

export default async function montarQueryURL(queryRaw: NextQueryType) {
    if (!queryRaw) {
        return '';
    }
    const params: string[] = [];

    if (queryRaw.page) params.push(`page=${queryRaw.page}`);
    if (queryRaw.categoria) params.push(`categoria=${queryRaw.categoria}`);
    if (queryRaw.search) params.push(`search=${queryRaw.search}`);

    if (params.length > 0) {
        return `?${params.join('&')}`;
    }

    return '';
}
