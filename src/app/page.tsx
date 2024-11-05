import MainContent from '@/components/landingPage/MainContent';
import AboutUs from '@/components/landingPage/AboutUs';
import Features from '@/components/landingPage/Features';
import PreviewMenu from '@/components/landingPage/PreviewMenu';
import Testimonials from '@/components/landingPage/Testimonials';

export default function Home() {
    return (
        <div>
            <MainContent />
            <AboutUs />
            <Features />
            <PreviewMenu />
            <Testimonials />
        </div>
    );
}
