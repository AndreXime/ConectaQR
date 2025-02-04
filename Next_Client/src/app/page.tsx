import { Footer, Hero, Drawer, Plans, Steps } from '@/components/Home';

export default function Home() {
	return (
		<>
			<Drawer absolute>
				<Hero />
				<Steps />
				<Plans />
				<Footer />
			</Drawer>
		</>
	);
}
