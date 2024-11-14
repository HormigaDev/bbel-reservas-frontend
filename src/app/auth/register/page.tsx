'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import makeStyles from '@/utils/MakeStyles';
import { useState, useRef, useEffect } from 'react';
import SessionService from '@/services/SessionService';
import HttpService from '@/services/HttpService';
import Message from '@/components/ui/Message';
import Check from '@/components/ui/Check';
import Link from 'next/link';
import RenovableTimeout from '@/utils/RenovableTimeout';

export default function Register() {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const timer = useRef<RenovableTimeout | null>(null);
    const http = new HttpService();

    useEffect(() => {
        if (SessionService.isAuthenticated()) {
            window.location.href = '/';
        }
    }, []);

    const register = () => {
        console.log(phone);
        http.post('/auth/register', {
            name,
            email,
            phone,
            password,
        }).then(({ token, user }) => {
            if (token) {
                SessionService.saveUser(user);
                SessionService.saveToken(token);
                window.location.href = '/';
            }
        });
    };

    const handleRegister = () => {
        let msg = '';
        if (!name) {
            msg = 'El nombre es obligatorio';
        } else if (!email) {
            msg = 'El correo electrónico es obligatorio';
        } else if (!password) {
            msg = 'La contraseña es obligatoria';
        } else if (password !== confirmPassword) {
            msg =
                'Las contraseña y la confirmación de la contraseña deben ser iguales';
        } else if (!phone) {
            msg = 'El número de teléfono es obligatorio';
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
        register();
    };

    const handleChange = (field: string) => {
        switch (field) {
            case 'name':
                return (value: string) => setName(value);
            case 'email':
                return (value: string) => setEmail(value);
            case 'phone':
                return (value: string) => setPhone(value);
            case 'password':
                return (value: string) => setPassword(value);
            case 'confirmPassword':
                return (value: string) => setConfirmPassword(value);
            default:
                return (value: string) => value;
        }
    };

    const groups: {
        label: string;
        field: string;
        type: 'text' | 'email' | 'date' | 'time' | 'textarea' | 'password';
        pattern?: RegExp;
        mask?: string;
        required?: boolean;
    }[][] = [
        [
            { label: 'Nombre', field: 'name', type: 'text', required: true },
            {
                label: 'Correo electrónico',
                field: 'email',
                type: 'email',
                required: true,
            },
        ],
        [
            {
                label: 'Contraseña',
                field: 'password',
                type: 'password',
                required: true,
            },
            {
                label: 'Confirmar contraseña',
                field: 'confirmPassword',
                type: 'password',
                required: true,
            },
        ],
        [
            {
                label: 'Número de teléfono',
                field: 'phone',
                type: 'text',
                mask: '(####) #######',
                pattern: /^\(0?\d{3}\)?\s?\d{7}$/,
                required: true,
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
                    'min-w-112',
                    'max-w-112',
                ])}
            >
                <h2 className="text-4xl text-center mb-4 text-copper">
                    BBEL Reserved
                </h2>
                <h4 className="text-md text-thin text-center mb-6 text-copper">
                    Regístrate para continuar
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
                            <div key={i}>
                                <label className="text-gold font-bold">
                                    {data.label}
                                </label>
                                <Input
                                    className="w-full mb-6"
                                    type={data.type}
                                    update={handleChange(data.field)}
                                    mask={data.mask ?? '*'}
                                    pattern={data.pattern}
                                    color="gold"
                                    required={data.required}
                                    shadow
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <div className="text-left text-md text-gold my-1">
                    <small>
                        Ya tienes una cuenta?{' '}
                        <Link
                            href="/auth/login"
                            className="underline text-copper font-bold"
                        >
                            Inicia sesión
                        </Link>
                    </small>
                </div>
                <Check color="copper" className="my-2">
                    Acepto los{' '}
                    <Link href="#" className="underline font-bold text-copper">
                        términos y condiciones
                    </Link>{' '}
                    y{' '}
                    <Link href="#" className="underline font-bold text-copper">
                        política de privacidad
                    </Link>
                </Check>
                <div className="mt-2 text-center">
                    <Button
                        label="Registrarse"
                        color="gold"
                        onClick={handleRegister}
                        className="w-[60%]"
                    />
                </div>
            </form>
        </div>
    );
}
