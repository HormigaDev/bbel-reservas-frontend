'use client';

import makeStyles from '@/utils/MakeStyles';
import { useState } from 'react';
import generateId from '@/utils/generateId';
import { FaAsterisk } from 'react-icons/fa6';
import applyMask from '@/utils/applyMask';

enum InputTypes {
    Text = 'text',
    Email = 'email',
    Date = 'date',
    Time = 'time',
    Textarea = 'textarea',
    Integer = 'integer',
    Float = 'float',
}

interface InputProps {
    type?: 'text' | 'email' | 'date' | 'time' | 'textarea' | 'password';
    color?:
        | 'burgundy'
        | 'champagne'
        | 'copper'
        | 'gold'
        | 'greygrey'
        | 'greydark'
        | 'marfil'
        | 'purewhite';
    shadow?: boolean;
    placeholder?: string;
    required?: boolean;
    update?: (value: string) => void;
    decimals?: number;
    defaultValue?: string;
    outline?: boolean;
    className?: string;
    pattern?: RegExp;
    mask?: string;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    color = 'burgundy',
    placeholder = '',
    required = false,
    shadow = false,
    update = (value: string) => value,
    defaultValue = '',
    outline = false,
    className = '',
    pattern = /^.*$/,
    mask = '*',
}) => {
    if (!pattern) pattern = /^.*$/;
    const inputId = generateId();
    const [inputValue, setInputValue] = useState(defaultValue);

    const filterDate = () => {
        if (inputValue === '') {
            setInputValue('');
            return;
        }

        let date: string = inputValue;
        const dateRegex =
            /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2}|2100)$/;
        if (!dateRegex.test(date)) {
            setInputValue('');
            return;
        }
        const [d, m, y] = date.split('/');
        date = `${('0' + d).slice(-2)}/${('0' + m).slice(-2)}/${y}`;
        setInputValue(date);
        update(date);
    };

    const filterEmail = () => {
        const email: string = inputValue;
        const emailRegex =
            /^[\w\.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
        if (email === '' || !emailRegex.test(email)) {
            setInputValue('');
            return;
        }
        setInputValue(email);
        update(email);
    };

    const filterTime = () => {
        const time = inputValue;
        const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
        if (time === '' || !timeRegex.test(time)) {
            setInputValue('');
            return;
        }
        setInputValue(time);
        update(time);
    };

    const filterText = () => {
        const text = applyMask(
            inputValue,
            pattern.test(inputValue) ? '*' : mask
        );
        if (!pattern.test(text)) {
            setInputValue('');
            return;
        }
        setInputValue(text);
        update(inputValue);
    };

    let handleFunction: () => void;

    switch (type) {
        case InputTypes.Date:
            handleFunction = filterDate;
            break;
        case InputTypes.Email:
            handleFunction = filterEmail;
            break;
        case InputTypes.Time:
            handleFunction = filterTime;
            break;
        default:
            handleFunction = filterText;
            break;
    }

    const handleKeyDown = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === 'Enter') {
            handleFunction();
        }
    };

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setInputValue(e.target.value);
    };

    const classes = makeStyles([
        'rounded-md',
        { condition: shadow, onTrue: `shadow-${color}` },
        'bg-transparent',
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
                'h-9',
                'relative',
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
            {type === InputTypes.Textarea ? (
                <textarea
                    className={classes}
                    name={inputId}
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleFunction}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    name={inputId}
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleFunction}
                    onKeyDown={handleKeyDown}
                    className={classes}
                    placeholder={placeholder}
                    type={type === 'password' ? 'password' : 'text'}
                />
            )}
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

export default Input;
