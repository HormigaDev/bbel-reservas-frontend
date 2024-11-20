'use client';

import MainContent from '@/app/landingPage/MainContent';
import AboutUs from '@/app/landingPage/AboutUs';
import Features from '@/app/landingPage/Features';
import PreviewMenu from '@/app/landingPage/PreviewMenu';
import Testimonials from '@/app/landingPage/Testimonials';
import Footer from '@/app/landingPage/Footer';

export default function Home() {
    return (
        <div>
            <MainContent />
            <AboutUs />
            <Features />
            <PreviewMenu />
            <Testimonials />
            <Footer />
        </div>
    );
}
