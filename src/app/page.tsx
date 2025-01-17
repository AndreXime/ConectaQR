import Footer from '@/components/Home/Footer';
import Hero from '@/components/Home/Hero';
import Navbar from '@/components/Home/NavBar';
import Plans from '@/components/Home/Plans';
import Steps from '@/components/Home/Steps';

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Steps />
			<Plans />
			<Footer />
		</>
	);
}
