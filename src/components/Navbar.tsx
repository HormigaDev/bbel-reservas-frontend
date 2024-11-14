'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { companionName } from '@/app.data.json';
import { usePathname } from 'next/navigation';
import SessionService from '@/services/SessionService';
import makeStyles from '@/utils/MakeStyles';
import { FaRightToBracket } from 'react-icons/fa6';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [authenticated, setAuthenticated] = useState(false);
    const [userLetter, setUserLetter] = useState('');
    const options: {
        label: string;
        path: string;
        requiresAuth?: boolean;
    }[] = [
        { label: 'Inicio', path: '/' },
        { label: 'Reservar mesa', path: '/reserve', requiresAuth: true },
        { label: 'Menú', path: '/menu', requiresAuth: true },
        { label: 'Contacto', path: '/contact', requiresAuth: true },
    ];
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const isAuthenticated = SessionService.isAuthenticated();
        setUserLetter(
            isAuthenticated ? SessionService.getUser().getInitial() : ''
        );
        setAuthenticated(isAuthenticated);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        SessionService.logout();
        window.location.href = '/';
    };

    return (
        <nav
            className={makeStyles([
                'transition-colors',
                'duration-300',
                'ease-in-out',
                'p-4',
                'fixed',
                'top-0',
                'w-full',
                'z-10',
                {
                    condition: isScrolled,
                    onTrue: 'bg-burgundy shadow-lg',
                    onFalse: [
                        'bg-gradient-to-b',
                        'from-greydark',
                        'via-greydark',
                        'to-transparent',
                    ],
                },
            ])}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-champagne text-2xl font-bold">
                    <Link href="/">{companionName}</Link>
                </div>
                <ul className="flex space-x-10">
                    {options
                        .filter(
                            (o) =>
                                !o.requiresAuth ||
                                (o.requiresAuth && authenticated)
                        )
                        .map((option, key) => {
                            const isActive = {
                                condition: pathname === option.path,
                                onTrue: 'font-bold text-gold',
                                onFalse: '',
                            };
                            return (
                                <li key={key}>
                                    <Link
                                        href={option.path}
                                        className={makeStyles([
                                            'text-champagne',
                                            'hover:text-gold',
                                            'transition-colors',
                                            'duration-200',
                                            'ease-in-out',
                                            'flex justify-center items-center',
                                            isActive,
                                        ])}
                                    >
                                        {option.label}
                                    </Link>
                                </li>
                            );
                        })}
                    <li>
                        <Link
                            href={authenticated ? '/myaccount' : '/auth/login'}
                            className={makeStyles([
                                'text-champagne',
                                'hover:text-gold',
                                'transition-colors',
                                'duration-200',
                                'ease-in-out',
                                'flex justify-center items-center',
                                {
                                    condition: pathname === '/auth/login',
                                    onTrue: 'font-bold text-gold',
                                    onFalse: '',
                                },
                            ])}
                        >
                            {authenticated ? 'Mi cuenta' : 'Entrar'}
                            {authenticated ? (
                                <div
                                    className={makeStyles([
                                        'rounded-full text-purewhite',
                                        'flex justify-center items-center',
                                        'w-6 h-6',
                                        'ml-2',
                                        'transition-colors duration-200',
                                        {
                                            condition: isScrolled,
                                            onTrue: 'bg-gold',
                                            onFalse: 'bg-burgundy',
                                        },
                                    ])}
                                >
                                    {userLetter}
                                </div>
                            ) : (
                                <FaRightToBracket className="ml-2" />
                            )}
                        </Link>
                    </li>
                    {authenticated && (
                        <li
                            className={makeStyles([
                                'text-champagne',
                                'hover:text-gold',
                                'transition-colors',
                                'duration-200',
                                'ease-in-out',
                                'flex justify-center items-center',
                                'relative',
                                'tooltip tooltip-champagne tooltip-text-burgundy',
                                'tooltip-bottom-3',
                            ])}
                            data-description="Salir"
                        >
                            <Link href="#logout" onClick={handleLogout}>
                                <FaRightToBracket />
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
