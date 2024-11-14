'use client';

import ColorInterface from '@/interfaces/ColorInterface';
import formatInput from '@/utils/formatInput';
import makeStyles from '@/utils/MakeStyles';
import { useState } from 'react';
import { FaAsterisk } from 'react-icons/fa6';

interface NumberInputProps extends ColorInterface {
    type?: 'integer' | 'float';
    defaultValue?: number;
    decimals?: number;
    required?: boolean;
    shadow?: boolean;
    updater?: (value: number) => void;
    outline?: boolean;
    className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
    type = 'integer',
    defaultValue = 0,
    decimals = 2,
    required = false,
    color = 'burgundy',
    outline = false,
    shadow = false,
    updater = (value: number) => value,
    className = '',
}) => {
    const [inputValue, setInputValue] = useState(String(defaultValue));
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const filterNumber = () => {
        setIsFocused(false);
        if (inputValue === '') {
            setInputValue(
                (0).toFixed(type === 'float' ? decimals : 0).replace('.', ',')
            );
            updater(0);
            return;
        }
        const toFixed: number =
            type === 'integer' ? 0 : type === 'float' ? decimals : 0;
        const number: string = formatInput(inputValue, toFixed);

        setInputValue(number);
        updater(Number(number.replace(',', '.')));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            filterNumber();
        }
    };

    const classes = makeStyles([
        'rounded-md',
        { condition: shadow && isFocused, onTrue: `shadow-${color}` },
        { condition: outline, onTrue: 'bg-transparent' },
        `text-${color}`,
        `placeholder-${color}`,
        'placeholder-opacity-50',
        'focus:outline-none',
        'text-sm',
    ]);
    return (
        <div
            className={makeStyles([
                'mt-2 mb-2 bg-marfil',
                'border-2',
                `border-${color}`,
                'rounded p-1 px-2',
                'flex flex-col',
                'relative',
                'h-9',
                {
                    condition: outline,
                    onTrue: 'bg-transparent',
                    onFalse: {
                        condition: color === 'marfil' || color === 'purewhite',
                        onTrue: 'bg-greydark',
                        onFalse: 'bg-purewhite',
                    },
                },
                className,
            ])}
        >
            <input
                value={inputValue}
                className={classes}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={filterNumber}
                onFocus={() => setIsFocused(true)}
            />
            {required && (
                <div
                    className={makeStyles([
                        'absolute top-0 right-0 m-2',
                        `text-${color}`,
                    ])}
                >
                    <FaAsterisk />
                </div>
            )}
        </div>
    );
};

export default NumberInput;
