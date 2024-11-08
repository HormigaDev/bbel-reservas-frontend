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
    color = 'burgundy',
}) => {
    return (
        <button
            className={makeStyles([
                'rounded-md p-2 transition-colors duration-300',
                {
                    condition: disabled,
                    onTrue: 'opacity-40',
                },
                `bg-${color}`,
                `hover:bg-${color}light`,
                {
                    condition: type === 'primary',
                    onTrue: 'text-purewhite',
                    onFalse: ['bg-gold text-greygreylight'],
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
