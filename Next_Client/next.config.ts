import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: process.env.IMAGE_PROTOCOL === 'https' ? 'https' : 'http',
				hostname: process.env.IMAGE_HOSTNAME || 'localhost',
				port: process.env.IMAGE_HOSTNAME === 'localhost' ? '4000' : '',
			},
		],
	},
};

export default nextConfig;
