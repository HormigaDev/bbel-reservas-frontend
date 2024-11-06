import makeStyles from '@/utils/MakeStyles';
import Image from 'next/image';
import Markdown from '../global/Markdown';

const PreviewMenu: React.FC = () => {
    const basePath = 'landingPage/featured-dishes/';
    const featuredDishes: {
        alt: string;
        imagePath: string;
        mdFile: string;
    }[] = [
        {
            alt: 'Salmone in Crosta di Pistacchio con Purè di Cavolfiore al Tartufo',
            imagePath: '/images/salmone-in-crosta.jpg',
            mdFile: 'salmone-in-crosta',
        },
        {
            alt: 'Risotto ai Funghi Porcini e Tartufo Nero',
            imagePath: '/images/risotto-ai-funghi.jpg',
            mdFile: 'risotto-ai-funghi',
        },
        {
            alt: 'Tagliatelle al Limone con Gamberi e Zucchine',
            imagePath: '/images/tagliatelle-al-limone.jpg',
            mdFile: 'tagliatelle-al-limone',
        },
    ];

    return (
        <section
            className={makeStyles([
                'bg-marfil',
                'w-full',
                'text-greydark',
                'pt-8 pb-12 pr-32 pl-32',
            ])}
        >
            <h3 className="text-center text-3xl mb-8">Platos destacados</h3>
            <div className="grid grid-cols-3 gap-x-16">
                {featuredDishes.map((plate, key) => (
                    <div
                        key={key}
                        className={makeStyles([
                            'pl-4 pr-4 pt-2 pb-4',
                            'border border-copper w-full',
                            'rounded',
                        ])}
                    >
                        <div className="relative w-full h-48">
                            <Image
                                alt={plate.alt}
                                src={plate.imagePath}
                                fill
                                className="rounded"
                            />
                        </div>
                        <Markdown
                            filepath={basePath + plate.mdFile}
                            className="text-thin"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PreviewMenu;
