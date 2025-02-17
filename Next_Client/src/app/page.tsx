import { Footer, Hero, Drawer, Plans, Steps } from '@/components/Home';

export default async function Home() {
	return (
		<Drawer absolute>
			<Hero />
			<Steps />
			<Plans />
			<Footer />
		</Drawer>
	);
}
