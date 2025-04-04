import { Footer, Hero, Drawer, Plans, Steps } from '@/components/Home';

export default async function Home() {
	return (
		<Drawer>
			<Hero />
			<Steps />
			<Plans />
			<Footer />
		</Drawer>
	);
}
