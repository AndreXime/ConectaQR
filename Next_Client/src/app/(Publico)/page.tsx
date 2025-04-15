import { Footer, Hero, Plans, Steps, FeaturesSection, CTASection } from '@/components/Home';

export default async function Home() {
	return (
		<>
			<Hero />
			<Steps />
			<FeaturesSection />
			<Plans />
			<CTASection />
			<Footer />
		</>
	);
}
