import { Footer, Hero, Plans, Steps, FeaturesSection, CTASection } from '@/module/Home/components';

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
