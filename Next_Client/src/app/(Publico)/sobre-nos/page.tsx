import PageClient from './pageClient';

export default async function page() {
    let status = false;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { cache: 'no-store' });
        status = res.ok;
    } catch {
        status = false;
    }

    const serverStatus = {
        online: status,
        lastChecked: new Date().toLocaleTimeString(),
        uptime: '90%',
        version: '1.8',
    };

    return <PageClient serverStatus={serverStatus} />;
}
