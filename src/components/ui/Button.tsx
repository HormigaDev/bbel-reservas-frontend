import makeStyles from '@/utils/MakeStyles';
import React from 'react';
import ColorInterface from '@/interfaces/ColorInterface';

enum IconPosition {
    Left = 'left',
    Right = 'right',
}
interface ButtonProps extends ColorInterface {
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    iconPosition?: IconPosition;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    label = '',
    onClick = () => {},
    disabled = false,
    className = '',
    iconPosition = IconPosition.Left,
    children,
    color = 'burgundy',
}) => {
    const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick();
    };
    return (
        <button
            className={makeStyles([
                'rounded-md p-2 transition-colors duration-300',
                {
                    condition: disabled,
                    onTrue: 'opacity-40',
                },
                'text-purewhite',
                `bg-${color}`,
                `hover:bg-${color}light`,
                className,
            ])}
            onClick={handleClick}
        >
            {iconPosition === IconPosition.Left && children}
            {label}
            {iconPosition === IconPosition.Right && children}
        </button>
    );
};

export default Button;
