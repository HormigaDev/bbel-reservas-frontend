'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import generateId from '@/utils/generateId';
import makeStyles from '@/utils/MakeStyles';
import { useState } from 'react';

export default function Login() {
    const formId = generateId();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
    }[][] = [
        [
            { label: 'Nombre', field: 'name', type: 'text' },
            { label: 'Correo electrónico', field: 'email', type: 'email' },
        ],
        [
            { label: 'Contraseña', field: 'password', type: 'password' },
            {
                label: 'Confirmar contraseña',
                field: 'confirmPassword',
                type: 'password',
            },
        ],
        [
            {
                label: 'Número de teléfono',
                field: 'phone',
                type: 'text',
                mask: '(####) #######',
                pattern: /^\(0?\d{3}\)?\s?\d{7}$/,
            },
        ],
    ];

    return (
        <div
            className={makeStyles([
                'w-full h-full',
                'flex justify-center items-center',
                'text-burgundy',
            ])}
        >
            <form
                id={formId}
                className={makeStyles([
                    'p-8 bg-purewhite',
                    'min-w-64',
                    'rounded',
                ])}
            >
                {groups.map((group, key) => (
                    <div
                        className="w-full flex justify-center items-center gap-4"
                        key={key}
                    >
                        {group.map((data, i) => (
                            <div key={i}>
                                <label className="text-copper font-bold">
                                    {data.label}
                                </label>
                                <Input
                                    className="w-full"
                                    type={data.type}
                                    update={handleChange(data.field)}
                                    mask="(####) #######"
                                    pattern={data.pattern}
                                    color="copper"
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <div className="mt-4 text-center">
                    <Button label="Registrarse" />
                </div>
            </form>
        </div>
    );
}
