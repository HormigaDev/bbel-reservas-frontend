import makeStyles from '@/utils/MakeStyles';
import React from 'react';

enum IconPosition {
    Left = 'left',
    Right = 'right',
}
interface ButtonProps {
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: string;
    className?: string;
    iconPosition?: IconPosition;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    label = '',
    onClick,
    disabled = false,
    type = 'primary',
    className = '',
    iconPosition = IconPosition.Left,
    children,
}) => {
    return (
        <button
            className={makeStyles([
                'rounded-md p-2 transition-colors duration-300',
                {
                    condition: disabled,
                    onTrue: 'opacity-40',
                },
                {
                    condition: type === 'primary',
                    onTrue: 'bg-burgundy text-purewhite hover:bg-burgunlight',
                    onFalse: [
                        'bg-gold text-greydark',
                        'hover:bg-burgundy hover:text-purewhite',
                    ],
                },
                className,
            ])}
            onClick={onClick}
        >
            {iconPosition === IconPosition.Left && children}
            {label}
            {iconPosition === IconPosition.Right && children}
        </button>
    );
};

export default Button;
