'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import makeStyles from '@/utils/MakeStyles';
import { useState, useRef, useEffect } from 'react';
import SessionService from '@/services/SessionService';
import HttpService from '@/services/HttpService';
import Message from '@/components/ui/Message';
import Link from 'next/link';
import RenovableTimeout from '@/utils/RenovableTimeout';
import Check from '@/components/ui/Check';

export default function Login() {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const timer = useRef<RenovableTimeout | null>(null);
    const http = new HttpService();

    useEffect(() => {
        if (SessionService.isAuthenticated()) {
            window.location.href = '/';
        }
    }, []);

    const login = () => {
        http.post('/auth/login', {
            email,
            password,
        }).then(({ token, user }) => {
            if (token) {
                SessionService.saveToken(token);
                SessionService.saveUser(user);
                window.location.href = '/';
            }
        });
    };

    const handleRegister = () => {
        let msg = '';
        if (!email) {
            msg = 'El correo electrónico es obligatorio';
        } else if (!password) {
            msg = 'La contraseña es obligatoria';
        }
        if (msg.length) {
            if (!timer.current) {
                timer.current = new RenovableTimeout();
                timer.current.setCallback(() => {
                    setMessage('');
                });
            }
            setMessage(msg);
            if (timer.current.timeout <= 0) {
                timer.current.run(5);
            } else {
                timer.current.setTime(5);
            }
            return;
        }
        login();
    };

    const handleChange = (field: string) => {
        switch (field) {
            case 'email':
                return (value: string) => setEmail(value);
            case 'password':
                return (value: string) => setPassword(value);
            default:
                return (value: string) => value;
        }
    };

    const groups: {
        label: string;
        field: string;
        type: 'email' | 'password';
    }[][] = [
        [
            {
                label: 'Correo electrónico',
                field: 'email',
                type: 'email',
            },
        ],
        [
            {
                label: 'Contraseña',
                field: 'password',
                type: 'password',
            },
        ],
    ];

    return (
        <div
            className={makeStyles([
                'w-full h-full',
                'flex justify-center items-center',
            ])}
        >
            <div className="absolute top-0 left-0 bg-greydark opacity-80 w-full h-full z-[-1]"></div>
            <form
                className={makeStyles([
                    'p-8 bg-marfil',
                    'rounded',
                    'min-w-96',
                    'max-w-96',
                ])}
            >
                <h2 className="text-4xl text-center mb-4 text-copper">
                    BBEL Reserved
                </h2>
                <h4 className="text-md text-thin text-center mb-6 text-copper">
                    Inicia sesión para continuar
                </h4>
                <Message
                    message={message}
                    color="burgundy"
                    className="mb-4 text-xs"
                />
                {groups.map((group, key) => (
                    <div
                        className="w-full flex justify-center items-center gap-4"
                        key={key}
                    >
                        {group.map((data, i) => (
                            <div key={i} className="w-full">
                                <label className="text-gold font-bold">
                                    {data.label}
                                </label>
                                <Input
                                    className="w-full mb-6"
                                    type={data.type}
                                    update={handleChange(data.field)}
                                    color="gold"
                                    required
                                    shadow
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <div className="text-left text-md text-gold my-1">
                    <small>
                        No tines una cuenta?{' '}
                        <Link
                            href="/auth/register"
                            className="underline text-copper font-bold"
                        >
                            Regístrate
                        </Link>
                    </small>
                </div>
                <Check color="copper">Recordarme</Check>
                <div className="mt-2 text-center">
                    <Button
                        label="Iniciar sesión"
                        color="gold"
                        onClick={handleRegister}
                        className="w-[60%]"
                    />
                </div>
            </form>
        </div>
    );
}
