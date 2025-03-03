'use client';
import { useState } from 'react';

export default function Maps({ url }: { url: string }) {
	const [Loading, setLoading] = useState(true);

	return (
		<>
			{Loading && <div className="skeleton h-50 w-full"></div>}
			<iframe
				rel="noopener noreferrer nofollow"
				src={url}
				width="1000"
				height="1000"
				className={`border-0 w-full h-full ${Loading ? 'opacity-0 absolute' : 'opacity-100 block'}`}
				allowFullScreen={false}
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				onLoad={() => setLoading(false)}
			/>
		</>
	);
}
