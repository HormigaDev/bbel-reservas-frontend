import MainContent from '@/components/landingPage/MainContent';
import AboutUs from '@/components/landingPage/AboutUs';
import Features from '@/components/landingPage/Features';
import PreviewMenu from '@/components/landingPage/PreviewMenu';
import Testimonials from '@/components/landingPage/Testimonials';
import Footer from '@/components/landingPage/Footer';
import Input from '@/components/global/Input';
import Colors from '@/enums/Colors';

export default function Home() {
    return (
        <div>
            <MainContent />
            <AboutUs />
            <Input color={Colors.Burgundy} type="text" />
            <Features />
            <PreviewMenu />
            <Testimonials />
            <Footer />
        </div>
    );
}
