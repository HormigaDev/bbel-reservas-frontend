import makeStyles from '@/utils/MakeStyles';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
    FaFacebook,
    FaInstagram,
    FaXTwitter,
    FaWhatsapp,
    FaEnvelope,
} from 'react-icons/fa6';
import Line from '../global/Line';

const Footer: React.FC = () => {
    const socialWeb: { Icon: IconType; label: string }[] = [
        { Icon: FaFacebook, label: 'bbelreserved' },
        { Icon: FaInstagram, label: '@bbelreserved' },
        { Icon: FaXTwitter, label: '@bbelreserved' },
        { Icon: FaWhatsapp, label: '+55 (49) 9 99578-8557' },
        { Icon: FaEnvelope, label: 'reservar@bbelreserved.com' },
    ];

    return (
        <section
            className={makeStyles([
                'w-full min-h-xl',
                'bg-burgundy',
                'text-champagne',
                'pt-16 pb-8',
            ])}
        >
            <h3 className="text-center text-6xl">BBEL Reserved</h3>
            <h5 className="text-center text-lg mt-4">
                Un refugio para los amantes de la buena mesa
            </h5>
            <div
                className={makeStyles([
                    'flex items-center justify-center',
                    'text-2xl gap-12 mt-12',
                ])}
            >
                {socialWeb.map(
                    (
                        { Icon, label }: { Icon: IconType; label: string },
                        key: number
                    ) => (
                        <Link
                            href="#"
                            key={key}
                            className={makeStyles([
                                'transition-colors duration-200',
                                'hover:text-gold',
                                'text-4xl',
                                'tooltip',
                                'relative',
                            ])}
                            data-description={label}
                        >
                            <Icon />
                        </Link>
                    )
                )}
            </div>
            <Line className="w-[80%] bg-champagne m-auto" />
            <div className="text-center">
                <Link
                    href="#"
                    className="mr-2 hover:text-gold transition-colors duration-200"
                >
                    Términos y condiciones
                </Link>
                <span className="text-greydark">|</span>
                <Link
                    href="#"
                    className="ml-2 mr-2 hover:text-gold transition-colors duration-200"
                >
                    Política de privacidad
                </Link>
                <span className="text-greydark">|</span>
                <Link
                    href="#"
                    className="ml-2 hover:text-gold transition-colors duration-200"
                >
                    Política de reservas
                </Link>
            </div>
            <div className="text-center mt-12">
                <small className="text-thin">
                    &copy; 2024 BBEL Reserved. Todos los derechos reservados
                </small>
            </div>
        </section>
    );
};

export default Footer;
