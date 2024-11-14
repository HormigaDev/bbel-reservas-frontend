'use client';

import React, { useState } from 'react';
import ColorInterface from '@/interfaces/ColorInterface';
import makeStyles from '@/utils/MakeStyles';

interface CustomCheckboxProps extends ColorInterface {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    children?: React.ReactNode;
    className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    label = '',
    checked = false,
    onChange,
    color = 'burgundy',
    children,
    className = '',
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = () => {
        const newCheckedStatus = !isChecked;
        setIsChecked(newCheckedStatus);
        if (onChange) {
            onChange(newCheckedStatus);
        }
    };

    return (
        <label
            className={makeStyles([
                'flex items-center cursor-pointer space-x-2',
                className,
            ])}
        >
            {/* Custom Checkbox */}
            <div
                className={makeStyles([
                    'w-4 h-4 rounded border',
                    'flex items-center justify-center',
                    'transition-colors duration-200',
                    {
                        condition: isChecked,
                        onTrue: `bg-${color} border-${color}`,
                        onFalse: `bg-transparent border-${color}light`,
                    },
                ])}
                onClick={handleCheckboxChange}
            >
                {/* Checkmark */}
                {isChecked && (
                    <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>

            {/* Label */}
            <span className={makeStyles([`text-${color}`, 'text-xs'])}>
                {children}
            </span>
            <span
                className={makeStyles([`text-${color}`, 'text-xs'])}
                onClick={handleCheckboxChange}
            >
                {label}
            </span>

            {/* Hidden Input */}
            <input
                type="checkbox"
                checked={isChecked}
                className="hidden"
                onChange={() => {}}
            />
        </label>
    );
};

export default CustomCheckbox;
