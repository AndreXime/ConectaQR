import { Footer, Hero, Drawer, Plans, Steps, FeaturesSection, CTASection } from '@/components/Home';

export default async function Home() {
	return (
		<Drawer absolute>
			<Hero />
			<Steps />
			<FeaturesSection />
			<Plans />
			<CTASection />
			<Footer />
		</Drawer>
	);
}
