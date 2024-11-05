'use client';

import makeStyles from '@/utils/MakeStyles';
import { FaChampagneGlasses, FaUtensils } from 'react-icons/fa6';
import { FaCoffee } from 'react-icons/fa';
import { PiChefHatBold } from 'react-icons/pi';
import { IconType } from 'react-icons';
import Markdown from '../global/Markdown';

const Features: React.FC = () => {
    const basePath = 'landingPage/features/';
    const features: { label: string; icon: IconType; pathToMdFile: string }[] =
        [
            {
                label: 'Cena romántica',
                icon: FaChampagneGlasses,
                pathToMdFile: basePath + 'romantic-dinner',
            },
            {
                label: 'Comida gourmet',
                icon: FaUtensils,
                pathToMdFile: basePath + 'gourmet-food',
            },
            {
                label: 'Ambiente agradable',
                icon: FaCoffee,
                pathToMdFile: basePath + 'pleasant-atmosphere',
            },
            {
                label: 'Chef experto',
                icon: PiChefHatBold,
                pathToMdFile: basePath + 'expert-chef',
            },
        ];

    return (
        <section
            className={makeStyles([
                'bg-champagne',
                'w-full',
                'text-burgundy',
                'pt-8 pb-12 pr-32 pl-32',
            ])}
        >
            <h3 className="text-center text-3xl mb-8">
                Características destacadas
            </h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-x-24 gap-y-8">
                {features.map((feature, key) => (
                    <div key={key}>
                        <feature.icon className="text-gold text-8xl" />
                        <span className="text-xl font-bold">
                            {feature.label}
                        </span>
                        <Markdown
                            filepath={feature.pathToMdFile}
                            className="font-thin"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
