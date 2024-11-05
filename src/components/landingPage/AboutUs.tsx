'use client';

import makeStyles from '@/utils/MakeStyles';
import Markdown from '../global/Markdown';
import { FaChampagneGlasses } from 'react-icons/fa6';

const AboutUs: React.FC = () => {
    return (
        <section
            className={makeStyles([
                'w-full',
                'bg-greydark',
                'pt-16',
                'pb-24',
                'text-champagne',
                'relative',
            ])}
        >
            <h2 className="text-3xl text-center flex w-full justify-center items-center">
                Sobre nosostros <FaChampagneGlasses className="ml-2" />
            </h2>
            <div className="w-[70%] m-auto">
                <Markdown filepath="landingPage/about-us" />
            </div>
        </section>
    );
};

export default AboutUs;
