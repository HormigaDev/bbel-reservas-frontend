'use client';

import makeStyles from '@/utils/MakeStyles';
import Carousel from '../ui/Carousel';
import Markdown from '../ui/Markdown';

const Testimonials: React.FC = () => {
    return (
        <section
            className={makeStyles(['bg-greygrey', 'text-champagne', 'pt-12'])}
        >
            <h3 className="text-center text-gold font-bold text-3xl mb-8">
                Reseñas de clientes
            </h3>
            <Carousel className="text-gold w-full h-64 text-center">
                <div>
                    <h4 className="font-bold text-xl">Mariana López</h4>
                    <Markdown
                        className="text-thin"
                        filepath="landingPage/testimonials/mariana-lopez"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-xl">Carlos Martínez</h4>
                    <Markdown
                        className="text-thin"
                        filepath="landingPage/testimonials/carlos-martinez"
                    />
                </div>
            </Carousel>
        </section>
    );
};

export default Testimonials;
