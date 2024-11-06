'use client';

import makeStyles from '@/utils/MakeStyles';
import Colors from '@/enums/Colors';
import { useState } from 'react';
import generateId from '@/utils/generateId';
import { FaAsterisk } from 'react-icons/fa6';

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
    type: 'text' | 'email' | 'date' | 'time' | 'textarea' | 'integer' | 'float';
    color: Colors;
    shadow?: boolean;
    placeholder?: string;
    required?: boolean;
    label?: string;
    updater?: () => void;
    decimals?: number;
    defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
    type,
    color,
    label = '',
    placeholder = '',
    required = false,
    shadow = false,
    updater = (value: string | number) => value,
    decimals = 2,
    defaultValue = '',
}) => {
    const inputId = generateId();
    const [inputValue, setInputValue] = useState(defaultValue);

    const filterNumber = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (e.target.value === '') {
            setInputValue('');
            return;
        }
        const number = Number(e.target.value);

        if (isNaN(number)) {
            setInputValue('0');
        }
        if (type === InputTypes.Integer) {
            setInputValue(String(number.toFixed(0)));
        }
        if (type === InputTypes.Float) {
            setInputValue(String(number.toFixed(decimals)));
        }

        updater(Number(inputValue));
    };

    const filterDate = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (e.target.value === '') {
            setInputValue('');
            return;
        }

        let date: string = e.target.value;
        const dateRegex =
            /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2}|2100)$/;
        if (!dateRegex.test(date)) {
            setInputValue('');
            return;
        }
        const [d, m, y] = date.split('/');
        date = `${('0' + d).slice(-2)}/${('0' + m).slice(-2)}/${y}`;
        setInputValue(date);
        updater(inputValue);
    };

    const filterEmail = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const email: string = e.target.value;
        const emailRegex =
            /^[\w\.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
        if (email === '' || !emailRegex.test(email)) {
            setInputValue('');
            return;
        }
        updater(inputValue);
    };

    const filterTime = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const time = e.target.value;
        const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
        if (time === '' || !timeRegex.test(time)) {
            setInputValue('');
            return;
        }
        updater(inputValue);
    };

    const filterText = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setInputValue(e.target.value);
    };

    const classes = makeStyles([
        'p-2',
        'rounded-md',
        { condition: shadow, onTrue: `shadow-${color}` },
        'bg-purewhite',
        `text-${color}`,
        'focus:outline-none',
        `border border-burgundy`,
    ]);

    let handleFunction: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => void;

    switch (type) {
        case InputTypes.Integer:
            handleFunction = filterNumber;
            break;
        case InputTypes.Float:
            handleFunction = filterNumber;
            break;
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

    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            {type === InputTypes.Textarea ? (
                <textarea
                    className={classes}
                    name={inputId}
                    value={inputValue}
                    onChange={handleFunction}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    name={inputId}
                    value={inputValue}
                    onChange={handleFunction}
                    className={classes}
                />
            )}
            {required && (
                <FaAsterisk className="absolute top-0 right-0 m-2 text-burgundy" />
            )}
        </div>
    );
};

export default Input;
