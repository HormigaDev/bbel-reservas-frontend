import makeStyles from '@/utils/MakeStyles';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
    FaFacebook,
    FaInstagram,
    FaXTwitter,
    FaWhatsapp,
} from 'react-icons/fa6';
import Line from '../global/Line';

const Footer: React.FC = () => {
    const socialWeb: IconType[] = [
        FaFacebook,
        FaInstagram,
        FaXTwitter,
        FaWhatsapp,
    ];

    return (
        <section
            className={makeStyles([
                'w-full min-h-xl',
                'bg-burgundy',
                'text-champagne',
                'pt-16 pb-16',
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
                {socialWeb.map((Icon, key) => (
                    <Link
                        href="#"
                        key={key}
                        className={makeStyles([
                            'transition-colors duration-200',
                            'hover:text-gold',
                            'text-4xl',
                        ])}
                    >
                        <Icon />
                    </Link>
                ))}
                <Line className="w-64 bg-greydark" />
            </div>
        </section>
    );
};

export default Footer;
